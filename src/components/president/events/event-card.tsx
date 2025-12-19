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
    logo: string | null;
    startDate: Date;
    endDate: Date;
    registrationDeadline: Date;
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
  const deadlinePassed = isPast(new Date(event.registrationDeadline));
  const canRegister = !event.hasRegistration && !deadlinePassed;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-black/5">
      {/* Event Header */}
      <div className="relative border-b border-border bg-gradient-to-br from-primary/5 to-primary/10 p-6">
        {event.logo && (
          <Image
            src={event.logo}
            alt={event.name}
            width={48}
            height={48}
            className="absolute right-4 top-4 rounded-lg object-cover"
            unoptimized
          />
        )}
        <div className="pr-16">
          <h3 className="text-lg font-semibold">{event.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {getRegistrationStatusBadge(event.registrationStatus, event.hasRegistration)}
            {feeInfo.isPreReg && !event.hasRegistration && (
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
                Early Bird Active
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6">
        {event.description && (
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {format(new Date(event.startDate), "MMM d")} -{" "}
              {format(new Date(event.endDate), "MMM d, yyyy")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className={cn(deadlinePassed && "text-red-600")}>
              {deadlinePassed ? "Registration Closed" : `Deadline: ${format(new Date(event.registrationDeadline), "MMM d, yyyy")}`}
            </span>
          </div>
        </div>

        {/* Fee Information */}
        {!event.hasRegistration && !deadlinePassed && (
          <div className="mt-4 rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{feeInfo.type}</p>
                <p className="text-lg font-bold">{formatCurrency(feeInfo.fee)}</p>
                <p className="text-xs text-muted-foreground">per delegate</p>
              </div>
              {event.cookRegistrationFee > 0 && (
                <div className="text-right">
                  <p className="text-xs font-medium text-muted-foreground">Cook Fee</p>
                  <p className="text-lg font-semibold">{formatCurrency(event.cookRegistrationFee)}</p>
                  <p className="text-xs text-muted-foreground">per cook</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-border p-4">
        {canRegister ? (
          <Button className="w-full" asChild>
            <Link href={`/president/events/${event.id}/register`}>
              <Users className="mr-2 h-4 w-4" />
              Register Delegates
            </Link>
          </Button>
        ) : event.hasRegistration ? (
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/president/registrations/${event.registrationId}`}>
              View Registration
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="secondary" className="w-full" disabled>
            Registration Closed
          </Button>
        )}
      </div>
    </div>
  );
}
