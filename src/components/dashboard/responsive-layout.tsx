"use client";

import type { ReactNode } from "react";
import { MobileNavProvider } from "@/contexts";
import { Sidebar, type NavSection } from "./sidebar";
import { Header } from "./header";
import { MobileHeader } from "./mobile-header";
import { MobileSidebar } from "./mobile-sidebar";
import { BottomNav, type BottomNavItem } from "./bottom-nav";

interface ResponsiveLayoutProps {
  children: ReactNode;
  sections: NavSection[];
  brandName: string;
  headerTitle: string;
  headerDescription?: string;
  bottomNavItems: BottomNavItem[];
  bottomNavMoreItems?: BottomNavItem[];
}

/**
 * ResponsiveLayout provides a unified layout for Admin and President sections.
 *
 * Mobile (< md):
 * - Mobile header with hamburger menu
 * - Mobile sidebar drawer (overlay)
 * - Bottom navigation with "More" menu
 * - Content with bottom padding for nav
 *
 * Desktop (>= md):
 * - Collapsible sidebar
 * - Desktop header with search
 * - No bottom navigation
 */
export function ResponsiveLayout({
  children,
  sections,
  brandName,
  headerTitle,
  headerDescription,
  bottomNavItems,
  bottomNavMoreItems,
}: ResponsiveLayoutProps) {
  return (
    <MobileNavProvider>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar - hidden on mobile */}
        <Sidebar
          sections={sections}
          brandName={brandName}
          className="hidden md:flex"
        />

        {/* Mobile Sidebar Drawer - renders overlay when open */}
        <MobileSidebar sections={sections} brandName={brandName} />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Mobile Header - visible on mobile only */}
          <MobileHeader title={headerTitle} brandName={brandName} />

          {/* Desktop Header - hidden on mobile */}
          <Header
            title={headerTitle}
            description={headerDescription}
            className="hidden md:flex"
          />

          {/* Main Content - extra bottom padding on mobile for bottom nav */}
          <main className="flex-1 overflow-y-auto bg-muted/30 p-4 pb-24 md:p-6 md:pb-6">
            {children}
          </main>

          {/* Bottom Navigation - visible on mobile only */}
          <BottomNav items={bottomNavItems} moreItems={bottomNavMoreItems} />
        </div>
      </div>
    </MobileNavProvider>
  );
}
