import { z } from "zod";
import { delegateSchema } from "./delegate.schema";
import { cookSchema } from "./cook.schema";

// Receipt image schema - REQUIRED URL from Supabase Storage for new submissions
const requiredReceiptImageSchema = z
  .string("Payment receipt is required")
  .min(1, "Payment receipt is required")
  .url("Invalid receipt image URL");

// Receipt image schema - optional for updates (if already uploaded)
const optionalReceiptImageSchema = z
  .string()
  .url("Invalid receipt image URL")
  .optional()
  .nullable()
  .or(z.literal(""))
  .or(z.literal(null));

// Schema for creating a new registration with first batch
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
  receiptImage: requiredReceiptImageSchema,
});

// Schema for adding a new batch to an existing registration
export const createBatchSchema = z.object({
  registrationId: z
    .string()
    .min(1, "Registration is required")
    .cuid("Invalid registration"),
  delegates: z
    .array(delegateSchema)
    .max(100, "Maximum 100 delegates allowed")
    .default([]),
  cooks: z.array(cookSchema).max(50, "Maximum 50 cooks allowed").default([]),
  receiptImage: requiredReceiptImageSchema,
}).refine(
  (data) => data.delegates.length > 0 || data.cooks.length > 0,
  { message: "At least one delegate or cook is required", path: ["delegates"] }
);

// Schema for updating a pending batch
export const updateBatchSchema = z.object({
  delegates: z
    .array(delegateSchema)
    .max(100, "Maximum 100 delegates allowed")
    .default([]),
  cooks: z.array(cookSchema).max(50, "Maximum 50 cooks allowed").default([]),
  receiptImage: requiredReceiptImageSchema,
}).refine(
  (data) => data.delegates.length > 0 || data.cooks.length > 0,
  { message: "At least one delegate or cook is required", path: ["delegates"] }
);

// Legacy schema - kept for backwards compatibility during migration
export const updateRegistrationSchema = z.object({
  delegates: z
    .array(delegateSchema)
    .min(1, "At least one delegate is required")
    .max(100, "Maximum 100 delegates allowed"),
  cooks: z.array(cookSchema).max(50, "Maximum 50 cooks allowed").default([]),
  receiptImage: optionalReceiptImageSchema,
});

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;
export type CreateBatchInput = z.infer<typeof createBatchSchema>;
export type UpdateBatchInput = z.infer<typeof updateBatchSchema>;
export type UpdateRegistrationInput = z.infer<typeof updateRegistrationSchema>;
