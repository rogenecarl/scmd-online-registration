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
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Event Details" description="Loading event information..." />
        <FormSkeleton />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Event Details" />
        <EmptyState
          icon={AlertTriangle}
          title="Event not found"
          description={error?.message || "The event you're looking for doesn't exist or is not available."}
        />
      </div>
    );
  }

  const eventStarted = isPast(new Date(event.startDate));
  const canRegister = !event.hasRegistration && !eventStarted;

  return (
    <div className="space-y-4 md:space-y-6">
      <PageHeader
        title={event.name}
        description={event.location}
      >
        <Button variant="outline" onClick={() => router.back()} className="touch-target">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {/* Event Details */}
        <div className="space-y-4 md:space-y-6 lg:col-span-2">
          {/* Registration Status Alert */}
          {event.hasRegistration && (
            <Card className={cn(
              "border-2",
              event.registrationStatus === "PENDING" && "border-yellow-300 bg-yellow-50/50",
              event.registrationStatus === "APPROVED" && "border-emerald-300 bg-emerald-50/50",
              event.registrationStatus === "REJECTED" && "border-red-300 bg-red-50/50"
            )}>
              <CardContent className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 py-3 md:py-4">
                <div className="flex items-center gap-3 md:gap-4 flex-1">
                  {event.registrationStatus === "PENDING" && (
                    <>
                      <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-yellow-600 shrink-0" />
                      <div>
                        <p className="text-sm md:text-base font-semibold text-yellow-800">Registration Pending</p>
                        <p className="text-xs md:text-sm text-yellow-700">Your registration is awaiting admin approval.</p>
                      </div>
                    </>
                  )}
                  {event.registrationStatus === "APPROVED" && (
                    <>
                      <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-sm md:text-base font-semibold text-emerald-800">Registration Approved</p>
                        <p className="text-xs md:text-sm text-emerald-700">Your church is confirmed for this event.</p>
                      </div>
                    </>
                  )}
                  {event.registrationStatus === "REJECTED" && (
                    <>
                      <XCircle className="h-6 w-6 md:h-8 md:w-8 text-red-600 shrink-0" />
                      <div>
                        <p className="text-sm md:text-base font-semibold text-red-800">Registration Rejected</p>
                        <p className="text-xs md:text-sm text-red-700">Please contact the admin for more details.</p>
                      </div>
                    </>
                  )}
                </div>
                <Button variant="outline" className="self-start sm:self-center touch-target" asChild>
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
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">About This Event</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                <p className="text-sm md:text-base whitespace-pre-wrap">{event.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Event Details */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-3 md:space-y-4">
              <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">Location</p>
                    <p className="text-sm md:text-base font-semibold">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">Event Dates</p>
                    <p className="text-sm md:text-base font-semibold">
                      {format(new Date(event.startDate), "MMM d")} -{" "}
                      {format(new Date(event.endDate), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className={cn(
                    "flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg",
                    eventStarted ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"
                  )}>
                    <Clock className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">Registration Status</p>
                    <p className={cn("text-sm md:text-base font-semibold", eventStarted && "text-red-600")}>
                      {eventStarted ? "Registration Closed" : "Registration Open"}
                    </p>
                    {eventStarted && (
                      <Badge variant="destructive" className="mt-1">Closed</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fee Information Sidebar */}
        <div className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">Registration Fees</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                {event.isPreRegistration
                  ? "Early bird rates are currently active"
                  : "Standard registration rates apply"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-3 md:space-y-4">
              {/* Current Fee */}
              <div className="rounded-lg bg-primary/10 p-3 md:p-4 text-center">
                <p className="text-[10px] md:text-xs font-medium text-muted-foreground">
                  {event.feeType === "pre-registration" ? "Pre-Registration Rate" : "Standard Rate"}
                </p>
                <p className="text-xl md:text-2xl font-bold text-primary">
                  {formatCurrency(event.currentFee)}
                </p>
                <p className="text-[10px] md:text-xs text-muted-foreground">per delegate</p>
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    Pre-Registration Fee
                  </span>
                  <span className="font-medium">{formatCurrency(event.preRegistrationFee)}</span>
                </div>
                {event.preRegistrationSiblingDiscount > 0 && (
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                    <span className="flex items-center gap-2 pl-5">
                      Sibling Discount (3+)
                    </span>
                    <span className="font-medium">{formatCurrency(event.preRegistrationSiblingDiscount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    On-Site Fee
                  </span>
                  <span className="font-medium">{formatCurrency(event.onsiteRegistrationFee)}</span>
                </div>
                {event.onsiteSiblingDiscount > 0 && (
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                    <span className="flex items-center gap-2 pl-5">
                      Sibling Discount (3+)
                    </span>
                    <span className="font-medium">{formatCurrency(event.onsiteSiblingDiscount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="flex items-center gap-2">
                    <ChefHat className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    Cook Fee
                  </span>
                  <span className="font-medium">{formatCurrency(event.cookRegistrationFee)}</span>
                </div>
              </div>

              {/* Pre-Registration Period */}
              <div className="border-t pt-3 md:pt-4">
                <p className="text-[10px] md:text-xs font-medium text-muted-foreground">Pre-Registration Period</p>
                <p className="text-xs md:text-sm">
                  {format(new Date(event.preRegistrationStart), "MMM d")} -{" "}
                  {format(new Date(event.preRegistrationEnd), "MMM d, yyyy")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          {canRegister && (
            <Button className="w-full touch-target" size="lg" asChild>
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
