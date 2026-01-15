"use client";

import type { AdminBatch } from "@/actions/approval";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RegistrationStatusBadge,
  EventStatusBadge,
} from "@/components/shared/status-badge";
import { Eye, CheckCircle, XCircle, Users, ChefHat } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

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

type BatchColumnsProps = {
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export function getBatchColumns({
  onApprove,
  onReject,
}: BatchColumnsProps): Column<AdminBatch>[] {
  return [
    {
      key: "church",
      header: "Church",
      mobilePriority: "primary",
      mobileFullWidth: true,
      render: (batch) => (
        <div>
          <Link
            href={`/admin/registrations/${batch.id}`}
            className="font-medium hover:underline"
          >
            {batch.registration.church.name}
          </Link>
          <p className="text-xs text-muted-foreground">
            {batch.registration.church.division.name} - Batch #{batch.batchNumber}
          </p>
        </div>
      ),
    },
    {
      key: "event",
      header: "Event",
      mobilePriority: "primary",
      render: (batch) => (
        <div>
          <span className="font-medium">{batch.registration.event.name}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">
              {formatDate(batch.registration.event.startDate)}
            </span>
            <EventStatusBadge status={batch.registration.event.status} />
          </div>
        </div>
      ),
    },
    {
      key: "president",
      header: "Submitted By",
      mobilePriority: "hidden",
      render: (batch) => (
        <div>
          <span>{batch.registration.president.name}</span>
          <p className="text-xs text-muted-foreground">
            {batch.registration.president.email}
          </p>
        </div>
      ),
    },
    {
      key: "participants",
      header: "Participants",
      className: "text-center",
      mobilePriority: "secondary",
      mobileLabel: "Participants",
      render: (batch) => (
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1" title="Delegates">
            <Users className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary">{batch._count.delegates}</Badge>
          </div>
          <div className="flex items-center gap-1" title="Cooks">
            <ChefHat className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary">{batch._count.cooks}</Badge>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "text-center",
      mobilePriority: "primary",
      render: (batch) => (
        <RegistrationStatusBadge status={batch.status} />
      ),
    },
    {
      key: "createdAt",
      header: "Submitted",
      mobilePriority: "secondary",
      mobileLabel: "Submitted",
      render: (batch) => (
        <span className="text-muted-foreground text-sm">
          {formatDate(batch.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-32",
      mobilePriority: "primary",
      render: (batch) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/registrations/${batch.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          {batch.status === "PENDING" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onApprove(batch.id)}
                title="Approve"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onReject(batch.id)}
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

// Legacy alias for backwards compatibility
export const getRegistrationColumns = getBatchColumns;
