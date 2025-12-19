import { z } from "zod";

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

export type ApproveRegistrationInput = z.infer<typeof approveRegistrationSchema>;
export type RejectRegistrationInput = z.infer<typeof rejectRegistrationSchema>;
