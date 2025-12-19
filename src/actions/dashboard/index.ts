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
