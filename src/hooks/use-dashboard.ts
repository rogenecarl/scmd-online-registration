"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getPresidentDashboard,
  getAdminDashboard,
} from "@/actions/dashboard";

/**
 * Get president dashboard data
 * Includes church info, stats, recent registrations, and upcoming events
 */
export function usePresidentDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard.president(),
    queryFn: async () => {
      const result = await getPresidentDashboard();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/**
 * Get admin dashboard data
 * Includes overall stats, recent registrations, and events summary
 */
export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard.admin(),
    queryFn: async () => {
      const result = await getAdminDashboard();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}
