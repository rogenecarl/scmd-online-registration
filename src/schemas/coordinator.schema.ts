import { z } from "zod";

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
});

export type CoordinatorInput = z.infer<typeof coordinatorSchema>;
