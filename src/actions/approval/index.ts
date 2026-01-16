"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole, getServerSession } from "@/lib/auth-server";
import type { ActionResponse, PaginatedResponse } from "@/types/api";
import {
  approveBatchSchema,
  rejectBatchSchema,
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

// Batch-level types for admin
export type AdminBatch = {
  id: string;
  batchNumber: number;
  status: RegistrationStatus;
  remarks: string | null;
  receiptImage: string | null;
  reviewedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  totalFee: number;
  delegateFeePerPerson: number;
  cookFeePerPerson: number;
  isPreRegistration: boolean;
  registration: {
    id: string;
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
  };
  _count: {
    delegates: number;
    cooks: number;
  };
};

export type AdminBatchDetail = AdminBatch & {
  registration: {
    id: string;
    event: {
      id: string;
      name: string;
      location: string;
      startDate: Date;
      endDate: Date;
      preRegistrationFee: number;
      preRegistrationSiblingDiscount: number;
      preRegistrationStart: Date;
      preRegistrationEnd: Date;
      onsiteRegistrationFee: number;
      onsiteSiblingDiscount: number;
      cookRegistrationFee: number;
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
  };
  delegates: {
    id: string;
    fullName: string;
    nickname: string | null;
    age: number;
    gender: Gender;
    isSibling: boolean;
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

// Registration-level summary for admin (shows all batches)
export type AdminRegistration = {
  id: string;
  createdAt: Date;
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
  // Computed from batches
  totalDelegates: number;
  totalCooks: number;
  totalApprovedDelegates: number;
  totalApprovedCooks: number;
  totalFee: number;
  pendingBatchCount: number;
  approvedBatchCount: number;
  rejectedBatchCount: number;
};

export type AdminRegistrationDetail = AdminRegistration & {
  event: {
    id: string;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    preRegistrationFee: number;
    preRegistrationSiblingDiscount: number;
    preRegistrationStart: Date;
    preRegistrationEnd: Date;
    onsiteRegistrationFee: number;
    onsiteSiblingDiscount: number;
    cookRegistrationFee: number;
    status: EventStatus;
  };
  batches: AdminBatchDetail[];
};

// ==========================================
// ADMIN QUERIES - BATCH FOCUSED
// ==========================================

/**
 * Get all pending batches for admin to review
 * This is the primary view for admins - they review batches, not registrations
 */
export async function getPendingBatches(
  filters: RegistrationFilters = {}
): Promise<ActionResponse<PaginatedResponse<AdminBatch>>> {
  await requireRole("ADMIN");

  const {
    page = 1,
    pageSize = 20,
    search,
    eventId,
    churchId,
    divisionId,
  } = filters;

  try {
    const where: Record<string, unknown> = {
      status: "PENDING",
    };

    if (eventId) {
      where.registration = { ...where.registration as object, eventId };
    }

    if (churchId) {
      where.registration = { ...where.registration as object, churchId };
    }

    if (divisionId) {
      where.registration = {
        ...where.registration as object,
        church: { divisionId },
      };
    }

    if (search) {
      where.registration = {
        ...where.registration as object,
        OR: [
          { church: { name: { contains: search, mode: "insensitive" } } },
          { president: { name: { contains: search, mode: "insensitive" } } },
          { event: { name: { contains: search, mode: "insensitive" } } },
        ],
      };
    }

    const [batches, total] = await Promise.all([
      prisma.registrationBatch.findMany({
        where,
        select: {
          id: true,
          batchNumber: true,
          status: true,
          remarks: true,
          receiptImage: true,
          reviewedAt: true,
          createdAt: true,
          updatedAt: true,
          totalFee: true,
          delegateFeePerPerson: true,
          cookFeePerPerson: true,
          isPreRegistration: true,
          registration: {
            select: {
              id: true,
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
                    select: { id: true, name: true },
                  },
                },
              },
              president: {
                select: { id: true, name: true, email: true },
              },
            },
          },
          _count: {
            select: { delegates: true, cooks: true },
          },
        },
        orderBy: { createdAt: "asc" }, // Oldest first for review queue
        skip: getSkip(page, pageSize),
        take: pageSize,
      }),
      prisma.registrationBatch.count({ where }),
    ]);

    return {
      success: true,
      data: {
        items: batches,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  } catch (error) {
    console.error("Failed to fetch pending batches:", error);
    return { success: false, error: "Failed to fetch pending batches" };
  }
}

/**
 * Get all batches with filtering (includes all statuses)
 */
export async function getBatches(
  filters: RegistrationFilters = {}
): Promise<ActionResponse<PaginatedResponse<AdminBatch>>> {
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
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (eventId) {
      where.registration = { ...where.registration as object, eventId };
    }

    if (churchId) {
      where.registration = { ...where.registration as object, churchId };
    }

    if (divisionId) {
      where.registration = {
        ...where.registration as object,
        church: { divisionId },
      };
    }

    if (search) {
      where.registration = {
        ...where.registration as object,
        OR: [
          { church: { name: { contains: search, mode: "insensitive" } } },
          { president: { name: { contains: search, mode: "insensitive" } } },
          { event: { name: { contains: search, mode: "insensitive" } } },
        ],
      };
    }

    const [batches, total] = await Promise.all([
      prisma.registrationBatch.findMany({
        where,
        select: {
          id: true,
          batchNumber: true,
          status: true,
          remarks: true,
          receiptImage: true,
          reviewedAt: true,
          createdAt: true,
          updatedAt: true,
          totalFee: true,
          delegateFeePerPerson: true,
          cookFeePerPerson: true,
          isPreRegistration: true,
          registration: {
            select: {
              id: true,
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
                    select: { id: true, name: true },
                  },
                },
              },
              president: {
                select: { id: true, name: true, email: true },
              },
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
      prisma.registrationBatch.count({ where }),
    ]);

    return {
      success: true,
      data: {
        items: batches,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  } catch (error) {
    console.error("Failed to fetch batches:", error);
    return { success: false, error: "Failed to fetch batches" };
  }
}

/**
 * Get a single batch with full details for admin review
 */
export async function getBatchById(
  id: string
): Promise<ActionResponse<AdminBatchDetail>> {
  await requireRole("ADMIN");

  try {
    const batch = await prisma.registrationBatch.findUnique({
      where: { id },
      select: {
        id: true,
        batchNumber: true,
        status: true,
        remarks: true,
        receiptImage: true,
        reviewedAt: true,
        reviewedBy: true,
        createdAt: true,
        updatedAt: true,
        totalFee: true,
        delegateFeePerPerson: true,
        cookFeePerPerson: true,
        isPreRegistration: true,
        registration: {
          select: {
            id: true,
            event: {
              select: {
                id: true,
                name: true,
                location: true,
                startDate: true,
                endDate: true,
                preRegistrationFee: true,
                preRegistrationSiblingDiscount: true,
                preRegistrationStart: true,
                preRegistrationEnd: true,
                onsiteRegistrationFee: true,
                onsiteSiblingDiscount: true,
                cookRegistrationFee: true,
                status: true,
              },
            },
            church: {
              select: {
                id: true,
                name: true,
                division: {
                  select: { id: true, name: true },
                },
              },
            },
            president: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        delegates: {
          select: {
            id: true,
            fullName: true,
            nickname: true,
            age: true,
            gender: true,
            isSibling: true,
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

    if (!batch) {
      return { success: false, error: "Batch not found" };
    }

    // Get reviewer info if exists
    let reviewer = null;
    if (batch.reviewedBy) {
      reviewer = await prisma.user.findUnique({
        where: { id: batch.reviewedBy },
        select: { id: true, name: true, email: true },
      });
    }

    return {
      success: true,
      data: { ...batch, reviewer },
    };
  } catch (error) {
    console.error("Failed to fetch batch:", error);
    return { success: false, error: "Failed to fetch batch details" };
  }
}

/**
 * Get pending batches count for dashboard
 */
export async function getPendingBatchesCount(): Promise<ActionResponse<number>> {
  await requireRole("ADMIN");

  try {
    const count = await prisma.registrationBatch.count({
      where: { status: "PENDING" },
    });

    return { success: true, data: count };
  } catch (error) {
    console.error("Failed to fetch pending count:", error);
    return { success: false, error: "Failed to fetch pending batches count" };
  }
}

// ==========================================
// ADMIN QUERIES - REGISTRATION LEVEL (for overview)
// ==========================================

/**
 * Get all registrations with aggregated batch info
 * Useful for getting an overview of all church registrations
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
    const where: Record<string, unknown> = {};

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

    // If filtering by status, filter registrations that have batches with that status
    if (status) {
      where.batches = { some: { status } };
    }

    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        select: {
          id: true,
          createdAt: true,
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
                select: { id: true, name: true },
              },
            },
          },
          president: {
            select: { id: true, name: true, email: true },
          },
          batches: {
            select: {
              status: true,
              totalFee: true,
              _count: { select: { delegates: true, cooks: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: getSkip(page, pageSize),
        take: pageSize,
      }),
      prisma.registration.count({ where }),
    ]);

    // Compute aggregates for each registration
    const result: AdminRegistration[] = registrations.map((reg) => {
      let totalDelegates = 0;
      let totalCooks = 0;
      let totalApprovedDelegates = 0;
      let totalApprovedCooks = 0;
      let totalFee = 0;
      let pendingBatchCount = 0;
      let approvedBatchCount = 0;
      let rejectedBatchCount = 0;

      for (const batch of reg.batches) {
        totalDelegates += batch._count.delegates;
        totalCooks += batch._count.cooks;
        totalFee += batch.totalFee;

        if (batch.status === "APPROVED") {
          totalApprovedDelegates += batch._count.delegates;
          totalApprovedCooks += batch._count.cooks;
          approvedBatchCount++;
        } else if (batch.status === "PENDING") {
          pendingBatchCount++;
        } else if (batch.status === "REJECTED") {
          rejectedBatchCount++;
        }
      }

      return {
        id: reg.id,
        createdAt: reg.createdAt,
        event: reg.event,
        church: reg.church,
        president: reg.president,
        totalDelegates,
        totalCooks,
        totalApprovedDelegates,
        totalApprovedCooks,
        totalFee,
        pendingBatchCount,
        approvedBatchCount,
        rejectedBatchCount,
      };
    });

    return {
      success: true,
      data: {
        items: result,
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
 * Get a single registration with all its batches
 */
export async function getRegistrationById(
  id: string
): Promise<ActionResponse<AdminRegistrationDetail>> {
  await requireRole("ADMIN");

  try {
    const registration = await prisma.registration.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        event: {
          select: {
            id: true,
            name: true,
            location: true,
            startDate: true,
            endDate: true,
            preRegistrationFee: true,
            preRegistrationSiblingDiscount: true,
            preRegistrationStart: true,
            preRegistrationEnd: true,
            onsiteRegistrationFee: true,
            onsiteSiblingDiscount: true,
            cookRegistrationFee: true,
            status: true,
          },
        },
        church: {
          select: {
            id: true,
            name: true,
            division: {
              select: { id: true, name: true },
            },
          },
        },
        president: {
          select: { id: true, name: true, email: true },
        },
        batches: {
          select: {
            id: true,
            batchNumber: true,
            status: true,
            remarks: true,
            receiptImage: true,
            reviewedAt: true,
            reviewedBy: true,
            createdAt: true,
            updatedAt: true,
            totalFee: true,
            delegateFeePerPerson: true,
            cookFeePerPerson: true,
            isPreRegistration: true,
            delegates: {
              select: {
                id: true,
                fullName: true,
                nickname: true,
                age: true,
                gender: true,
                isSibling: true,
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
          orderBy: { batchNumber: "asc" },
        },
      },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    // Get reviewer info for each batch
    const batchesWithReviewer = await Promise.all(
      registration.batches.map(async (batch) => {
        let reviewer = null;
        if (batch.reviewedBy) {
          reviewer = await prisma.user.findUnique({
            where: { id: batch.reviewedBy },
            select: { id: true, name: true, email: true },
          });
        }
        return {
          ...batch,
          registration: {
            id: registration.id,
            event: registration.event,
            church: registration.church,
            president: registration.president,
          },
          reviewer,
        };
      })
    );

    // Compute aggregates
    let totalDelegates = 0;
    let totalCooks = 0;
    let totalApprovedDelegates = 0;
    let totalApprovedCooks = 0;
    let totalFee = 0;
    let pendingBatchCount = 0;
    let approvedBatchCount = 0;
    let rejectedBatchCount = 0;

    for (const batch of registration.batches) {
      totalDelegates += batch._count.delegates;
      totalCooks += batch._count.cooks;
      totalFee += batch.totalFee;

      if (batch.status === "APPROVED") {
        totalApprovedDelegates += batch._count.delegates;
        totalApprovedCooks += batch._count.cooks;
        approvedBatchCount++;
      } else if (batch.status === "PENDING") {
        pendingBatchCount++;
      } else if (batch.status === "REJECTED") {
        rejectedBatchCount++;
      }
    }

    return {
      success: true,
      data: {
        id: registration.id,
        createdAt: registration.createdAt,
        event: registration.event,
        church: registration.church,
        president: registration.president,
        batches: batchesWithReviewer,
        totalDelegates,
        totalCooks,
        totalApprovedDelegates,
        totalApprovedCooks,
        totalFee,
        pendingBatchCount,
        approvedBatchCount,
        rejectedBatchCount,
      },
    };
  } catch (error) {
    console.error("Failed to fetch registration:", error);
    return { success: false, error: "Failed to fetch registration details" };
  }
}

// Legacy function - returns count of pending batches
export async function getPendingRegistrationsCount(): Promise<ActionResponse<number>> {
  return getPendingBatchesCount();
}

// ==========================================
// ADMIN MUTATIONS - BATCH APPROVAL
// ==========================================

/**
 * Approve a batch
 */
export async function approveBatch(
  batchId: string
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = approveBatchSchema.safeParse({ batchId });
  if (!validated.success) {
    return {
      success: false,
      error: "Invalid batch ID",
      fieldErrors: validated.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const batch = await prisma.registrationBatch.findUnique({
      where: { id: batchId },
      select: { id: true, status: true, registrationId: true },
    });

    if (!batch) {
      return { success: false, error: "Batch not found" };
    }

    if (batch.status !== "PENDING") {
      return {
        success: false,
        error: `Cannot approve a batch that is already ${batch.status.toLowerCase()}`,
      };
    }

    await prisma.registrationBatch.update({
      where: { id: batchId },
      data: {
        status: "APPROVED",
        reviewedAt: new Date(),
        reviewedBy: session.user.id,
        remarks: null,
      },
    });

    revalidatePath("/admin/registrations");
    revalidatePath(`/admin/registrations/${batch.registrationId}`);
    revalidatePath(`/admin/batches/${batchId}`);
    revalidatePath("/admin/dashboard");

    return { success: true, data: { id: batchId } };
  } catch (error) {
    console.error("Failed to approve batch:", error);
    return { success: false, error: "Failed to approve batch" };
  }
}

/**
 * Reject a batch with remarks
 */
export async function rejectBatch(
  batchId: string,
  remarks: string
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = rejectBatchSchema.safeParse({ batchId, remarks });
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

    const batch = await prisma.registrationBatch.findUnique({
      where: { id: batchId },
      select: { id: true, status: true, registrationId: true },
    });

    if (!batch) {
      return { success: false, error: "Batch not found" };
    }

    if (batch.status !== "PENDING") {
      return {
        success: false,
        error: `Cannot reject a batch that is already ${batch.status.toLowerCase()}`,
      };
    }

    await prisma.registrationBatch.update({
      where: { id: batchId },
      data: {
        status: "REJECTED",
        reviewedAt: new Date(),
        reviewedBy: session.user.id,
        remarks: validated.data.remarks,
      },
    });

    revalidatePath("/admin/registrations");
    revalidatePath(`/admin/registrations/${batch.registrationId}`);
    revalidatePath(`/admin/batches/${batchId}`);
    revalidatePath("/admin/dashboard");

    return { success: true, data: { id: batchId } };
  } catch (error) {
    console.error("Failed to reject batch:", error);
    return { success: false, error: "Failed to reject batch" };
  }
}

// Legacy function wrappers for backwards compatibility
export async function approveRegistration(
  registrationId: string
): Promise<ActionResponse<{ id: string }>> {
  // This is kept for backwards compatibility
  // It will approve the first pending batch of the registration
  await requireRole("ADMIN");

  try {
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        batches: {
          where: { status: "PENDING" },
          orderBy: { batchNumber: "asc" },
          take: 1,
        },
      },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    const pendingBatch = registration.batches[0];
    if (!pendingBatch) {
      return { success: false, error: "No pending batch to approve" };
    }

    return approveBatch(pendingBatch.id);
  } catch (error) {
    console.error("Failed to approve registration:", error);
    return { success: false, error: "Failed to approve registration" };
  }
}

export async function rejectRegistration(
  registrationId: string,
  remarks: string
): Promise<ActionResponse<{ id: string }>> {
  // This is kept for backwards compatibility
  // It will reject the first pending batch of the registration
  await requireRole("ADMIN");

  try {
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        batches: {
          where: { status: "PENDING" },
          orderBy: { batchNumber: "asc" },
          take: 1,
        },
      },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    const pendingBatch = registration.batches[0];
    if (!pendingBatch) {
      return { success: false, error: "No pending batch to reject" };
    }

    return rejectBatch(pendingBatch.id, remarks);
  } catch (error) {
    console.error("Failed to reject registration:", error);
    return { success: false, error: "Failed to reject registration" };
  }
}

// ==========================================
// HELPER QUERIES FOR FILTERS
// ==========================================

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

// ==========================================
// ADMIN APPROVED PARTICIPANTS QUERIES
// ==========================================

export type AdminParticipantType = "delegate" | "sibling" | "cook";

export type AdminApprovedParticipant = {
  id: string;
  fullName: string;
  nickname: string | null;
  age: number;
  gender: Gender;
  type: AdminParticipantType;
  eventId: string;
  eventName: string;
  churchId: string;
  churchName: string;
  divisionId: string;
  divisionName: string;
  batchNumber: number;
  registrationId: string;
};

export type AdminParticipantsFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
  type?: AdminParticipantType;
  eventId?: string;
  churchId?: string;
  divisionId?: string;
  gender?: Gender;
};

export type AdminParticipantsResponse = {
  items: AdminApprovedParticipant[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type AdminParticipantsSummary = {
  totalDelegates: number;
  totalSiblings: number;
  totalCooks: number;
  totalParticipants: number;
  churchCount: number;
};

export async function getAdminApprovedParticipants(
  filters: AdminParticipantsFilters = {}
): Promise<ActionResponse<AdminParticipantsResponse>> {
  await requireRole("ADMIN");

  try {
    const {
      page = 1,
      pageSize = 20,
      search,
      type,
      eventId,
      churchId,
      divisionId,
      gender,
    } = filters;

    // Build where clause for approved batches
    const whereClause: Record<string, unknown> = {
      status: "APPROVED",
    };

    if (eventId) {
      whereClause.registration = { ...whereClause.registration as object, eventId };
    }

    if (churchId) {
      whereClause.registration = { ...whereClause.registration as object, churchId };
    }

    if (divisionId) {
      whereClause.registration = {
        ...whereClause.registration as object,
        church: { divisionId },
      };
    }

    // Get all approved batches
    const approvedBatches = await prisma.registrationBatch.findMany({
      where: whereClause,
      include: {
        registration: {
          include: {
            event: {
              select: { id: true, name: true },
            },
            church: {
              select: {
                id: true,
                name: true,
                division: {
                  select: { id: true, name: true },
                },
              },
            },
          },
        },
        delegates: {
          select: {
            id: true,
            fullName: true,
            nickname: true,
            age: true,
            gender: true,
            isSibling: true,
          },
        },
        cooks: {
          select: {
            id: true,
            fullName: true,
            nickname: true,
            age: true,
            gender: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform data into unified participant list
    let participants: AdminApprovedParticipant[] = [];

    for (const batch of approvedBatches) {
      const church = batch.registration.church;
      const event = batch.registration.event;

      // Add delegates (non-siblings)
      if (type === undefined || type === "delegate") {
        const delegates = batch.delegates
          .filter((d) => !d.isSibling)
          .map((d) => ({
            id: d.id,
            fullName: d.fullName,
            nickname: d.nickname,
            age: d.age,
            gender: d.gender,
            type: "delegate" as AdminParticipantType,
            eventId: event.id,
            eventName: event.name,
            churchId: church.id,
            churchName: church.name,
            divisionId: church.division.id,
            divisionName: church.division.name,
            batchNumber: batch.batchNumber,
            registrationId: batch.registration.id,
          }));
        participants.push(...delegates);
      }

      // Add siblings
      if (type === undefined || type === "sibling") {
        const siblings = batch.delegates
          .filter((d) => d.isSibling)
          .map((d) => ({
            id: d.id,
            fullName: d.fullName,
            nickname: d.nickname,
            age: d.age,
            gender: d.gender,
            type: "sibling" as AdminParticipantType,
            eventId: event.id,
            eventName: event.name,
            churchId: church.id,
            churchName: church.name,
            divisionId: church.division.id,
            divisionName: church.division.name,
            batchNumber: batch.batchNumber,
            registrationId: batch.registration.id,
          }));
        participants.push(...siblings);
      }

      // Add cooks
      if (type === undefined || type === "cook") {
        const cooks = batch.cooks.map((c) => ({
          id: c.id,
          fullName: c.fullName,
          nickname: c.nickname,
          age: c.age,
          gender: c.gender,
          type: "cook" as AdminParticipantType,
          eventId: event.id,
          eventName: event.name,
          churchId: church.id,
          churchName: church.name,
          divisionId: church.division.id,
          divisionName: church.division.name,
          batchNumber: batch.batchNumber,
          registrationId: batch.registration.id,
        }));
        participants.push(...cooks);
      }
    }

    // Apply gender filter
    if (gender) {
      participants = participants.filter((p) => p.gender === gender);
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      participants = participants.filter(
        (p) =>
          p.fullName.toLowerCase().includes(searchLower) ||
          p.nickname?.toLowerCase().includes(searchLower) ||
          p.churchName.toLowerCase().includes(searchLower) ||
          p.eventName.toLowerCase().includes(searchLower) ||
          p.divisionName.toLowerCase().includes(searchLower)
      );
    }

    // Sort by church name, then by full name
    participants.sort((a, b) => {
      const churchCompare = a.churchName.localeCompare(b.churchName);
      if (churchCompare !== 0) return churchCompare;
      return a.fullName.localeCompare(b.fullName);
    });

    // Pagination
    const total = participants.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedItems = participants.slice(startIndex, startIndex + pageSize);

    return {
      success: true,
      data: {
        items: paginatedItems,
        page,
        pageSize,
        total,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Failed to fetch approved participants:", error);
    return { success: false, error: "Failed to fetch approved participants" };
  }
}

export async function getAdminParticipantsSummary(
  filters: Pick<AdminParticipantsFilters, "eventId" | "churchId" | "divisionId"> = {}
): Promise<ActionResponse<AdminParticipantsSummary>> {
  await requireRole("ADMIN");

  try {
    const { eventId, churchId, divisionId } = filters;

    // Build where clause
    const whereClause: Record<string, unknown> = {
      status: "APPROVED",
    };

    if (eventId) {
      whereClause.registration = { ...whereClause.registration as object, eventId };
    }

    if (churchId) {
      whereClause.registration = { ...whereClause.registration as object, churchId };
    }

    if (divisionId) {
      whereClause.registration = {
        ...whereClause.registration as object,
        church: { divisionId },
      };
    }

    // Get all approved batches
    const approvedBatches = await prisma.registrationBatch.findMany({
      where: whereClause,
      include: {
        registration: {
          select: { churchId: true },
        },
        delegates: {
          select: { isSibling: true },
        },
        _count: {
          select: { cooks: true },
        },
      },
    });

    let totalDelegates = 0;
    let totalSiblings = 0;
    let totalCooks = 0;
    const churchIds = new Set<string>();

    for (const batch of approvedBatches) {
      totalDelegates += batch.delegates.filter((d) => !d.isSibling).length;
      totalSiblings += batch.delegates.filter((d) => d.isSibling).length;
      totalCooks += batch._count.cooks;
      churchIds.add(batch.registration.churchId);
    }

    return {
      success: true,
      data: {
        totalDelegates,
        totalSiblings,
        totalCooks,
        totalParticipants: totalDelegates + totalSiblings + totalCooks,
        churchCount: churchIds.size,
      },
    };
  } catch (error) {
    console.error("Failed to fetch participants summary:", error);
    return { success: false, error: "Failed to fetch participants summary" };
  }
}

export async function getChurchesWithApprovedParticipants(
  filters: Pick<AdminParticipantsFilters, "eventId" | "divisionId"> = {}
): Promise<ActionResponse<{ id: string; name: string; divisionName: string }[]>> {
  await requireRole("ADMIN");

  try {
    const { eventId, divisionId } = filters;

    // Build where clause
    const whereClause: Record<string, unknown> = {
      batches: {
        some: { status: "APPROVED" },
      },
    };

    if (eventId) {
      whereClause.eventId = eventId;
    }

    if (divisionId) {
      whereClause.church = { divisionId };
    }

    const registrations = await prisma.registration.findMany({
      where: whereClause,
      include: {
        church: {
          select: {
            id: true,
            name: true,
            division: {
              select: { name: true },
            },
          },
        },
      },
      distinct: ["churchId"],
    });

    const churches = registrations.map((r) => ({
      id: r.church.id,
      name: r.church.name,
      divisionName: r.church.division.name,
    }));

    // Sort by name
    churches.sort((a, b) => a.name.localeCompare(b.name));

    return { success: true, data: churches };
  } catch (error) {
    console.error("Failed to fetch churches with approved participants:", error);
    return { success: false, error: "Failed to fetch churches" };
  }
}

export async function getEventsWithApprovedParticipantsAdmin(): Promise<
  ActionResponse<{ id: string; name: string }[]>
> {
  await requireRole("ADMIN");

  try {
    const registrations = await prisma.registration.findMany({
      where: {
        batches: {
          some: { status: "APPROVED" },
        },
      },
      include: {
        event: {
          select: { id: true, name: true },
        },
      },
      distinct: ["eventId"],
    });

    const events = registrations.map((r) => r.event);
    events.sort((a, b) => a.name.localeCompare(b.name));

    return { success: true, data: events };
  } catch (error) {
    console.error("Failed to fetch events with approved participants:", error);
    return { success: false, error: "Failed to fetch events" };
  }
}
