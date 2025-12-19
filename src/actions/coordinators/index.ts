"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth-server";
import type { ActionResponse } from "@/types/api";
import { coordinatorSchema, type CoordinatorInput } from "@/schemas";

// Types for return data
export type CoordinatorWithDivision = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  division: { id: string; name: string };
};

export type CoordinatorDetail = {
  id: string;
  name: string;
  divisionId: string;
  createdAt: Date;
  updatedAt: Date;
  division: { id: string; name: string };
};

// GET ALL
export async function getCoordinators(
  search?: string
): Promise<ActionResponse<CoordinatorWithDivision[]>> {
  await requireRole("ADMIN");

  try {
    const coordinators = await prisma.coordinator.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { division: { name: { contains: search, mode: "insensitive" } } },
            ],
          }
        : undefined,
      include: {
        division: { select: { id: true, name: true } },
      },
      orderBy: { division: { name: "asc" } },
    });

    return { success: true, data: coordinators };
  } catch (error) {
    console.error("Failed to fetch coordinators:", error);
    return { success: false, error: "Failed to fetch coordinators" };
  }
}

// GET BY ID
export async function getCoordinatorById(
  id: string
): Promise<ActionResponse<CoordinatorDetail>> {
  await requireRole("ADMIN");

  try {
    const coordinator = await prisma.coordinator.findUnique({
      where: { id },
      include: {
        division: { select: { id: true, name: true } },
      },
    });

    if (!coordinator) {
      return { success: false, error: "Coordinator not found" };
    }

    return { success: true, data: coordinator };
  } catch (error) {
    console.error("Failed to fetch coordinator:", error);
    return { success: false, error: "Failed to fetch coordinator" };
  }
}

// CREATE
export async function createCoordinator(
  input: CoordinatorInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = coordinatorSchema.safeParse(input);
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
    // Check if division already has coordinator (unique constraint)
    const existingCoordinator = await prisma.coordinator.findUnique({
      where: { divisionId: validated.data.divisionId },
    });

    if (existingCoordinator) {
      return {
        success: false,
        error: "This division already has a coordinator",
        fieldErrors: { divisionId: ["Division already has a coordinator"] },
      };
    }

    const coordinator = await prisma.coordinator.create({
      data: {
        name: validated.data.name,
        divisionId: validated.data.divisionId,
      },
      select: { id: true },
    });

    revalidatePath("/admin/coordinators");
    revalidatePath("/admin/divisions");
    return { success: true, data: { id: coordinator.id } };
  } catch (error) {
    console.error("Failed to create coordinator:", error);
    return { success: false, error: "Failed to create coordinator" };
  }
}

// UPDATE
export async function updateCoordinator(
  id: string,
  input: CoordinatorInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = coordinatorSchema.safeParse(input);
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
    // Get current coordinator to check division change
    const current = await prisma.coordinator.findUnique({
      where: { id },
      select: { divisionId: true },
    });

    if (!current) {
      return { success: false, error: "Coordinator not found" };
    }

    // If division changed, check if new division already has coordinator
    if (current.divisionId !== validated.data.divisionId) {
      const existingCoordinator = await prisma.coordinator.findUnique({
        where: { divisionId: validated.data.divisionId },
      });

      if (existingCoordinator) {
        return {
          success: false,
          error: "This division already has a coordinator",
          fieldErrors: { divisionId: ["Division already has a coordinator"] },
        };
      }
    }

    const coordinator = await prisma.coordinator.update({
      where: { id },
      data: {
        name: validated.data.name,
        divisionId: validated.data.divisionId,
      },
      select: { id: true },
    });

    revalidatePath("/admin/coordinators");
    revalidatePath(`/admin/coordinators/${id}`);
    revalidatePath("/admin/divisions");
    return { success: true, data: { id: coordinator.id } };
  } catch (error) {
    console.error("Failed to update coordinator:", error);
    return { success: false, error: "Failed to update coordinator" };
  }
}

// DELETE
export async function deleteCoordinator(
  id: string
): Promise<ActionResponse<void>> {
  await requireRole("ADMIN");

  try {
    const coordinator = await prisma.coordinator.findUnique({
      where: { id },
    });

    if (!coordinator) {
      return { success: false, error: "Coordinator not found" };
    }

    await prisma.coordinator.delete({ where: { id } });

    revalidatePath("/admin/coordinators");
    revalidatePath("/admin/divisions");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to delete coordinator:", error);
    return { success: false, error: "Failed to delete coordinator" };
  }
}
