"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth-server";
import type { ActionResponse, PaginatedActionResponse } from "@/types/api";
import {
  createEventSchema,
  updateEventSchema,
  updateEventStatusSchema,
  type EventFormInput,
} from "@/schemas";
import type { EventStatus } from "@/lib/generated/prisma";
import { DEFAULT_PAGE_SIZE, getSkip } from "@/lib/pagination";

// Types for return data
export type EventWithCounts = {
  id: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  status: EventStatus;
  createdAt: Date;
  _count: {
    registrations: number;
  };
};

export type EventDetail = {
  id: string;
  name: string;
  description: string | null;
  location: string;
  banner: string | null;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  preRegistrationFee: number;
  preRegistrationStart: Date;
  preRegistrationEnd: Date;
  onsiteRegistrationFee: number;
  cookRegistrationFee: number;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    registrations: number;
  };
};

export type EventWithRegistrations = EventDetail & {
  registrations: {
    id: string;
    status: string;
    church: { id: string; name: string };
    _count: { delegates: number; cooks: number };
  }[];
  stats: {
    totalRegistrations: number;
    pendingRegistrations: number;
    approvedRegistrations: number;
    rejectedRegistrations: number;
    totalDelegates: number;
    totalCooks: number;
  };
};

// Helper to map Prisma event to EventDetail type
function toEventDetail(
  event: Awaited<ReturnType<typeof prisma.event.findUnique>> & {
    _count: { registrations: number };
  }
): EventDetail {
  if (!event) throw new Error("Event not found");
  return {
    id: event.id,
    name: event.name,
    description: event.description,
    location: event.location,
    banner: event.banner,
    startDate: event.startDate,
    endDate: event.endDate,
    registrationDeadline: event.registrationDeadline,
    preRegistrationFee: event.preRegistrationFee,
    preRegistrationStart: event.preRegistrationStart,
    preRegistrationEnd: event.preRegistrationEnd,
    onsiteRegistrationFee: event.onsiteRegistrationFee,
    cookRegistrationFee: event.cookRegistrationFee,
    status: event.status,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    _count: event._count,
  };
}

// GET ALL - List with counts and pagination
export async function getEvents(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: EventStatus;
} = {}): Promise<PaginatedActionResponse<EventWithCounts>> {
  await requireRole("ADMIN");

  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;

  try {
    const where = {
      ...(params.search && {
        OR: [
          { name: { contains: params.search, mode: "insensitive" as const } },
          { location: { contains: params.search, mode: "insensitive" as const } },
        ],
      }),
      ...(params.status && { status: params.status }),
    };

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          _count: { select: { registrations: true } },
        },
        orderBy: { startDate: "desc" },
        skip: getSkip(page, pageSize),
        take: pageSize,
      }),
      prisma.event.count({ where }),
    ]);

    return {
      success: true,
      data: {
        items: events,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return { success: false, error: "Failed to fetch events" };
  }
}

// GET BY ID - Detail view
export async function getEventById(
  id: string
): Promise<ActionResponse<EventDetail>> {
  await requireRole("ADMIN");

  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: { select: { registrations: true } },
      },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    return { success: true, data: toEventDetail(event) };
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return { success: false, error: "Failed to fetch event" };
  }
}

// GET BY ID - With registrations and stats
export async function getEventWithRegistrations(
  id: string
): Promise<ActionResponse<EventWithRegistrations>> {
  await requireRole("ADMIN");

  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: { select: { registrations: true } },
        registrations: {
          include: {
            church: { select: { id: true, name: true } },
            _count: { select: { delegates: true, cooks: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    // Calculate stats
    const stats = {
      totalRegistrations: event.registrations.length,
      pendingRegistrations: event.registrations.filter(
        (r) => r.status === "PENDING"
      ).length,
      approvedRegistrations: event.registrations.filter(
        (r) => r.status === "APPROVED"
      ).length,
      rejectedRegistrations: event.registrations.filter(
        (r) => r.status === "REJECTED"
      ).length,
      totalDelegates: event.registrations.reduce(
        (sum, r) => sum + r._count.delegates,
        0
      ),
      totalCooks: event.registrations.reduce(
        (sum, r) => sum + r._count.cooks,
        0
      ),
    };

    const eventDetail = toEventDetail(event);
    return {
      success: true,
      data: {
        ...eventDetail,
        registrations: event.registrations,
        stats,
      },
    };
  } catch (error) {
    console.error("Failed to fetch event with registrations:", error);
    return { success: false, error: "Failed to fetch event details" };
  }
}

// CREATE
export async function createEvent(
  input: EventFormInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = createEventSchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      error: "Invalid input",
      fieldErrors: validated.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  try {
    const event = await prisma.event.create({
      data: {
        name: validated.data.name,
        description: validated.data.description || null,
        location: validated.data.location,
        banner: validated.data.banner || null,
        startDate: validated.data.startDate,
        endDate: validated.data.endDate,
        registrationDeadline: validated.data.registrationDeadline,
        preRegistrationFee: validated.data.preRegistrationFee,
        preRegistrationStart: validated.data.preRegistrationStart,
        preRegistrationEnd: validated.data.preRegistrationEnd,
        onsiteRegistrationFee: validated.data.onsiteRegistrationFee,
        cookRegistrationFee: validated.data.cookRegistrationFee,
        status: validated.data.status,
      },
      select: { id: true },
    });

    revalidatePath("/admin/events");
    return { success: true, data: { id: event.id } };
  } catch (error) {
    console.error("Failed to create event:", error);
    return { success: false, error: "Failed to create event" };
  }
}

// UPDATE
export async function updateEvent(
  id: string,
  input: EventFormInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = updateEventSchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      error: "Invalid input",
      fieldErrors: validated.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  try {
    // Check if event exists
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Event not found" };
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        name: validated.data.name,
        description: validated.data.description || null,
        location: validated.data.location,
        banner: validated.data.banner || null,
        startDate: validated.data.startDate,
        endDate: validated.data.endDate,
        registrationDeadline: validated.data.registrationDeadline,
        preRegistrationFee: validated.data.preRegistrationFee,
        preRegistrationStart: validated.data.preRegistrationStart,
        preRegistrationEnd: validated.data.preRegistrationEnd,
        onsiteRegistrationFee: validated.data.onsiteRegistrationFee,
        cookRegistrationFee: validated.data.cookRegistrationFee,
        status: validated.data.status,
      },
      select: { id: true },
    });

    revalidatePath("/admin/events");
    revalidatePath(`/admin/events/${id}`);
    return { success: true, data: { id: event.id } };
  } catch (error) {
    console.error("Failed to update event:", error);
    return { success: false, error: "Failed to update event" };
  }
}

// UPDATE STATUS
export async function updateEventStatus(
  id: string,
  status: EventStatus
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = updateEventStatusSchema.safeParse({ id, status });
  if (!validated.success) {
    return {
      success: false,
      error: "Invalid input",
      fieldErrors: validated.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  try {
    const event = await prisma.event.update({
      where: { id },
      data: { status },
      select: { id: true },
    });

    revalidatePath("/admin/events");
    revalidatePath(`/admin/events/${id}`);
    return { success: true, data: { id: event.id } };
  } catch (error) {
    console.error("Failed to update event status:", error);
    return { success: false, error: "Failed to update event status" };
  }
}

// DELETE
export async function deleteEvent(id: string): Promise<ActionResponse<void>> {
  await requireRole("ADMIN");

  try {
    // Check for child records
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: { select: { registrations: true } },
      },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    if (event._count.registrations > 0) {
      return {
        success: false,
        error: `Cannot delete event with ${event._count.registrations} registration(s). Remove registrations first or cancel the event instead.`,
      };
    }

    await prisma.event.delete({ where: { id } });

    revalidatePath("/admin/events");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error: "Failed to delete event" };
  }
}

// Helper: Get events for select dropdown (upcoming/ongoing only)
export async function getEventsForSelect(): Promise<
  ActionResponse<{ id: string; name: string; status: EventStatus }[]>
> {
  await requireRole("ADMIN");

  try {
    const events = await prisma.event.findMany({
      where: {
        status: { in: ["UPCOMING", "ONGOING"] },
      },
      select: { id: true, name: true, status: true },
      orderBy: { startDate: "asc" },
    });

    return { success: true, data: events };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return { success: false, error: "Failed to fetch events" };
  }
}
