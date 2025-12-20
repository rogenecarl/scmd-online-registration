"use client";

import type { CoordinatorWithDivision } from "@/actions/coordinators";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";

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

export function getCoordinatorColumns(
  onDelete: (id: string, name: string) => void
): Column<CoordinatorWithDivision>[] {
  return [
    {
      key: "name",
      header: "Coordinator Name",
      mobilePriority: "primary",
      render: (coordinator) => (
        <Link
          href={`/admin/coordinators/${coordinator.id}`}
          className="font-medium hover:underline"
        >
          {coordinator.name}
        </Link>
      ),
    },
    {
      key: "division",
      header: "Division",
      mobilePriority: "primary",
      render: (coordinator) => (
        <Link
          href={`/admin/divisions/${coordinator.division.id}`}
          className="text-muted-foreground hover:underline"
        >
          {coordinator.division.name}
        </Link>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      mobilePriority: "secondary",
      render: (coordinator) => (
        <span className="text-muted-foreground">
          {new Date(coordinator.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      mobilePriority: "primary",
      render: (coordinator) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/coordinators/${coordinator.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/coordinators/${coordinator.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(coordinator.id, coordinator.name)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];
}
