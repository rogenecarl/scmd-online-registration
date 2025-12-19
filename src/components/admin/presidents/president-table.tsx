"use client";

import { useState } from "react";
import { PaginatedDataTable } from "@/components/dashboard/paginated-data-table";
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
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination";

export function PresidentTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
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

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, error, isFetching } = usePresidents({
    page,
    pageSize,
    search: debouncedSearch,
  });
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

  const presidents = data?.items ?? [];
  const hasData = presidents.length > 0 || debouncedSearch;

  return (
    <>
      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search presidents..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table or Empty State */}
      {hasData ? (
        <PaginatedDataTable
          columns={columns}
          data={presidents}
          emptyMessage={
            debouncedSearch
              ? "No presidents match your search"
              : "No presidents found"
          }
          isLoading={isFetching}
          pagination={{
            page: data?.page ?? 1,
            pageSize: data?.pageSize ?? pageSize,
            total: data?.total ?? 0,
            totalPages: data?.totalPages ?? 0,
            onPageChange: setPage,
            onPageSizeChange: setPageSize,
          }}
        />
      ) : (
        <EmptyState
          icon={UserCog}
          title="No presidents found"
          description="Get started by creating your first president account"
          action={{ label: "Add President", href: "/admin/presidents/create" }}
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
