"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole, getServerSession } from "@/lib/auth-server";
import type { ActionResponse } from "@/types/api";
import {
  createRegistrationSchema,
  updateRegistrationSchema,
  type CreateRegistrationInput,
  type UpdateRegistrationInput,
} from "@/schemas";
import type { EventStatus, RegistrationStatus, Gender } from "@/lib/generated/prisma";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export type AvailableEvent = {
  id: string;
  name: string;
  description: string | null;
  location: string;
  logo: string | null;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  preRegistrationFee: number;
  preRegistrationStart: Date;
  preRegistrationEnd: Date;
  onsiteRegistrationFee: number;
  cookRegistrationFee: number;
  status: EventStatus;
  hasRegistration: boolean;
  registrationStatus: RegistrationStatus | null;
  registrationId: string | null;
};

export type EventForRegistration = AvailableEvent & {
  currentFee: number;
  feeType: "pre-registration" | "onsite";
  isPreRegistration: boolean;
};

export type RegistrationWithDetails = {
  id: string;
  eventId: string;
  churchId: string;
  presidentId: string;
  status: RegistrationStatus;
  remarks: string | null;
  reviewedAt: Date | null;
  reviewedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  // Fee information (captured at registration time)
  totalFee: number;
  delegateFeePerPerson: number;
  cookFeePerPerson: number;
  isPreRegistration: boolean;
  event: {
    id: string;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    registrationDeadline: Date;
    preRegistrationFee: number;
    onsiteRegistrationFee: number;
    cookRegistrationFee: number;
    status: EventStatus;
  };
  church: {
    id: string;
    name: string;
  };
  delegates: {
    id: string;
    fullName: string;
    nickname: string | null;
    age: number;
    gender: Gender;
  }[];
  cooks: {
    id: string;
    fullName: string;
    nickname: string | null;
    age: number;
    gender: Gender;
  }[];
  _count: {
    delegates: number;
    cooks: number;
  };
};

export type MyRegistration = {
  id: string;
  status: RegistrationStatus;
  createdAt: Date;
  // Fee information (captured at registration time)
  totalFee: number;
  delegateFeePerPerson: number;
  cookFeePerPerson: number;
  isPreRegistration: boolean;
  event: {
    id: string;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    status: EventStatus;
  };
  _count: {
    delegates: number;
    cooks: number;
  };
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get the current user's church ID
 * Returns null if user is not a president or has no church assigned
 */
async function getPresidentChurchId(): Promise<string | null> {
  const session = await getServerSession();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { churchId: true, role: true },
  });

  if (!user || user.role !== "PRESIDENT" || !user.churchId) return null;
  return user.churchId;
}

/**
 * Calculate the current fee based on registration period
 */
function calculateCurrentFee(event: {
  preRegistrationStart: Date;
  preRegistrationEnd: Date;
  preRegistrationFee: number;
  onsiteRegistrationFee: number;
}): { fee: number; type: "pre-registration" | "onsite"; isPreRegistration: boolean } {
  const now = new Date();
  const isPreRegistration =
    now >= new Date(event.preRegistrationStart) &&
    now <= new Date(event.preRegistrationEnd);

  return {
    fee: isPreRegistration ? event.preRegistrationFee : event.onsiteRegistrationFee,
    type: isPreRegistration ? "pre-registration" : "onsite",
    isPreRegistration,
  };
}

// ==========================================
// PRESIDENT QUERIES
// ==========================================

/**
 * Get all available events for president to register
 * Only shows UPCOMING and ONGOING events that haven't passed their deadline
 */
export async function getAvailableEvents(): Promise<ActionResponse<AvailableEvent[]>> {
  await requireRole("PRESIDENT");

  try {
    const churchId = await getPresidentChurchId();
    if (!churchId) {
      return { success: false, error: "You must be assigned to a church to view events" };
    }

    const now = new Date();
    const events = await prisma.event.findMany({
      where: {
        status: { in: ["UPCOMING", "ONGOING"] },
        registrationDeadline: { gte: now },
      },
      include: {
        registrations: {
          where: { churchId },
          select: { id: true, status: true },
        },
      },
      orderBy: { startDate: "asc" },
    });

    const result: AvailableEvent[] = events.map((event) => {
      const registration = event.registrations[0] || null;
      return {
        id: event.id,
        name: event.name,
        description: event.description,
        location: event.location,
        logo: event.logo,
        startDate: event.startDate,
        endDate: event.endDate,
        registrationDeadline: event.registrationDeadline,
        preRegistrationFee: event.preRegistrationFee,
        preRegistrationStart: event.preRegistrationStart,
        preRegistrationEnd: event.preRegistrationEnd,
        onsiteRegistrationFee: event.onsiteRegistrationFee,
        cookRegistrationFee: event.cookRegistrationFee,
        status: event.status,
        hasRegistration: !!registration,
        registrationStatus: registration?.status ?? null,
        registrationId: registration?.id ?? null,
      };
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch available events:", error);
    return { success: false, error: "Failed to fetch available events" };
  }
}

/**
 * Get event details for registration page
 * Includes fee calculation and registration status check
 */
export async function getEventForRegistration(
  eventId: string
): Promise<ActionResponse<EventForRegistration>> {
  await requireRole("PRESIDENT");

  try {
    const churchId = await getPresidentChurchId();
    if (!churchId) {
      return { success: false, error: "You must be assigned to a church to register" };
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: {
          where: { churchId },
          select: { id: true, status: true },
        },
      },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    // Check if event is available for registration
    const now = new Date();
    if (!["UPCOMING", "ONGOING"].includes(event.status)) {
      return { success: false, error: "This event is not open for registration" };
    }

    if (now > new Date(event.registrationDeadline)) {
      return { success: false, error: "Registration deadline has passed" };
    }

    const registration = event.registrations[0] || null;
    const feeInfo = calculateCurrentFee(event);

    return {
      success: true,
      data: {
        id: event.id,
        name: event.name,
        description: event.description,
        location: event.location,
        logo: event.logo,
        startDate: event.startDate,
        endDate: event.endDate,
        registrationDeadline: event.registrationDeadline,
        preRegistrationFee: event.preRegistrationFee,
        preRegistrationStart: event.preRegistrationStart,
        preRegistrationEnd: event.preRegistrationEnd,
        onsiteRegistrationFee: event.onsiteRegistrationFee,
        cookRegistrationFee: event.cookRegistrationFee,
        status: event.status,
        hasRegistration: !!registration,
        registrationStatus: registration?.status ?? null,
        registrationId: registration?.id ?? null,
        currentFee: feeInfo.fee,
        feeType: feeInfo.type,
        isPreRegistration: feeInfo.isPreRegistration,
      },
    };
  } catch (error) {
    console.error("Failed to fetch event for registration:", error);
    return { success: false, error: "Failed to fetch event details" };
  }
}

/**
 * Get all registrations for the current president's church
 */
export async function getMyRegistrations(): Promise<ActionResponse<MyRegistration[]>> {
  await requireRole("PRESIDENT");

  try {
    const churchId = await getPresidentChurchId();
    if (!churchId) {
      return { success: false, error: "You must be assigned to a church" };
    }

    const registrations = await prisma.registration.findMany({
      where: { churchId },
      select: {
        id: true,
        status: true,
        createdAt: true,
        totalFee: true,
        delegateFeePerPerson: true,
        cookFeePerPerson: true,
        isPreRegistration: true,
        event: {
          select: {
            id: true,
            name: true,
            location: true,
            startDate: true,
            endDate: true,
            status: true,
          },
        },
        _count: {
          select: { delegates: true, cooks: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: registrations };
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return { success: false, error: "Failed to fetch registrations" };
  }
}

/**
 * Get a single registration with full details
 */
export async function getMyRegistrationById(
  id: string
): Promise<ActionResponse<RegistrationWithDetails>> {
  await requireRole("PRESIDENT");

  try {
    const churchId = await getPresidentChurchId();
    if (!churchId) {
      return { success: false, error: "You must be assigned to a church" };
    }

    const registration = await prisma.registration.findFirst({
      where: { id, churchId },
      select: {
        id: true,
        eventId: true,
        churchId: true,
        presidentId: true,
        status: true,
        remarks: true,
        reviewedAt: true,
        reviewedBy: true,
        createdAt: true,
        updatedAt: true,
        totalFee: true,
        delegateFeePerPerson: true,
        cookFeePerPerson: true,
        isPreRegistration: true,
        event: {
          select: {
            id: true,
            name: true,
            location: true,
            startDate: true,
            endDate: true,
            registrationDeadline: true,
            preRegistrationFee: true,
            onsiteRegistrationFee: true,
            cookRegistrationFee: true,
            status: true,
          },
        },
        church: {
          select: { id: true, name: true },
        },
        delegates: {
          select: {
            id: true,
            fullName: true,
            nickname: true,
            age: true,
            gender: true,
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

    return { success: true, data: registration };
  } catch (error) {
    console.error("Failed to fetch registration:", error);
    return { success: false, error: "Failed to fetch registration details" };
  }
}

// ==========================================
// PRESIDENT MUTATIONS
// ==========================================

/**
 * Create a new registration with delegates and cooks
 */
export async function createRegistration(
  input: CreateRegistrationInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("PRESIDENT");

  const validated = createRegistrationSchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      error: "Invalid input",
      fieldErrors: validated.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const session = await getServerSession();
    const churchId = await getPresidentChurchId();

    if (!churchId || !session?.user?.id) {
      return { success: false, error: "You must be assigned to a church to register" };
    }

    // Check if event exists and is available
    const event = await prisma.event.findUnique({
      where: { id: validated.data.eventId },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    const now = new Date();
    if (!["UPCOMING", "ONGOING"].includes(event.status)) {
      return { success: false, error: "This event is not open for registration" };
    }

    if (now > new Date(event.registrationDeadline)) {
      return { success: false, error: "Registration deadline has passed" };
    }

    // Check if church already registered for this event
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        eventId_churchId: {
          eventId: validated.data.eventId,
          churchId,
        },
      },
    });

    if (existingRegistration) {
      return {
        success: false,
        error: "Your church is already registered for this event",
      };
    }

    // Calculate fees at registration time
    const feeInfo = calculateCurrentFee(event);
    const delegateCount = validated.data.delegates.length;
    const cookCount = validated.data.cooks.length;
    const totalDelegateFees = delegateCount * feeInfo.fee;
    const totalCookFees = cookCount * event.cookRegistrationFee;
    const totalFee = totalDelegateFees + totalCookFees;

    // Create registration with delegates and cooks
    const registration = await prisma.registration.create({
      data: {
        eventId: validated.data.eventId,
        churchId,
        presidentId: session.user.id,
        status: "PENDING",
        // Store fee information at registration time
        totalFee,
        delegateFeePerPerson: feeInfo.fee,
        cookFeePerPerson: event.cookRegistrationFee,
        isPreRegistration: feeInfo.isPreRegistration,
        delegates: {
          create: validated.data.delegates.map((delegate) => ({
            fullName: delegate.fullName,
            nickname: delegate.nickname || null,
            age: delegate.age,
            gender: delegate.gender,
          })),
        },
        cooks: {
          create: validated.data.cooks.map((cook) => ({
            fullName: cook.fullName,
            nickname: cook.nickname || null,
            age: cook.age,
            gender: cook.gender,
          })),
        },
      },
      select: { id: true },
    });

    revalidatePath("/president/registrations");
    revalidatePath("/president/events");
    return { success: true, data: { id: registration.id } };
  } catch (error) {
    console.error("Failed to create registration:", error);
    return { success: false, error: "Failed to create registration" };
  }
}

/**
 * Update an existing registration
 * Can edit any status (PENDING, APPROVED, REJECTED) before the deadline
 * Editing an APPROVED or REJECTED registration resets it to PENDING for re-review
 */
export async function updateRegistration(
  id: string,
  input: UpdateRegistrationInput
): Promise<ActionResponse<{ id: string; statusReset: boolean }>> {
  await requireRole("PRESIDENT");

  const validated = updateRegistrationSchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      error: "Invalid input",
      fieldErrors: validated.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const churchId = await getPresidentChurchId();
    if (!churchId) {
      return { success: false, error: "You must be assigned to a church" };
    }

    // Check if registration exists and belongs to this church
    const registration = await prisma.registration.findFirst({
      where: { id, churchId },
      include: {
        event: {
          select: {
            registrationDeadline: true,
            status: true,
            preRegistrationStart: true,
            preRegistrationEnd: true,
            preRegistrationFee: true,
            onsiteRegistrationFee: true,
            cookRegistrationFee: true,
          },
        },
      },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    // Check if event is still open for registration
    const now = new Date();
    if (
      !["UPCOMING", "ONGOING"].includes(registration.event.status) ||
      now > new Date(registration.event.registrationDeadline)
    ) {
      return { success: false, error: "Registration period has ended" };
    }

    // Check if we need to reset status (editing an approved or rejected registration)
    const wasApprovedOrRejected = registration.status !== "PENDING";

    // Recalculate fees based on current time (may have changed from pre-reg to onsite)
    const feeInfo = calculateCurrentFee(registration.event);
    const delegateCount = validated.data.delegates.length;
    const cookCount = validated.data.cooks.length;
    const totalDelegateFees = delegateCount * feeInfo.fee;
    const totalCookFees = cookCount * registration.event.cookRegistrationFee;
    const totalFee = totalDelegateFees + totalCookFees;

    // Update registration: delete existing delegates/cooks and create new ones
    // If previously approved/rejected, reset to PENDING and clear review info
    await prisma.$transaction([
      prisma.delegate.deleteMany({ where: { registrationId: id } }),
      prisma.cook.deleteMany({ where: { registrationId: id } }),
      prisma.registration.update({
        where: { id },
        data: {
          updatedAt: new Date(),
          // Reset to PENDING if was approved/rejected
          status: "PENDING",
          // Clear review info when resetting
          ...(wasApprovedOrRejected && {
            remarks: null,
            reviewedAt: null,
            reviewedBy: null,
          }),
          // Update fee information
          totalFee,
          delegateFeePerPerson: feeInfo.fee,
          cookFeePerPerson: registration.event.cookRegistrationFee,
          isPreRegistration: feeInfo.isPreRegistration,
          delegates: {
            create: validated.data.delegates.map((delegate) => ({
              fullName: delegate.fullName,
              nickname: delegate.nickname || null,
              age: delegate.age,
              gender: delegate.gender,
            })),
          },
          cooks: {
            create: validated.data.cooks.map((cook) => ({
              fullName: cook.fullName,
              nickname: cook.nickname || null,
              age: cook.age,
              gender: cook.gender,
            })),
          },
        },
      }),
    ]);

    revalidatePath("/president/registrations");
    revalidatePath(`/president/registrations/${id}`);
    revalidatePath("/admin/registrations");
    return { success: true, data: { id, statusReset: wasApprovedOrRejected } };
  } catch (error) {
    console.error("Failed to update registration:", error);
    return { success: false, error: "Failed to update registration" };
  }
}

/**
 * Cancel a pending registration
 */
export async function cancelRegistration(
  id: string
): Promise<ActionResponse<void>> {
  await requireRole("PRESIDENT");

  try {
    const churchId = await getPresidentChurchId();
    if (!churchId) {
      return { success: false, error: "You must be assigned to a church" };
    }

    const registration = await prisma.registration.findFirst({
      where: { id, churchId },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    if (registration.status !== "PENDING") {
      return {
        success: false,
        error: "Only pending registrations can be cancelled",
      };
    }

    // Delete the registration (cascade will delete delegates and cooks)
    await prisma.registration.delete({ where: { id } });

    revalidatePath("/president/registrations");
    revalidatePath("/president/events");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to cancel registration:", error);
    return { success: false, error: "Failed to cancel registration" };
  }
}
