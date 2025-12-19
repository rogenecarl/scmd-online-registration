"use client";

import { Badge } from "@/components/ui/badge";

// Registration Status Badge
type RegistrationStatus = "PENDING" | "APPROVED" | "REJECTED";

const registrationStatusConfig: Record<
  RegistrationStatus,
  { label: string; variant: "pending" | "approved" | "rejected" }
> = {
  PENDING: { label: "Pending", variant: "pending" },
  APPROVED: { label: "Approved", variant: "approved" },
  REJECTED: { label: "Rejected", variant: "rejected" },
};

interface RegistrationStatusBadgeProps {
  status: RegistrationStatus;
  className?: string;
}

export function RegistrationStatusBadge({
  status,
  className,
}: RegistrationStatusBadgeProps) {
  const config = registrationStatusConfig[status];
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

// Event Status Badge
type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

const eventStatusConfig: Record<
  EventStatus,
  { label: string; variant: "upcoming" | "ongoing" | "completed" | "cancelled" }
> = {
  UPCOMING: { label: "Upcoming", variant: "upcoming" },
  ONGOING: { label: "Ongoing", variant: "ongoing" },
  COMPLETED: { label: "Completed", variant: "completed" },
  CANCELLED: { label: "Cancelled", variant: "cancelled" },
};

interface EventStatusBadgeProps {
  status: EventStatus;
  className?: string;
}

export function EventStatusBadge({ status, className }: EventStatusBadgeProps) {
  const config = eventStatusConfig[status];
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

// Role Badge
type UserRole = "ADMIN" | "PRESIDENT" | "USER";

const roleConfig: Record<
  UserRole,
  { label: string; variant: "default" | "info" | "secondary" }
> = {
  ADMIN: { label: "Admin", variant: "default" },
  PRESIDENT: { label: "President", variant: "info" },
  USER: { label: "User", variant: "secondary" },
};

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const config = roleConfig[role];
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
