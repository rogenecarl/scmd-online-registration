"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth-server";
import type { ActionResponse } from "@/types/api";
import { divisionSchema, type DivisionInput } from "@/schemas";

// Types for return data
export type DivisionWithCounts = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    churches: number;
  };
  coordinator: { id: string; name: string } | null;
};

export type DivisionDetail = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  churches: { id: string; name: string }[];
  coordinator: {
    id: string;
    name: string;
  } | null;
};

// GET ALL - List with counts
export async function getDivisions(
  search?: string
): Promise<ActionResponse<DivisionWithCounts[]>> {
  await requireRole("ADMIN");

  try {
    const divisions = await prisma.division.findMany({
      where: search
        ? {
            name: { contains: search, mode: "insensitive" },
          }
        : undefined,
      include: {
        _count: { select: { churches: true } },
        coordinator: { select: { id: true, name: true } },
      },
      orderBy: { name: "asc" },
    });

    return { success: true, data: divisions };
  } catch (error) {
    console.error("Failed to fetch divisions:", error);
    return { success: false, error: "Failed to fetch divisions" };
  }
}

// GET BY ID - Detail view
export async function getDivisionById(
  id: string
): Promise<ActionResponse<DivisionDetail>> {
  await requireRole("ADMIN");

  try {
    const division = await prisma.division.findUnique({
      where: { id },
      include: {
        churches: {
          select: { id: true, name: true },
          orderBy: { name: "asc" },
        },
        coordinator: {
          select: { id: true, name: true },
        },
      },
    });

    if (!division) {
      return { success: false, error: "Division not found" };
    }

    return { success: true, data: division };
  } catch (error) {
    console.error("Failed to fetch division:", error);
    return { success: false, error: "Failed to fetch division" };
  }
}

// CREATE
export async function createDivision(
  input: DivisionInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = divisionSchema.safeParse(input);
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
    const existing = await prisma.division.findUnique({
      where: { name: validated.data.name },
    });

    if (existing) {
      return {
        success: false,
        error: "A division with this name already exists",
        fieldErrors: { name: ["Division name already exists"] },
      };
    }

    const division = await prisma.division.create({
      data: validated.data,
      select: { id: true },
    });

    revalidatePath("/admin/divisions");
    return { success: true, data: { id: division.id } };
  } catch (error) {
    console.error("Failed to create division:", error);
    return { success: false, error: "Failed to create division" };
  }
}

// UPDATE
export async function updateDivision(
  id: string,
  input: DivisionInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = divisionSchema.safeParse(input);
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
    // Check for duplicate name (excluding current)
    const existing = await prisma.division.findFirst({
      where: {
        name: validated.data.name,
        NOT: { id },
      },
    });

    if (existing) {
      return {
        success: false,
        error: "A division with this name already exists",
        fieldErrors: { name: ["Division name already exists"] },
      };
    }

    const division = await prisma.division.update({
      where: { id },
      data: validated.data,
      select: { id: true },
    });

    revalidatePath("/admin/divisions");
    revalidatePath(`/admin/divisions/${id}`);
    return { success: true, data: { id: division.id } };
  } catch (error) {
    console.error("Failed to update division:", error);
    return { success: false, error: "Failed to update division" };
  }
}

// DELETE
export async function deleteDivision(
  id: string
): Promise<ActionResponse<void>> {
  await requireRole("ADMIN");

  try {
    // Check for child records
    const division = await prisma.division.findUnique({
      where: { id },
      include: {
        _count: { select: { churches: true } },
        coordinator: { select: { id: true } },
      },
    });

    if (!division) {
      return { success: false, error: "Division not found" };
    }

    if (division._count.churches > 0) {
      return {
        success: false,
        error: `Cannot delete division with ${division._count.churches} church(es). Remove churches first.`,
      };
    }

    // Delete coordinator if exists, then division
    if (division.coordinator) {
      await prisma.coordinator.delete({
        where: { id: division.coordinator.id },
      });
    }

    await prisma.division.delete({ where: { id } });

    revalidatePath("/admin/divisions");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to delete division:", error);
    return { success: false, error: "Failed to delete division" };
  }
}

// Helper: Get divisions without coordinators (for coordinator form)
export async function getDivisionsWithoutCoordinator(): Promise<
  ActionResponse<{ id: string; name: string }[]>
> {
  await requireRole("ADMIN");

  try {
    const divisions = await prisma.division.findMany({
      where: { coordinator: null },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    return { success: true, data: divisions };
  } catch (error) {
    console.error("Failed to fetch divisions:", error);
    return { success: false, error: "Failed to fetch divisions" };
  }
}

// Helper: Get all divisions for select dropdown
export async function getDivisionsForSelect(): Promise<
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
    console.error("Failed to fetch divisions:", error);
    return { success: false, error: "Failed to fetch divisions" };
  }
}
