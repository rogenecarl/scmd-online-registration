"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * FormCard - Responsive card wrapper for forms
 *
 * - Full-width on mobile with reduced padding
 * - Max-width constraint on desktop
 */
interface FormCardProps {
  children: ReactNode;
  className?: string;
  /** Max width constraint. Default: "md" (max-w-md) */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

export function FormCard({ children, className, maxWidth = "md" }: FormCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card",
        "p-4 md:p-6",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * FormActions - Responsive button container for form submit/cancel buttons
 *
 * Mobile: Buttons stack vertically, full-width
 * Desktop: Buttons inline with gap
 */
interface FormActionsProps {
  children: ReactNode;
  className?: string;
  /** Stack buttons on mobile. Default: true */
  mobileStack?: boolean;
}

export function FormActions({ children, className, mobileStack = true }: FormActionsProps) {
  return (
    <div
      className={cn(
        "flex gap-2 pt-2",
        mobileStack && "flex-col-reverse sm:flex-row",
        // Make buttons full-width on mobile when stacked
        mobileStack && "[&>button]:w-full [&>button]:sm:w-auto [&>a]:w-full [&>a]:sm:w-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * FormSection - Responsive form section with title and description
 *
 * Use this to group related form fields together
 */
interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-base md:text-lg font-semibold tracking-tight">{title}</h3>
          )}
          {description && (
            <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * FormGrid - Responsive grid layout for form fields
 *
 * Stacks on mobile, multi-column on larger screens
 */
interface FormGridProps {
  children: ReactNode;
  className?: string;
  /** Number of columns on desktop. Default: 2 */
  columns?: 2 | 3 | 4;
}

export function FormGrid({ children, className, columns = 2 }: FormGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}
