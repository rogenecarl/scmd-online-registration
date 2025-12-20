import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventStatusBadge } from "@/components/shared/status-badge";
import { getEventWithRegistrations } from "@/actions/events";
import {
  DetailCard,
  DetailCardHeader,
  DetailGrid,
  DetailInfoRow,
} from "@/components/shared";
import { PageHeader } from "@/components/shared/page-header";
import {
  Pencil,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  ChefHat,
  FileText,
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
    <div className="space-y-4 md:space-y-6">
      <PageHeader
        title={event.name}
        description={
          <div className="flex flex-wrap items-center gap-2">
            <EventStatusBadge status={event.status} />
            <span className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">{event.location}</span>
            </span>
          </div>
        }
      >
        <Button variant="outline" asChild className="touch-target">
          <Link href="/admin/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </Button>
        <Button asChild className="touch-target">
          <Link href={`/admin/events/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <DetailCard className="p-3 md:p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Total Registrations</span>
          </div>
          <p className="text-xl md:text-2xl font-bold">
            {event.stats.totalRegistrations}
          </p>
        </DetailCard>
        <DetailCard className="p-3 md:p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Pending</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-yellow-600">
            {event.stats.pendingRegistrations}
          </p>
        </DetailCard>
        <DetailCard className="p-3 md:p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Total Delegates</span>
          </div>
          <p className="text-xl md:text-2xl font-bold">
            {event.stats.totalDelegates}
          </p>
        </DetailCard>
        <DetailCard className="p-3 md:p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <ChefHat className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Total Cooks</span>
          </div>
          <p className="text-xl md:text-2xl font-bold">
            {event.stats.totalCooks}
          </p>
        </DetailCard>
      </div>

      <DetailGrid columns={2}>
        {/* Event Dates Card */}
        <DetailCard>
          <DetailCardHeader icon={<Calendar />} title="Event Dates" />
          <dl className="space-y-2 md:space-y-3">
            <DetailInfoRow
              label="Start Date"
              value={format(
                new Date(event.startDate),
                "MMM d, yyyy 'at' h:mm a"
              )}
            />
            <DetailInfoRow
              label="End Date"
              value={format(new Date(event.endDate), "MMM d, yyyy 'at' h:mm a")}
            />
            <DetailInfoRow
              label="Registration Deadline"
              value={format(
                new Date(event.registrationDeadline),
                "MMM d, yyyy 'at' h:mm a"
              )}
            />
          </dl>
        </DetailCard>

        {/* Pre-Registration Period Card */}
        <DetailCard>
          <DetailCardHeader icon={<Clock />} title="Pre-Registration Period" />
          <dl className="space-y-2 md:space-y-3">
            <DetailInfoRow
              label="Start"
              value={format(
                new Date(event.preRegistrationStart),
                "MMM d, yyyy 'at' h:mm a"
              )}
            />
            <DetailInfoRow
              label="End"
              value={format(
                new Date(event.preRegistrationEnd),
                "MMM d, yyyy 'at' h:mm a"
              )}
            />
          </dl>
        </DetailCard>

        {/* Registration Fees Card */}
        <DetailCard>
          <DetailCardHeader icon={<DollarSign />} title="Registration Fees" />
          <dl className="space-y-2 md:space-y-3">
            <DetailInfoRow
              label="Pre-Registration Fee"
              value={`₱${Number(event.preRegistrationFee).toLocaleString()}`}
            />
            <DetailInfoRow
              label="On-Site Registration Fee"
              value={`₱${Number(event.onsiteRegistrationFee).toLocaleString()}`}
            />
            <DetailInfoRow
              label="Cook Registration Fee"
              value={`₱${Number(event.cookRegistrationFee).toLocaleString()}`}
            />
          </dl>
        </DetailCard>

        {/* Description Card */}
        <DetailCard>
          <DetailCardHeader icon={<FileText />} title="Description" />
          {event.description ? (
            <p className="text-sm md:text-base text-muted-foreground whitespace-pre-wrap">
              {event.description}
            </p>
          ) : (
            <p className="text-sm md:text-base text-muted-foreground italic">
              No description provided
            </p>
          )}
        </DetailCard>
      </DetailGrid>

      {/* Recent Registrations */}
      <DetailCard>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="text-base md:text-lg font-semibold">
            Recent Registrations
          </h3>
          <Badge variant="secondary">{event.registrations.length} total</Badge>
        </div>
        {event.registrations.length > 0 ? (
          <div className="space-y-2 md:space-y-3">
            {event.registrations.slice(0, 5).map((registration) => (
              <div
                key={registration.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-2 md:py-3 border-b last:border-0 gap-2"
              >
                <div className="min-w-0">
                  <p className="text-sm md:text-base font-medium truncate">
                    {registration.church.name}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
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
                  className="self-start sm:self-center shrink-0"
                >
                  {registration.status}
                </Badge>
              </div>
            ))}
            {event.registrations.length > 5 && (
              <p className="text-xs md:text-sm text-muted-foreground text-center pt-2">
                And {event.registrations.length - 5} more registrations...
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm md:text-base text-muted-foreground">
            No registrations yet
          </p>
        )}
      </DetailCard>

      {/* Metadata */}
      <DetailCard>
        <DetailCardHeader title="Details" />
        <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs md:text-sm text-muted-foreground">
              Created
            </dt>
            <dd className="text-sm md:text-base font-medium">
              {format(new Date(event.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </dd>
          </div>
          <div>
            <dt className="text-xs md:text-sm text-muted-foreground">
              Last Updated
            </dt>
            <dd className="text-sm md:text-base font-medium">
              {format(new Date(event.updatedAt), "MMM d, yyyy 'at' h:mm a")}
            </dd>
          </div>
        </div>
      </DetailCard>
    </div>
  );
}
