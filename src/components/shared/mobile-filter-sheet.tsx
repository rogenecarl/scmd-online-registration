"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileFilterSheetProps {
  /** The filter controls to render inside the sheet */
  children: ReactNode;
  /** Number of active filters (shows badge) */
  activeFilterCount?: number;
  /** Callback when "Apply Filters" is clicked */
  onApply?: () => void;
  /** Callback when "Clear" is clicked */
  onClear?: () => void;
  /** Custom trigger button (optional) */
  trigger?: ReactNode;
  /** Title of the sheet */
  title?: string;
  /** Description of the sheet */
  description?: string;
  /** Additional class for the sheet content */
  className?: string;
}

/**
 * MobileFilterSheet - A slide-up sheet for displaying filters on mobile devices.
 *
 * Usage:
 * ```tsx
 * <MobileFilterSheet
 *   activeFilterCount={2}
 *   onClear={() => clearFilters()}
 * >
 *   <div className="space-y-4">
 *     <Select>...</Select>
 *     <Select>...</Select>
 *   </div>
 * </MobileFilterSheet>
 * ```
 */
export function MobileFilterSheet({
  children,
  activeFilterCount = 0,
  onApply,
  onClear,
  trigger,
  title = "Filters",
  description = "Adjust filters to refine your results",
  className,
}: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false);

  const handleApply = () => {
    onApply?.();
    setOpen(false);
  };

  const handleClear = () => {
    onClear?.();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            className="relative touch-target md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className={cn(
          "h-auto max-h-[85vh] rounded-t-xl",
          className
        )}
      >
        <SheetHeader className="text-left pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg">{title}</SheetTitle>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground h-8 px-2"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
          <SheetDescription className="text-xs">
            {description}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 py-2">{children}</div>

        <SheetFooter className="pt-4 gap-2 sm:gap-0">
          <SheetClose asChild>
            <Button variant="outline" className="flex-1 touch-target">
              Cancel
            </Button>
          </SheetClose>
          <Button onClick={handleApply} className="flex-1 touch-target">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface FilterGroupProps {
  /** Label for the filter group */
  label: string;
  /** The filter control */
  children: ReactNode;
}

/**
 * FilterGroup - Wrapper for individual filter controls within MobileFilterSheet.
 */
export function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}
