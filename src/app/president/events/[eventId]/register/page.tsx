"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader, FormSkeleton, EmptyState } from "@/components/shared";
import { RegistrationForm, ProfileGuard } from "@/components/president";
import { useEventForRegistration } from "@/hooks/use-registrations";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/dashboard";
import Link from "next/link";

function RegisterContent() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;

  const { data: event, isLoading, error } = useEventForRegistration(eventId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Register for Event" description="Loading event details..." />
        <FormSkeleton />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="space-y-6">
        <PageHeader title="Register for Event">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </PageHeader>
        <EmptyState
          icon={AlertTriangle}
          title="Event not available"
          description={error?.message || "This event is not available for registration."}
        />
      </div>
    );
  }

  // Check if already registered
  if (event.hasRegistration) {
    return (
      <div className="space-y-6">
        <PageHeader title="Register for Event">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </PageHeader>
        <Card className="border-emerald-300 bg-emerald-50/50">
          <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle className="h-12 w-12 text-emerald-600" />
            <div>
              <h2 className="text-xl font-semibold text-emerald-800">Already Registered</h2>
              <p className="text-emerald-700">
                Your church is already registered for this event.
              </p>
            </div>
            <Button asChild>
              <Link href={`/president/registrations/${event.registrationId}`}>
                View Registration
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Register for ${event.name}`}
        description="Add your church delegates and cooks for this event"
      >
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </PageHeader>

      <RegistrationForm mode="create" event={event} />
    </div>
  );
}

export default function RegisterForEventPage() {
  return (
    <ProfileGuard>
      <RegisterContent />
    </ProfileGuard>
  );
}
