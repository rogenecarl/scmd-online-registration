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
  getCoordinators,
  getCoordinatorById,
  createCoordinator,
  updateCoordinator,
  deleteCoordinator,
} from "@/actions/coordinators";
import type { CoordinatorInput } from "@/schemas";

// Query: List all coordinators with pagination
export function useCoordinators(params: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  return useQuery({
    queryKey: [...queryKeys.coordinators.list(), params],
    queryFn: async () => {
      const result = await getCoordinators(params);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    placeholderData: keepPreviousData,
  });
}

// Query: Single coordinator detail
export function useCoordinator(id: string) {
  return useQuery({
    queryKey: queryKeys.coordinators.detail(id),
    queryFn: async () => {
      const result = await getCoordinatorById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

// Mutation: Create coordinator
export function useCreateCoordinator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CoordinatorInput) => {
      const result = await createCoordinator(input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.coordinators.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      toast.success("Coordinator created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create coordinator");
    },
  });
}

// Mutation: Update coordinator
export function useUpdateCoordinator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: CoordinatorInput;
    }) => {
      const result = await updateCoordinator(id, input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.coordinators.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.coordinators.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      toast.success("Coordinator updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update coordinator");
    },
  });
}

// Mutation: Delete coordinator
export function useDeleteCoordinator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteCoordinator(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coordinators.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      toast.success("Coordinator deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete coordinator");
    },
  });
}
