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
import { useDivisions, useDeleteDivision } from "@/hooks/use-divisions";
import { getDivisionColumns } from "./division-columns";
import { useDebounce } from "@/hooks/use-debounce";
import { Building2, Search } from "lucide-react";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination";

export function DivisionTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const debouncedSearch = useDebounce(search, 300);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, error, isFetching } = useDivisions({
    page,
    pageSize,
    search: debouncedSearch,
  });
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

  const divisions = data?.items ?? [];
  const hasData = divisions.length > 0 || debouncedSearch;

  return (
    <>
      {/* Search - Full width on mobile */}
      <div className="relative mb-4 w-full md:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search divisions..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table or Empty State */}
      {hasData ? (
        <PaginatedDataTable
          columns={columns}
          data={divisions}
          emptyMessage={
            debouncedSearch
              ? "No divisions match your search"
              : "No divisions found"
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
          icon={Building2}
          title="No divisions found"
          description="Get started by creating your first division"
          action={{ label: "Add Division", href: "/admin/divisions/create" }}
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
