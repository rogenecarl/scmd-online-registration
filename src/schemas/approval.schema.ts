import { z } from "zod";

// Batch approval schemas (new batch-based system)
export const approveBatchSchema = z.object({
  batchId: z.string().cuid("Invalid batch ID"),
});

export const rejectBatchSchema = z.object({
  batchId: z.string().cuid("Invalid batch ID"),
  remarks: z
    .string()
    .min(1, "Rejection reason is required")
    .max(1000, "Remarks must be 1000 characters or less")
    .trim(),
});

// Legacy schemas - kept for backwards compatibility
export const approveRegistrationSchema = z.object({
  registrationId: z.string().cuid("Invalid registration ID"),
});

export const rejectRegistrationSchema = z.object({
  registrationId: z.string().cuid("Invalid registration ID"),
  remarks: z
    .string()
    .min(1, "Rejection reason is required")
    .max(1000, "Remarks must be 1000 characters or less")
    .trim(),
});

export type ApproveBatchInput = z.infer<typeof approveBatchSchema>;
export type RejectBatchInput = z.infer<typeof rejectBatchSchema>;
export type ApproveRegistrationInput = z.infer<typeof approveRegistrationSchema>;
export type RejectRegistrationInput = z.infer<typeof rejectRegistrationSchema>;
