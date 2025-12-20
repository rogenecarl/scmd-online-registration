"use client";

import type { AdminRegistration } from "@/actions/approval";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RegistrationStatusBadge, EventStatusBadge } from "@/components/shared/status-badge";
import { Eye, CheckCircle, XCircle, Users, ChefHat } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
};

type RegistrationColumnsProps = {
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export function getRegistrationColumns({
  onApprove,
  onReject,
}: RegistrationColumnsProps): Column<AdminRegistration>[] {
  return [
    {
      key: "church",
      header: "Church",
      render: (registration) => (
        <div>
          <Link
            href={`/admin/registrations/${registration.id}`}
            className="font-medium hover:underline"
          >
            {registration.church.name}
          </Link>
          <p className="text-xs text-muted-foreground">
            {registration.church.division.name}
          </p>
        </div>
      ),
    },
    {
      key: "event",
      header: "Event",
      render: (registration) => (
        <div>
          <span className="font-medium">{registration.event.name}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">
              {formatDate(registration.event.startDate)}
            </span>
            <EventStatusBadge status={registration.event.status} />
          </div>
        </div>
      ),
    },
    {
      key: "president",
      header: "Submitted By",
      render: (registration) => (
        <div>
          <span>{registration.president.name}</span>
          <p className="text-xs text-muted-foreground">
            {registration.president.email}
          </p>
        </div>
      ),
    },
    {
      key: "participants",
      header: "Participants",
      className: "text-center",
      render: (registration) => (
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1" title="Delegates">
            <Users className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary">{registration._count.delegates}</Badge>
          </div>
          <div className="flex items-center gap-1" title="Cooks">
            <ChefHat className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary">{registration._count.cooks}</Badge>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "text-center",
      render: (registration) => (
        <RegistrationStatusBadge status={registration.status} />
      ),
    },
    {
      key: "createdAt",
      header: "Submitted",
      render: (registration) => (
        <span className="text-muted-foreground text-sm">
          {formatDate(registration.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-32",
      render: (registration) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/registrations/${registration.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          {registration.status === "PENDING" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onApprove(registration.id)}
                title="Approve"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onReject(registration.id)}
                title="Reject"
              >
                <XCircle className="h-4 w-4 text-destructive" />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];
}
