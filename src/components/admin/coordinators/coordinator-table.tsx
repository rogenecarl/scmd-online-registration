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
import { useCoordinators, useDeleteCoordinator } from "@/hooks/use-coordinators";
import { getCoordinatorColumns } from "./coordinator-columns";
import { useDebounce } from "@/hooks/use-debounce";
import { User, Search } from "lucide-react";

export function CoordinatorTable() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data: coordinators, isLoading, error } = useCoordinators(debouncedSearch);
  const deleteMutation = useDeleteCoordinator();
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

  const columns = getCoordinatorColumns(handleDelete);

  if (isLoading) {
    return <TableSkeleton rows={5} columns={4} />;
  }

  if (error) {
    return (
      <EmptyState
        icon={User}
        title="Error loading coordinators"
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
          placeholder="Search coordinators..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table or Empty State */}
      {coordinators && coordinators.length > 0 ? (
        <DataTable columns={columns} data={coordinators} />
      ) : (
        <EmptyState
          icon={User}
          title="No coordinators found"
          description={
            search
              ? "Try adjusting your search"
              : "Get started by assigning your first coordinator"
          }
          action={
            !search
              ? { label: "Add Coordinator", href: "/admin/coordinators/create" }
              : undefined
          }
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirmDialog.isOpen}
        onOpenChange={confirmDialog.setIsOpen}
        title="Delete Coordinator"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
