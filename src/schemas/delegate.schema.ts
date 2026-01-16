import { z } from "zod";
import { GenderEnum } from "./enums";

export const delegateSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less")
    .trim(),
  nickname: z
    .string()
    .max(50, "Nickname must be 50 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  age: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val), "Age must be a valid number")
    .refine((val) => val >= 1, "Age must be at least 1")
    .refine((val) => val <= 120, "Age must be 120 or less"),
  gender: GenderEnum,
  isSibling: z.boolean().default(false), // Part of sibling group (3+ gets discount)
});

export type DelegateInput = z.infer<typeof delegateSchema>;
