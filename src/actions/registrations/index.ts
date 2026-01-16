"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole, getServerSession } from "@/lib/auth-server";
import type { ActionResponse } from "@/types/api";
import {
  createRegistrationSchema,
  createBatchSchema,
  updateBatchSchema,
  type CreateRegistrationInput,
  type CreateBatchInput,
  type UpdateBatchInput,
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
  banner: string | null;
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
  hasRegistration: boolean;
  registrationId: string | null;
  // Batch summary info
  totalApprovedDelegates: number;
  totalApprovedCooks: number;
  hasPendingBatch: boolean;
  hasApprovedBatch: boolean;
  // Computed registration status for display
  registrationStatus: RegistrationStatus | null;
};

export type EventForRegistration = AvailableEvent & {
  currentFee: number;
  feeType: "pre-registration" | "onsite";
  isPreRegistration: boolean;
};

export type BatchWithDetails = {
  id: string;
  batchNumber: number;
  status: RegistrationStatus;
  remarks: string | null;
  receiptImage: string | null;
  reviewedAt: Date | null;
  reviewedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  totalFee: number;
  delegateFeePerPerson: number;
  cookFeePerPerson: number;
  isPreRegistration: boolean;
  delegates: {
    id: string;
    fullName: string;
    nickname: string | null;
    age: number;
    gender: Gender;
    isSibling: boolean;
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

export type RegistrationWithBatches = {
  id: string;
  eventId: string;
  churchId: string;
  presidentId: string;
  createdAt: Date;
  updatedAt: Date;
  event: {
    id: string;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    preRegistrationFee: number;
    onsiteRegistrationFee: number;
    cookRegistrationFee: number;
    status: EventStatus;
  };
  church: {
    id: string;
    name: string;
  };
  batches: BatchWithDetails[];
  // Computed totals
  totalDelegates: number;
  totalCooks: number;
  totalApprovedDelegates: number;
  totalApprovedCooks: number;
  totalFee: number;
  hasPendingBatch: boolean;
};

export type MyRegistration = {
  id: string;
  createdAt: Date;
  event: {
    id: string;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    status: EventStatus;
  };
  // Computed from batches
  totalDelegates: number;
  totalCooks: number;
  totalApprovedDelegates: number;
  totalApprovedCooks: number;
  totalFee: number;
  hasPendingBatch: boolean;
  latestBatchStatus: RegistrationStatus | null;
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

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

function calculateCurrentFee(event: {
  preRegistrationStart: Date;
  preRegistrationEnd: Date;
  preRegistrationFee: number;
  preRegistrationSiblingDiscount: number;
  onsiteRegistrationFee: number;
  onsiteSiblingDiscount: number;
}): {
  fee: number;
  siblingFee: number;
  type: "pre-registration" | "onsite";
  isPreRegistration: boolean;
} {
  const now = new Date();
  const isPreRegistration =
    now >= new Date(event.preRegistrationStart) &&
    now <= new Date(event.preRegistrationEnd);

  return {
    fee: isPreRegistration ? event.preRegistrationFee : event.onsiteRegistrationFee,
    siblingFee: isPreRegistration
      ? event.preRegistrationSiblingDiscount
      : event.onsiteSiblingDiscount,
    type: isPreRegistration ? "pre-registration" : "onsite",
    isPreRegistration,
  };
}

function calculateDelegateFees(
  delegates: { isSibling?: boolean }[],
  regularFee: number,
  siblingFee: number
): number {
  // Count siblings
  const siblingCount = delegates.filter((d) => d.isSibling).length;
  const siblingDiscountApplies = siblingCount >= 3 && siblingFee > 0;

  if (siblingDiscountApplies) {
    const regularCount = delegates.length - siblingCount;
    return regularCount * regularFee + siblingCount * siblingFee;
  }

  // No sibling discount - all pay regular fee
  return delegates.length * regularFee;
}

// ==========================================
// PRESIDENT QUERIES
// ==========================================

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
        startDate: { gt: now },
      },
      include: {
        registrations: {
          where: { churchId },
          include: {
            batches: {
              select: {
                status: true,
                _count: { select: { delegates: true, cooks: true } },
              },
            },
          },
        },
      },
      orderBy: { startDate: "asc" },
    });

    const result: AvailableEvent[] = events.map((event) => {
      const registration = event.registrations[0] || null;

      // Calculate totals from approved batches
      let totalApprovedDelegates = 0;
      let totalApprovedCooks = 0;
      let hasPendingBatch = false;
      let hasApprovedBatch = false;
      let hasRejectedBatch = false;

      if (registration) {
        for (const batch of registration.batches) {
          if (batch.status === "APPROVED") {
            totalApprovedDelegates += batch._count.delegates;
            totalApprovedCooks += batch._count.cooks;
            hasApprovedBatch = true;
          } else if (batch.status === "PENDING") {
            hasPendingBatch = true;
          } else if (batch.status === "REJECTED") {
            hasRejectedBatch = true;
          }
        }
      }

      // Compute registration status
      let registrationStatus: RegistrationStatus | null = null;
      if (registration) {
        if (hasPendingBatch) {
          registrationStatus = "PENDING";
        } else if (hasApprovedBatch) {
          registrationStatus = "APPROVED";
        } else if (hasRejectedBatch) {
          registrationStatus = "REJECTED";
        }
      }

      return {
        id: event.id,
        name: event.name,
        description: event.description,
        location: event.location,
        banner: event.banner,
        startDate: event.startDate,
        endDate: event.endDate,
        preRegistrationFee: event.preRegistrationFee,
        preRegistrationSiblingDiscount: event.preRegistrationSiblingDiscount,
        preRegistrationStart: event.preRegistrationStart,
        preRegistrationEnd: event.preRegistrationEnd,
        onsiteRegistrationFee: event.onsiteRegistrationFee,
        onsiteSiblingDiscount: event.onsiteSiblingDiscount,
        cookRegistrationFee: event.cookRegistrationFee,
        status: event.status,
        hasRegistration: !!registration,
        registrationId: registration?.id ?? null,
        totalApprovedDelegates,
        totalApprovedCooks,
        hasPendingBatch,
        hasApprovedBatch,
        registrationStatus,
      };
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch available events:", error);
    return { success: false, error: "Failed to fetch available events" };
  }
}

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
          include: {
            batches: {
              select: {
                status: true,
                _count: { select: { delegates: true, cooks: true } },
              },
            },
          },
        },
      },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    const now = new Date();
    if (!["UPCOMING", "ONGOING"].includes(event.status)) {
      return { success: false, error: "This event is not open for registration" };
    }

    if (now >= new Date(event.startDate)) {
      return { success: false, error: "Event has already started" };
    }

    const registration = event.registrations[0] || null;
    const feeInfo = calculateCurrentFee(event);

    // Calculate totals from approved batches
    let totalApprovedDelegates = 0;
    let totalApprovedCooks = 0;
    let hasPendingBatch = false;
    let hasApprovedBatch = false;
    let hasRejectedBatch = false;

    if (registration) {
      for (const batch of registration.batches) {
        if (batch.status === "APPROVED") {
          totalApprovedDelegates += batch._count.delegates;
          totalApprovedCooks += batch._count.cooks;
          hasApprovedBatch = true;
        } else if (batch.status === "PENDING") {
          hasPendingBatch = true;
        } else if (batch.status === "REJECTED") {
          hasRejectedBatch = true;
        }
      }
    }

    // Compute registration status: pending > approved > rejected
    let registrationStatus: RegistrationStatus | null = null;
    if (registration) {
      if (hasPendingBatch) {
        registrationStatus = "PENDING";
      } else if (hasApprovedBatch) {
        registrationStatus = "APPROVED";
      } else if (hasRejectedBatch) {
        registrationStatus = "REJECTED";
      }
    }

    return {
      success: true,
      data: {
        id: event.id,
        name: event.name,
        description: event.description,
        location: event.location,
        banner: event.banner,
        startDate: event.startDate,
        endDate: event.endDate,
        preRegistrationFee: event.preRegistrationFee,
        preRegistrationSiblingDiscount: event.preRegistrationSiblingDiscount,
        preRegistrationStart: event.preRegistrationStart,
        preRegistrationEnd: event.preRegistrationEnd,
        onsiteRegistrationFee: event.onsiteRegistrationFee,
        onsiteSiblingDiscount: event.onsiteSiblingDiscount,
        cookRegistrationFee: event.cookRegistrationFee,
        status: event.status,
        hasRegistration: !!registration,
        registrationId: registration?.id ?? null,
        totalApprovedDelegates,
        totalApprovedCooks,
        hasPendingBatch,
        hasApprovedBatch,
        registrationStatus,
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
        createdAt: true,
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
        batches: {
          select: {
            status: true,
            totalFee: true,
            createdAt: true,
            _count: { select: { delegates: true, cooks: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const result: MyRegistration[] = registrations.map((reg) => {
      let totalDelegates = 0;
      let totalCooks = 0;
      let totalApprovedDelegates = 0;
      let totalApprovedCooks = 0;
      let totalFee = 0;
      let hasPendingBatch = false;

      for (const batch of reg.batches) {
        totalDelegates += batch._count.delegates;
        totalCooks += batch._count.cooks;
        totalFee += batch.totalFee;

        if (batch.status === "APPROVED") {
          totalApprovedDelegates += batch._count.delegates;
          totalApprovedCooks += batch._count.cooks;
        } else if (batch.status === "PENDING") {
          hasPendingBatch = true;
        }
      }

      const latestBatchStatus = reg.batches[0]?.status ?? null;

      return {
        id: reg.id,
        createdAt: reg.createdAt,
        event: reg.event,
        totalDelegates,
        totalCooks,
        totalApprovedDelegates,
        totalApprovedCooks,
        totalFee,
        hasPendingBatch,
        latestBatchStatus,
      };
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return { success: false, error: "Failed to fetch registrations" };
  }
}

export async function getMyRegistrationById(
  id: string
): Promise<ActionResponse<RegistrationWithBatches>> {
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
        createdAt: true,
        updatedAt: true,
        event: {
          select: {
            id: true,
            name: true,
            location: true,
            startDate: true,
            endDate: true,
            preRegistrationFee: true,
            onsiteRegistrationFee: true,
            cookRegistrationFee: true,
            status: true,
          },
        },
        church: {
          select: { id: true, name: true },
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
          orderBy: { batchNumber: "asc" },
        },
      },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    // Calculate totals
    let totalDelegates = 0;
    let totalCooks = 0;
    let totalApprovedDelegates = 0;
    let totalApprovedCooks = 0;
    let totalFee = 0;
    let hasPendingBatch = false;

    for (const batch of registration.batches) {
      totalDelegates += batch._count.delegates;
      totalCooks += batch._count.cooks;
      totalFee += batch.totalFee;

      if (batch.status === "APPROVED") {
        totalApprovedDelegates += batch._count.delegates;
        totalApprovedCooks += batch._count.cooks;
      } else if (batch.status === "PENDING") {
        hasPendingBatch = true;
      }
    }

    return {
      success: true,
      data: {
        ...registration,
        totalDelegates,
        totalCooks,
        totalApprovedDelegates,
        totalApprovedCooks,
        totalFee,
        hasPendingBatch,
      },
    };
  } catch (error) {
    console.error("Failed to fetch registration:", error);
    return { success: false, error: "Failed to fetch registration details" };
  }
}

// Get a single batch by ID
export async function getBatchById(
  batchId: string
): Promise<ActionResponse<BatchWithDetails & { registration: { id: string; eventId: string } }>> {
  await requireRole("PRESIDENT");

  try {
    const churchId = await getPresidentChurchId();
    if (!churchId) {
      return { success: false, error: "You must be assigned to a church" };
    }

    const batch = await prisma.registrationBatch.findFirst({
      where: {
        id: batchId,
        registration: { churchId },
      },
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
          select: { id: true, eventId: true },
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

    if (!batch) {
      return { success: false, error: "Batch not found" };
    }

    return { success: true, data: batch };
  } catch (error) {
    console.error("Failed to fetch batch:", error);
    return { success: false, error: "Failed to fetch batch details" };
  }
}

// ==========================================
// PRESIDENT MUTATIONS
// ==========================================

/**
 * Create a new registration with the first batch
 * Used when president registers for an event for the first time
 */
export async function createRegistration(
  input: CreateRegistrationInput
): Promise<ActionResponse<{ id: string; batchId: string }>> {
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

    if (now >= new Date(event.startDate)) {
      return { success: false, error: "Event has already started" };
    }

    // Check if registration already exists
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
        error: "Your church is already registered for this event. Use 'Add More' to add another batch.",
      };
    }

    // Calculate fees with sibling discount
    const feeInfo = calculateCurrentFee(event);
    const totalDelegateFees = calculateDelegateFees(
      validated.data.delegates,
      feeInfo.fee,
      feeInfo.siblingFee
    );
    const cookCount = validated.data.cooks.length;
    const totalCookFees = cookCount * event.cookRegistrationFee;
    const totalFee = totalDelegateFees + totalCookFees;

    // Create registration with first batch
    const registration = await prisma.registration.create({
      data: {
        eventId: validated.data.eventId,
        churchId,
        presidentId: session.user.id,
        batches: {
          create: {
            batchNumber: 1,
            status: "PENDING",
            receiptImage: validated.data.receiptImage || null,
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
                isSibling: delegate.isSibling ?? false,
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
        },
      },
      select: {
        id: true,
        batches: { select: { id: true } },
      },
    });

    revalidatePath("/president/registrations");
    revalidatePath("/president/events");
    return {
      success: true,
      data: { id: registration.id, batchId: registration.batches[0].id },
    };
  } catch (error) {
    console.error("Failed to create registration:", error);
    return { success: false, error: "Failed to create registration" };
  }
}

/**
 * Add a new batch to an existing registration
 * Used when president wants to add more delegates/cooks
 */
export async function createBatch(
  input: CreateBatchInput
): Promise<ActionResponse<{ id: string; batchNumber: number }>> {
  await requireRole("PRESIDENT");

  const validated = createBatchSchema.safeParse(input);
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

    // Verify registration exists and belongs to this church
    const registration = await prisma.registration.findFirst({
      where: { id: validated.data.registrationId, churchId },
      include: {
        event: true,
        batches: {
          orderBy: { batchNumber: "desc" },
          take: 1,
        },
      },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    // Check if event is still open
    const now = new Date();
    if (!["UPCOMING", "ONGOING"].includes(registration.event.status)) {
      return { success: false, error: "This event is not open for registration" };
    }

    if (now >= new Date(registration.event.startDate)) {
      return { success: false, error: "Event has already started" };
    }

    // Calculate fees with sibling discount
    const feeInfo = calculateCurrentFee(registration.event);
    const totalDelegateFees = calculateDelegateFees(
      validated.data.delegates,
      feeInfo.fee,
      feeInfo.siblingFee
    );
    const cookCount = validated.data.cooks.length;
    const totalCookFees = cookCount * registration.event.cookRegistrationFee;
    const totalFee = totalDelegateFees + totalCookFees;

    // Get next batch number
    const lastBatchNumber = registration.batches[0]?.batchNumber ?? 0;
    const nextBatchNumber = lastBatchNumber + 1;

    // Create new batch
    const batch = await prisma.registrationBatch.create({
      data: {
        registrationId: registration.id,
        batchNumber: nextBatchNumber,
        status: "PENDING",
        receiptImage: validated.data.receiptImage || null,
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
            isSibling: delegate.isSibling ?? false,
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
      select: { id: true, batchNumber: true },
    });

    revalidatePath("/president/registrations");
    revalidatePath(`/president/registrations/${registration.id}`);
    return { success: true, data: batch };
  } catch (error) {
    console.error("Failed to create batch:", error);
    return { success: false, error: "Failed to add batch" };
  }
}

/**
 * Update a pending batch
 * Only PENDING batches can be edited
 */
export async function updateBatch(
  batchId: string,
  input: UpdateBatchInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("PRESIDENT");

  const validated = updateBatchSchema.safeParse(input);
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

    // Verify batch exists and belongs to this church
    const batch = await prisma.registrationBatch.findFirst({
      where: {
        id: batchId,
        registration: { churchId },
      },
      include: {
        registration: {
          include: { event: true },
        },
      },
    });

    if (!batch) {
      return { success: false, error: "Batch not found" };
    }

    if (batch.status !== "PENDING") {
      return {
        success: false,
        error: "Only pending batches can be edited",
      };
    }

    // Check if event is still open
    const now = new Date();
    if (!["UPCOMING", "ONGOING"].includes(batch.registration.event.status)) {
      return { success: false, error: "This event is not open for registration" };
    }

    if (now >= new Date(batch.registration.event.startDate)) {
      return { success: false, error: "Event has already started" };
    }

    // Recalculate fees with sibling discount
    const feeInfo = calculateCurrentFee(batch.registration.event);
    const totalDelegateFees = calculateDelegateFees(
      validated.data.delegates,
      feeInfo.fee,
      feeInfo.siblingFee
    );
    const cookCount = validated.data.cooks.length;
    const totalCookFees = cookCount * batch.registration.event.cookRegistrationFee;
    const totalFee = totalDelegateFees + totalCookFees;

    // Update batch: delete existing delegates/cooks and create new ones
    await prisma.$transaction([
      prisma.delegate.deleteMany({ where: { batchId } }),
      prisma.cook.deleteMany({ where: { batchId } }),
      prisma.registrationBatch.update({
        where: { id: batchId },
        data: {
          receiptImage: validated.data.receiptImage || null,
          totalFee,
          delegateFeePerPerson: feeInfo.fee,
          cookFeePerPerson: batch.registration.event.cookRegistrationFee,
          isPreRegistration: feeInfo.isPreRegistration,
          delegates: {
            create: validated.data.delegates.map((delegate) => ({
              fullName: delegate.fullName,
              nickname: delegate.nickname || null,
              age: delegate.age,
              gender: delegate.gender,
              isSibling: delegate.isSibling ?? false,
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
    revalidatePath(`/president/registrations/${batch.registration.id}`);
    revalidatePath("/admin/registrations");
    return { success: true, data: { id: batchId } };
  } catch (error) {
    console.error("Failed to update batch:", error);
    return { success: false, error: "Failed to update batch" };
  }
}

/**
 * Cancel a pending batch
 * Only PENDING batches can be cancelled
 */
export async function cancelBatch(batchId: string): Promise<ActionResponse<void>> {
  await requireRole("PRESIDENT");

  try {
    const churchId = await getPresidentChurchId();
    if (!churchId) {
      return { success: false, error: "You must be assigned to a church" };
    }

    const batch = await prisma.registrationBatch.findFirst({
      where: {
        id: batchId,
        registration: { churchId },
      },
      include: {
        registration: {
          include: {
            batches: { select: { id: true } },
          },
        },
      },
    });

    if (!batch) {
      return { success: false, error: "Batch not found" };
    }

    if (batch.status !== "PENDING") {
      return {
        success: false,
        error: "Only pending batches can be cancelled",
      };
    }

    const registrationId = batch.registration.id;
    const isLastBatch = batch.registration.batches.length === 1;

    if (isLastBatch) {
      // If this is the only batch, delete the entire registration
      await prisma.registration.delete({ where: { id: registrationId } });
    } else {
      // Delete just the batch
      await prisma.registrationBatch.delete({ where: { id: batchId } });
    }

    revalidatePath("/president/registrations");
    revalidatePath("/president/events");
    if (!isLastBatch) {
      revalidatePath(`/president/registrations/${registrationId}`);
    }
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to cancel batch:", error);
    return { success: false, error: "Failed to cancel batch" };
  }
}

// Legacy function - kept for backwards compatibility
export async function cancelRegistration(id: string): Promise<ActionResponse<void>> {
  await requireRole("PRESIDENT");

  try {
    const churchId = await getPresidentChurchId();
    if (!churchId) {
      return { success: false, error: "You must be assigned to a church" };
    }

    const registration = await prisma.registration.findFirst({
      where: { id, churchId },
      include: {
        batches: {
          where: { status: { not: "PENDING" } },
          select: { id: true },
        },
      },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    // Can only cancel if all batches are pending
    if (registration.batches.length > 0) {
      return {
        success: false,
        error: "Cannot cancel registration with approved or rejected batches",
      };
    }

    await prisma.registration.delete({ where: { id } });

    revalidatePath("/president/registrations");
    revalidatePath("/president/events");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to cancel registration:", error);
    return { success: false, error: "Failed to cancel registration" };
  }
}

// Legacy function wrapper - maps old interface to new
export async function updateRegistration(
  id: string,
  input: { delegates: CreateRegistrationInput["delegates"]; cooks: CreateRegistrationInput["cooks"]; receiptImage: string }
): Promise<ActionResponse<{ id: string; statusReset: boolean }>> {
  // This function is kept for backwards compatibility
  // It will update the first pending batch of a registration
  await requireRole("PRESIDENT");

  try {
    const churchId = await getPresidentChurchId();
    if (!churchId) {
      return { success: false, error: "You must be assigned to a church" };
    }

    const registration = await prisma.registration.findFirst({
      where: { id, churchId },
      include: {
        batches: {
          where: { status: "PENDING" },
          orderBy: { batchNumber: "desc" },
          take: 1,
        },
      },
    });

    if (!registration) {
      return { success: false, error: "Registration not found" };
    }

    const pendingBatch = registration.batches[0];
    if (!pendingBatch) {
      return { success: false, error: "No pending batch to update" };
    }

    const result = await updateBatch(pendingBatch.id, {
      delegates: input.delegates,
      cooks: input.cooks,
      receiptImage: input.receiptImage,
    });

    if (!result.success) {
      return result as ActionResponse<{ id: string; statusReset: boolean }>;
    }

    return { success: true, data: { id, statusReset: false } };
  } catch (error) {
    console.error("Failed to update registration:", error);
    return { success: false, error: "Failed to update registration" };
  }
}
