"use client";

import { useState } from "react";
import { DataTable } from "@/components/dashboard/data-table";
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
} from "@/components/shared/confirm-dialog";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { useChurches, useDeleteChurch } from "@/hooks/use-churches";
import { useDivisionsForSelect } from "@/hooks/use-divisions";
import { getChurchColumns } from "./church-columns";
import { useDebounce } from "@/hooks/use-debounce";
import { Church, Search } from "lucide-react";

export function ChurchTable() {
  const [search, setSearch] = useState("");
  const [divisionId, setDivisionId] = useState<string>("all");
  const debouncedSearch = useDebounce(search, 300);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data: churches, isLoading, error } = useChurches({
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

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search churches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={divisionId} onValueChange={setDivisionId}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Divisions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Divisions</SelectItem>
            {divisions?.map((division) => (
              <SelectItem key={division.id} value={division.id}>
                {division.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table or Empty State */}
      {churches && churches.length > 0 ? (
        <DataTable columns={columns} data={churches} />
      ) : (
        <EmptyState
          icon={Church}
          title="No churches found"
          description={
            search || divisionId !== "all"
              ? "Try adjusting your filters"
              : "Get started by creating your first church"
          }
          action={
            !search && divisionId === "all"
              ? { label: "Add Church", href: "/admin/churches/create" }
              : undefined
          }
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
