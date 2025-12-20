"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

export interface BottomNavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
}

interface BottomNavProps {
  items: BottomNavItem[];
  moreItems?: BottomNavItem[];
  className?: string;
}

export function BottomNav({ items, moreItems, className }: BottomNavProps) {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Maximum 5 items in bottom nav (including "More" if needed)
  const visibleItems = moreItems && moreItems.length > 0 ? items.slice(0, 4) : items.slice(0, 5);
  const hasMoreItems = moreItems && moreItems.length > 0;

  const isActive = (href: string) => {
    if (href === pathname) return true;
    // Check for nested routes (e.g., /admin/divisions/create matches /admin/divisions)
    if (pathname.startsWith(href) && href !== "/admin" && href !== "/president") {
      return true;
    }
    return false;
  };

  return (
    <>
      {/* More Menu Overlay */}
      {isMoreOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMoreOpen(false)}
        />
      )}

      {/* More Menu */}
      {isMoreOpen && hasMoreItems && (
        <div className="fixed bottom-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom))] left-0 right-0 z-50 mx-4 mb-2 rounded-xl border border-border bg-card p-2 shadow-lg md:hidden">
          <div className="grid grid-cols-4 gap-1">
            {moreItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMoreOpen(false)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg p-3 text-center transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium leading-tight">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden safe-area-bottom",
          className
        )}
        style={{ height: "var(--bottom-nav-height)" }}
      >
        <div className="flex h-full items-center justify-around px-2">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-w-[64px] flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors touch-target",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative">
                  <Icon
                    className={cn("h-5 w-5", active && "stroke-[2.5px]")}
                  />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium leading-tight",
                    active && "font-semibold"
                  )}
                >
                  {item.label}
                </span>
                {active && (
                  <div className="absolute bottom-1 h-1 w-8 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}

          {/* More Button */}
          {hasMoreItems && (
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={cn(
                "flex min-w-[64px] flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors touch-target",
                isMoreOpen
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <MoreHorizontal
                className={cn("h-5 w-5", isMoreOpen && "stroke-[2.5px]")}
              />
              <span
                className={cn(
                  "text-[10px] font-medium leading-tight",
                  isMoreOpen && "font-semibold"
                )}
              >
                More
              </span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
