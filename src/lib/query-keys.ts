/**
 * TanStack Query Keys Factory
 * Centralized query key management for consistent caching and invalidation
 */

export const queryKeys = {
  // Division queries
  divisions: {
    all: ["divisions"] as const,
    list: () => [...queryKeys.divisions.all, "list"] as const,
    detail: (id: string) => [...queryKeys.divisions.all, "detail", id] as const,
  },

  // Church queries
  churches: {
    all: ["churches"] as const,
    list: () => [...queryKeys.churches.all, "list"] as const,
    byDivision: (divisionId: string) =>
      [...queryKeys.churches.all, "byDivision", divisionId] as const,
    detail: (id: string) => [...queryKeys.churches.all, "detail", id] as const,
  },

  // Coordinator queries
  coordinators: {
    all: ["coordinators"] as const,
    list: () => [...queryKeys.coordinators.all, "list"] as const,
    byDivision: (divisionId: string) =>
      [...queryKeys.coordinators.all, "byDivision", divisionId] as const,
    detail: (id: string) =>
      [...queryKeys.coordinators.all, "detail", id] as const,
  },

  // Pastor queries
  pastors: {
    all: ["pastors"] as const,
    list: () => [...queryKeys.pastors.all, "list"] as const,
    byChurch: (churchId: string) =>
      [...queryKeys.pastors.all, "byChurch", churchId] as const,
    detail: (id: string) => [...queryKeys.pastors.all, "detail", id] as const,
  },

  // Event queries
  events: {
    all: ["events"] as const,
    list: () => [...queryKeys.events.all, "list"] as const,
    active: () => [...queryKeys.events.all, "active"] as const,
    upcoming: () => [...queryKeys.events.all, "upcoming"] as const,
    detail: (id: string) => [...queryKeys.events.all, "detail", id] as const,
    stats: (id: string) => [...queryKeys.events.all, "stats", id] as const,
  },

  // Registration queries
  registrations: {
    all: ["registrations"] as const,
    list: () => [...queryKeys.registrations.all, "list"] as const,
    byEvent: (eventId: string) =>
      [...queryKeys.registrations.all, "byEvent", eventId] as const,
    byChurch: (churchId: string) =>
      [...queryKeys.registrations.all, "byChurch", churchId] as const,
    byStatus: (status: string) =>
      [...queryKeys.registrations.all, "byStatus", status] as const,
    pending: () => [...queryKeys.registrations.all, "pending"] as const,
    detail: (id: string) =>
      [...queryKeys.registrations.all, "detail", id] as const,
  },

  // President (Church Admin) queries
  presidents: {
    all: ["presidents"] as const,
    list: () => [...queryKeys.presidents.all, "list"] as const,
    byChurch: (churchId: string) =>
      [...queryKeys.presidents.all, "byChurch", churchId] as const,
    detail: (id: string) =>
      [...queryKeys.presidents.all, "detail", id] as const,
  },

  // Dashboard statistics
  stats: {
    all: ["stats"] as const,
    admin: () => [...queryKeys.stats.all, "admin"] as const,
    president: () => [...queryKeys.stats.all, "president"] as const,
    event: (eventId: string) =>
      [...queryKeys.stats.all, "event", eventId] as const,
  },

  // User queries
  users: {
    all: ["users"] as const,
    current: () => [...queryKeys.users.all, "current"] as const,
    list: () => [...queryKeys.users.all, "list"] as const,
    detail: (id: string) => [...queryKeys.users.all, "detail", id] as const,
  },
} as const;

// Type helpers for query key extraction
export type QueryKeys = typeof queryKeys;
