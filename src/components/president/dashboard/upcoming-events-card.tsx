"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface UpcomingEvent {
  id: string;
  name: string;
  location: string;
  startDate: Date;
  hasRegistration: boolean;
  hasPendingBatch: boolean;
  hasApprovedBatch: boolean;
}

interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
}

function getStatusBadge(event: UpcomingEvent) {
  if (!event.hasRegistration) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs font-medium text-blue-600">
        <Calendar className="h-2.5 w-2.5 md:h-3 md:w-3" />
        <span className="hidden sm:inline">Not </span>Registered
      </span>
    );
  }

  // Has registration - show status based on batches
  if (event.hasPendingBatch && event.hasApprovedBatch) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs font-medium text-yellow-600">
        <AlertCircle className="h-2.5 w-2.5 md:h-3 md:w-3" />
        Partial
      </span>
    );
  }

  if (event.hasPendingBatch) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs font-medium text-yellow-600">
        <AlertCircle className="h-2.5 w-2.5 md:h-3 md:w-3" />
        Pending
      </span>
    );
  }

  if (event.hasApprovedBatch) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs font-medium text-emerald-600">
        <CheckCircle className="h-2.5 w-2.5 md:h-3 md:w-3" />
        Approved
      </span>
    );
  }

  // Registered but no approved or pending batches (all rejected?)
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-500/10 px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs font-medium text-gray-600">
      Registered
    </span>
  );
}

export function UpcomingEventsCard({ events }: UpcomingEventsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Calendar className="h-4 w-4 md:h-5 md:w-5" />
            Upcoming Events
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">Events open for registration</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto touch-target">
          <Link href="/president/events">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
        {events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-4 md:p-6 text-center">
            <Calendar className="mx-auto h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              No upcoming events at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "rounded-lg border p-3 md:p-4 transition-colors",
                  !event.hasRegistration && "hover:bg-accent/50 active:bg-accent/70"
                )}
              >
                {/* Mobile: Stack layout */}
                <div className="flex flex-col gap-2 md:hidden">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm truncate flex-1">{event.name}</h4>
                    {getStatusBadge(event)}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(event.startDate), "MMM d, yyyy")}
                    </span>
                  </div>
                  {!event.hasRegistration && (
                    <Button size="sm" asChild className="w-full mt-1 touch-target">
                      <Link href={`/president/events/${event.id}/register`}>
                        Register
                      </Link>
                    </Button>
                  )}
                  {event.hasRegistration && (
                    <Button variant="outline" size="sm" asChild className="w-full mt-1 touch-target">
                      <Link href={`/president/events/${event.id}`}>
                        View
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Desktop: Row layout */}
                <div className="hidden md:flex md:items-start md:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{event.name}</h4>
                      {getStatusBadge(event)}
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
                  </div>
                  {!event.hasRegistration && (
                    <Button size="sm" asChild className="touch-target">
                      <Link href={`/president/events/${event.id}/register`}>
                        Register
                      </Link>
                    </Button>
                  )}
                  {event.hasRegistration && (
                    <Button variant="outline" size="sm" asChild className="touch-target">
                      <Link href={`/president/events/${event.id}`}>
                        View
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
