"use client";

import type { AdminApprovedParticipant } from "@/actions/approval";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Church, Pencil, Trash2 } from "lucide-react";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
  mobileVisible?: boolean;
  mobilePriority?: "primary" | "secondary" | "hidden";
  mobileLabel?: string;
  mobileFullWidth?: boolean;
};

const typeConfig = {
  delegate: {
    label: "Delegate",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  sibling: {
    label: "Delegate",
    suffix: "(Sibling)",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  cook: {
    label: "Cook",
    className: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  },
} as const;

const genderConfig = {
  MALE: {
    label: "Male",
    className: "bg-sky-100 text-sky-700",
  },
  FEMALE: {
    label: "Female",
    className: "bg-rose-100 text-rose-700",
  },
};

export function getAdminParticipantsColumns(
  onEdit?: (participant: AdminApprovedParticipant) => void,
  onDelete?: (participant: AdminApprovedParticipant) => void
): Column<AdminApprovedParticipant>[] {
  return [
    {
      key: "fullName",
      header: "Name",
      mobilePriority: "primary",
      mobileFullWidth: true,
      render: (participant) => (
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium">{participant.fullName}</span>
            {participant.isDiscounted && (
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] px-1.5 py-0">
                Discounted
              </Badge>
            )}
          </div>
          {participant.nickname && (
            <p className="text-xs text-muted-foreground">
              &quot;{participant.nickname}&quot;
            </p>
          )}
        </div>
      ),
    },
    {
      key: "church",
      header: "Church",
      mobilePriority: "primary",
      render: (participant) => (
        <div className="flex items-start gap-2">
          <Church className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <span className="font-medium text-sm">{participant.churchName}</span>
            <p className="text-xs text-muted-foreground">{participant.divisionName}</p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      className: "text-center",
      mobilePriority: "primary",
      render: (participant) => {
        const config = typeConfig[participant.type];
        return (
          <div className="flex items-center justify-center gap-1.5">
            <Badge className={config.className}>
              {config.label}
            </Badge>
            {"suffix" in config && (
              <span className="text-xs text-muted-foreground">{config.suffix}</span>
            )}
          </div>
        );
      },
    },
    {
      key: "age",
      header: "Age",
      className: "text-center",
      mobilePriority: "secondary",
      mobileLabel: "Age",
      render: (participant) => (
        <span className="text-muted-foreground">{participant.age}</span>
      ),
    },
    {
      key: "gender",
      header: "Gender",
      className: "text-center",
      mobilePriority: "secondary",
      mobileLabel: "Gender",
      render: (participant) => {
        const config = genderConfig[participant.gender];
        return (
          <Badge variant="outline" className={config.className}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      key: "eventName",
      header: "Event",
      mobilePriority: "hidden",
      render: (participant) => (
        <div>
          <span className="text-sm">{participant.eventName}</span>
          <p className="text-xs text-muted-foreground">
            Batch #{participant.batchNumber}
          </p>
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-20",
      mobilePriority: "primary",
      render: (participant) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(participant);
            }}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(participant);
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      ),
    },
  ];
}
