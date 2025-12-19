"use client";

import { useState } from "react";
import { DataTable } from "@/components/dashboard/data-table";
import { Input } from "@/components/ui/input";
import {
  ConfirmDialog,
  useConfirmDialog,
} from "@/components/shared/confirm-dialog";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { useDivisions, useDeleteDivision } from "@/hooks/use-divisions";
import { getDivisionColumns } from "./division-columns";
import { useDebounce } from "@/hooks/use-debounce";
import { Building2, Search } from "lucide-react";

export function DivisionTable() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data: divisions, isLoading, error } = useDivisions(debouncedSearch);
  const deleteMutation = useDeleteDivision();
  const confirmDialog = useConfirmDialog();

  const handleDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
    confirmDialog.open();
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteMutation.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const columns = getDivisionColumns(handleDelete);

  if (isLoading) {
    return <TableSkeleton rows={5} columns={4} />;
  }

  if (error) {
    return (
      <EmptyState
        icon={Building2}
        title="Error loading divisions"
        description={error.message}
      />
    );
  }

  return (
    <>
      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search divisions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table or Empty State */}
      {divisions && divisions.length > 0 ? (
        <DataTable columns={columns} data={divisions} />
      ) : (
        <EmptyState
          icon={Building2}
          title="No divisions found"
          description={
            search
              ? "Try adjusting your search"
              : "Get started by creating your first division"
          }
          action={
            !search
              ? { label: "Add Division", href: "/admin/divisions/create" }
              : undefined
          }
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirmDialog.isOpen}
        onOpenChange={confirmDialog.setIsOpen}
        title="Delete Division"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
