"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import {
  getAvailableEvents,
  getEventForRegistration,
  getMyRegistrations,
  getMyRegistrationById,
  createRegistration,
  updateRegistration,
  cancelRegistration,
} from "@/actions/registrations";
import {
  getRegistrations,
  getRegistrationById,
  approveRegistration,
  rejectRegistration,
  getPendingRegistrationsCount,
  getEventsForFilter,
  getChurchesForFilter,
  getDivisionsForFilter,
  type RegistrationFilters,
} from "@/actions/approval";
import type { CreateRegistrationInput, UpdateRegistrationInput } from "@/schemas";

// ==========================================
// PRESIDENT QUERIES
// ==========================================

/**
 * Get all available events for registration
 */
export function useAvailableEvents() {
  return useQuery({
    queryKey: queryKeys.presidentEvents.available(),
    queryFn: async () => {
      const result = await getAvailableEvents();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/**
 * Get event details for registration page
 */
export function useEventForRegistration(eventId: string) {
  return useQuery({
    queryKey: queryKeys.presidentEvents.forRegistration(eventId),
    queryFn: async () => {
      const result = await getEventForRegistration(eventId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!eventId,
  });
}

/**
 * Get all registrations for current president's church
 */
export function useMyRegistrations() {
  return useQuery({
    queryKey: queryKeys.registrations.my(),
    queryFn: async () => {
      const result = await getMyRegistrations();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/**
 * Get a single registration with full details
 */
export function useMyRegistration(id: string) {
  return useQuery({
    queryKey: queryKeys.registrations.myDetail(id),
    queryFn: async () => {
      const result = await getMyRegistrationById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

// ==========================================
// PRESIDENT MUTATIONS
// ==========================================

/**
 * Create a new registration
 */
export function useCreateRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateRegistrationInput) => {
      const result = await createRegistration(input);
      if (!result.success) {
        const error = new Error(result.error) as Error & {
          fieldErrors?: Record<string, string[]>;
        };
        error.fieldErrors = result.fieldErrors;
        throw error;
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.presidentEvents.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.president() });
      toast.success("Registration submitted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit registration");
    },
  });
}

/**
 * Update an existing registration
 */
export function useUpdateRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: UpdateRegistrationInput;
    }) => {
      const result = await updateRegistration(id, input);
      if (!result.success) {
        const error = new Error(result.error) as Error & {
          fieldErrors?: Record<string, string[]>;
        };
        error.fieldErrors = result.fieldErrors;
        throw error;
      }
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.registrations.myDetail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.president() });
      toast.success("Registration updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update registration");
    },
  });
}

/**
 * Cancel a pending registration
 */
export function useCancelRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await cancelRegistration(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.presidentEvents.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.president() });
      toast.success("Registration cancelled");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to cancel registration");
    },
  });
}

// ==========================================
// ADMIN QUERIES
// ==========================================

/**
 * Get all registrations with filtering (Admin only)
 */
export function useRegistrations(filters: RegistrationFilters = {}) {
  return useQuery({
    queryKey: [...queryKeys.registrations.list(), filters],
    queryFn: async () => {
      const result = await getRegistrations(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/**
 * Get a single registration with full details (Admin only)
 */
export function useRegistration(id: string) {
  return useQuery({
    queryKey: queryKeys.registrations.detail(id),
    queryFn: async () => {
      const result = await getRegistrationById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

/**
 * Get pending registrations count for dashboard
 */
export function usePendingRegistrationsCount() {
  return useQuery({
    queryKey: queryKeys.registrations.pending(),
    queryFn: async () => {
      const result = await getPendingRegistrationsCount();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/**
 * Get events for filter dropdown
 */
export function useEventsForFilter() {
  return useQuery({
    queryKey: [...queryKeys.events.all, "filter"],
    queryFn: async () => {
      const result = await getEventsForFilter();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/**
 * Get churches for filter dropdown
 */
export function useChurchesForFilter() {
  return useQuery({
    queryKey: [...queryKeys.churches.all, "filter"],
    queryFn: async () => {
      const result = await getChurchesForFilter();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/**
 * Get divisions for filter dropdown
 */
export function useDivisionsForFilter() {
  return useQuery({
    queryKey: [...queryKeys.divisions.all, "filter"],
    queryFn: async () => {
      const result = await getDivisionsForFilter();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// ==========================================
// ADMIN MUTATIONS
// ==========================================

/**
 * Approve a registration
 */
export function useApproveRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (registrationId: string) => {
      const result = await approveRegistration(registrationId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, registrationId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.registrations.detail(registrationId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.admin() });
      toast.success("Registration approved successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to approve registration");
    },
  });
}

/**
 * Reject a registration with remarks
 */
export function useRejectRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      registrationId,
      remarks,
    }: {
      registrationId: string;
      remarks: string;
    }) => {
      const result = await rejectRegistration(registrationId, remarks);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.registrations.detail(variables.registrationId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.admin() });
      toast.success("Registration rejected");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reject registration");
    },
  });
}
