"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader, FormSkeleton, EmptyState } from "@/components/shared";
import { ProfileGuard, RegistrationForm } from "@/components/president";
import { useMyRegistration, useEventForRegistration } from "@/hooks/use-registrations";
import { ArrowLeft, AlertCircle } from "lucide-react";

function AddBatchContent() {
  const params = useParams();
  const router = useRouter();
  const registrationId = params.registrationId as string;

  const { data: registration, isLoading: regLoading, error: regError } = useMyRegistration(registrationId);
  const eventId = registration?.eventId ?? "";
  const { data: event, isLoading: eventLoading, error: eventError } = useEventForRegistration(eventId);

  const isLoading = regLoading || eventLoading;
  const error = regError || eventError;

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Add More Delegates" description="Loading..." />
        <FormSkeleton />
      </div>
    );
  }

  if (error || !registration || !event) {
    return (
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Add More Delegates">
          <Button variant="outline" onClick={() => router.back()} className="touch-target">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </PageHeader>
        <EmptyState
          icon={AlertCircle}
          title="Unable to load"
          description={error?.message || "Unable to load registration details."}
        />
      </div>
    );
  }

  // Check if adding is allowed
  const now = new Date();
  const eventStarted = event.startDate ? now >= new Date(event.startDate) : false;
  const eventStatus = String(event.status);
  const eventNotOpen = !["UPCOMING", "ONGOING"].includes(eventStatus);

  if (eventStarted || eventNotOpen) {
    return (
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Add More Delegates">
          <Button variant="outline" onClick={() => router.back()} className="touch-target">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </PageHeader>
        <EmptyState
          icon={AlertCircle}
          title="Registration Closed"
          description={
            eventStarted
              ? "The event has already started."
              : "This event is no longer open for registration."
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <PageHeader
        title="Add More Delegates"
        description={`Add another batch to your registration for ${event.name}`}
      >
        <Button variant="outline" onClick={() => router.back()} className="touch-target">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      </PageHeader>

      <RegistrationForm
        mode="add-batch"
        event={event}
        registrationId={registrationId}
      />
    </div>
  );
}

export default function AddBatchPage() {
  return (
    <ProfileGuard>
      <AddBatchContent />
    </ProfileGuard>
  );
}
