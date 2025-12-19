import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventStatusBadge } from "@/components/shared/status-badge";
import { getEventWithRegistrations } from "@/actions/events";
import {
  Pencil,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  ChefHat,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getEventWithRegistrations(id);

  if (!result.success) {
    notFound();
  }

  const event = result.data;

  return (
    <div>
      <PageHeader
        title={event.name}
        description={
          <div className="flex items-center gap-2">
            <EventStatusBadge status={event.status} />
            <span className="text-muted-foreground">
              <MapPin className="inline h-4 w-4 mr-1" />
              {event.location}
            </span>
          </div>
        }
      >
        <Button variant="outline" asChild>
          <Link href="/admin/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/admin/events/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="h-4 w-4" />
            <span className="text-sm">Total Registrations</span>
          </div>
          <p className="text-2xl font-bold">{event.stats.totalRegistrations}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Pending</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {event.stats.pendingRegistrations}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="h-4 w-4" />
            <span className="text-sm">Total Delegates</span>
          </div>
          <p className="text-2xl font-bold">{event.stats.totalDelegates}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <ChefHat className="h-4 w-4" />
            <span className="text-sm">Total Cooks</span>
          </div>
          <p className="text-2xl font-bold">{event.stats.totalCooks}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Event Dates Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Event Dates</h3>
          </div>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Start Date</dt>
              <dd className="font-medium">
                {format(new Date(event.startDate), "MMM d, yyyy 'at' h:mm a")}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">End Date</dt>
              <dd className="font-medium">
                {format(new Date(event.endDate), "MMM d, yyyy 'at' h:mm a")}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Registration Deadline</dt>
              <dd className="font-medium">
                {format(
                  new Date(event.registrationDeadline),
                  "MMM d, yyyy 'at' h:mm a"
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Pre-Registration Period Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Pre-Registration Period</h3>
          </div>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Start</dt>
              <dd className="font-medium">
                {format(
                  new Date(event.preRegistrationStart),
                  "MMM d, yyyy 'at' h:mm a"
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">End</dt>
              <dd className="font-medium">
                {format(
                  new Date(event.preRegistrationEnd),
                  "MMM d, yyyy 'at' h:mm a"
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Registration Fees Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Registration Fees</h3>
          </div>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Pre-Registration Fee</dt>
              <dd className="font-medium">
                ₱{Number(event.preRegistrationFee).toLocaleString()}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">On-Site Registration Fee</dt>
              <dd className="font-medium">
                ₱{Number(event.onsiteRegistrationFee).toLocaleString()}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Cook Registration Fee</dt>
              <dd className="font-medium">
                ₱{Number(event.cookRegistrationFee).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>

        {/* Description Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          {event.description ? (
            <p className="text-muted-foreground whitespace-pre-wrap">
              {event.description}
            </p>
          ) : (
            <p className="text-muted-foreground italic">No description provided</p>
          )}
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Registrations</h3>
          <Badge variant="secondary">{event.registrations.length} total</Badge>
        </div>
        {event.registrations.length > 0 ? (
          <div className="space-y-3">
            {event.registrations.slice(0, 5).map((registration) => (
              <div
                key={registration.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{registration.church.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {registration._count.delegates} delegates,{" "}
                    {registration._count.cooks} cooks
                  </p>
                </div>
                <Badge
                  variant={
                    registration.status === "APPROVED"
                      ? "approved"
                      : registration.status === "PENDING"
                        ? "pending"
                        : "rejected"
                  }
                >
                  {registration.status}
                </Badge>
              </div>
            ))}
            {event.registrations.length > 5 && (
              <p className="text-sm text-muted-foreground text-center pt-2">
                And {event.registrations.length - 5} more registrations...
              </p>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">No registrations yet</p>
        )}
      </div>

      {/* Metadata */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Details</h3>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Created</dt>
            <dd className="font-medium">
              {format(new Date(event.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Last Updated</dt>
            <dd className="font-medium">
              {format(new Date(event.updatedAt), "MMM d, yyyy 'at' h:mm a")}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
