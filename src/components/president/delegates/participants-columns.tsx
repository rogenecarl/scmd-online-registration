"use client";

import type { ApprovedParticipant } from "@/actions/registrations";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, ChefHat } from "lucide-react";

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
    icon: Users,
    label: "Delegate",
    variant: "default" as const,
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  sibling: {
    icon: Heart,
    label: "Sibling",
    variant: "secondary" as const,
    className: "bg-pink-100 text-pink-700 hover:bg-pink-100",
  },
  cook: {
    icon: ChefHat,
    label: "Cook",
    variant: "outline" as const,
    className: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  },
};

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

export function getParticipantsColumns(): Column<ApprovedParticipant>[] {
  return [
    {
      key: "fullName",
      header: "Name",
      mobilePriority: "primary",
      mobileFullWidth: true,
      render: (participant) => (
        <div>
          <span className="font-medium">{participant.fullName}</span>
          {participant.nickname && (
            <p className="text-xs text-muted-foreground">
              &quot;{participant.nickname}&quot;
            </p>
          )}
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
        const Icon = config.icon;
        return (
          <Badge className={config.className}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
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
  ];
}
