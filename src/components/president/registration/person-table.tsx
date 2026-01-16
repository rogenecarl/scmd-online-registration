"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  Users,
  UsersRound,
  ChefHat,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PersonFormData, PersonType } from "./person-dialog";

interface PersonTableProps {
  type: PersonType;
  persons: PersonFormData[];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  maxCount?: number;
  emptyMessage?: string;
  discountApplied?: boolean;
  className?: string;
  itemsPerPage?: number;
}

const typeConfig = {
  delegate: {
    icon: Users,
    label: "Delegate",
    labelPlural: "Delegates",
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
    buttonColor: "",
  },
  sibling: {
    icon: UsersRound,
    label: "Sibling",
    labelPlural: "Siblings",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    buttonColor: "border-emerald-300 hover:bg-emerald-50 dark:border-emerald-700 dark:hover:bg-emerald-950",
  },
  cook: {
    icon: ChefHat,
    label: "Cook",
    labelPlural: "Cooks",
    color: "text-amber-600",
    bgColor: "bg-amber-50/50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    buttonColor: "border-amber-300 hover:bg-amber-50 dark:border-amber-700 dark:hover:bg-amber-950",
  },
};

export function PersonTable({
  type,
  persons,
  onAdd,
  onEdit,
  onRemove,
  maxCount = 100,
  emptyMessage,
  discountApplied = false,
  className,
  itemsPerPage = 10,
}: PersonTableProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const isEmpty = persons.length === 0;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(persons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPersons = persons.slice(startIndex, endIndex);

  // Reset to page 1 when persons change significantly (e.g., after removal)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [persons.length, totalPages, currentPage]);

  // Go to last page when a new person is added
  useEffect(() => {
    if (persons.length > 0) {
      const newTotalPages = Math.ceil(persons.length / itemsPerPage);
      // Only go to last page if we just added someone (not on initial load)
      if (newTotalPages > totalPages) {
        setCurrentPage(newTotalPages);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persons.length, itemsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Get the actual index in the full array
  const getActualIndex = (paginatedIndex: number) => startIndex + paginatedIndex;

  // Only show pagination if we have more than one page
  const showPagination = totalPages > 1;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Header with Add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={cn("h-4 w-4", config.color)} />
          <span className="font-medium text-sm">
            {config.labelPlural}
            {persons.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {persons.length}
              </Badge>
            )}
          </span>
          {type === "sibling" && discountApplied && (
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 border-0">
              Discount Active
            </Badge>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
          disabled={persons.length >= maxCount}
          className={cn("touch-target", config.buttonColor)}
        >
          <Plus className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Add {config.label}</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Empty state */}
      {isEmpty && (
        <div
          className={cn(
            "rounded-lg border border-dashed p-6 text-center",
            type === "sibling" ? config.borderColor : "border-border"
          )}
        >
          <Icon className={cn("mx-auto h-8 w-8 mb-2 opacity-50", config.color)} />
          <p className="text-sm text-muted-foreground">
            {emptyMessage || `No ${config.labelPlural.toLowerCase()} added yet.`}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn("mt-3", config.buttonColor)}
            onClick={onAdd}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add First {config.label}
          </Button>
        </div>
      )}

      {/* Desktop Table View */}
      {!isEmpty && (
        <div className="hidden sm:block rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-20">Age</TableHead>
                <TableHead className="w-24">Gender</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPersons.map((person, paginatedIndex) => {
                const actualIndex = getActualIndex(paginatedIndex);
                return (
                  <TableRow key={actualIndex}>
                    <TableCell className="font-medium text-muted-foreground">
                      {actualIndex + 1}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{person.fullName}</p>
                        {person.nickname && (
                          <p className="text-xs text-muted-foreground">
                            &ldquo;{person.nickname}&rdquo;
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{person.age}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {person.gender.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-500 dark:hover:text-emerald-400 dark:hover:bg-emerald-950"
                          onClick={() => onEdit(actualIndex)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:text-red-400 dark:hover:bg-red-950"
                          onClick={() => onRemove(actualIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Mobile Card View */}
      {!isEmpty && (
        <div className="sm:hidden space-y-2">
          {paginatedPersons.map((person, paginatedIndex) => {
            const actualIndex = getActualIndex(paginatedIndex);
            return (
              <div
                key={actualIndex}
                className="rounded-lg border bg-card p-3 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {actualIndex + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{person.fullName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{person.age} yrs</span>
                      <span>•</span>
                      <span className="capitalize">{person.gender.toLowerCase()}</span>
                      {person.nickname && (
                        <>
                          <span>•</span>
                          <span>&ldquo;{person.nickname}&rdquo;</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-500 dark:hover:text-emerald-400 dark:hover:bg-emerald-950"
                    onClick={() => onEdit(actualIndex)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:text-red-400 dark:hover:bg-red-950"
                    onClick={() => onRemove(actualIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {showPagination && (
        <div className="flex items-center justify-between border-t pt-3">
          <p className="text-xs text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, persons.length)} of {persons.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="flex items-center gap-1 px-2">
              {/* Show page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first, last, current, and adjacent pages
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1;

                // Show ellipsis
                const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                if (showEllipsisBefore || showEllipsisAfter) {
                  return (
                    <span key={page} className="px-1 text-xs text-muted-foreground">
                      ...
                    </span>
                  );
                }

                if (!showPage) return null;

                return (
                  <Button
                    key={page}
                    type="button"
                    variant={currentPage === page ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8 text-xs"
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
