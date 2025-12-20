"use client";

import type { PastorWithChurch } from "@/actions/pastors";
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

export function getPastorColumns(
  onDelete: (id: string, name: string) => void
): Column<PastorWithChurch>[] {
  return [
    {
      key: "name",
      header: "Pastor Name",
      mobilePriority: "primary",
      render: (pastor) => (
        <Link
          href={`/admin/pastors/${pastor.id}`}
          className="font-medium hover:underline"
        >
          {pastor.name}
        </Link>
      ),
    },
    {
      key: "church",
      header: "Church",
      mobilePriority: "primary",
      render: (pastor) => (
        <Link
          href={`/admin/churches/${pastor.church.id}`}
          className="text-muted-foreground hover:underline"
        >
          {pastor.church.name}
        </Link>
      ),
    },
    {
      key: "division",
      header: "Division",
      mobilePriority: "hidden",
      render: (pastor) => (
        <Link
          href={`/admin/divisions/${pastor.church.division.id}`}
          className="text-muted-foreground hover:underline"
        >
          {pastor.church.division.name}
        </Link>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      mobilePriority: "secondary",
      render: (pastor) => (
        <span className="text-muted-foreground">
          {new Date(pastor.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      mobilePriority: "primary",
      render: (pastor) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/pastors/${pastor.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/pastors/${pastor.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(pastor.id, pastor.name)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];
}
