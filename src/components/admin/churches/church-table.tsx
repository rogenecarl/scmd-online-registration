"use client";

import { useState } from "react";
import { PaginatedDataTable } from "@/components/dashboard/paginated-data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ConfirmDialog,
  useConfirmDialog,
  MobileFilterSheet,
  FilterGroup,
} from "@/components/shared";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { useChurches, useDeleteChurch } from "@/hooks/use-churches";
import { useDivisionsForSelect } from "@/hooks/use-divisions";
import { getChurchColumns } from "./church-columns";
import { useDebounce } from "@/hooks/use-debounce";
import { Church, Search } from "lucide-react";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination";

export function ChurchTable() {
  const [search, setSearch] = useState("");
  const [divisionId, setDivisionId] = useState<string>("all");
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

  const handleDivisionChange = (value: string) => {
    setDivisionId(value);
    setPage(1);
  };

  const { data, isLoading, error, isFetching } = useChurches({
    page,
    pageSize,
    search: debouncedSearch || undefined,
    divisionId: divisionId === "all" ? undefined : divisionId || undefined,
  });
  const { data: divisions } = useDivisionsForSelect();
  const deleteMutation = useDeleteChurch();
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

  const columns = getChurchColumns(handleDelete);

  if (isLoading) {
    return <TableSkeleton rows={5} columns={5} />;
  }

  if (error) {
    return (
      <EmptyState
        icon={Church}
        title="Error loading churches"
        description={error.message}
      />
    );
  }

  const churches = data?.items ?? [];
  const hasFilters = debouncedSearch || divisionId !== "all";
  const hasData = churches.length > 0 || hasFilters;

  const activeFilterCount = divisionId !== "all" ? 1 : 0;

  const handleClearFilters = () => {
    setDivisionId("all");
    setPage(1);
  };

  // Division select options (reused in desktop and mobile views)
  const divisionSelectContent = (
    <SelectContent>
      <SelectItem value="all">All Divisions</SelectItem>
      {divisions?.map((division) => (
        <SelectItem key={division.id} value={division.id}>
          {division.name}
        </SelectItem>
      ))}
    </SelectContent>
  );

  return (
    <>
      {/* Filters */}
      <div className="flex gap-3 mb-4">
        {/* Search - Full width on mobile */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search churches..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Desktop filter - Hidden on mobile */}
        <div className="hidden md:block">
          <Select value={divisionId} onValueChange={handleDivisionChange}>
            <SelectTrigger className="w-[140px] shrink-0">
              <SelectValue placeholder="All Divisions" />
            </SelectTrigger>
            {divisionSelectContent}
          </Select>
        </div>

        {/* Mobile filter sheet */}
        <MobileFilterSheet
          activeFilterCount={activeFilterCount}
          onClear={handleClearFilters}
        >
          <FilterGroup label="Division">
            <Select value={divisionId} onValueChange={handleDivisionChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Divisions" />
              </SelectTrigger>
              {divisionSelectContent}
            </Select>
          </FilterGroup>
        </MobileFilterSheet>
      </div>

      {/* Table or Empty State */}
      {hasData ? (
        <PaginatedDataTable
          columns={columns}
          data={churches}
          emptyMessage={
            hasFilters
              ? "No churches match your filters"
              : "No churches found"
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
          icon={Church}
          title="No churches found"
          description="Get started by creating your first church"
          action={{ label: "Add Church", href: "/admin/churches/create" }}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirmDialog.isOpen}
        onOpenChange={confirmDialog.setIsOpen}
        title="Delete Church"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
