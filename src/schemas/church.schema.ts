import { z } from "zod";

export const churchSchema = z.object({
  name: z
    .string()
    .min(1, "Church name is required")
    .max(100, "Church name must be 100 characters or less")
    .trim(),
  divisionId: z
    .string()
    .min(1, "Division is required")
    .cuid("Invalid division selected"),
});

export type ChurchInput = z.infer<typeof churchSchema>;
