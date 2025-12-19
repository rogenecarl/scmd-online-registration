import { z } from "zod";
import { delegateSchema } from "./delegate.schema";
import { cookSchema } from "./cook.schema";

export const createRegistrationSchema = z.object({
  eventId: z
    .string()
    .min(1, "Event is required")
    .cuid("Invalid event selected"),
  delegates: z
    .array(delegateSchema)
    .min(1, "At least one delegate is required")
    .max(100, "Maximum 100 delegates allowed"),
  cooks: z.array(cookSchema).max(50, "Maximum 50 cooks allowed").default([]),
});

export const updateRegistrationSchema = z.object({
  delegates: z
    .array(delegateSchema)
    .min(1, "At least one delegate is required")
    .max(100, "Maximum 100 delegates allowed"),
  cooks: z.array(cookSchema).max(50, "Maximum 50 cooks allowed").default([]),
});

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;
export type UpdateRegistrationInput = z.infer<typeof updateRegistrationSchema>;
