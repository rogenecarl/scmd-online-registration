"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader, FormSkeleton, EmptyState } from "@/components/shared";
import { ProfileGuard, RegistrationForm } from "@/components/president";
import { useMyBatch, useEventForRegistration } from "@/hooks/use-registrations";
import { ArrowLeft, AlertCircle, Lock } from "lucide-react";

function EditBatchContent() {
  const params = useParams();
  const router = useRouter();
  const registrationId = params.registrationId as string;
  const batchId = params.batchId as string;

  const { data: batch, isLoading: batchLoading, error: batchError } = useMyBatch(batchId);
  const eventId = batch?.registration?.eventId ?? "";
  const { data: event, isLoading: eventLoading, error: eventError } = useEventForRegistration(eventId);

  const isLoading = batchLoading || eventLoading;
  const error = batchError || eventError;

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Edit Batch" description="Loading..." />
        <FormSkeleton />
      </div>
    );
  }

  if (error || !batch || !event) {
    return (
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Edit Batch">
          <Button variant="outline" onClick={() => router.back()} className="touch-target">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </PageHeader>
        <EmptyState
          icon={AlertCircle}
          title="Unable to load"
          description={error?.message || "Unable to load batch details."}
        />
      </div>
    );
  }

  // Check if batch is still pending (can only edit pending batches)
  if (batch.status !== "PENDING") {
    return (
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Edit Batch">
          <Button variant="outline" onClick={() => router.back()} className="touch-target">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </PageHeader>
        <EmptyState
          icon={Lock}
          title="Cannot Edit"
          description={
            batch.status === "APPROVED"
              ? "This batch has already been approved and cannot be edited."
              : "This batch has been rejected and cannot be edited."
          }
        />
      </div>
    );
  }

  // Check if editing is allowed (before event starts and event is open)
  const now = new Date();
  const eventStarted = event.startDate ? now >= new Date(event.startDate) : false;
  const eventStatus = String(event.status);
  const eventNotOpen = !["UPCOMING", "ONGOING"].includes(eventStatus);

  if (eventStarted || eventNotOpen) {
    return (
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Edit Batch">
          <Button variant="outline" onClick={() => router.back()} className="touch-target">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </PageHeader>
        <EmptyState
          icon={AlertCircle}
          title="Editing Closed"
          description={
            eventStarted
              ? "The event has already started. Editing is no longer allowed."
              : "This event is no longer open for registration changes."
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <PageHeader
        title={`Edit Batch #${batch.batchNumber}`}
        description={`Editing batch for ${event.name}`}
      >
        <Button variant="outline" onClick={() => router.back()} className="touch-target">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      </PageHeader>

      <RegistrationForm
        mode="edit-batch"
        event={event}
        registrationId={registrationId}
        batchData={batch}
      />
    </div>
  );
}

export default function EditBatchPage() {
  return (
    <ProfileGuard>
      <EditBatchContent />
    </ProfileGuard>
  );
}
