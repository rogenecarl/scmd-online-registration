"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getPresidentDashboard,
  getAdminDashboard,
  exportRegistrations,
  getEventsForExport,
  getDivisionsForExport,
  type ExportFilters,
} from "@/actions/dashboard";
import { toast } from "sonner";

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

/**
 * Get events for export filter dropdown
 */
export function useEventsForExport() {
  return useQuery({
    queryKey: [...queryKeys.events.all, "export"],
    queryFn: async () => {
      const result = await getEventsForExport();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/**
 * Get divisions for export filter dropdown
 */
export function useDivisionsForExport() {
  return useQuery({
    queryKey: [...queryKeys.divisions.all, "export"],
    queryFn: async () => {
      const result = await getDivisionsForExport();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/**
 * Export registrations with filters
 * Returns data that can be converted to CSV
 */
export function useExportRegistrations() {
  return useMutation({
    mutationFn: async (filters: ExportFilters) => {
      const result = await exportRegistrations(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast.success("Export data generated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to export registrations");
    },
  });
}
