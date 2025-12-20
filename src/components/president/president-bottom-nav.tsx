"use client";

import type { BottomNavItem } from "@/components/dashboard/bottom-nav";
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  Settings,
} from "lucide-react";

// Primary items shown in bottom nav (4 items - no "More" needed)
export const presidentBottomNavItems: BottomNavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Home",
    href: "/president/dashboard",
  },
  {
    icon: Calendar,
    label: "Events",
    href: "/president/events",
  },
  {
    icon: ClipboardCheck,
    label: "My Regs",
    href: "/president/registrations",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/president/settings",
  },
];

// No "More" items needed for president (only 4 nav items)
export const presidentMoreNavItems: BottomNavItem[] = [];
