"use server";

import prisma from "@/lib/db";
import { requireRole, getServerSession } from "@/lib/auth-server";
import type { ActionResponse } from "@/types/api";
import type { RegistrationStatus, EventStatus } from "@/lib/generated/prisma";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export type PresidentDashboardData = {
  church: {
    id: string;
    name: string;
    division: {
      id: string;
      name: string;
    };
    pastor: {
      id: string;
      name: string;
    } | null;
  } | null;
  stats: {
    activeEvents: number;
    totalDelegates: number;
    pendingBatches: number;
    approvedBatches: number;
  };
  recentRegistrations: {
    id: string;
    createdAt: Date;
    event: {
      id: string;
      name: string;
    };
    totalDelegates: number;
    totalCooks: number;
    hasPendingBatch: boolean;
    latestBatchStatus: RegistrationStatus | null;
  }[];
  upcomingEvents: {
    id: string;
    name: string;
    location: string;
    startDate: Date;
    hasRegistration: boolean;
    hasPendingBatch: boolean;
    hasApprovedBatch: boolean;
  }[];
};

export type AdminDashboardData = {
  stats: {
    totalDivisions: number;
    totalChurches: number;
    totalPresidents: number;
    activeEvents: number;
    totalRegistrations: number;
    pendingBatches: number;
    approvedBatches: number;
    rejectedBatches: number;
    totalDelegates: number;
    totalCooks: number;
  };
  recentBatches: {
    id: string;
    batchNumber: number;
    status: RegistrationStatus;
    createdAt: Date;
    church: {
      id: string;
      name: string;
    };
    event: {
      id: string;
      name: string;
    };
    delegateCount: number;
    cookCount: number;
  }[];
  eventsSummary: {
    id: string;
    name: string;
    startDate: Date;
    status: EventStatus;
    registrationCount: number;
  }[];
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

// ==========================================
// PRESIDENT DASHBOARD
// ==========================================

export async function getPresidentDashboard(): Promise<
  ActionResponse<PresidentDashboardData>
> {
  await requireRole("PRESIDENT");

  try {
    const churchId = await getPresidentChurchId();

    // Get church info with division and pastor
    const church = churchId
      ? await prisma.church.findUnique({
          where: { id: churchId },
          select: {
            id: true,
            name: true,
            division: {
              select: { id: true, name: true },
            },
            pastor: {
              select: { id: true, name: true },
            },
          },
        })
      : null;

    // Get stats
    const now = new Date();
    const [
      activeEventsCount,
      delegatesCount,
      pendingBatchesCount,
      approvedBatchesCount,
    ] = await Promise.all([
      // Active events (UPCOMING or ONGOING with registration still open)
      prisma.event.count({
        where: {
          status: { in: ["UPCOMING", "ONGOING"] },
          startDate: { gt: now },
        },
      }),
      // Total delegates across all batches for this church
      churchId
        ? prisma.delegate.count({
            where: { batch: { registration: { churchId } } },
          })
        : 0,
      // Pending batches for this church
      churchId
        ? prisma.registrationBatch.count({
            where: { registration: { churchId }, status: "PENDING" },
          })
        : 0,
      // Approved batches for this church
      churchId
        ? prisma.registrationBatch.count({
            where: { registration: { churchId }, status: "APPROVED" },
          })
        : 0,
    ]);

    // Get recent registrations with batch info
    const recentRegistrations = churchId
      ? await prisma.registration.findMany({
          where: { churchId },
          select: {
            id: true,
            createdAt: true,
            event: {
              select: { id: true, name: true },
            },
            batches: {
              select: {
                status: true,
                createdAt: true,
                _count: { select: { delegates: true, cooks: true } },
              },
              orderBy: { createdAt: "desc" },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        })
      : [];

    // Transform registrations to include computed fields
    const formattedRecentRegistrations = recentRegistrations.map((reg) => {
      let totalDelegates = 0;
      let totalCooks = 0;
      let hasPendingBatch = false;

      for (const batch of reg.batches) {
        totalDelegates += batch._count.delegates;
        totalCooks += batch._count.cooks;
        if (batch.status === "PENDING") {
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
        hasPendingBatch,
        latestBatchStatus,
      };
    });

    // Get upcoming events with registration status
    const upcomingEvents = await prisma.event.findMany({
      where: {
        status: { in: ["UPCOMING", "ONGOING"] },
        startDate: { gt: now },
      },
      select: {
        id: true,
        name: true,
        location: true,
        startDate: true,
        registrations: churchId
          ? {
              where: { churchId },
              select: {
                batches: {
                  select: { status: true },
                },
              },
            }
          : false,
      },
      orderBy: { startDate: "asc" },
      take: 5,
    });

    const formattedUpcomingEvents = upcomingEvents.map((event) => {
      const registrations = (event as unknown as { registrations?: { batches: { status: string }[] }[] }).registrations;
      const registration = churchId && registrations ? registrations[0] : null;
      let hasPendingBatch = false;
      let hasApprovedBatch = false;

      if (registration) {
        for (const batch of registration.batches) {
          if (batch.status === "PENDING") hasPendingBatch = true;
          if (batch.status === "APPROVED") hasApprovedBatch = true;
        }
      }

      return {
        id: event.id,
        name: event.name,
        location: event.location,
        startDate: event.startDate,
        hasRegistration: !!registration,
        hasPendingBatch,
        hasApprovedBatch,
      };
    });

    return {
      success: true,
      data: {
        church,
        stats: {
          activeEvents: activeEventsCount,
          totalDelegates: delegatesCount,
          pendingBatches: pendingBatchesCount,
          approvedBatches: approvedBatchesCount,
        },
        recentRegistrations: formattedRecentRegistrations,
        upcomingEvents: formattedUpcomingEvents,
      },
    };
  } catch (error) {
    console.error("Failed to fetch president dashboard:", error);
    return { success: false, error: "Failed to fetch dashboard data" };
  }
}

// ==========================================
// ADMIN DASHBOARD
// ==========================================

export async function getAdminDashboard(): Promise<
  ActionResponse<AdminDashboardData>
> {
  await requireRole("ADMIN");

  try {
    // Get all stats in parallel
    const [
      divisionsCount,
      churchesCount,
      presidentsCount,
      activeEventsCount,
      totalRegistrations,
      pendingBatches,
      approvedBatches,
      rejectedBatches,
      totalDelegates,
      totalCooks,
    ] = await Promise.all([
      prisma.division.count(),
      prisma.church.count(),
      prisma.user.count({ where: { role: "PRESIDENT" } }),
      prisma.event.count({
        where: { status: { in: ["UPCOMING", "ONGOING"] } },
      }),
      prisma.registration.count(),
      prisma.registrationBatch.count({ where: { status: "PENDING" } }),
      prisma.registrationBatch.count({ where: { status: "APPROVED" } }),
      prisma.registrationBatch.count({ where: { status: "REJECTED" } }),
      prisma.delegate.count(),
      prisma.cook.count(),
    ]);

    // Get recent batches (for approval queue visibility)
    const recentBatches = await prisma.registrationBatch.findMany({
      select: {
        id: true,
        batchNumber: true,
        status: true,
        createdAt: true,
        registration: {
          select: {
            church: {
              select: { id: true, name: true },
            },
            event: {
              select: { id: true, name: true },
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
      take: 10,
    });

    const formattedRecentBatches = recentBatches.map((batch) => ({
      id: batch.id,
      batchNumber: batch.batchNumber,
      status: batch.status,
      createdAt: batch.createdAt,
      church: batch.registration.church,
      event: batch.registration.event,
      delegateCount: batch._count.delegates,
      cookCount: batch._count.cooks,
    }));

    // Get events summary
    const eventsSummary = await prisma.event.findMany({
      select: {
        id: true,
        name: true,
        startDate: true,
        status: true,
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: { startDate: "desc" },
      take: 5,
    });

    const formattedEventsSummary = eventsSummary.map((event) => ({
      id: event.id,
      name: event.name,
      startDate: event.startDate,
      status: event.status,
      registrationCount: event._count.registrations,
    }));

    return {
      success: true,
      data: {
        stats: {
          totalDivisions: divisionsCount,
          totalChurches: churchesCount,
          totalPresidents: presidentsCount,
          activeEvents: activeEventsCount,
          totalRegistrations,
          pendingBatches,
          approvedBatches,
          rejectedBatches,
          totalDelegates,
          totalCooks,
        },
        recentBatches: formattedRecentBatches,
        eventsSummary: formattedEventsSummary,
      },
    };
  } catch (error) {
    console.error("Failed to fetch admin dashboard:", error);
    return { success: false, error: "Failed to fetch dashboard data" };
  }
}

// ==========================================
// EXPORT TYPES
// ==========================================

export type ExportFilters = {
  eventId?: string;
  status?: RegistrationStatus;
  divisionId?: string;
  dateFrom?: Date;
  dateTo?: Date;
};

export type ExportRow = {
  // Batch info
  batchId: string;
  batchNumber: number;
  batchStatus: string;
  batchCreatedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  rejectionRemarks: string | null;
  // Fee info
  totalFee: number;
  delegateFeePerPerson: number;
  cookFeePerPerson: number;
  isPreRegistration: boolean;
  // Event info
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  eventLocation: string;
  // Church info
  churchName: string;
  divisionName: string;
  // Person info (delegate or cook)
  personType: "Delegate" | "Cook";
  personFullName: string;
  personNickname: string | null;
  personGender: string;
  personAge: number;
  // Batch counts
  delegateCount: number;
  cookCount: number;
};

export type ExportData = {
  rows: ExportRow[];
  summary: {
    totalBatches: number;
    totalDelegates: number;
    totalCooks: number;
    totalFees: number;
    byStatus: Record<string, number>;
    byDivision: Record<string, number>;
  };
  generatedAt: Date;
  filters: ExportFilters;
};

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

/**
 * Get registration data for export
 * Returns detailed data including delegates and cooks from batches
 */
export async function exportRegistrations(
  filters: ExportFilters
): Promise<ActionResponse<ExportData>> {
  await requireRole("ADMIN");

  try {
    // Build where clause based on filters
    const where: {
      registration?: {
        eventId?: string;
        church?: { divisionId?: string };
      };
      status?: RegistrationStatus;
      createdAt?: { gte?: Date; lte?: Date };
    } = {};

    if (filters.eventId) {
      where.registration = { ...where.registration, eventId: filters.eventId };
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.divisionId) {
      where.registration = {
        ...where.registration,
        church: { divisionId: filters.divisionId },
      };
    }

    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) {
        where.createdAt.gte = filters.dateFrom;
      }
      if (filters.dateTo) {
        where.createdAt.lte = filters.dateTo;
      }
    }

    // Fetch batches with all related data
    const batches = await prisma.registrationBatch.findMany({
      where,
      select: {
        id: true,
        batchNumber: true,
        status: true,
        remarks: true,
        createdAt: true,
        reviewedAt: true,
        reviewedBy: true,
        totalFee: true,
        delegateFeePerPerson: true,
        cookFeePerPerson: true,
        isPreRegistration: true,
        registration: {
          select: {
            event: {
              select: {
                name: true,
                startDate: true,
                endDate: true,
                location: true,
              },
            },
            church: {
              select: {
                name: true,
                division: {
                  select: { name: true },
                },
              },
            },
          },
        },
        delegates: {
          select: {
            fullName: true,
            nickname: true,
            gender: true,
            age: true,
          },
        },
        cooks: {
          select: {
            fullName: true,
            nickname: true,
            gender: true,
            age: true,
          },
        },
      },
      orderBy: [
        { registration: { church: { division: { name: "asc" } } } },
        { registration: { church: { name: "asc" } } },
        { createdAt: "desc" },
      ],
    });

    // Get reviewer names for batches that have reviewedBy
    const reviewerIds = batches
      .map((b) => b.reviewedBy)
      .filter((id): id is string => id !== null);
    const reviewers = reviewerIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: reviewerIds } },
          select: { id: true, name: true },
        })
      : [];
    const reviewerMap = new Map(reviewers.map((r) => [r.id, r.name]));

    // Transform to flat rows (one row per person)
    const rows: ExportRow[] = [];
    const byStatus: Record<string, number> = {};
    const byDivision: Record<string, number> = {};
    let totalFees = 0;
    let totalDelegates = 0;
    let totalCooks = 0;

    for (const batch of batches) {
      const baseRow = {
        batchId: batch.id,
        batchNumber: batch.batchNumber,
        batchStatus: batch.status,
        batchCreatedAt: batch.createdAt.toISOString(),
        reviewedAt: batch.reviewedAt?.toISOString() || null,
        reviewedBy: batch.reviewedBy ? reviewerMap.get(batch.reviewedBy) || null : null,
        rejectionRemarks: batch.remarks,
        totalFee: batch.totalFee,
        delegateFeePerPerson: batch.delegateFeePerPerson,
        cookFeePerPerson: batch.cookFeePerPerson,
        isPreRegistration: batch.isPreRegistration,
        eventName: batch.registration.event.name,
        eventStartDate: batch.registration.event.startDate.toISOString(),
        eventEndDate: batch.registration.event.endDate.toISOString(),
        eventLocation: batch.registration.event.location,
        churchName: batch.registration.church.name,
        divisionName: batch.registration.church.division.name,
        delegateCount: batch.delegates.length,
        cookCount: batch.cooks.length,
      };

      // Track summary stats
      byStatus[batch.status] = (byStatus[batch.status] || 0) + 1;
      byDivision[batch.registration.church.division.name] =
        (byDivision[batch.registration.church.division.name] || 0) + 1;
      totalFees += batch.totalFee;
      totalDelegates += batch.delegates.length;
      totalCooks += batch.cooks.length;

      // Add delegate rows
      for (const delegate of batch.delegates) {
        rows.push({
          ...baseRow,
          personType: "Delegate",
          personFullName: delegate.fullName,
          personNickname: delegate.nickname,
          personGender: delegate.gender,
          personAge: delegate.age,
        });
      }

      // Add cook rows
      for (const cook of batch.cooks) {
        rows.push({
          ...baseRow,
          personType: "Cook",
          personFullName: cook.fullName,
          personNickname: cook.nickname,
          personGender: cook.gender,
          personAge: cook.age,
        });
      }
    }

    return {
      success: true,
      data: {
        rows,
        summary: {
          totalBatches: batches.length,
          totalDelegates,
          totalCooks,
          totalFees,
          byStatus,
          byDivision,
        },
        generatedAt: new Date(),
        filters,
      },
    };
  } catch (error) {
    console.error("Failed to export registrations:", error);
    return { success: false, error: "Failed to export registrations" };
  }
}

/**
 * Get list of events for export filter dropdown
 */
export async function getEventsForExport(): Promise<
  ActionResponse<{ id: string; name: string; startDate: Date }[]>
> {
  await requireRole("ADMIN");

  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        name: true,
        startDate: true,
      },
      orderBy: { startDate: "desc" },
    });

    return { success: true, data: events };
  } catch (error) {
    console.error("Failed to fetch events for export:", error);
    return { success: false, error: "Failed to fetch events" };
  }
}

/**
 * Get list of divisions for export filter dropdown
 */
export async function getDivisionsForExport(): Promise<
  ActionResponse<{ id: string; name: string }[]>
> {
  await requireRole("ADMIN");

  try {
    const divisions = await prisma.division.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: "asc" },
    });

    return { success: true, data: divisions };
  } catch (error) {
    console.error("Failed to fetch divisions for export:", error);
    return { success: false, error: "Failed to fetch divisions" };
  }
}
