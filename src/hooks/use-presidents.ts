"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import {
  getPresidents,
  getPresidentById,
  getChurchesWithoutPresident,
  seedPresident,
  updatePresident,
  resetPresidentPassword,
  deactivatePresident,
  deletePresident,
} from "@/actions/presidents";
import type {
  SeedPresidentInput,
  UpdatePresidentInput,
  ResetPasswordInput,
} from "@/schemas";

// Query: List all presidents
export function usePresidents(filters?: { search?: string; churchId?: string }) {
  return useQuery({
    queryKey: [...queryKeys.presidents.list(), filters],
    queryFn: async () => {
      const result = await getPresidents(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// Query: Single president detail
export function usePresident(id: string) {
  return useQuery({
    queryKey: queryKeys.presidents.detail(id),
    queryFn: async () => {
      const result = await getPresidentById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

// Query: Churches without presidents (for seeding form)
export function useChurchesWithoutPresident() {
  return useQuery({
    queryKey: [...queryKeys.churches.all, "withoutPresident"],
    queryFn: async () => {
      const result = await getChurchesWithoutPresident();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// Mutation: Seed (create) president
export function useSeedPresident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SeedPresidentInput) => {
      const result = await seedPresident(input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.presidents.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.churches.all });
      toast.success("President account created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create president");
    },
  });
}

// Mutation: Update president
export function useUpdatePresident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: UpdatePresidentInput;
    }) => {
      const result = await updatePresident(id, input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.presidents.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.presidents.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.churches.all });
      toast.success("President updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update president");
    },
  });
}

// Mutation: Reset password
export function useResetPresidentPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: ResetPasswordInput;
    }) => {
      const result = await resetPresidentPassword(id, input);
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
      queryClient.invalidateQueries({
        queryKey: queryKeys.presidents.detail(variables.id),
      });
      toast.success("Password reset successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
}

// Mutation: Deactivate president
export function useDeactivatePresident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deactivatePresident(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.presidents.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.churches.all });
      toast.success("President deactivated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to deactivate president");
    },
  });
}

// Mutation: Delete president
export function useDeletePresident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deletePresident(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.presidents.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.churches.all });
      toast.success("President deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete president");
    },
  });
}
