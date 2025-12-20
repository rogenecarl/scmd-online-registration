"use client";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Responsive page header component.
 *
 * Mobile: Stacks title/description and action button vertically, button is full-width
 * Desktop: Title/description on left, action button on right
 */
export function PageHeader({
  title,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-4 md:mb-6 md:flex-row md:items-center md:justify-between",
        className
      )}
    >
      <div className="space-y-0.5 md:space-y-1">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <div className="text-xs md:text-sm text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      {children && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center [&>a]:w-full [&>a]:sm:w-auto [&>button]:w-full [&>button]:sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
}
