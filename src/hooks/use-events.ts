"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import {
  getEvents,
  getEventById,
  getEventWithRegistrations,
  createEvent,
  updateEvent,
  updateEventStatus,
  deleteEvent,
  getEventsForSelect,
} from "@/actions/events";
import type { EventFormInput } from "@/schemas";
import type { EventStatus } from "@/lib/generated/prisma";

// Query: List all events
export function useEvents(filters?: { search?: string; status?: EventStatus }) {
  return useQuery({
    queryKey: [...queryKeys.events.list(), filters],
    queryFn: async () => {
      const result = await getEvents(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// Query: Single event detail
export function useEvent(id: string) {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: async () => {
      const result = await getEventById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

// Query: Event with registrations and stats
export function useEventWithRegistrations(id: string) {
  return useQuery({
    queryKey: queryKeys.events.stats(id),
    queryFn: async () => {
      const result = await getEventWithRegistrations(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

// Query: Events for select dropdown
export function useEventsForSelect() {
  return useQuery({
    queryKey: [...queryKeys.events.all, "forSelect"],
    queryFn: async () => {
      const result = await getEventsForSelect();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// Mutation: Create event
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: EventFormInput) => {
      const result = await createEvent(input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
      toast.success("Event created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create event");
    },
  });
}

// Mutation: Update event
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: EventFormInput;
    }) => {
      const result = await updateEvent(id, input);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.events.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.events.stats(variables.id),
      });
      toast.success("Event updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update event");
    },
  });
}

// Mutation: Update event status
export function useUpdateEventStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: EventStatus }) => {
      const result = await updateEventStatus(id, status);
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
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.events.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.events.stats(variables.id),
      });
      toast.success("Event status updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update event status");
    },
  });
}

// Mutation: Delete event
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteEvent(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
      toast.success("Event deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete event");
    },
  });
}
