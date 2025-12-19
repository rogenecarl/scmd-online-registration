"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import {
  getPastors,
  getPastorById,
  createPastor,
  updatePastor,
  deletePastor,
} from "@/actions/pastors";
import type { PastorInput } from "@/schemas";

// Query: List all pastors with pagination
export function usePastors(params: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  return useQuery({
    queryKey: [...queryKeys.pastors.list(), params],
    queryFn: async () => {
      const result = await getPastors(params);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    placeholderData: keepPreviousData,
  });
}

// Query: Single pastor detail
export function usePastor(id: string) {
  return useQuery({
    queryKey: queryKeys.pastors.detail(id),
    queryFn: async () => {
      const result = await getPastorById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

// Mutation: Create pastor
export function useCreatePastor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: PastorInput) => {
      const result = await createPastor(input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.pastors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.churches.all });
      toast.success("Pastor created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create pastor");
    },
  });
}

// Mutation: Update pastor
export function useUpdatePastor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: PastorInput }) => {
      const result = await updatePastor(id, input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.pastors.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.pastors.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.churches.all });
      toast.success("Pastor updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update pastor");
    },
  });
}

// Mutation: Delete pastor
export function useDeletePastor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deletePastor(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pastors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.churches.all });
      toast.success("Pastor deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete pastor");
    },
  });
}
