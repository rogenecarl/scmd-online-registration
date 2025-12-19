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
  getDivisions,
  getDivisionById,
  createDivision,
  updateDivision,
  deleteDivision,
  getDivisionsWithoutCoordinator,
  getDivisionsForSelect,
} from "@/actions/divisions";
import type { DivisionInput } from "@/schemas";

// Query: List all divisions with pagination
export function useDivisions(params: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  return useQuery({
    queryKey: [...queryKeys.divisions.list(), params],
    queryFn: async () => {
      const result = await getDivisions(params);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    placeholderData: keepPreviousData,
  });
}

// Query: Single division detail
export function useDivision(id: string) {
  return useQuery({
    queryKey: queryKeys.divisions.detail(id),
    queryFn: async () => {
      const result = await getDivisionById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

// Query: Divisions without coordinator (for dropdown)
export function useDivisionsWithoutCoordinator() {
  return useQuery({
    queryKey: [...queryKeys.divisions.all, "withoutCoordinator"],
    queryFn: async () => {
      const result = await getDivisionsWithoutCoordinator();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// Query: All divisions for select dropdown
export function useDivisionsForSelect() {
  return useQuery({
    queryKey: [...queryKeys.divisions.all, "forSelect"],
    queryFn: async () => {
      const result = await getDivisionsForSelect();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// Mutation: Create division
export function useCreateDivision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: DivisionInput) => {
      const result = await createDivision(input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      toast.success("Division created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create division");
    },
  });
}

// Mutation: Update division
export function useUpdateDivision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: DivisionInput }) => {
      const result = await updateDivision(id, input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.divisions.detail(variables.id),
      });
      toast.success("Division updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update division");
    },
  });
}

// Mutation: Delete division
export function useDeleteDivision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteDivision(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      toast.success("Division deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete division");
    },
  });
}
