"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import type { RegistrationStatus } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";

interface UpcomingEvent {
  id: string;
  name: string;
  location: string;
  startDate: Date;
  registrationDeadline: Date;
  hasRegistration: boolean;
  registrationStatus: RegistrationStatus | null;
}

interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
}

function getStatusBadge(status: RegistrationStatus | null, hasRegistration: boolean) {
  if (!hasRegistration) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600">
        <Clock className="h-3 w-3" />
        Not Registered
      </span>
    );
  }

  switch (status) {
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-600">
          <AlertCircle className="h-3 w-3" />
          Pending
        </span>
      );
    case "APPROVED":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600">
          <CheckCircle className="h-3 w-3" />
          Approved
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-600">
          <XCircle className="h-3 w-3" />
          Rejected
        </span>
      );
    default:
      return null;
  }
}

export function UpcomingEventsCard({ events }: UpcomingEventsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
          <CardDescription>Events open for registration</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/president/events">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-6 text-center">
            <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              No upcoming events at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "flex items-start justify-between rounded-lg border p-4 transition-colors",
                  !event.hasRegistration && "hover:bg-accent/50"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{event.name}</h4>
                    {getStatusBadge(event.registrationStatus, event.hasRegistration)}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(event.startDate), "MMM d, yyyy")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deadline: {format(new Date(event.registrationDeadline), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
                {!event.hasRegistration && (
                  <Button size="sm" asChild>
                    <Link href={`/president/events/${event.id}/register`}>
                      Register
                    </Link>
                  </Button>
                )}
                {event.hasRegistration && event.registrationStatus === "PENDING" && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/president/events/${event.id}`}>
                      View
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
