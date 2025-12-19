import { z } from "zod";

export const divisionSchema = z.object({
  name: z
    .string()
    .min(1, "Division name is required")
    .max(100, "Division name must be 100 characters or less")
    .trim(),
});

export type DivisionInput = z.infer<typeof divisionSchema>;
