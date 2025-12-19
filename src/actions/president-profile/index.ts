"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole, getServerSession } from "@/lib/auth-server";
import type { ActionResponse } from "@/types/api";
import { z } from "zod";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export type DivisionWithChurches = {
  id: string;
  name: string;
  churches: {
    id: string;
    name: string;
    hasPresident: boolean;
  }[];
};

export type PresidentProfile = {
  id: string;
  name: string;
  email: string;
  church: {
    id: string;
    name: string;
    division: {
      id: string;
      name: string;
    };
  } | null;
};

// ==========================================
// VALIDATION SCHEMA
// ==========================================

const completeProfileSchema = z.object({
  churchId: z.string().min(1, "Please select a church"),
});

export type CompleteProfileInput = z.infer<typeof completeProfileSchema>;

// ==========================================
// SERVER ACTIONS
// ==========================================

/**
 * Get all divisions with their churches for president profile selection
 */
export async function getDivisionsWithChurches(): Promise<
  ActionResponse<DivisionWithChurches[]>
> {
  try {
    await requireRole("PRESIDENT");

    const divisions = await prisma.division.findMany({
      orderBy: { name: "asc" },
      include: {
        churches: {
          orderBy: { name: "asc" },
          include: {
            presidents: {
              select: { id: true },
            },
          },
        },
      },
    });

    const result: DivisionWithChurches[] = divisions.map((division) => ({
      id: division.id,
      name: division.name,
      churches: division.churches.map((church) => ({
        id: church.id,
        name: church.name,
        hasPresident: church.presidents.length > 0,
      })),
    }));

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to load divisions",
    };
  }
}

/**
 * Get current president's profile
 */
export async function getPresidentProfile(): Promise<
  ActionResponse<PresidentProfile>
> {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "PRESIDENT") {
      return { success: false, error: "Unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        church: {
          select: {
            id: true,
            name: true,
            division: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        church: user.church,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to load profile",
    };
  }
}

/**
 * Complete president profile by assigning a church
 */
export async function completePresidentProfile(
  input: CompleteProfileInput
): Promise<ActionResponse<{ id: string }>> {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "PRESIDENT") {
      return { success: false, error: "Unauthorized" };
    }

    const validated = completeProfileSchema.safeParse(input);

    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    // Check if church exists
    const church = await prisma.church.findUnique({
      where: { id: validated.data.churchId },
      include: {
        presidents: {
          select: { id: true },
        },
      },
    });

    if (!church) {
      return { success: false, error: "Church not found" };
    }

    // Check if church already has a president (optional - you may allow multiple)
    // For now, let's warn but still allow
    if (church.presidents.length > 0) {
      // Check if current user is already assigned
      const isAlreadyAssigned = church.presidents.some(
        (p) => p.id === session.user.id
      );
      if (!isAlreadyAssigned) {
        // You can uncomment below to prevent multiple presidents per church
        // return { success: false, error: "This church already has a president assigned" };
      }
    }

    // Update user with church assignment
    await prisma.user.update({
      where: { id: session.user.id },
      data: { churchId: validated.data.churchId },
    });

    revalidatePath("/president");
    revalidatePath("/president/dashboard");

    return { success: true, data: { id: session.user.id } };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to complete profile",
    };
  }
}

/**
 * Check if president has completed profile (has church assigned)
 */
export async function checkProfileComplete(): Promise<
  ActionResponse<{ isComplete: boolean; churchId: string | null }>
> {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "PRESIDENT") {
      return { success: false, error: "Unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { churchId: true },
    });

    return {
      success: true,
      data: {
        isComplete: !!user?.churchId,
        churchId: user?.churchId ?? null,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to check profile",
    };
  }
}
