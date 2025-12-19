"use client";

import { PageHeader } from "@/components/shared";
import { EventList, ProfileGuard } from "@/components/president";
import { useAvailableEvents } from "@/hooks/use-registrations";

function EventsContent() {
  const { data: events, isLoading, error } = useAvailableEvents();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Available Events"
        description="Browse and register for upcoming events"
      />

      <EventList events={events} isLoading={isLoading} error={error} />
    </div>
  );
}

export default function PresidentEventsPage() {
  return (
    <ProfileGuard>
      <EventsContent />
    </ProfileGuard>
  );
}
