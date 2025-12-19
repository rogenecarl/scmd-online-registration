"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import {
  getChurches,
  getChurchById,
  createChurch,
  updateChurch,
  deleteChurch,
  getChurchesWithoutPastor,
} from "@/actions/churches";
import type { ChurchInput } from "@/schemas";

// Query: List all churches with optional filters
export function useChurches(filters?: { search?: string; divisionId?: string }) {
  return useQuery({
    queryKey: [...queryKeys.churches.list(), filters],
    queryFn: async () => {
      const result = await getChurches(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// Query: Single church detail
export function useChurch(id: string) {
  return useQuery({
    queryKey: queryKeys.churches.detail(id),
    queryFn: async () => {
      const result = await getChurchById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

// Query: Churches without pastor (for dropdown)
export function useChurchesWithoutPastor() {
  return useQuery({
    queryKey: [...queryKeys.churches.all, "withoutPastor"],
    queryFn: async () => {
      const result = await getChurchesWithoutPastor();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// Mutation: Create church
export function useCreateChurch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ChurchInput) => {
      const result = await createChurch(input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.churches.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      toast.success("Church created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create church");
    },
  });
}

// Mutation: Update church
export function useUpdateChurch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: ChurchInput }) => {
      const result = await updateChurch(id, input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.churches.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.churches.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      toast.success("Church updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update church");
    },
  });
}

// Mutation: Delete church
export function useDeleteChurch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteChurch(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.churches.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      toast.success("Church deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete church");
    },
  });
}
