"use client";

import { EventCard } from "./event-card";
import { EmptyState } from "@/components/shared";
import { CardSkeleton } from "@/components/shared";
import { Calendar } from "lucide-react";
import type { AvailableEvent } from "@/actions/registrations";

interface EventListProps {
  events: AvailableEvent[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function EventList({ events, isLoading, error }: EventListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={Calendar}
        title="Failed to load events"
        description={error.message}
      />
    );
  }

  if (!events || events.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No events available"
        description="There are no events open for registration at the moment. Check back later!"
      />
    );
  }

  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
