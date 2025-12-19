"use client";

import Link from "next/link";
import { PageHeader, EmptyState, TableSkeleton } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/dashboard";
import { ProfileGuard } from "@/components/president";
import { useMyRegistrations } from "@/hooks/use-registrations";
import {
  ClipboardCheck,
  Calendar,
  Users,
  ChefHat,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { RegistrationStatus, EventStatus } from "@/lib/generated/prisma";

function getStatusIcon(status: RegistrationStatus) {
  switch (status) {
    case "PENDING":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "APPROVED":
      return <CheckCircle className="h-4 w-4 text-emerald-600" />;
    case "REJECTED":
      return <XCircle className="h-4 w-4 text-red-600" />;
  }
}

function getStatusColor(status: RegistrationStatus) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
    case "APPROVED":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
    case "REJECTED":
      return "bg-red-500/10 text-red-600 border-red-200";
  }
}

function getEventStatusColor(status: EventStatus) {
  switch (status) {
    case "UPCOMING":
      return "bg-blue-500/10 text-blue-600";
    case "ONGOING":
      return "bg-emerald-500/10 text-emerald-600";
    case "COMPLETED":
      return "bg-gray-500/10 text-gray-600";
    case "CANCELLED":
      return "bg-red-500/10 text-red-600";
  }
}

function RegistrationsContent() {
  const { data: registrations, isLoading, error } = useMyRegistrations();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="My Registrations"
          description="View all your event registrations"
        />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Registrations"
        description="View all your event registrations"
      >
        <Button asChild>
          <Link href="/president/events">
            <Plus className="mr-2 h-4 w-4" />
            New Registration
          </Link>
        </Button>
      </PageHeader>

      {error ? (
        <EmptyState
          icon={ClipboardCheck}
          title="Failed to load registrations"
          description={error.message}
        />
      ) : !registrations || registrations.length === 0 ? (
        <EmptyState
          icon={ClipboardCheck}
          title="No registrations yet"
          description="You haven't registered for any events. Browse available events to get started."
          action={{
            label: "Browse Events",
            href: "/president/events",
          }}
        />
      ) : (
        <div className="space-y-4">
          {registrations.map((registration) => (
            <Card key={registration.id} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{registration.event.name}</h3>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                          getStatusColor(registration.status)
                        )}
                      >
                        {getStatusIcon(registration.status)}
                        {registration.status.toLowerCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {format(new Date(registration.event.startDate), "MMM d")} -{" "}
                        {format(new Date(registration.event.endDate), "MMM d, yyyy")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {registration._count.delegates} delegates
                      </span>
                      {registration._count.cooks > 0 && (
                        <span className="flex items-center gap-1">
                          <ChefHat className="h-3.5 w-3.5" />
                          {registration._count.cooks} cooks
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 font-medium capitalize",
                          getEventStatusColor(registration.event.status)
                        )}
                      >
                        {registration.event.status.toLowerCase()}
                      </span>
                      <span>
                        Submitted {format(new Date(registration.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" asChild>
                    <Link href={`/president/registrations/${registration.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PresidentRegistrationsPage() {
  return (
    <ProfileGuard>
      <RegistrationsContent />
    </ProfileGuard>
  );
}
