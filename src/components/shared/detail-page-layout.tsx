"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * DetailCard - Responsive card wrapper for detail page sections
 * - Responsive padding: p-4 on mobile, p-6 on desktop
 * - Consistent styling with rounded corners and border
 */
interface DetailCardProps {
  children: ReactNode;
  className?: string;
}

export function DetailCard({ children, className }: DetailCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 md:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * DetailCardHeader - Header section for detail cards with icon and title
 * - Responsive text sizes
 * - Proper spacing and alignment
 */
interface DetailCardHeaderProps {
  icon?: ReactNode;
  title: string;
  badge?: ReactNode;
  className?: string;
}

export function DetailCardHeader({
  icon,
  title,
  badge,
  className,
}: DetailCardHeaderProps) {
  return (
    <div className={cn("flex items-center gap-2 mb-3 md:mb-4", className)}>
      {icon && (
        <span className="text-muted-foreground [&>svg]:h-4 [&>svg]:w-4 md:[&>svg]:h-5 md:[&>svg]:w-5">
          {icon}
        </span>
      )}
      <h3 className="text-base md:text-lg font-semibold">{title}</h3>
      {badge && <span className="ml-auto">{badge}</span>}
    </div>
  );
}

/**
 * DetailGrid - Responsive grid for detail page cards
 * - Stacks on mobile, 2 or 3 columns on desktop
 */
interface DetailGridProps {
  children: ReactNode;
  columns?: 2 | 3;
  className?: string;
}

export function DetailGrid({
  children,
  columns = 2,
  className,
}: DetailGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 md:gap-6",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * DetailSection - Section wrapper with title and responsive spacing
 */
interface DetailSectionProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function DetailSection({
  children,
  title,
  className,
}: DetailSectionProps) {
  return (
    <section className={cn("space-y-4 md:space-y-6", className)}>
      {title && (
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
      )}
      {children}
    </section>
  );
}

/**
 * DetailMetadata - Display key-value metadata pairs responsively
 */
interface DetailMetadataProps {
  items: Array<{
    label: string;
    value: ReactNode;
  }>;
  columns?: 1 | 2;
  className?: string;
}

export function DetailMetadata({
  items,
  columns = 2,
  className,
}: DetailMetadataProps) {
  return (
    <dl
      className={cn(
        "grid gap-3 md:gap-4",
        columns === 2 && "sm:grid-cols-2",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index}>
          <dt className="text-xs md:text-sm text-muted-foreground">
            {item.label}
          </dt>
          <dd className="text-sm md:text-base font-medium mt-0.5">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * DetailInfoRow - Horizontal row with label and value
 * Stacks on very small screens, inline on larger
 */
interface DetailInfoRowProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function DetailInfoRow({ label, value, className }: DetailInfoRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4",
        className
      )}
    >
      <dt className="text-xs md:text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm md:text-base font-medium sm:text-right">
        {value}
      </dd>
    </div>
  );
}

/**
 * DetailActions - Mobile-responsive action buttons container
 * - Fixed at bottom on mobile with safe area support
 * - Inline in header on desktop
 */
interface DetailActionsProps {
  children: ReactNode;
  sticky?: boolean;
  className?: string;
}

export function DetailActions({
  children,
  sticky = false,
  className,
}: DetailActionsProps) {
  if (sticky) {
    return (
      <>
        {/* Spacer for mobile to prevent content being hidden behind sticky actions */}
        <div className="h-20 md:hidden" />
        {/* Sticky actions bar on mobile */}
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40 md:hidden",
            "bg-background border-t border-border",
            "p-4 safe-area-bottom",
            className
          )}
        >
          <div className="flex gap-2 [&>*]:flex-1">{children}</div>
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:gap-2",
        "[&>button]:w-full [&>button]:sm:w-auto",
        "[&>a]:w-full [&>a]:sm:w-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * DetailPageHeader - Responsive page header for detail pages
 * - Title and back button on the same row
 * - Actions below title on mobile, inline on desktop
 */
interface DetailPageHeaderProps {
  title: string;
  description?: ReactNode;
  backButton?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function DetailPageHeader({
  title,
  description,
  backButton,
  actions,
  className,
}: DetailPageHeaderProps) {
  return (
    <div className={cn("space-y-4 mb-4 md:mb-6", className)}>
      {/* Title row with back button */}
      <div className="flex items-start gap-3 md:gap-4">
        {backButton && (
          <div className="shrink-0 -ml-2 md:ml-0">{backButton}</div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold truncate">{title}</h1>
          {description && (
            <div className="text-sm md:text-base text-muted-foreground mt-1">
              {description}
            </div>
          )}
        </div>
        {/* Actions inline on desktop */}
        {actions && (
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
      {/* Actions stacked below on mobile */}
      {actions && (
        <div className="flex flex-col gap-2 md:hidden [&>button]:w-full [&>a]:w-full">
          {actions}
        </div>
      )}
    </div>
  );
}

/**
 * DetailList - Responsive list of items with links
 */
interface DetailListProps {
  items: Array<{
    id: string;
    label: string;
    href?: string;
    sublabel?: string;
  }>;
  emptyMessage?: string;
  className?: string;
}

export function DetailList({
  items,
  emptyMessage = "No items",
  className,
}: DetailListProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm md:text-base text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className={cn("space-y-2 md:space-y-3", className)}>
      {items.map((item) => (
        <li key={item.id} className="min-h-[44px] flex items-center">
          {item.href ? (
            <a
              href={item.href}
              className="text-sm md:text-base text-primary hover:underline font-medium touch-target"
            >
              {item.label}
            </a>
          ) : (
            <div>
              <p className="text-sm md:text-base font-medium">{item.label}</p>
              {item.sublabel && (
                <p className="text-xs md:text-sm text-muted-foreground">
                  {item.sublabel}
                </p>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * StatsCard - Compact stats display for detail pages
 */
interface StatsCardProps {
  icon?: ReactNode;
  value: string | number;
  label: string;
  className?: string;
}

export function StatsCard({ icon, value, label, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 md:p-4 rounded-lg bg-muted/50",
        className
      )}
    >
      {icon && (
        <span className="text-primary [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8">
          {icon}
        </span>
      )}
      <div>
        <p className="text-xl md:text-2xl font-bold">{value}</p>
        <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

/**
 * DetailTwoColumn - Two column layout that stacks on mobile
 * - Main content on left (2/3 width on desktop)
 * - Sidebar on right (1/3 width on desktop)
 */
interface DetailTwoColumnProps {
  children: ReactNode;
  sidebar: ReactNode;
  className?: string;
}

export function DetailTwoColumn({
  children,
  sidebar,
  className,
}: DetailTwoColumnProps) {
  return (
    <div className={cn("grid gap-4 md:gap-6 lg:grid-cols-3", className)}>
      <div className="space-y-4 md:space-y-6 lg:col-span-2">{children}</div>
      <div className="space-y-4 md:space-y-6">{sidebar}</div>
    </div>
  );
}
