"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MobileCardList, type MobileColumn } from "./mobile-data-card";

// Re-export MobileColumn for use in column definitions
export type { MobileColumn };

// Standard Column interface (for backward compatibility)
export interface Column<T> {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
  // Mobile-specific properties
  mobileVisible?: boolean;
  mobilePriority?: "primary" | "secondary" | "hidden";
  mobileLabel?: string;
  mobileFullWidth?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No data available",
  className,
  onRowClick,
}: DataTableProps<T>) {
  const getValue = (item: T, key: string): unknown => {
    return key.split(".").reduce<unknown>((obj, k) => {
      if (obj && typeof obj === "object" && k in obj) {
        return (obj as Record<string, unknown>)[k];
      }
      return undefined;
    }, item);
  };

  // Filter columns for mobile view (exclude hidden priority)
  const mobileColumns = columns.filter(
    (col) => col.mobilePriority !== "hidden"
  ) as MobileColumn<T>[];

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="md:hidden">
        <MobileCardList
          data={data}
          columns={mobileColumns}
          emptyMessage={emptyMessage}
          onItemClick={onRowClick}
          className={className}
        />
      </div>

      {/* Desktop Table Layout */}
      <div
        className={cn(
          "hidden md:block rounded-xl border border-border bg-card overflow-hidden",
          className
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                      column.className
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "transition-colors hover:bg-muted/30",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={cn("px-4 py-3 text-sm", column.className)}
                      >
                        {column.render
                          ? column.render(item)
                          : String(getValue(item, String(column.key)) ?? "-")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
