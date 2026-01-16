"use client";

import type { BottomNavItem } from "@/components/dashboard/bottom-nav";
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  Settings,
  Users,
} from "lucide-react";

// Primary items shown in bottom nav (4 items max)
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
    icon: Users,
    label: "Delegates",
    href: "/president/delegates",
  },
];

// Additional items for "More" menu
export const presidentMoreNavItems: BottomNavItem[] = [
  {
    icon: Settings,
    label: "Settings",
    href: "/president/settings",
  },
];
