"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight
} from "lucide-react";
import { format, isPast, isWithinInterval } from "date-fns";
import type { EventStatus, RegistrationStatus } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: {
    id: string;
    name: string;
    description: string | null;
    location: string;
    banner: string | null;
    startDate: Date;
    endDate: Date;
    preRegistrationFee: number;
    preRegistrationStart: Date;
    preRegistrationEnd: Date;
    onsiteRegistrationFee: number;
    cookRegistrationFee: number;
    status: EventStatus;
    hasRegistration: boolean;
    registrationStatus: RegistrationStatus | null;
    registrationId: string | null;
  };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(amount);
}

function getRegistrationStatusBadge(status: RegistrationStatus | null, hasRegistration: boolean) {
  if (!hasRegistration) return null;

  switch (status) {
    case "PENDING":
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
          <AlertCircle className="mr-1 h-3 w-3" />
          Pending Approval
        </Badge>
      );
    case "APPROVED":
      return (
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
          <CheckCircle className="mr-1 h-3 w-3" />
          Approved
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">
          <XCircle className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
      );
  }
}

function getFeeInfo(event: EventCardProps["event"]): { fee: number; type: string; isPreReg: boolean } {
  const now = new Date();
  const isPreReg = isWithinInterval(now, {
    start: new Date(event.preRegistrationStart),
    end: new Date(event.preRegistrationEnd),
  });

  return {
    fee: isPreReg ? event.preRegistrationFee : event.onsiteRegistrationFee,
    type: isPreReg ? "Pre-Registration" : "On-Site Registration",
    isPreReg,
  };
}

export function EventCard({ event }: EventCardProps) {
  const feeInfo = getFeeInfo(event);
  const eventStarted = isPast(new Date(event.startDate));
  const canRegister = !event.hasRegistration && !eventStarted;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-black/5">
      {/* Event Header */}
      <div className="relative border-b border-border bg-gradient-to-br from-primary/5 to-primary/10 p-4 md:p-6">
        {event.banner && (
          <Image
            src={event.banner}
            alt={event.name}
            width={48}
            height={48}
            className="absolute right-3 top-3 md:right-4 md:top-4 h-10 w-10 md:h-12 md:w-12 rounded-lg object-cover"
            unoptimized
          />
        )}
        <div className="pr-14 md:pr-16">
          <h3 className="text-base md:text-lg font-semibold">{event.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 md:gap-2">
            {getRegistrationStatusBadge(event.registrationStatus, event.hasRegistration)}
            {feeInfo.isPreReg && !event.hasRegistration && (
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 text-[10px] md:text-xs">
                Early Bird
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-4 md:p-6">
        {event.description && (
          <p className="mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-xs md:text-sm">
            <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 text-muted-foreground" />
            <span>
              {format(new Date(event.startDate), "MMM d")} -{" "}
              {format(new Date(event.endDate), "MMM d, yyyy")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs md:text-sm">
            <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 text-muted-foreground" />
            <span className={cn(eventStarted && "text-red-600")}>
              {eventStarted ? "Registration Closed" : "Registration Open"}
            </span>
          </div>
        </div>

        {/* Fee Information */}
        {!event.hasRegistration && !eventStarted && (
          <div className="mt-3 md:mt-4 rounded-lg bg-muted/50 p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] md:text-xs font-medium text-muted-foreground">{feeInfo.type}</p>
                <p className="text-base md:text-lg font-bold">{formatCurrency(feeInfo.fee)}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">per delegate</p>
              </div>
              {event.cookRegistrationFee > 0 && (
                <div className="text-right">
                  <p className="text-[10px] md:text-xs font-medium text-muted-foreground">Cook Fee</p>
                  <p className="text-base md:text-lg font-semibold">{formatCurrency(event.cookRegistrationFee)}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">per cook</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-border p-3 md:p-4">
        {canRegister ? (
          <Button className="w-full touch-target" asChild>
            <Link href={`/president/events/${event.id}/register`}>
              <Users className="mr-2 h-4 w-4" />
              Register Delegates
            </Link>
          </Button>
        ) : event.hasRegistration ? (
          <Button variant="outline" className="w-full touch-target" asChild>
            <Link href={`/president/registrations/${event.registrationId}`}>
              View Registration
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="secondary" className="w-full touch-target" disabled>
            Registration Closed
          </Button>
        )}
      </div>
    </div>
  );
}
