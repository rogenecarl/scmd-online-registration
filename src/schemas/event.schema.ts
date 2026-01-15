import { z } from "zod";
import { EventStatusEnum } from "./enums";

// Helper for PHP currency validation (whole numbers only)
const pesoSchema = z
  .union([z.string(), z.number()])
  .transform((val) => {
    const num = typeof val === "string" ? parseInt(val, 10) : Math.round(val);
    if (isNaN(num)) throw new Error("Invalid number");
    return num;
  })
  .refine((val) => val >= 0, "Amount must be 0 or greater")
  .refine((val) => val <= 9999999, "Amount too large (max ₱9,999,999)");

// Base event schema (shared fields)
const eventBaseSchema = z.object({
  name: z
    .string()
    .min(1, "Event name is required")
    .max(200, "Event name must be 200 characters or less")
    .trim(),
  description: z
    .string()
    .max(5000, "Description must be 5000 characters or less")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .min(1, "Location is required")
    .max(500, "Location must be 500 characters or less")
    .trim(),
  banner: z
    .string()
    .url("Invalid banner URL")
    .optional()
    .nullable()
    .or(z.literal(""))
    .or(z.literal(null)),
});

// Create event schema with full validation
export const createEventSchema = eventBaseSchema
  .extend({
    startDate: z
      .union([z.string(), z.date()])
      .transform((val) => (typeof val === "string" ? new Date(val) : val))
      .refine((date) => !isNaN(date.getTime()), "Invalid start date"),
    endDate: z
      .union([z.string(), z.date()])
      .transform((val) => (typeof val === "string" ? new Date(val) : val))
      .refine((date) => !isNaN(date.getTime()), "Invalid end date"),

    // Pre-registration fields (in Philippine Peso)
    preRegistrationFee: pesoSchema,
    preRegistrationSiblingDiscount: pesoSchema.default(0), // Discounted fee for 3+ siblings
    preRegistrationStart: z
      .union([z.string(), z.date()])
      .transform((val) => (typeof val === "string" ? new Date(val) : val))
      .refine((date) => !isNaN(date.getTime()), "Invalid pre-registration start date"),
    preRegistrationEnd: z
      .union([z.string(), z.date()])
      .transform((val) => (typeof val === "string" ? new Date(val) : val))
      .refine((date) => !isNaN(date.getTime()), "Invalid pre-registration end date"),

    // Other fees (in Philippine Peso)
    onsiteRegistrationFee: pesoSchema,
    onsiteSiblingDiscount: pesoSchema.default(0), // Discounted fee for 3+ siblings
    cookRegistrationFee: pesoSchema,

    status: EventStatusEnum.default("UPCOMING"),
  })
  // Cross-field validations
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be on or after start date",
    path: ["endDate"],
  })
  .refine((data) => data.preRegistrationEnd >= data.preRegistrationStart, {
    message: "Pre-registration end must be on or after start",
    path: ["preRegistrationEnd"],
  })
  .refine((data) => data.preRegistrationStart <= data.startDate, {
    message: "Pre-registration must start before event",
    path: ["preRegistrationStart"],
  })
  .refine((data) => data.preRegistrationEnd <= data.startDate, {
    message: "Pre-registration must end before event starts",
    path: ["preRegistrationEnd"],
  });

// Update event schema (allows partial updates)
export const updateEventSchema = createEventSchema;

// Status update schema
export const updateEventStatusSchema = z.object({
  id: z.string().cuid("Invalid event ID"),
  status: EventStatusEnum,
});

// Output types (after transformation) - used by server actions
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type UpdateEventStatusInput = z.infer<typeof updateEventStatusSchema>;

// Input type (before transformation) - used by forms
export type EventFormInput = z.input<typeof createEventSchema>;
