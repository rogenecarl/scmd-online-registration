"use client";

import type { ChurchWithRelations } from "@/actions/churches";
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

export function getChurchColumns(
  onDelete: (id: string, name: string) => void
): Column<ChurchWithRelations>[] {
  return [
    {
      key: "name",
      header: "Church Name",
      render: (church) => (
        <Link
          href={`/admin/churches/${church.id}`}
          className="font-medium hover:underline"
        >
          {church.name}
        </Link>
      ),
    },
    {
      key: "division",
      header: "Division",
      render: (church) => (
        <Link
          href={`/admin/divisions/${church.division.id}`}
          className="text-muted-foreground hover:underline"
        >
          {church.division.name}
        </Link>
      ),
    },
    {
      key: "pastor",
      header: "Pastor",
      render: (church) =>
        church.pastor ? (
          <span>{church.pastor.name}</span>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">
            No Pastor
          </Badge>
        ),
    },
    {
      key: "_count.presidents",
      header: "Presidents",
      className: "text-center",
      render: (church) => (
        <Badge variant="secondary">{church._count.presidents}</Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (church) => (
        <span className="text-muted-foreground">
          {new Date(church.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      render: (church) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/churches/${church.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/churches/${church.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(church.id, church.name)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];
}
