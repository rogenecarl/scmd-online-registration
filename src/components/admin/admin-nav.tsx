"use client";

import type { NavSection } from "@/components/dashboard";
import {
  LayoutDashboard,
  Building2,
  Church,
  Calendar,
  ClipboardCheck,
  Users,
  FileText,
  Settings,
  UserCog,
  UserCheck,
} from "lucide-react";

export const adminNavSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        title: "Divisions",
        href: "/admin/divisions",
        icon: Building2,
      },
      {
        title: "Churches",
        href: "/admin/churches",
        icon: Church,
      },
      {
        title: "Coordinators",
        href: "/admin/coordinators",
        icon: UserCog,
      },
      {
        title: "Pastors",
        href: "/admin/pastors",
        icon: UserCheck,
      },
      {
        title: "Presidents",
        href: "/admin/presidents",
        icon: Users,
      },
    ],
  },
  {
    title: "Events",
    items: [
      {
        title: "All Events",
        href: "/admin/events",
        icon: Calendar,
      },
      {
        title: "Registrations",
        href: "/admin/registrations",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    title: "Reports",
    items: [
      {
        title: "Generate Reports",
        href: "/admin/reports",
        icon: FileText,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "System Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];
