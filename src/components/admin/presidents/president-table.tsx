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
import {
  usePresidents,
  useDeletePresident,
  useDeactivatePresident,
} from "@/hooks/use-presidents";
import { getPresidentColumns } from "./president-columns";
import { ResetPasswordDialog } from "./reset-password-dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { UserCog, Search } from "lucide-react";

export function PresidentTable() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  // Target states
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deactivateTarget, setDeactivateTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [resetPasswordTarget, setResetPasswordTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data: presidents, isLoading, error } = usePresidents({ search: debouncedSearch });
  const deleteMutation = useDeletePresident();
  const deactivateMutation = useDeactivatePresident();

  const deleteDialog = useConfirmDialog();
  const deactivateDialog = useConfirmDialog();

  const handleDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
    deleteDialog.open();
  };

  const handleDeactivate = (id: string, name: string) => {
    setDeactivateTarget({ id, name });
    deactivateDialog.open();
  };

  const handleResetPassword = (id: string, name: string) => {
    setResetPasswordTarget({ id, name });
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteMutation.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const confirmDeactivate = async () => {
    if (deactivateTarget) {
      await deactivateMutation.mutateAsync(deactivateTarget.id);
      setDeactivateTarget(null);
    }
  };

  const columns = getPresidentColumns({
    onDelete: handleDelete,
    onDeactivate: handleDeactivate,
    onResetPassword: handleResetPassword,
  });

  if (isLoading) {
    return <TableSkeleton rows={5} columns={6} />;
  }

  if (error) {
    return (
      <EmptyState
        icon={UserCog}
        title="Error loading presidents"
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
          placeholder="Search presidents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table or Empty State */}
      {presidents && presidents.length > 0 ? (
        <DataTable columns={columns} data={presidents} />
      ) : (
        <EmptyState
          icon={UserCog}
          title="No presidents found"
          description={
            search
              ? "Try adjusting your search"
              : "Get started by creating your first president account"
          }
          action={
            !search
              ? { label: "Add President", href: "/admin/presidents/create" }
              : undefined
          }
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteDialog.isOpen}
        onOpenChange={deleteDialog.setIsOpen}
        title="Delete President"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone. Note: Presidents with registrations cannot be deleted.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDelete}
        isLoading={deleteMutation.isPending}
      />

      {/* Deactivate Confirmation */}
      <ConfirmDialog
        open={deactivateDialog.isOpen}
        onOpenChange={deactivateDialog.setIsOpen}
        title="Deactivate President"
        description={`Are you sure you want to deactivate "${deactivateTarget?.name}"? They will lose access to the president dashboard and be removed from their church. Their registration history will be preserved.`}
        confirmLabel="Deactivate"
        variant="destructive"
        onConfirm={confirmDeactivate}
        isLoading={deactivateMutation.isPending}
      />

      {/* Reset Password Dialog */}
      <ResetPasswordDialog
        open={!!resetPasswordTarget}
        onOpenChange={(open) => !open && setResetPasswordTarget(null)}
        presidentId={resetPasswordTarget?.id ?? ""}
        presidentName={resetPasswordTarget?.name ?? ""}
      />
    </>
  );
}
