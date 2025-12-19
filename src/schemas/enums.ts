import { z } from "zod";

export const GenderEnum = z.enum(["MALE", "FEMALE"]);
export const EventStatusEnum = z.enum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]);
export const RegistrationStatusEnum = z.enum(["PENDING", "APPROVED", "REJECTED"]);
export const UserRoleEnum = z.enum(["USER", "ADMIN", "PRESIDENT"]);

export type Gender = z.infer<typeof GenderEnum>;
export type EventStatus = z.infer<typeof EventStatusEnum>;
export type RegistrationStatus = z.infer<typeof RegistrationStatusEnum>;
export type UserRole = z.infer<typeof UserRoleEnum>;
