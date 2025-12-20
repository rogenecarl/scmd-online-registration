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
    pendingRegistrations: number;
    approvedRegistrations: number;
  };
  recentRegistrations: {
    id: string;
    status: RegistrationStatus;
    createdAt: Date;
    event: {
      id: string;
      name: string;
    };
    _count: {
      delegates: number;
      cooks: number;
    };
  }[];
  upcomingEvents: {
    id: string;
    name: string;
    location: string;
    startDate: Date;
    registrationDeadline: Date;
    hasRegistration: boolean;
    registrationStatus: RegistrationStatus | null;
  }[];
};

export type AdminDashboardData = {
  stats: {
    totalDivisions: number;
    totalChurches: number;
    totalPresidents: number;
    activeEvents: number;
    totalRegistrations: number;
    pendingRegistrations: number;
    approvedRegistrations: number;
    rejectedRegistrations: number;
    totalDelegates: number;
    totalCooks: number;
  };
  recentRegistrations: {
    id: string;
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
    _count: {
      delegates: number;
      cooks: number;
    };
  }[];
  eventsSummary: {
    id: string;
    name: string;
    startDate: Date;
    status: EventStatus;
    _count: {
      registrations: number;
    };
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
      pendingCount,
      approvedCount,
    ] = await Promise.all([
      // Active events (UPCOMING or ONGOING with registration still open)
      prisma.event.count({
        where: {
          status: { in: ["UPCOMING", "ONGOING"] },
          registrationDeadline: { gte: now },
        },
      }),
      // Total delegates across all registrations for this church
      churchId
        ? prisma.delegate.count({
            where: { registration: { churchId } },
          })
        : 0,
      // Pending registrations for this church
      churchId
        ? prisma.registration.count({
            where: { churchId, status: "PENDING" },
          })
        : 0,
      // Approved registrations for this church
      churchId
        ? prisma.registration.count({
            where: { churchId, status: "APPROVED" },
          })
        : 0,
    ]);

    // Get recent registrations
    const recentRegistrations = churchId
      ? await prisma.registration.findMany({
          where: { churchId },
          select: {
            id: true,
            status: true,
            createdAt: true,
            event: {
              select: { id: true, name: true },
            },
            _count: {
              select: { delegates: true, cooks: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        })
      : [];

    // Get upcoming events with registration status
    const upcomingEvents = await prisma.event.findMany({
      where: {
        status: { in: ["UPCOMING", "ONGOING"] },
        registrationDeadline: { gte: now },
      },
      select: {
        id: true,
        name: true,
        location: true,
        startDate: true,
        registrationDeadline: true,
        registrations: churchId
          ? {
              where: { churchId },
              select: { status: true },
            }
          : false,
      },
      orderBy: { startDate: "asc" },
      take: 5,
    });

    const formattedUpcomingEvents = upcomingEvents.map((event) => ({
      id: event.id,
      name: event.name,
      location: event.location,
      startDate: event.startDate,
      registrationDeadline: event.registrationDeadline,
      hasRegistration: churchId && event.registrations ? event.registrations.length > 0 : false,
      registrationStatus:
        churchId && event.registrations && event.registrations.length > 0
          ? event.registrations[0].status
          : null,
    }));

    return {
      success: true,
      data: {
        church,
        stats: {
          activeEvents: activeEventsCount,
          totalDelegates: delegatesCount,
          pendingRegistrations: pendingCount,
          approvedRegistrations: approvedCount,
        },
        recentRegistrations,
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
      pendingRegistrations,
      approvedRegistrations,
      rejectedRegistrations,
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
      prisma.registration.count({ where: { status: "PENDING" } }),
      prisma.registration.count({ where: { status: "APPROVED" } }),
      prisma.registration.count({ where: { status: "REJECTED" } }),
      prisma.delegate.count(),
      prisma.cook.count(),
    ]);

    // Get recent registrations
    const recentRegistrations = await prisma.registration.findMany({
      select: {
        id: true,
        status: true,
        createdAt: true,
        church: {
          select: { id: true, name: true },
        },
        event: {
          select: { id: true, name: true },
        },
        _count: {
          select: { delegates: true, cooks: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

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

    return {
      success: true,
      data: {
        stats: {
          totalDivisions: divisionsCount,
          totalChurches: churchesCount,
          totalPresidents: presidentsCount,
          activeEvents: activeEventsCount,
          totalRegistrations,
          pendingRegistrations,
          approvedRegistrations,
          rejectedRegistrations,
          totalDelegates,
          totalCooks,
        },
        recentRegistrations,
        eventsSummary,
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
  // Registration info
  registrationId: string;
  registrationStatus: string;
  registrationDate: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  rejectionRemarks: string | null;
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
  // Fee info (only for registrations)
  totalFee: number;
  delegateCount: number;
  cookCount: number;
};

export type ExportData = {
  rows: ExportRow[];
  summary: {
    totalRegistrations: number;
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
 * Returns detailed data including delegates and cooks
 */
export async function exportRegistrations(
  filters: ExportFilters
): Promise<ActionResponse<ExportData>> {
  await requireRole("ADMIN");

  try {
    // Build where clause based on filters
    const where: {
      eventId?: string;
      status?: RegistrationStatus;
      church?: { divisionId?: string };
      createdAt?: { gte?: Date; lte?: Date };
    } = {};

    if (filters.eventId) {
      where.eventId = filters.eventId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.divisionId) {
      where.church = { divisionId: filters.divisionId };
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

    // Fetch registrations with all related data
    const registrations = await prisma.registration.findMany({
      where,
      select: {
        id: true,
        status: true,
        remarks: true,
        createdAt: true,
        reviewedAt: true,
        reviewedBy: true,
        // Fee fields captured at registration time
        totalFee: true,
        delegateFeePerPerson: true,
        cookFeePerPerson: true,
        isPreRegistration: true,
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
        { church: { division: { name: "asc" } } },
        { church: { name: "asc" } },
        { createdAt: "desc" },
      ],
    });

    // Get reviewer names for registrations that have reviewedBy
    const reviewerIds = registrations
      .map((r) => r.reviewedBy)
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

    for (const reg of registrations) {
      // Use stored fee values (captured at registration time)
      const baseRow = {
        registrationId: reg.id,
        registrationStatus: reg.status,
        registrationDate: reg.createdAt.toISOString(),
        reviewedAt: reg.reviewedAt?.toISOString() || null,
        reviewedBy: reg.reviewedBy ? reviewerMap.get(reg.reviewedBy) || null : null,
        rejectionRemarks: reg.remarks,
        eventName: reg.event.name,
        eventStartDate: reg.event.startDate.toISOString(),
        eventEndDate: reg.event.endDate.toISOString(),
        eventLocation: reg.event.location,
        churchName: reg.church.name,
        divisionName: reg.church.division.name,
        totalFee: reg.totalFee,
        delegateCount: reg.delegates.length,
        cookCount: reg.cooks.length,
      };

      // Track summary stats
      byStatus[reg.status] = (byStatus[reg.status] || 0) + 1;
      byDivision[reg.church.division.name] =
        (byDivision[reg.church.division.name] || 0) + 1;
      totalFees += reg.totalFee;
      totalDelegates += reg.delegates.length;
      totalCooks += reg.cooks.length;

      // Add delegate rows
      for (const delegate of reg.delegates) {
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
      for (const cook of reg.cooks) {
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
          totalRegistrations: registrations.length,
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
