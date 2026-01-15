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
  Receipt,
} from "lucide-react";
import { format } from "date-fns";
import { cn, formatCurrency } from "@/lib/utils";
import type { RegistrationStatus, EventStatus } from "@/lib/generated/prisma";

function getStatusIcon(status: RegistrationStatus | null, hasPendingBatch: boolean) {
  if (hasPendingBatch) {
    return <Clock className="h-4 w-4 text-yellow-600" />;
  }
  switch (status) {
    case "APPROVED":
      return <CheckCircle className="h-4 w-4 text-emerald-600" />;
    case "REJECTED":
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
}

function getStatusColor(status: RegistrationStatus | null, hasPendingBatch: boolean) {
  if (hasPendingBatch) {
    return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
  }
  switch (status) {
    case "APPROVED":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
    case "REJECTED":
      return "bg-red-500/10 text-red-600 border-red-200";
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-200";
  }
}

function getStatusLabel(status: RegistrationStatus | null, hasPendingBatch: boolean) {
  if (hasPendingBatch) return "pending";
  switch (status) {
    case "APPROVED":
      return "approved";
    case "REJECTED":
      return "rejected";
    default:
      return "no batches";
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
        <div className="space-y-3 md:space-y-4">
          {registrations.map((registration) => (
            <Card key={registration.id} className="transition-all hover:shadow-md">
              <CardContent className="p-4 md:p-6">
                {/* Mobile: Stack layout */}
                <div className="flex flex-col gap-3 md:hidden">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm">{registration.event.name}</h3>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
                        getStatusColor(registration.latestBatchStatus, registration.hasPendingBatch)
                      )}
                    >
                      {getStatusIcon(registration.latestBatchStatus, registration.hasPendingBatch)}
                      {getStatusLabel(registration.latestBatchStatus, registration.hasPendingBatch)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(registration.event.startDate), "MMM d")} -{" "}
                      {format(new Date(registration.event.endDate), "MMM d")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {registration.totalDelegates}
                    </span>
                    {registration.totalCooks > 0 && (
                      <span className="flex items-center gap-1">
                        <ChefHat className="h-3 w-3" />
                        {registration.totalCooks}
                      </span>
                    )}
                    <span className="flex items-center gap-1 font-medium text-primary">
                      <Receipt className="h-3 w-3" />
                      {formatCurrency(registration.totalFee)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 font-medium capitalize",
                        getEventStatusColor(registration.event.status)
                      )}
                    >
                      {registration.event.status.toLowerCase()}
                    </span>
                    <span>
                      {format(new Date(registration.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>

                  <Button variant="outline" size="sm" asChild className="w-full touch-target">
                    <Link href={`/president/registrations/${registration.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Desktop: Row layout */}
                <div className="hidden md:flex md:flex-row md:items-center md:justify-between md:gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{registration.event.name}</h3>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                          getStatusColor(registration.latestBatchStatus, registration.hasPendingBatch)
                        )}
                      >
                        {getStatusIcon(registration.latestBatchStatus, registration.hasPendingBatch)}
                        {getStatusLabel(registration.latestBatchStatus, registration.hasPendingBatch)}
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
                        {registration.totalDelegates} delegates
                      </span>
                      {registration.totalCooks > 0 && (
                        <span className="flex items-center gap-1">
                          <ChefHat className="h-3.5 w-3.5" />
                          {registration.totalCooks} cooks
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-medium text-primary">
                        <Receipt className="h-3.5 w-3.5" />
                        {formatCurrency(registration.totalFee)}
                      </span>
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

                  <Button variant="outline" asChild className="touch-target">
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
