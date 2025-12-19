"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth-server";
import type { ActionResponse } from "@/types/api";
import {
  seedPresidentSchema,
  updatePresidentSchema,
  resetPasswordSchema,
  type SeedPresidentInput,
  type UpdatePresidentInput,
  type ResetPasswordInput,
} from "@/schemas";

// Types for return data
export type PresidentWithChurch = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  church: {
    id: string;
    name: string;
    division: { id: string; name: string };
  } | null;
};

export type PresidentDetail = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  churchId: string | null;
  createdAt: Date;
  updatedAt: Date;
  church: {
    id: string;
    name: string;
    division: { id: string; name: string };
  } | null;
  _count: {
    registrations: number;
  };
};

// GET ALL PRESIDENTS
export async function getPresidents(filters?: {
  search?: string;
  churchId?: string;
}): Promise<ActionResponse<PresidentWithChurch[]>> {
  await requireRole("ADMIN");

  try {
    const presidents = await prisma.user.findMany({
      where: {
        role: "PRESIDENT",
        ...(filters?.search && {
          OR: [
            { name: { contains: filters.search, mode: "insensitive" } },
            { email: { contains: filters.search, mode: "insensitive" } },
            { church: { name: { contains: filters.search, mode: "insensitive" } } },
          ],
        }),
        ...(filters?.churchId && { churchId: filters.churchId }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        church: {
          select: {
            id: true,
            name: true,
            division: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return { success: true, data: presidents };
  } catch (error) {
    console.error("Failed to fetch presidents:", error);
    return { success: false, error: "Failed to fetch presidents" };
  }
}

// GET PRESIDENT BY ID
export async function getPresidentById(
  id: string
): Promise<ActionResponse<PresidentDetail>> {
  await requireRole("ADMIN");

  try {
    const president = await prisma.user.findFirst({
      where: { id, role: "PRESIDENT" },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        churchId: true,
        createdAt: true,
        updatedAt: true,
        church: {
          select: {
            id: true,
            name: true,
            division: { select: { id: true, name: true } },
          },
        },
        _count: {
          select: { registrations: true },
        },
      },
    });

    if (!president) {
      return { success: false, error: "President not found" };
    }

    return { success: true, data: president };
  } catch (error) {
    console.error("Failed to fetch president:", error);
    return { success: false, error: "Failed to fetch president" };
  }
}

// GET CHURCHES WITHOUT PRESIDENT (for seeding form)
export async function getChurchesWithoutPresident(): Promise<
  ActionResponse<{ id: string; name: string; division: { name: string } }[]>
> {
  await requireRole("ADMIN");

  try {
    const churches = await prisma.church.findMany({
      where: {
        presidents: { none: {} },
      },
      select: {
        id: true,
        name: true,
        division: { select: { name: true } },
      },
      orderBy: { name: "asc" },
    });

    return { success: true, data: churches };
  } catch (error) {
    console.error("Failed to fetch churches:", error);
    return { success: false, error: "Failed to fetch churches" };
  }
}

// SEED NEW PRESIDENT (create with password)
// Creates user directly without triggering a session (admin seeding)
export async function seedPresident(
  input: SeedPresidentInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  // Validate input (excluding confirmPassword refinement for server-side)
  const validated = seedPresidentSchema.safeParse(input);
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
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.data.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "A user with this email already exists",
        fieldErrors: { email: ["Email already in use"] },
      };
    }

    // Verify church exists and doesn't have a president
    const church = await prisma.church.findUnique({
      where: { id: validated.data.churchId },
      include: { presidents: { select: { id: true } } },
    });

    if (!church) {
      return {
        success: false,
        error: "Selected church does not exist",
        fieldErrors: { churchId: ["Invalid church"] },
      };
    }

    if (church.presidents.length > 0) {
      return {
        success: false,
        error: "This church already has a president assigned",
        fieldErrors: { churchId: ["Church already has a president"] },
      };
    }

    // Hash password using Better Auth's crypto
    const { hashPassword } = await import("better-auth/crypto");
    const hashedPassword = await hashPassword(validated.data.password);

    // Create user and account directly (without creating a session)
    // This prevents the admin from being logged out or switched to the new user
    const userId = crypto.randomUUID();
    const accountId = crypto.randomUUID();

    await prisma.$transaction(async (tx) => {
      // Create user
      await tx.user.create({
        data: {
          id: userId,
          name: validated.data.name,
          email: validated.data.email,
          role: "PRESIDENT",
          churchId: validated.data.churchId,
          emailVerified: false,
        },
      });

      // Create credential account with hashed password
      await tx.account.create({
        data: {
          id: accountId,
          userId: userId,
          accountId: userId,
          providerId: "credential",
          password: hashedPassword,
        },
      });
    });

    revalidatePath("/admin/presidents");
    revalidatePath("/admin/churches");
    return { success: true, data: { id: userId } };
  } catch (error) {
    console.error("Failed to seed president:", error);
    return { success: false, error: "Failed to create president account" };
  }
}

// UPDATE PRESIDENT (name, email, church only - not password)
export async function updatePresident(
  id: string,
  input: UpdatePresidentInput
): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");

  const validated = updatePresidentSchema.safeParse(input);
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
    // Get current president
    const current = await prisma.user.findFirst({
      where: { id, role: "PRESIDENT" },
      select: { email: true, churchId: true },
    });

    if (!current) {
      return { success: false, error: "President not found" };
    }

    // If email is being changed, check for duplicates
    if (validated.data.email && validated.data.email !== current.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: validated.data.email },
      });

      if (existingEmail) {
        return {
          success: false,
          error: "A user with this email already exists",
          fieldErrors: { email: ["Email already in use"] },
        };
      }
    }

    // If church is being changed, verify new church doesn't have a president
    if (validated.data.churchId && validated.data.churchId !== current.churchId) {
      const church = await prisma.church.findUnique({
        where: { id: validated.data.churchId },
        include: { presidents: { select: { id: true } } },
      });

      if (!church) {
        return {
          success: false,
          error: "Selected church does not exist",
          fieldErrors: { churchId: ["Invalid church"] },
        };
      }

      if (church.presidents.length > 0) {
        return {
          success: false,
          error: "This church already has a president assigned",
          fieldErrors: { churchId: ["Church already has a president"] },
        };
      }
    }

    // Build update data
    const updateData: { name?: string; email?: string; churchId?: string } = {};
    if (validated.data.name) updateData.name = validated.data.name;
    if (validated.data.email) updateData.email = validated.data.email;
    if (validated.data.churchId) updateData.churchId = validated.data.churchId;

    const president = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true },
    });

    revalidatePath("/admin/presidents");
    revalidatePath(`/admin/presidents/${id}`);
    revalidatePath("/admin/churches");
    return { success: true, data: { id: president.id } };
  } catch (error) {
    console.error("Failed to update president:", error);
    return { success: false, error: "Failed to update president" };
  }
}

// RESET PRESIDENT PASSWORD
export async function resetPresidentPassword(
  id: string,
  input: ResetPasswordInput
): Promise<ActionResponse<void>> {
  await requireRole("ADMIN");

  const validated = resetPasswordSchema.safeParse(input);
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
    // Verify president exists
    const president = await prisma.user.findFirst({
      where: { id, role: "PRESIDENT" },
      select: { id: true, email: true },
    });

    if (!president) {
      return { success: false, error: "President not found" };
    }

    // Use Better Auth's internal password hashing via context
    // Since Better Auth doesn't expose a direct password update API for admins,
    // we'll update the account directly using their password hashing
    const { hashPassword } = await import("better-auth/crypto");
    const hashedPassword = await hashPassword(validated.data.password);

    // Update the account password
    await prisma.account.updateMany({
      where: {
        userId: id,
        providerId: "credential",
      },
      data: {
        password: hashedPassword,
      },
    });

    revalidatePath(`/admin/presidents/${id}`);
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to reset password:", error);
    return { success: false, error: "Failed to reset password" };
  }
}

// DEACTIVATE PRESIDENT (remove from church, keep account for history)
export async function deactivatePresident(
  id: string
): Promise<ActionResponse<void>> {
  await requireRole("ADMIN");

  try {
    const president = await prisma.user.findFirst({
      where: { id, role: "PRESIDENT" },
      select: {
        id: true,
        _count: { select: { registrations: true } },
      },
    });

    if (!president) {
      return { success: false, error: "President not found" };
    }

    // Check for pending registrations
    const pendingRegistrations = await prisma.registration.count({
      where: {
        presidentId: id,
        status: "PENDING",
      },
    });

    if (pendingRegistrations > 0) {
      return {
        success: false,
        error: `Cannot deactivate president with ${pendingRegistrations} pending registration(s).`,
      };
    }

    // Remove church assignment and change role to USER
    await prisma.user.update({
      where: { id },
      data: {
        role: "USER",
        churchId: null,
      },
    });

    revalidatePath("/admin/presidents");
    revalidatePath("/admin/churches");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to deactivate president:", error);
    return { success: false, error: "Failed to deactivate president" };
  }
}

// DELETE PRESIDENT (only if no registrations)
export async function deletePresident(
  id: string
): Promise<ActionResponse<void>> {
  await requireRole("ADMIN");

  try {
    const president = await prisma.user.findFirst({
      where: { id, role: "PRESIDENT" },
      include: {
        _count: { select: { registrations: true } },
      },
    });

    if (!president) {
      return { success: false, error: "President not found" };
    }

    if (president._count.registrations > 0) {
      return {
        success: false,
        error: `Cannot delete president with ${president._count.registrations} registration(s). Consider deactivating instead.`,
      };
    }

    // Delete associated sessions and accounts first
    await prisma.session.deleteMany({ where: { userId: id } });
    await prisma.account.deleteMany({ where: { userId: id } });
    await prisma.user.delete({ where: { id } });

    revalidatePath("/admin/presidents");
    revalidatePath("/admin/churches");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Failed to delete president:", error);
    return { success: false, error: "Failed to delete president" };
  }
}
