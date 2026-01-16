import { z } from "zod";
import { GenderEnum } from "./enums";

/**
 * Schema for a person extracted from an image via AI
 */
export const extractedPersonSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less")
    .trim(),
  nickname: z
    .string()
    .max(50, "Nickname must be 50 characters or less")
    .trim()
    .nullable(),
  age: z
    .number()
    .min(1, "Age must be at least 1")
    .max(120, "Age must be 120 or less"),
  gender: GenderEnum,
});

export type ExtractedPersonInput = z.infer<typeof extractedPersonSchema>;

/**
 * Schema for the extraction request
 */
export const extractPersonsRequestSchema = z.object({
  imageBase64: z.string().min(1, "Image data is required"),
  mimeType: z.enum(["image/jpeg", "image/jpg", "image/png", "image/webp"]),
  personType: z.enum(["delegate", "sibling", "cook"]),
});

export type ExtractPersonsRequest = z.infer<typeof extractPersonsRequestSchema>;
