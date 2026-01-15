"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Users, ChefHat, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import type { RegistrationStatus } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";

interface RecentRegistration {
  id: string;
  createdAt: Date;
  event: {
    id: string;
    name: string;
  };
  totalDelegates: number;
  totalCooks: number;
  hasPendingBatch: boolean;
  latestBatchStatus: RegistrationStatus | null;
}

interface RegistrationSummaryProps {
  registrations: RecentRegistration[];
}

function getStatusIcon(latestBatchStatus: RegistrationStatus | null, hasPendingBatch: boolean) {
  if (hasPendingBatch) {
    return <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-yellow-600" />;
  }

  switch (latestBatchStatus) {
    case "APPROVED":
      return <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-emerald-600" />;
    case "REJECTED":
      return <AlertCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-red-600" />;
    default:
      return <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-600" />;
  }
}

function getStatusColor(latestBatchStatus: RegistrationStatus | null, hasPendingBatch: boolean) {
  if (hasPendingBatch) {
    return "bg-yellow-500/10 text-yellow-600";
  }

  switch (latestBatchStatus) {
    case "APPROVED":
      return "bg-emerald-500/10 text-emerald-600";
    case "REJECTED":
      return "bg-red-500/10 text-red-600";
    default:
      return "bg-gray-500/10 text-gray-600";
  }
}

function getStatusLabel(latestBatchStatus: RegistrationStatus | null, hasPendingBatch: boolean) {
  if (hasPendingBatch) {
    return "Pending";
  }

  switch (latestBatchStatus) {
    case "APPROVED":
      return "Approved";
    case "REJECTED":
      return "Rejected";
    default:
      return "N/A";
  }
}

export function RegistrationSummary({ registrations }: RegistrationSummaryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <ClipboardCheck className="h-4 w-4 md:h-5 md:w-5" />
            Recent Registrations
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">Your latest registration submissions</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto touch-target">
          <Link href="/president/registrations">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
        {registrations.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-4 md:p-6 text-center">
            <ClipboardCheck className="mx-auto h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              No registrations yet.
            </p>
            <Button variant="link" asChild className="mt-2 touch-target">
              <Link href="/president/events">Browse Events</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-2 md:space-y-3">
            {registrations.map((registration) => (
              <Link
                key={registration.id}
                href={`/president/registrations/${registration.id}`}
                className="block touch-target"
              >
                <div className="flex items-center justify-between rounded-lg border p-3 md:p-4 transition-colors hover:bg-accent/50 active:bg-accent/70 gap-3">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <div
                      className={cn(
                        "flex shrink-0 h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full",
                        getStatusColor(registration.latestBatchStatus, registration.hasPendingBatch)
                      )}
                    >
                      {getStatusIcon(registration.latestBatchStatus, registration.hasPendingBatch)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm md:text-base truncate">{registration.event.name}</p>
                      <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {registration.totalDelegates}
                          <span className="hidden sm:inline"> delegates</span>
                        </span>
                        {registration.totalCooks > 0 && (
                          <span className="flex items-center gap-1">
                            <ChefHat className="h-3 w-3" />
                            {registration.totalCooks}
                            <span className="hidden sm:inline"> cooks</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs font-medium",
                        getStatusColor(registration.latestBatchStatus, registration.hasPendingBatch)
                      )}
                    >
                      {getStatusLabel(registration.latestBatchStatus, registration.hasPendingBatch)}
                    </span>
                    <p className="mt-1 text-[10px] md:text-xs text-muted-foreground">
                      {format(new Date(registration.createdAt), "MMM d")}
                      <span className="hidden sm:inline">, {format(new Date(registration.createdAt), "yyyy")}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
