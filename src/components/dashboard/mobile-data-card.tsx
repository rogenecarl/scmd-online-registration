"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Extended column interface with mobile support
export interface MobileColumn<T> {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
  // Mobile-specific properties
  mobileVisible?: boolean; // Show in mobile card (default: true)
  mobilePriority?: "primary" | "secondary" | "hidden"; // Display priority
  mobileLabel?: string; // Custom label for mobile (defaults to header)
  mobileFullWidth?: boolean; // Take full width in mobile card
}

interface CardFieldProps {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export function CardField({
  label,
  children,
  fullWidth,
  className,
}: CardFieldProps) {
  return (
    <div className={cn("space-y-0.5", fullWidth && "col-span-2", className)}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm">{children}</dd>
    </div>
  );
}

interface MobileDataCardProps<T> {
  item: T;
  columns: MobileColumn<T>[];
  onClick?: () => void;
  className?: string;
}

export function MobileDataCard<T extends Record<string, unknown>>({
  item,
  columns,
  onClick,
  className,
}: MobileDataCardProps<T>) {
  const getValue = (item: T, key: string): unknown => {
    return key.split(".").reduce<unknown>((obj, k) => {
      if (obj && typeof obj === "object" && k in obj) {
        return (obj as Record<string, unknown>)[k];
      }
      return undefined;
    }, item);
  };

  // Separate columns by priority
  const primaryColumns = columns.filter(
    (col) =>
      col.mobilePriority === "primary" ||
      (col.mobilePriority === undefined &&
        col.key !== "actions" &&
        col.mobileVisible !== false)
  );

  const secondaryColumns = columns.filter(
    (col) => col.mobilePriority === "secondary"
  );

  const actionsColumn = columns.find((col) => col.key === "actions");

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 transition-colors",
        onClick && "cursor-pointer hover:bg-muted/30 active:bg-muted/50",
        className
      )}
      onClick={onClick}
    >
      {/* Card Header: Primary info + Actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* First primary column as title */}
          {primaryColumns[0] && (
            <div className="font-medium">
              {primaryColumns[0].render
                ? primaryColumns[0].render(item)
                : String(getValue(item, String(primaryColumns[0].key)) ?? "-")}
            </div>
          )}
        </div>

        {/* Actions column render */}
        {actionsColumn && (
          <div
            className="flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {actionsColumn.render?.(item)}
          </div>
        )}
      </div>

      {/* Secondary info in grid */}
      {(primaryColumns.length > 1 || secondaryColumns.length > 0) && (
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
          {/* Remaining primary columns */}
          {primaryColumns.slice(1).map((column) => (
            <CardField
              key={String(column.key)}
              label={column.mobileLabel || column.header}
              fullWidth={column.mobileFullWidth}
            >
              {column.render
                ? column.render(item)
                : String(getValue(item, String(column.key)) ?? "-")}
            </CardField>
          ))}

          {/* Secondary columns */}
          {secondaryColumns.map((column) => (
            <CardField
              key={String(column.key)}
              label={column.mobileLabel || column.header}
              fullWidth={column.mobileFullWidth}
            >
              {column.render
                ? column.render(item)
                : String(getValue(item, String(column.key)) ?? "-")}
            </CardField>
          ))}
        </dl>
      )}
    </div>
  );
}

interface MobileCardListProps<T> {
  data: T[];
  columns: MobileColumn<T>[];
  emptyMessage?: string;
  onItemClick?: (item: T) => void;
  className?: string;
  isLoading?: boolean;
}

export function MobileCardList<T extends Record<string, unknown>>({
  data,
  columns,
  emptyMessage = "No data available",
  onItemClick,
  className,
  isLoading,
}: MobileCardListProps<T>) {
  if (data.length === 0) {
    return (
      <div
        className={cn(
          "rounded-lg border border-border bg-card p-8 text-center",
          className
        )}
      >
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-3",
        isLoading && "opacity-60 pointer-events-none",
        className
      )}
    >
      {data.map((item, index) => (
        <MobileDataCard
          key={index}
          item={item}
          columns={columns}
          onClick={onItemClick ? () => onItemClick(item) : undefined}
        />
      ))}
    </div>
  );
}
