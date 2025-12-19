"use client";

import type { NavSection } from "@/components/dashboard";
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  Settings,
} from "lucide-react";

export const presidentNavSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/president/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Events",
    items: [
      {
        title: "Browse Events",
        href: "/president/events",
        icon: Calendar,
      },
      {
        title: "My Registrations",
        href: "/president/registrations",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Account Settings",
        href: "/president/settings",
        icon: Settings,
      },
    ],
  },
];
