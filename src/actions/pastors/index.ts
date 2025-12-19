"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth-server";
import type { ActionResponse } from "@/types/api";
import { pastorSchema, type PastorInput } from "@/schemas";

// Types for return data
export type PastorWithChurch = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  church: {
    id: string;
    name: string;
    division: { id: string; name: string };
  };
};

export type PastorDetail = {
  id: string;
  name: string;
  churchId: string;
  createdAt: Date;
  updatedAt: Date;
  church: {
    id: string;
    name: string;
    division: { id: string; name: string };
  };
};

// GET ALL
export async function getPastors(
  search?: string
): Promise<ActionResponse<PastorWithChurch[]>> {
  await requireRole("ADMIN");

  try {
    const pastors = await prisma.pastor.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { church: { name: { contains: search, mode: "insensitive" } } },
            ],
          }
        : undefined,
      include: {
        church: {
          select: {
            id: true,
            name: true,
            division: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { church: { name: "asc" } },
    });

    return { success: true, data: pastors };
  } catch (error) {
    console.error("Failed to fetch pastors:", error);
    return { success: false, error: "Failed to fetch pastors" };
  }
}

// GET BY ID
export async function getPastorById(
  id: string
): Promise<ActionResponse<PastorDetail>> {
  await requireRole("ADMIN");

  try {
    const pastor = await prisma.pastor.findUnique({
      where: { id },
      include: {
        church: {
          select: {
            id: true,
            name: true,
            division: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!pastor) {
      return { success: false, error: "Pastor not found" };
    }

    return { success: true, data: pastor };
  } catch (error) {
    console.error("Failed to fetch pastor:", error);
    return { success: false, error: "Failed to fetch pastor" };
  }
}

// CREATE
export async function createPastor(
  input: PastorInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = pastorSchema.safeParse(input);
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
    // Check if church already has pastor (unique constraint)
    const existingPastor = await prisma.pastor.findUnique({
      where: { churchId: validated.data.churchId },
    });

    if (existingPastor) {
      return {
        success: false,
        error: "This church already has a pastor",
        fieldErrors: { churchId: ["Church already has a pastor"] },
      };
    }

    const pastor = await prisma.pastor.create({
      data: {
        name: validated.data.name,
        churchId: validated.data.churchId,
      },
      select: { id: true },
    });

    revalidatePath("/admin/pastors");
    revalidatePath("/admin/churches");
    return { success: true, data: { id: pastor.id } };
  } catch (error) {
    console.error("Failed to create pastor:", error);
    return { success: false, error: "Failed to create pastor" };
  }
}

// UPDATE
export async function updatePastor(
  id: string,
  input: PastorInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = pastorSchema.safeParse(input);
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
    // Get current pastor to check church change
    const current = await prisma.pastor.findUnique({
      where: { id },
      select: { churchId: true },
    });

    if (!current) {
      return { success: false, error: "Pastor not found" };
    }

    // If church changed, check if new church already has pastor
    if (current.churchId !== validated.data.churchId) {
      const existingPastor = await prisma.pastor.findUnique({
        where: { churchId: validated.data.churchId },
      });

      if (existingPastor) {
        return {
          success: false,
          error: "This church already has a pastor",
          fieldErrors: { churchId: ["Church already has a pastor"] },
        };
      }
    }

    const pastor = await prisma.pastor.update({
      where: { id },
      data: {
        name: validated.data.name,
        churchId: validated.data.churchId,
      },
      select: { id: true },
    });

    revalidatePath("/admin/pastors");
    revalidatePath(`/admin/pastors/${id}`);
    revalidatePath("/admin/churches");
    return { success: true, data: { id: pastor.id } };
  } catch (error) {
    console.error("Failed to update pastor:", error);
    return { success: false, error: "Failed to update pastor" };
  }
}

// DELETE
export async function deletePastor(id: string): Promise<ActionResponse<void>> {
  await requireRole("ADMIN");

  try {
    const pastor = await prisma.pastor.findUnique({
      where: { id },
    });

    if (!pastor) {
      return { success: false, error: "Pastor not found" };
    }

    await prisma.pastor.delete({ where: { id } });

    revalidatePath("/admin/pastors");
    revalidatePath("/admin/churches");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to delete pastor:", error);
    return { success: false, error: "Failed to delete pastor" };
  }
}
