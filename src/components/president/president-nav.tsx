"use client";

import type { NavSection } from "@/components/dashboard";
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  Users,
  UserPlus,
  History,
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
        title: "Active Events",
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
    title: "Delegates",
    items: [
      {
        title: "Register Delegates",
        href: "/president/register",
        icon: UserPlus,
      },
      {
        title: "My Delegates",
        href: "/president/delegates",
        icon: Users,
      },
    ],
  },
  {
    title: "History",
    items: [
      {
        title: "Past Registrations",
        href: "/president/history",
        icon: History,
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
