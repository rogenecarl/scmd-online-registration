"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole, getServerSession } from "@/lib/auth-server";
import type { ActionResponse, PaginatedResponse } from "@/types/api";
import {
  approveRegistrationSchema,
  rejectRegistrationSchema,
} from "@/schemas";
import { getSkip } from "@/lib/pagination";
import type { RegistrationStatus, EventStatus, Gender } from "@/lib/generated/prisma";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export type RegistrationFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: RegistrationStatus;
  eventId?: string;
  churchId?: string;
  divisionId?: string;
};

export type AdminRegistration = {
  id: string;
  status: RegistrationStatus;
  remarks: string | null;
  reviewedAt: Date | null;
  reviewedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  event: {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    status: EventStatus;
  };
  church: {
    id: string;
    name: string;
    division: {
      id: string;
      name: string;
    };
  };
  president: {
    id: string;
    name: string;
    email: string;
  };
  _count: {
    delegates: number;
    cooks: number;
  };
};

export type AdminRegistrationDetail = AdminRegistration & {
  event: {
    id: string;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    preRegistrationFee: number;
    preRegistrationStart: Date;
    preRegistrationEnd: Date;
    onsiteRegistrationFee: number;
    cookRegistrationFee: number;
    status: EventStatus;
  };
  delegates: {
    id: string;
    fullName: string;
    nickname: string | null;
    age: number;
    gender: Gender;
    createdAt: Date;
  }[];
  cooks: {
    id: string;
    fullName: string;
    nickname: string | null;
    age: number;
    gender: Gender;
    createdAt: Date;
  }[];
  reviewer: {
    id: string;
    name: string;
    email: string;
  } | null;
};

// ==========================================
// ADMIN QUERIES
// ==========================================

/**
 * Get all registrations with filtering and pagination
 * Admin only
 */
export async function getRegistrations(
  filters: RegistrationFilters = {}
): Promise<ActionResponse<PaginatedResponse<AdminRegistration>>> {
  await requireRole("ADMIN");

  const {
    page = 1,
    pageSize = 20,
    search,
    status,
    eventId,
    churchId,
    divisionId,
  } = filters;

  try {
    // Build where clause
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (eventId) {
      where.eventId = eventId;
    }

    if (churchId) {
      where.churchId = churchId;
    }

    if (divisionId) {
      where.church = { divisionId };
    }

    if (search) {
      where.OR = [
        { church: { name: { contains: search, mode: "insensitive" } } },
        { president: { name: { contains: search, mode: "insensitive" } } },
        { event: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        include: {
          event: {
            select: {
              id: true,
              name: true,
              startDate: true,
              endDate: true,
              status: true,
            },
          },
          church: {
            select: {
              id: true,
              name: true,
              division: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          president: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: { delegates: true, cooks: true },
          },
        },
        orderBy: [
          { status: "asc" }, // PENDING first
          { createdAt: "desc" },
        ],
        skip: getSkip(page, pageSize),
        take: pageSize,
      }),
      prisma.registration.count({ where }),
    ]);

    return {
      success: true,
      data: {
        items: registrations,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return { success: false, error: "Failed to fetch registrations" };
  }
}

/**
 * Get a single registration with full details for admin review
 * Admin only
 */
export async function getRegistrationById(
  id: string
): Promise<ActionResponse<AdminRegistrationDetail>> {
  await requireRole("ADMIN");

  try {
    const registration = await prisma.registration.findUnique({
      where: { id },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            location: true,
            startDate: true,
            endDate: true,
            preRegistrationFee: true,
            preRegistrationStart: true,
            preRegistrationEnd: true,
            onsiteRegistrationFee: true,
            cookRegistrationFee: true,
            status: true,
          },
        },
        church: {
          select: {
            id: true,
            name: true,
            division: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        president: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        delegates: {
          select: {
            id: true,
            fullName: true,
            nickname: true,
            age: true,
            gender: true,
            createdAt: true,
          },
          orderBy: { createdAt: "asc" },
        },
        cooks: {
          select: {
            id: true,
            fullName: true,
            nickname: true,
            age: true,
            gender: true,
            createdAt: true,
          },
          orderBy: { createdAt: "asc" },
        },
        _count: {
          select: { delegates: true, cooks: true },
        },
      },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    // Get reviewer info if exists
    let reviewer = null;
    if (registration.reviewedBy) {
      reviewer = await prisma.user.findUnique({
        where: { id: registration.reviewedBy },
        select: { id: true, name: true, email: true },
      });
    }

    return {
      success: true,
      data: { ...registration, reviewer },
    };
  } catch (error) {
    console.error("Failed to fetch registration:", error);
    return { success: false, error: "Failed to fetch registration details" };
  }
}

/**
 * Get pending registrations count for dashboard
 */
export async function getPendingRegistrationsCount(): Promise<
  ActionResponse<number>
> {
  await requireRole("ADMIN");

  try {
    const count = await prisma.registration.count({
      where: { status: "PENDING" },
    });

    return { success: true, data: count };
  } catch (error) {
    console.error("Failed to fetch pending count:", error);
    return { success: false, error: "Failed to fetch pending registrations count" };
  }
}

// ==========================================
// ADMIN MUTATIONS
// ==========================================

/**
 * Approve a registration
 * Admin only
 */
export async function approveRegistration(
  registrationId: string
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = approveRegistrationSchema.safeParse({ registrationId });
  if (!validated.success) {
    return {
      success: false,
      error: "Invalid registration ID",
      fieldErrors: validated.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Check if registration exists
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      select: { id: true, status: true },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    if (registration.status !== "PENDING") {
      return {
        success: false,
        error: `Cannot approve a registration that is already ${registration.status.toLowerCase()}`,
      };
    }

    // Approve the registration
    await prisma.registration.update({
      where: { id: registrationId },
      data: {
        status: "APPROVED",
        reviewedAt: new Date(),
        reviewedBy: session.user.id,
        remarks: null, // Clear any previous remarks
      },
    });

    revalidatePath("/admin/registrations");
    revalidatePath(`/admin/registrations/${registrationId}`);
    revalidatePath("/admin/dashboard");

    return { success: true, data: { id: registrationId } };
  } catch (error) {
    console.error("Failed to approve registration:", error);
    return { success: false, error: "Failed to approve registration" };
  }
}

/**
 * Reject a registration with remarks
 * Admin only
 */
export async function rejectRegistration(
  registrationId: string,
  remarks: string
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = rejectRegistrationSchema.safeParse({
    registrationId,
    remarks,
  });
  if (!validated.success) {
    return {
      success: false,
      error: "Invalid input",
      fieldErrors: validated.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Check if registration exists
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      select: { id: true, status: true },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    if (registration.status !== "PENDING") {
      return {
        success: false,
        error: `Cannot reject a registration that is already ${registration.status.toLowerCase()}`,
      };
    }

    // Reject the registration
    await prisma.registration.update({
      where: { id: registrationId },
      data: {
        status: "REJECTED",
        reviewedAt: new Date(),
        reviewedBy: session.user.id,
        remarks: validated.data.remarks,
      },
    });

    revalidatePath("/admin/registrations");
    revalidatePath(`/admin/registrations/${registrationId}`);
    revalidatePath("/admin/dashboard");

    return { success: true, data: { id: registrationId } };
  } catch (error) {
    console.error("Failed to reject registration:", error);
    return { success: false, error: "Failed to reject registration" };
  }
}

// ==========================================
// HELPER QUERIES FOR FILTERS
// ==========================================

/**
 * Get events for filter dropdown
 */
export async function getEventsForFilter(): Promise<
  ActionResponse<{ id: string; name: string }[]>
> {
  await requireRole("ADMIN");

  try {
    const events = await prisma.event.findMany({
      select: { id: true, name: true },
      orderBy: { startDate: "desc" },
    });

    return { success: true, data: events };
  } catch (error) {
    console.error("Failed to fetch events for filter:", error);
    return { success: false, error: "Failed to fetch events" };
  }
}

/**
 * Get churches for filter dropdown
 */
export async function getChurchesForFilter(): Promise<
  ActionResponse<{ id: string; name: string; divisionName: string }[]>
> {
  await requireRole("ADMIN");

  try {
    const churches = await prisma.church.findMany({
      select: {
        id: true,
        name: true,
        division: { select: { name: true } },
      },
      orderBy: { name: "asc" },
    });

    return {
      success: true,
      data: churches.map((c) => ({
        id: c.id,
        name: c.name,
        divisionName: c.division.name,
      })),
    };
  } catch (error) {
    console.error("Failed to fetch churches for filter:", error);
    return { success: false, error: "Failed to fetch churches" };
  }
}

/**
 * Get divisions for filter dropdown
 */
export async function getDivisionsForFilter(): Promise<
  ActionResponse<{ id: string; name: string }[]>
> {
  await requireRole("ADMIN");

  try {
    const divisions = await prisma.division.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    return { success: true, data: divisions };
  } catch (error) {
    console.error("Failed to fetch divisions for filter:", error);
    return { success: false, error: "Failed to fetch divisions" };
  }
}
