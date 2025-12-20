"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGE_SIZE_OPTIONS, getPaginationMeta } from "@/lib/pagination";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  isLoading?: boolean;
  className?: string;
}

export function Pagination({
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
  isLoading,
  className,
}: PaginationProps) {
  const { hasNextPage, hasPrevPage, startItem, endItem } = getPaginationMeta(
    total,
    page,
    pageSize
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Pagination */}
      <div className="hidden md:flex items-center justify-between gap-4">
        {/* Items count display - LEFT */}
        <div className="text-sm text-muted-foreground">
          {total > 0 ? (
            <>
              Showing{" "}
              <span className="font-medium text-foreground">{startItem}</span>{" "}
              to <span className="font-medium text-foreground">{endItem}</span>{" "}
              of <span className="font-medium text-foreground">{total}</span>{" "}
              results
            </>
          ) : (
            "No results"
          )}
        </div>

        {/* Controls - RIGHT */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Rows per page
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                onPageSizeChange(Number(value));
                onPageChange(1); // Reset to first page when changing page size
              }}
              disabled={isLoading}
            >
              <SelectTrigger size="sm" className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => onPageChange(1)}
              disabled={!hasPrevPage || isLoading}
              aria-label="Go to first page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => onPageChange(page - 1)}
              disabled={!hasPrevPage || isLoading}
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="mx-2 text-sm text-muted-foreground">
              Page <span className="font-medium text-foreground">{page}</span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {totalPages || 1}
              </span>
            </span>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => onPageChange(page + 1)}
              disabled={!hasNextPage || isLoading}
              aria-label="Go to next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => onPageChange(totalPages)}
              disabled={!hasNextPage || isLoading}
              aria-label="Go to last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Pagination - Simplified */}
      <div className="flex md:hidden flex-col gap-3">
        {/* Page info and navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrevPage || isLoading}
            className="touch-target"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>

          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{page}</span>
            {" / "}
            <span className="font-medium text-foreground">
              {totalPages || 1}
            </span>
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage || isLoading}
            className="touch-target"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Items count */}
        <div className="text-xs text-center text-muted-foreground">
          {total > 0 ? (
            <>
              {startItem}-{endItem} of {total}
            </>
          ) : (
            "No results"
          )}
        </div>
      </div>
    </div>
  );
}
