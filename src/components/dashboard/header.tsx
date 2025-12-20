"use client";

import { useAuth } from "@/hooks";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  description?: string;
  showSearch?: boolean;
  className?: string;
}

export function Header({
  title,
  description,
  showSearch = true,
  className,
}: HeaderProps) {
  const { user } = useAuth();

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6",
        className
      )}
    >
      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-semibold tracking-tight truncate">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground truncate hidden sm:block">
            {description}
          </p>
        )}
      </div>

      {/* Search - hidden on mobile, MobileHeader handles mobile search if needed */}
      {showSearch && (
        <div className="hidden lg:flex relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 h-9 bg-muted/50"
          />
        </div>
      )}

      {/* Notifications */}
      <Button variant="ghost" size="icon-sm" className="relative shrink-0">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
          3
        </span>
      </Button>

      {/* User Avatar */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden md:block text-right">
          <p className="text-sm font-medium truncate max-w-[150px]">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-muted-foreground truncate max-w-[150px]">
            {user?.email}
          </p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 text-sm font-semibold ring-2 ring-border">
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name || "User"}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            getInitials(user?.name)
          )}
        </div>
      </div>
    </header>
  );
}
