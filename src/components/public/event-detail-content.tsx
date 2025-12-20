"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  DollarSign,
  Users,
  ChefHat,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/shared/scroll-animation";
import type { PublicEvent } from "@/actions/events";

interface EventDetailContentProps {
  event: PublicEvent;
}

function getStatusConfig(status: string) {
  switch (status) {
    case "UPCOMING":
      return {
        label: "Upcoming Event",
        className: "bg-blue-600 text-white border-blue-700 shadow-sm",
        icon: CalendarDays,
      };
    case "ONGOING":
      return {
        label: "Happening Now",
        className: "bg-emerald-600 text-white border-emerald-700 shadow-sm",
        icon: CheckCircle2,
      };
    default:
      return {
        label: status,
        className: "bg-gray-600 text-white border-gray-700 shadow-sm",
        icon: AlertCircle,
      };
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

function getDaysUntil(date: Date): number {
  const now = new Date();
  const diff = new Date(date).getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function EventDetailContent({ event }: EventDetailContentProps) {
  const statusConfig = getStatusConfig(event.status);
  const StatusIcon = statusConfig.icon;
  const registrationOpen = isRegistrationOpen(event);
  const preReg = isPreRegistration(event);
  const daysUntilEvent = getDaysUntil(new Date(event.startDate));
  const daysUntilDeadline = getDaysUntil(new Date(event.registrationDeadline));

  return (
    <section className="relative min-h-screen bg-background pt-20 pb-16">
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <ScrollAnimation animation="fade-up">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </ScrollAnimation>

        {/* Hero Section with Banner */}
        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-sm mb-8">
            {/* Banner Image */}
            <div className="relative aspect-[21/9] sm:aspect-[3/1] overflow-hidden bg-muted">
              {event.banner ? (
                <Image
                  src={event.banner}
                  alt={event.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 via-violet-500/20 to-blue-500/20">
                  <CalendarDays className="h-20 w-20 text-muted-foreground/30" />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <Badge className={`${statusConfig.className} border text-sm px-3 py-1`}>
                  <StatusIcon className="h-3.5 w-3.5 mr-1.5" />
                  {statusConfig.label}
                </Badge>
              </div>

              {/* Days Counter */}
              {event.status === "UPCOMING" && daysUntilEvent > 0 && (
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <div className="bg-background/90 backdrop-blur-sm rounded-xl px-4 py-2 text-center border border-border">
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">{daysUntilEvent}</p>
                    <p className="text-xs text-muted-foreground">days to go</p>
                  </div>
                </div>
              )}

              {/* Event Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                  {event.name}
                </h1>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Details Card */}
            <ScrollAnimation animation="fade-up" delay={200}>
              <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Event Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Event Date</p>
                      <p className="text-foreground font-semibold">
                        {format(new Date(event.startDate), "MMMM d")} - {format(new Date(event.endDate), "d, yyyy")}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <p className="text-foreground font-semibold">{event.location}</p>
                    </div>
                  </div>

                  {/* Registration Deadline */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Registration Deadline</p>
                      <p className="text-foreground font-semibold">
                        {format(new Date(event.registrationDeadline), "MMMM d, yyyy")}
                      </p>
                      {registrationOpen && daysUntilDeadline > 0 && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                          {daysUntilDeadline} days left
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Early Bird Period */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                      <DollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Early Bird Period</p>
                      <p className="text-foreground font-semibold">
                        {format(new Date(event.preRegistrationStart), "MMM d")} - {format(new Date(event.preRegistrationEnd), "MMM d, yyyy")}
                      </p>
                      {preReg && (
                        <Badge className="mt-1 bg-amber-500 text-white border-amber-600 shadow-sm">
                          Active Now
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {event.description && (
                  <div className="pt-4 border-t border-border">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">About this Event</h3>
                    <p className="text-foreground whitespace-pre-wrap">{event.description}</p>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Fees Card */}
            <ScrollAnimation animation="fade-up" delay={300}>
              <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Registration Fees</h2>

                {/* Delegate Fees */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Delegate Registration
                  </div>

                  <div className={`p-4 rounded-xl border ${preReg ? 'border-amber-300 dark:border-amber-700 bg-amber-500/5' : 'border-border bg-background/50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Early Bird Rate</p>
                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                          ₱{event.preRegistrationFee.toLocaleString()}
                        </p>
                      </div>
                      {preReg && (
                        <Badge className="bg-amber-500 text-white border-amber-600 shadow-sm">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${!preReg && registrationOpen ? 'border-primary/30 bg-primary/5' : 'border-border bg-background/50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Regular Rate</p>
                        <p className="text-2xl font-bold text-foreground">
                          ₱{event.onsiteRegistrationFee.toLocaleString()}
                        </p>
                      </div>
                      {!preReg && registrationOpen && (
                        <Badge className="bg-primary text-primary-foreground shadow-sm">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cook Fee */}
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                    <ChefHat className="h-4 w-4" />
                    Cook Registration
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-background/50">
                    <p className="text-sm text-muted-foreground">Per Cook</p>
                    <p className="text-2xl font-bold text-foreground">
                      ₱{event.cookRegistrationFee.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* CTA Card */}
            <ScrollAnimation animation="fade-up" delay={400}>
              <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-violet-500/5 to-blue-500/5 backdrop-blur-sm p-6 space-y-4">
                {registrationOpen ? (
                  <>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span className="font-medium text-foreground">Registration is Open</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Church presidents can sign in to register delegates and cooks for this event.
                    </p>
                    <Button asChild className="w-full shadow-lg shadow-primary/25">
                      <Link href="/login">
                        Sign In to Register
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <span className="font-medium text-foreground">Registration Closed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The registration deadline for this event has passed.
                    </p>
                  </>
                )}
              </div>
            </ScrollAnimation>

            {/* Back to Events */}
            <ScrollAnimation animation="fade-up" delay={500}>
              <Button variant="outline" asChild className="w-full">
                <Link href="/events">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  View All Events
                </Link>
              </Button>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
