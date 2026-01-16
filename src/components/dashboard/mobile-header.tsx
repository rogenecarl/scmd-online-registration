"use client";

import { useState } from "react";
import { useAuth } from "@/hooks";
import { useMobileNav } from "@/contexts";
import { Menu, Bell, ChevronLeft, Church, LogOut, Loader2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MobileHeaderProps {
  title: string;
  brandName?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export function MobileHeader({
  title,
  brandName = "SCMD",
  showBackButton = false,
  backHref,
}: MobileHeaderProps) {
  const { user, signOut, isLoading } = useAuth();
  const { toggleSidebar } = useMobileNav();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = () => {
    setIsUserMenuOpen(false);
    signOut();
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden safe-area-top">
      {/* Left Section - Menu or Back Button */}
      <div className="flex items-center">
        {showBackButton ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 touch-target"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 touch-target"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Center Section - Brand/Title */}
      <div className="flex flex-1 items-center justify-center gap-2">
        {!showBackButton && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Church className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold text-sm">{brandName}</span>
          </Link>
        )}
        {showBackButton && (
          <h1 className="font-semibold text-sm truncate max-w-[200px]">
            {title}
          </h1>
        )}
      </div>

      {/* Right Section - Notifications & Avatar */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 touch-target"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            3
          </span>
        </Button>

        {/* User Avatar - Clickable for user menu */}
        <button
          type="button"
          onClick={() => setIsUserMenuOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 text-sm font-semibold ring-2 ring-border touch-target transition-transform active:scale-95"
          aria-label="Open user menu"
        >
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
        </button>
      </div>

      {/* User Menu Sheet */}
      <Sheet open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl safe-area-bottom">
          <SheetHeader className="text-left pb-2">
            <SheetTitle>Account</SheetTitle>
            <SheetDescription>Manage your account settings</SheetDescription>
          </SheetHeader>

          {/* User Info */}
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-muted/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 text-base font-semibold ring-2 ring-border">
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
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.name || "User"}</p>
              <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>

          {/* Menu Options */}
          <div className="flex flex-col gap-1 mt-4">
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                router.push("/settings");
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-accent transition-colors touch-target"
            >
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Settings</span>
            </button>
          </div>

          <SheetFooter className="mt-4 pt-4 border-t">
            <Button
              variant="destructive"
              className="w-full gap-2 touch-target"
              onClick={handleSignOut}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              Sign Out
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}
