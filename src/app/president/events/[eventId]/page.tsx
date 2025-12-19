"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard";
import { PageHeader, FormSkeleton, EmptyState } from "@/components/shared";
import { ProfileGuard } from "@/components/president";
import { useEventForRegistration } from "@/hooks/use-registrations";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  ChefHat,
  CheckCircle,
  AlertCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { format, isPast } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(amount);
}

function EventDetailContent() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;

  const { data: event, isLoading, error } = useEventForRegistration(eventId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Event Details" description="Loading event information..." />
        <FormSkeleton />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="space-y-6">
        <PageHeader title="Event Details" />
        <EmptyState
          icon={AlertTriangle}
          title="Event not found"
          description={error?.message || "The event you're looking for doesn't exist or is not available."}
        />
      </div>
    );
  }

  const deadlinePassed = isPast(new Date(event.registrationDeadline));
  const canRegister = !event.hasRegistration && !deadlinePassed;

  return (
    <div className="space-y-6">
      <PageHeader
        title={event.name}
        description={event.location}
      >
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Event Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Registration Status Alert */}
          {event.hasRegistration && (
            <Card className={cn(
              "border-2",
              event.registrationStatus === "PENDING" && "border-yellow-300 bg-yellow-50/50",
              event.registrationStatus === "APPROVED" && "border-emerald-300 bg-emerald-50/50",
              event.registrationStatus === "REJECTED" && "border-red-300 bg-red-50/50"
            )}>
              <CardContent className="flex items-center gap-4 py-4">
                {event.registrationStatus === "PENDING" && (
                  <>
                    <AlertCircle className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="font-semibold text-yellow-800">Registration Pending</p>
                      <p className="text-sm text-yellow-700">Your registration is awaiting admin approval.</p>
                    </div>
                  </>
                )}
                {event.registrationStatus === "APPROVED" && (
                  <>
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-800">Registration Approved</p>
                      <p className="text-sm text-emerald-700">Your church is confirmed for this event.</p>
                    </div>
                  </>
                )}
                {event.registrationStatus === "REJECTED" && (
                  <>
                    <XCircle className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-800">Registration Rejected</p>
                      <p className="text-sm text-red-700">Please contact the admin for more details.</p>
                    </div>
                  </>
                )}
                <Button variant="outline" className="ml-auto" asChild>
                  <Link href={`/president/registrations/${event.registrationId}`}>
                    View Registration
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          {event.description && (
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{event.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Event Details */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <p className="font-semibold">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Event Dates</p>
                    <p className="font-semibold">
                      {format(new Date(event.startDate), "MMM d")} -{" "}
                      {format(new Date(event.endDate), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    deadlinePassed ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"
                  )}>
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Registration Deadline</p>
                    <p className={cn("font-semibold", deadlinePassed && "text-red-600")}>
                      {format(new Date(event.registrationDeadline), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                    {deadlinePassed && (
                      <Badge variant="destructive" className="mt-1">Closed</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fee Information Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration Fees</CardTitle>
              <CardDescription>
                {event.isPreRegistration
                  ? "Early bird rates are currently active"
                  : "Standard registration rates apply"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Fee */}
              <div className="rounded-lg bg-primary/10 p-4 text-center">
                <p className="text-xs font-medium text-muted-foreground">
                  {event.feeType === "pre-registration" ? "Pre-Registration Rate" : "Standard Rate"}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(event.currentFee)}
                </p>
                <p className="text-xs text-muted-foreground">per delegate</p>
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Pre-Registration Fee
                  </span>
                  <span className="font-medium">{formatCurrency(event.preRegistrationFee)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    On-Site Fee
                  </span>
                  <span className="font-medium">{formatCurrency(event.onsiteRegistrationFee)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-muted-foreground" />
                    Cook Fee
                  </span>
                  <span className="font-medium">{formatCurrency(event.cookRegistrationFee)}</span>
                </div>
              </div>

              {/* Pre-Registration Period */}
              <div className="border-t pt-4">
                <p className="text-xs font-medium text-muted-foreground">Pre-Registration Period</p>
                <p className="text-sm">
                  {format(new Date(event.preRegistrationStart), "MMM d")} -{" "}
                  {format(new Date(event.preRegistrationEnd), "MMM d, yyyy")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          {canRegister && (
            <Button className="w-full" size="lg" asChild>
              <Link href={`/president/events/${event.id}/register`}>
                <Users className="mr-2 h-4 w-4" />
                Register Delegates
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PresidentEventDetailPage() {
  return (
    <ProfileGuard>
      <EventDetailContent />
    </ProfileGuard>
  );
}
