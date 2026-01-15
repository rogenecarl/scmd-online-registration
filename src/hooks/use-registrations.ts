"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import {
  getAvailableEvents,
  getEventForRegistration,
  getMyRegistrations,
  getMyRegistrationById,
  getBatchById,
  createRegistration,
  createBatch,
  updateBatch,
  cancelBatch,
  cancelRegistration,
} from "@/actions/registrations";
import {
  getRegistrations,
  getRegistrationById,
  getPendingBatches,
  getBatches,
  getBatchById as getAdminBatchById,
  getPendingBatchesCount,
  approveBatch,
  rejectBatch,
  approveRegistration,
  rejectRegistration,
  getEventsForFilter,
  getChurchesForFilter,
  getDivisionsForFilter,
  type RegistrationFilters,
} from "@/actions/approval";
import type {
  CreateRegistrationInput,
  CreateBatchInput,
  UpdateBatchInput,
} from "@/schemas";

// ==========================================
// PRESIDENT QUERIES
// ==========================================

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

export function useMyBatch(batchId: string) {
  return useQuery({
    queryKey: queryKeys.batches.myDetail(batchId),
    queryFn: async () => {
      const result = await getBatchById(batchId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!batchId,
  });
}

// ==========================================
// PRESIDENT MUTATIONS
// ==========================================

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

export function useCreateBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateBatchInput) => {
      const result = await createBatch(input);
      if (!result.success) {
        const error = new Error(result.error) as Error & {
          fieldErrors?: Record<string, string[]>;
        };
        error.fieldErrors = result.fieldErrors;
        throw error;
      }
      return result.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.batches.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.registrations.myDetail(variables.registrationId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.president() });
      toast.success(`Batch #${data.batchNumber} submitted successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add batch");
    },
  });
}

export function useUpdateBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      batchId,
      input,
    }: {
      batchId: string;
      input: UpdateBatchInput;
    }) => {
      const result = await updateBatch(batchId, input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.batches.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.batches.myDetail(variables.batchId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.president() });
      toast.success("Batch updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update batch");
    },
  });
}

export function useCancelBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (batchId: string) => {
      const result = await cancelBatch(batchId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.batches.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.presidentEvents.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.president() });
      toast.success("Batch cancelled");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to cancel batch");
    },
  });
}

// Legacy function - kept for backwards compatibility
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

// Legacy function - kept for backwards compatibility
export function useUpdateRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: { delegates: CreateRegistrationInput["delegates"]; cooks: CreateRegistrationInput["cooks"]; receiptImage: string };
    }) => {
      // Get the pending batch for this registration
      const regResult = await getMyRegistrationById(id);
      if (!regResult.success) throw new Error(regResult.error);

      const pendingBatch = regResult.data.batches.find((b) => b.status === "PENDING");
      if (!pendingBatch) throw new Error("No pending batch to update");

      const result = await updateBatch(pendingBatch.id, input);
      if (!result.success) {
        const error = new Error(result.error) as Error & {
          fieldErrors?: Record<string, string[]>;
        };
        error.fieldErrors = result.fieldErrors;
        throw error;
      }
      return { id, statusReset: false };
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

// ==========================================
// ADMIN QUERIES
// ==========================================

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

export function usePendingBatches(filters: RegistrationFilters = {}) {
  return useQuery({
    queryKey: [...queryKeys.batches.pending(), filters],
    queryFn: async () => {
      const result = await getPendingBatches(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useBatches(filters: RegistrationFilters = {}) {
  return useQuery({
    queryKey: [...queryKeys.batches.list(), filters],
    queryFn: async () => {
      const result = await getBatches(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useBatch(id: string) {
  return useQuery({
    queryKey: queryKeys.batches.detail(id),
    queryFn: async () => {
      const result = await getAdminBatchById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

export function usePendingBatchesCount() {
  return useQuery({
    queryKey: queryKeys.batches.pendingCount(),
    queryFn: async () => {
      const result = await getPendingBatchesCount();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// Legacy - returns pending batches count
export function usePendingRegistrationsCount() {
  return usePendingBatchesCount();
}

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

export function useApproveBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (batchId: string) => {
      const result = await approveBatch(batchId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, batchId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.batches.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.batches.detail(batchId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.admin() });
      toast.success("Batch approved successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to approve batch");
    },
  });
}

export function useRejectBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      batchId,
      remarks,
    }: {
      batchId: string;
      remarks: string;
    }) => {
      const result = await rejectBatch(batchId, remarks);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.batches.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.batches.detail(variables.batchId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.admin() });
      toast.success("Batch rejected");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reject batch");
    },
  });
}

// Legacy functions - kept for backwards compatibility
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
      queryClient.invalidateQueries({ queryKey: queryKeys.batches.all });
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
      queryClient.invalidateQueries({ queryKey: queryKeys.batches.all });
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
