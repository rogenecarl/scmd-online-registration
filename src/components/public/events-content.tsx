"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, MapPin, Clock, ArrowRight, Search, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation, StaggerContainer } from "@/components/shared/scroll-animation";
import type { PublicEvent } from "@/actions/events";
import type { PaginatedActionResponse } from "@/types/api";

interface PublicEventsContentProps {
  initialData: PaginatedActionResponse<PublicEvent>;
}

function getStatusColor(status: string) {
  switch (status) {
    case "UPCOMING":
      return "bg-blue-600 text-white border-blue-700 shadow-sm";
    case "ONGOING":
      return "bg-emerald-600 text-white border-emerald-700 shadow-sm";
    default:
      return "bg-gray-600 text-white border-gray-700 shadow-sm";
  }
}

function isRegistrationOpen(event: PublicEvent): boolean {
  const now = new Date();
  return now <= new Date(event.registrationDeadline);
}

function isPreRegistration(event: PublicEvent): boolean {
  const now = new Date();
  return now >= new Date(event.preRegistrationStart) && now <= new Date(event.preRegistrationEnd);
}

function EventCard({ event, index }: { event: PublicEvent; index: number }) {
  const registrationOpen = isRegistrationOpen(event);
  const preReg = isPreRegistration(event);

  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <div
        className="relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1 hover:border-primary/20"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Banner Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {event.banner ? (
            <Image
              src={event.banner}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 via-violet-500/20 to-blue-500/20">
              <CalendarDays className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`${getStatusColor(event.status)} border`}>
              {event.status === "ONGOING" ? "Happening Now" : "Upcoming"}
            </Badge>
          </div>

          {/* Registration Status Badge */}
          {registrationOpen && (
            <div className="absolute top-3 right-3">
              <Badge className={preReg
                ? "bg-amber-500 text-white border border-amber-600 shadow-sm"
                : "bg-violet-600 text-white border border-violet-700 shadow-sm"
              }>
                {preReg ? "Early Bird" : "Registration Open"}
              </Badge>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Event Name on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white line-clamp-2 drop-shadow-lg">
              {event.name}
            </h3>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Description */}
          {event.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>
          )}

          {/* Date & Location */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
              <span className="line-clamp-2">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                {format(new Date(event.startDate), "MMM d")} - {format(new Date(event.endDate), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                Registration until {format(new Date(event.registrationDeadline), "MMM d, yyyy")}
              </span>
            </div>
          </div>

          {/* Fee Info */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Starting from</p>
                <p className="text-lg font-bold text-foreground">
                  {preReg ? (
                    <>
                      <span className="text-amber-600 dark:text-amber-400">
                        ₱{event.preRegistrationFee.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground font-normal ml-1">
                        (Early Bird)
                      </span>
                    </>
                  ) : (
                    <>₱{event.onsiteRegistrationFee.toLocaleString()}</>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                View Details
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PublicEventsContent({ initialData }: PublicEventsContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const events = initialData.success ? initialData.data.items : [];
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative min-h-screen bg-background pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-[128px] animate-pulse" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-violet-500/10 blur-[128px] animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px] animate-pulse delay-1000" />

        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimation animation="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Browse Events
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-primary via-violet-600 to-primary bg-clip-text text-transparent dark:from-white dark:via-violet-400 dark:to-white">
                Church Events
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover and learn about upcoming events in the South Central Mindanao District.
              View event details, locations, dates, and registration information.
            </p>
          </div>
        </ScrollAnimation>

        {/* Search */}
        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background/50 backdrop-blur-sm border-border"
              />
            </div>
          </div>
        </ScrollAnimation>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={100}
            animation="fade-up"
          >
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </StaggerContainer>
        ) : (
          <ScrollAnimation animation="fade-up" delay={200}>
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery ? "No events found" : "No upcoming events"}
              </h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                {searchQuery
                  ? `No events match "${searchQuery}". Try a different search term.`
                  : "Check back later for new events. We'll have exciting events coming soon!"}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              )}
            </div>
          </ScrollAnimation>
        )}

        {/* CTA for Presidents */}
        <ScrollAnimation animation="fade-up" delay={300}>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-foreground">Are you a Church President?</h3>
                <p className="text-sm text-muted-foreground">
                  Sign in to register your church delegates for events.
                </p>
              </div>
              <Button asChild className="shadow-lg shadow-primary/25">
                <Link href="/login">
                  Sign In to Register
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
