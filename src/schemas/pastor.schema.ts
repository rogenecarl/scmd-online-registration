import { z } from "zod";

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
});

export type PastorInput = z.infer<typeof pastorSchema>;
