"use client";

import type { EventWithCounts } from "@/actions/events";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventStatusBadge } from "@/components/shared/status-badge";
import { Pencil, Trash2, Eye, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
  // Mobile-specific properties
  mobileVisible?: boolean;
  mobilePriority?: "primary" | "secondary" | "hidden";
  mobileLabel?: string;
  mobileFullWidth?: boolean;
};

export function getEventColumns(
  onDelete: (id: string, name: string) => void
): Column<EventWithCounts>[] {
  return [
    {
      key: "name",
      header: "Event",
      mobilePriority: "primary",
      mobileFullWidth: true,
      render: (event) => (
        <div className="flex flex-col">
          <Link
            href={`/admin/events/${event.id}`}
            className="font-medium hover:underline"
          >
            {event.name}
          </Link>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {event.location}
          </div>
        </div>
      ),
    },
    {
      key: "dates",
      header: "Dates",
      mobilePriority: "primary",
      mobileLabel: "Event Dates",
      render: (event) => (
        <div className="flex flex-col text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span>{format(new Date(event.startDate), "MMM d, yyyy")}</span>
          </div>
          <span className="text-muted-foreground">
            to {format(new Date(event.endDate), "MMM d, yyyy")}
          </span>
        </div>
      ),
    },
    {
      key: "registrationDeadline",
      header: "Reg. Deadline",
      mobilePriority: "secondary",
      mobileLabel: "Deadline",
      render: (event) => (
        <span className="text-sm">
          {format(new Date(event.registrationDeadline), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "text-center",
      mobilePriority: "primary",
      render: (event) => <EventStatusBadge status={event.status} />,
    },
    {
      key: "_count.registrations",
      header: "Registrations",
      className: "text-center",
      mobilePriority: "secondary",
      mobileLabel: "Registrations",
      render: (event) => (
        <div className="flex items-center justify-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <Badge variant="secondary">{event._count.registrations}</Badge>
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      mobilePriority: "primary",
      render: (event) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/events/${event.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/events/${event.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(event.id, event.name)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];
}
