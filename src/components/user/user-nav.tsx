"use client";

import type { NavSection } from "@/components/dashboard";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Bell,
  Settings,
  User,
  HelpCircle,
  History,
  CalendarCheck,
} from "lucide-react";

export const userNavSections: NavSection[] = [
  {
    title: "Menu",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Events",
        href: "/dashboard/events",
        icon: Calendar,
        badge: 3,
      },
      {
        title: "My Registrations",
        href: "/dashboard/registrations",
        icon: ClipboardList,
      },
      {
        title: "Event History",
        href: "/dashboard/history",
        icon: History,
      },
    ],
  },
  {
    title: "Activities",
    items: [
      {
        title: "Upcoming Events",
        href: "/dashboard/upcoming",
        icon: CalendarCheck,
      },
      {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
        badge: 2,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
      {
        title: "Help & Support",
        href: "/dashboard/help",
        icon: HelpCircle,
      },
    ],
  },
];
