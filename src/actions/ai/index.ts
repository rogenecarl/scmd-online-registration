"use server";

import { requireRole } from "@/lib/auth-server";
import { extractPersonsFromImage, type ExtractedPerson } from "@/lib/gemini-vision";
import { extractPersonsRequestSchema } from "@/schemas";
import type { ActionResponse } from "@/types/api";

/**
 * Extract persons from an image using AI (Gemini Vision)
 *
 * Expected image format:
 * - List of people with: Full Name, Nickname, Age, Gender
 * - Example: "Juan Dela Cruz, Jun, 25, Male"
 *
 * @param input - The image data and extraction parameters
 * @returns ActionResponse with extracted persons array
 */
export async function extractPersonsFromImageAction(
  input: {
    imageBase64: string;
    mimeType: string;
    personType: "delegate" | "sibling" | "cook";
  }
): Promise<ActionResponse<ExtractedPerson[]>> {
  // Only presidents can use this feature
  await requireRole("PRESIDENT");

  // Validate input
  const validated = extractPersonsRequestSchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      error: "Invalid input data",
      fieldErrors: validated.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { imageBase64, mimeType, personType } = validated.data;

  // Extract persons from the image
  const result = await extractPersonsFromImage(imageBase64, mimeType, personType);

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
