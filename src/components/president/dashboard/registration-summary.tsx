"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Users, ChefHat, Clock, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import type { RegistrationStatus } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";

interface RecentRegistration {
  id: string;
  status: RegistrationStatus;
  createdAt: Date;
  event: {
    id: string;
    name: string;
  };
  _count: {
    delegates: number;
    cooks: number;
  };
}

interface RegistrationSummaryProps {
  registrations: RecentRegistration[];
}

function getStatusIcon(status: RegistrationStatus) {
  switch (status) {
    case "PENDING":
      return <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-yellow-600" />;
    case "APPROVED":
      return <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-emerald-600" />;
    case "REJECTED":
      return <XCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-red-600" />;
  }
}

function getStatusColor(status: RegistrationStatus) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500/10 text-yellow-600";
    case "APPROVED":
      return "bg-emerald-500/10 text-emerald-600";
    case "REJECTED":
      return "bg-red-500/10 text-red-600";
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
                        getStatusColor(registration.status)
                      )}
                    >
                      {getStatusIcon(registration.status)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm md:text-base truncate">{registration.event.name}</p>
                      <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {registration._count.delegates}
                          <span className="hidden sm:inline"> delegates</span>
                        </span>
                        {registration._count.cooks > 0 && (
                          <span className="flex items-center gap-1">
                            <ChefHat className="h-3 w-3" />
                            {registration._count.cooks}
                            <span className="hidden sm:inline"> cooks</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs font-medium capitalize",
                        getStatusColor(registration.status)
                      )}
                    >
                      {registration.status.toLowerCase()}
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
