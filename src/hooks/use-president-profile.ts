"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query-keys";
import {
  getDivisionsWithChurches,
  getPresidentProfile,
  completePresidentProfile,
  checkProfileComplete,
  type CompleteProfileInput,
} from "@/actions/president-profile";

/**
 * Hook to fetch divisions with their churches for profile selection
 */
export function useDivisionsWithChurches() {
  return useQuery({
    queryKey: queryKeys.divisions.list(),
    queryFn: async () => {
      const result = await getDivisionsWithChurches();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
}

/**
 * Hook to fetch current president's profile
 */
export function usePresidentProfile() {
  return useQuery({
    queryKey: ["presidentProfile"],
    queryFn: async () => {
      const result = await getPresidentProfile();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
}

/**
 * Hook to check if president profile is complete
 */
export function useProfileComplete() {
  return useQuery({
    queryKey: ["profileComplete"],
    queryFn: async () => {
      const result = await checkProfileComplete();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
}

/**
 * Hook to complete president profile
 */
export function useCompleteProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CompleteProfileInput) => {
      const result = await completePresidentProfile(input);
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
      toast.success("Profile completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["presidentProfile"] });
      queryClient.invalidateQueries({ queryKey: ["profileComplete"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.president() });
      router.push("/president/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to complete profile");
    },
  });
}
