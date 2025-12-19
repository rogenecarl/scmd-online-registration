"use client";

import type { DivisionWithCounts } from "@/actions/divisions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
};

export function getDivisionColumns(
  onDelete: (id: string, name: string) => void
): Column<DivisionWithCounts>[] {
  return [
    {
      key: "name",
      header: "Division Name",
      render: (division) => (
        <Link
          href={`/admin/divisions/${division.id}`}
          className="font-medium hover:underline"
        >
          {division.name}
        </Link>
      ),
    },
    {
      key: "coordinator",
      header: "Coordinator",
      render: (division) =>
        division.coordinator ? (
          <span>{division.coordinator.name}</span>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">
            No Coordinator
          </Badge>
        ),
    },
    {
      key: "_count.churches",
      header: "Churches",
      className: "text-center",
      render: (division) => (
        <Badge variant="secondary">{division._count.churches}</Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (division) => (
        <span className="text-muted-foreground">
          {new Date(division.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      render: (division) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/divisions/${division.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/divisions/${division.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(division.id, division.name)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];
}
