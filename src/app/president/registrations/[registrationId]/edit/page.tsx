"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader, FormSkeleton, EmptyState } from "@/components/shared";
import { RegistrationForm, ProfileGuard } from "@/components/president";
import { useMyRegistration, useEventForRegistration } from "@/hooks/use-registrations";
import { ArrowLeft, AlertTriangle, Lock, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/dashboard";

function EditRegistrationContent() {
  const params = useParams();
  const router = useRouter();
  const registrationId = params.registrationId as string;

  const { data: registration, isLoading: regLoading, error: regError } = useMyRegistration(registrationId);
  const { data: event, isLoading: eventLoading, error: eventError } = useEventForRegistration(
    registration?.eventId ?? ""
  );

  const isLoading = regLoading || (registration && eventLoading);
  const error = regError || eventError;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Registration" description="Loading..." />
        <FormSkeleton />
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Registration">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </PageHeader>
        <EmptyState
          icon={AlertTriangle}
          title="Registration not found"
          description={error?.message || "The registration you're looking for doesn't exist."}
        />
      </div>
    );
  }

  // Check if registration deadline has passed
  const now = new Date();
  const deadlinePassed = now > new Date(registration.event.registrationDeadline);
  const eventNotOpen = !["UPCOMING", "ONGOING"].includes(registration.event.status);

  if (deadlinePassed || eventNotOpen) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Registration">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </PageHeader>
        <Card className="border-yellow-300 bg-yellow-50/50">
          <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
            <Lock className="h-12 w-12 text-yellow-600" />
            <div>
              <h2 className="text-xl font-semibold text-yellow-800">Cannot Edit Registration</h2>
              <p className="text-yellow-700">
                {deadlinePassed
                  ? "The registration deadline for this event has passed."
                  : "This event is no longer open for registration."}
              </p>
            </div>
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Registration">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </PageHeader>
        <EmptyState
          icon={AlertTriangle}
          title="Event not available"
          description="The event for this registration is no longer available."
        />
      </div>
    );
  }

  // Check if this will reset the status (editing approved/rejected registration)
  const willResetStatus = registration.status !== "PENDING";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Registration"
        description={`Update your registration for ${registration.event.name}`}
      >
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </PageHeader>

      {/* Warning banner for approved/rejected registrations */}
      {willResetStatus && (
        <Card className="border-amber-300 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/30">
          <CardContent className="flex items-start gap-4 py-4">
            <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-200">
                Status will be reset to Pending
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                This registration was previously <strong>{registration.status.toLowerCase()}</strong>.
                Saving changes will reset the status to <strong>pending</strong> and require admin re-approval.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <RegistrationForm mode="edit" event={event} initialData={registration} />
    </div>
  );
}

export default function EditRegistrationPage() {
  return (
    <ProfileGuard>
      <EditRegistrationContent />
    </ProfileGuard>
  );
}
