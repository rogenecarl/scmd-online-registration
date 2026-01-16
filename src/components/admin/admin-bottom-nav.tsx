"use client";

import type { BottomNavItem } from "@/components/dashboard/bottom-nav";
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  Building2,
  Church,
  Users,
  UsersRound,
  FileText,
  Settings,
  UserCog,
  UserCheck,
} from "lucide-react";

// Primary items shown in bottom nav (max 4 + More)
export const adminBottomNavItems: BottomNavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Home",
    href: "/admin/dashboard",
  },
  {
    icon: Calendar,
    label: "Events",
    href: "/admin/events",
  },
  {
    icon: ClipboardCheck,
    label: "Approvals",
    href: "/admin/registrations",
  },
  {
    icon: Building2,
    label: "Org",
    href: "/admin/divisions",
  },
];

// Secondary items shown in "More" menu
export const adminMoreNavItems: BottomNavItem[] = [
  {
    icon: UsersRound,
    label: "Delegates",
    href: "/admin/delegates",
  },
  {
    icon: Church,
    label: "Churches",
    href: "/admin/churches",
  },
  {
    icon: UserCog,
    label: "Coordinators",
    href: "/admin/coordinators",
  },
  {
    icon: UserCheck,
    label: "Pastors",
    href: "/admin/pastors",
  },
  {
    icon: Users,
    label: "Presidents",
    href: "/admin/presidents",
  },
  {
    icon: FileText,
    label: "Reports",
    href: "/admin/reports",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
  },
];
