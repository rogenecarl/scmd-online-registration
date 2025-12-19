import { z } from "zod";

const phoneRegex = /^[\d\s\-+()]*$/;

export const pastorSchema = z.object({
  name: z
    .string()
    .min(1, "Pastor name is required")
    .max(100, "Pastor name must be 100 characters or less")
    .trim(),
  churchId: z
    .string()
    .min(1, "Church is required")
    .cuid("Invalid church selected"),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number format")
    .max(20, "Phone number too long")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email too long")
    .optional()
    .or(z.literal("")),
});

export type PastorInput = z.infer<typeof pastorSchema>;
