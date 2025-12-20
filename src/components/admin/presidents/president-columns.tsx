"use client";

import type { PresidentWithChurch } from "@/actions/presidents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Eye, KeyRound, UserX } from "lucide-react";
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

type PresidentActions = {
  onDelete: (id: string, name: string) => void;
  onDeactivate: (id: string, name: string) => void;
  onResetPassword: (id: string, name: string) => void;
};

export function getPresidentColumns(
  actions: PresidentActions
): Column<PresidentWithChurch>[] {
  return [
    {
      key: "name",
      header: "Name",
      mobilePriority: "primary",
      render: (president) => (
        <Link
          href={`/admin/presidents/${president.id}`}
          className="font-medium hover:underline"
        >
          {president.name}
        </Link>
      ),
    },
    {
      key: "email",
      header: "Email",
      mobilePriority: "secondary",
      render: (president) => (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground truncate max-w-[150px]">
            {president.email}
          </span>
          {president.emailVerified && (
            <Badge variant="secondary" className="text-xs shrink-0">
              Verified
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "church",
      header: "Church",
      mobilePriority: "primary",
      render: (president) =>
        president.church ? (
          <Link
            href={`/admin/churches/${president.church.id}`}
            className="text-muted-foreground hover:underline"
          >
            {president.church.name}
          </Link>
        ) : (
          <span className="text-muted-foreground italic">No church</span>
        ),
    },
    {
      key: "division",
      header: "Division",
      mobilePriority: "hidden",
      render: (president) =>
        president.church?.division ? (
          <Link
            href={`/admin/divisions/${president.church.division.id}`}
            className="text-muted-foreground hover:underline"
          >
            {president.church.division.name}
          </Link>
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      key: "createdAt",
      header: "Created",
      mobilePriority: "hidden",
      render: (president) => (
        <span className="text-muted-foreground">
          {new Date(president.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-36",
      mobilePriority: "primary",
      render: (president) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild title="View details">
            <Link href={`/admin/presidents/${president.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild title="Edit">
            <Link href={`/admin/presidents/${president.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => actions.onResetPassword(president.id, president.name)}
            title="Reset password"
          >
            <KeyRound className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => actions.onDeactivate(president.id, president.name)}
            title="Deactivate"
          >
            <UserX className="h-4 w-4 text-yellow-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => actions.onDelete(president.id, president.name)}
            title="Delete"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];
}
