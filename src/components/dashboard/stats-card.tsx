"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  /** Use compact style on mobile */
  compact?: boolean;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  compact,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card transition-all hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
        // Responsive padding - smaller on mobile
        "p-4 md:p-6",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5 md:space-y-1 min-w-0">
          <p className="text-xs md:text-sm font-medium text-muted-foreground truncate">
            {title}
          </p>
          <p className="text-xl md:text-2xl font-bold tracking-tight">{value}</p>
        </div>
        {Icon && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
              // Smaller icon container on mobile
              "h-8 w-8 md:h-10 md:w-10"
            )}
          >
            <Icon className="h-4 w-4 md:h-5 md:w-5" />
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="mt-2 md:mt-4 flex items-center gap-2">
          {trend && (
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                trend.value > 0 && "text-emerald-600 dark:text-emerald-400",
                trend.value < 0 && "text-red-600 dark:text-red-400",
                trend.value === 0 && "text-muted-foreground"
              )}
            >
              {trend.value > 0 && <TrendingUp className="h-3 w-3" />}
              {trend.value < 0 && <TrendingDown className="h-3 w-3" />}
              {trend.value === 0 && <Minus className="h-3 w-3" />}
              {Math.abs(trend.value)}%
            </span>
          )}
          <span className="text-[10px] md:text-xs text-muted-foreground line-clamp-1">
            {trend?.label || description}
          </span>
        </div>
      )}
    </div>
  );
}

interface StatsGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  /** Force single column on mobile */
  mobileStack?: boolean;
}

export function StatsGrid({ children, columns = 4, mobileStack = false }: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid",
        // Smaller gap on mobile
        "gap-3 md:gap-4",
        // By default show 2 columns on mobile for stats (better use of space)
        // Use mobileStack=true to force single column on mobile
        mobileStack && "grid-cols-1",
        !mobileStack && columns === 2 && "grid-cols-2",
        !mobileStack && columns === 3 && "grid-cols-2 lg:grid-cols-3",
        !mobileStack && columns === 4 && "grid-cols-2 lg:grid-cols-4"
      )}
    >
      {children}
    </div>
  );
}
