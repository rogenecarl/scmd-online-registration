"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks";
import { getRoleRedirect } from "@/config/auth";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated, isLoading, role, signOut } = useAuth();

  // Get dashboard URL based on user role
  const dashboardUrl = getRoleRedirect(role);

  useEffect(() => {
    queueMicrotask(() => setIsMounted(true));
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auth buttons - only render on client to avoid hydration mismatch
  const renderAuthButtons = () => {
    if (!isMounted) {
      return <div className="w-[180px]" />; // Placeholder to prevent layout shift
    }

    if (isLoading) {
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    }

    if (isAuthenticated) {
      return (
        <>
          <Button variant="ghost" size="sm" asChild>
            <Link href={dashboardUrl} className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </>
      );
    }

    return (
      <>
        <Button size="sm" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
        {/* <Button size="sm" asChild>
          <Link href="/register">Get Started</Link>
        </Button> */}
      </>
    );
  };

  // Mobile auth buttons
  const renderMobileAuthButtons = () => {
    if (!isMounted) {
      return null;
    }

    if (isLoading) {
      return (
        <div className="flex justify-center py-2">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <>
          <Button variant="outline" size="sm" asChild className="w-full">
            <Link
              href={dashboardUrl}
              className="flex items-center justify-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => {
              setIsMobileMenuOpen(false);
              signOut();
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </>
      );
    }

    return (
      <>
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
            Sign In
          </Link>
        </Button>
        <Button size="sm" asChild className="w-full">
          <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
            Get Started
          </Link>
        </Button>
      </>
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform group-hover:scale-105">
              <Image src={"/logo.webp"} alt="Logo" width={30} height={20} priority />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              SCMD Events
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA - Auth Aware */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {renderAuthButtons()}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-80 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              {renderMobileAuthButtons()}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
