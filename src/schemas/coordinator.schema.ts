import { z } from "zod";

const phoneRegex = /^[\d\s\-+()]*$/;

export const coordinatorSchema = z.object({
  name: z
    .string()
    .min(1, "Coordinator name is required")
    .max(100, "Coordinator name must be 100 characters or less")
    .trim(),
  divisionId: z
    .string()
    .min(1, "Division is required")
    .cuid("Invalid division selected"),
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

export type CoordinatorInput = z.infer<typeof coordinatorSchema>;
