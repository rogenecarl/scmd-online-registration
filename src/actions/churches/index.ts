"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth-server";
import type { ActionResponse } from "@/types/api";
import { churchSchema, type ChurchInput } from "@/schemas";

// Types for return data
export type ChurchWithRelations = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  division: { id: string; name: string };
  pastor: { id: string; name: string } | null;
  _count: { presidents: number; registrations: number };
};

export type ChurchDetail = {
  id: string;
  name: string;
  divisionId: string;
  createdAt: Date;
  updatedAt: Date;
  division: { id: string; name: string };
  pastor: {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
  } | null;
  presidents: { id: string; name: string; email: string }[];
};

// GET ALL
export async function getChurches(filters?: {
  search?: string;
  divisionId?: string;
}): Promise<ActionResponse<ChurchWithRelations[]>> {
  await requireRole("ADMIN");

  try {
    const churches = await prisma.church.findMany({
      where: {
        ...(filters?.search && {
          name: { contains: filters.search, mode: "insensitive" },
        }),
        ...(filters?.divisionId && { divisionId: filters.divisionId }),
      },
      include: {
        division: { select: { id: true, name: true } },
        pastor: { select: { id: true, name: true } },
        _count: { select: { presidents: true, registrations: true } },
      },
      orderBy: { name: "asc" },
    });

    return { success: true, data: churches };
  } catch (error) {
    console.error("Failed to fetch churches:", error);
    return { success: false, error: "Failed to fetch churches" };
  }
}

// GET BY ID
export async function getChurchById(
  id: string
): Promise<ActionResponse<ChurchDetail>> {
  await requireRole("ADMIN");

  try {
    const church = await prisma.church.findUnique({
      where: { id },
      include: {
        division: { select: { id: true, name: true } },
        pastor: { select: { id: true, name: true, phone: true, email: true } },
        presidents: { select: { id: true, name: true, email: true } },
      },
    });

    if (!church) {
      return { success: false, error: "Church not found" };
    }

    return { success: true, data: church };
  } catch (error) {
    console.error("Failed to fetch church:", error);
    return { success: false, error: "Failed to fetch church" };
  }
}

// CREATE
export async function createChurch(
  input: ChurchInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = churchSchema.safeParse(input);
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
    // Check for duplicate name
    const existing = await prisma.church.findUnique({
      where: { name: validated.data.name },
    });

    if (existing) {
      return {
        success: false,
        error: "A church with this name already exists",
        fieldErrors: { name: ["Church name already exists"] },
      };
    }

    // Verify division exists
    const division = await prisma.division.findUnique({
      where: { id: validated.data.divisionId },
    });

    if (!division) {
      return {
        success: false,
        error: "Selected division does not exist",
        fieldErrors: { divisionId: ["Invalid division"] },
      };
    }

    const church = await prisma.church.create({
      data: validated.data,
      select: { id: true },
    });

    revalidatePath("/admin/churches");
    revalidatePath("/admin/divisions");
    return { success: true, data: { id: church.id } };
  } catch (error) {
    console.error("Failed to create church:", error);
    return { success: false, error: "Failed to create church" };
  }
}

// UPDATE
export async function updateChurch(
  id: string,
  input: ChurchInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = churchSchema.safeParse(input);
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
    const existing = await prisma.church.findFirst({
      where: { name: validated.data.name, NOT: { id } },
    });

    if (existing) {
      return {
        success: false,
        error: "A church with this name already exists",
        fieldErrors: { name: ["Church name already exists"] },
      };
    }

    const church = await prisma.church.update({
      where: { id },
      data: validated.data,
      select: { id: true },
    });

    revalidatePath("/admin/churches");
    revalidatePath(`/admin/churches/${id}`);
    revalidatePath("/admin/divisions");
    return { success: true, data: { id: church.id } };
  } catch (error) {
    console.error("Failed to update church:", error);
    return { success: false, error: "Failed to update church" };
  }
}

// DELETE
export async function deleteChurch(id: string): Promise<ActionResponse<void>> {
  await requireRole("ADMIN");

  try {
    const church = await prisma.church.findUnique({
      where: { id },
      include: {
        _count: { select: { presidents: true, registrations: true } },
      },
    });

    if (!church) {
      return { success: false, error: "Church not found" };
    }

    if (church._count.registrations > 0) {
      return {
        success: false,
        error: `Cannot delete church with ${church._count.registrations} registration(s).`,
      };
    }

    if (church._count.presidents > 0) {
      return {
        success: false,
        error: `Cannot delete church with ${church._count.presidents} president(s) assigned.`,
      };
    }

    // Delete pastor if exists
    await prisma.pastor.deleteMany({ where: { churchId: id } });

    await prisma.church.delete({ where: { id } });

    revalidatePath("/admin/churches");
    revalidatePath("/admin/divisions");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to delete church:", error);
    return { success: false, error: "Failed to delete church" };
  }
}

// Helper: Get churches without pastors (for pastor form)
export async function getChurchesWithoutPastor(): Promise<
  ActionResponse<{ id: string; name: string }[]>
> {
  await requireRole("ADMIN");

  try {
    const churches = await prisma.church.findMany({
      where: { pastor: null },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    return { success: true, data: churches };
  } catch (error) {
    console.error("Failed to fetch churches:", error);
    return { success: false, error: "Failed to fetch churches" };
  }
}
