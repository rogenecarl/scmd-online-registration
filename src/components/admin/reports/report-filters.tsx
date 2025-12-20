"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { RegistrationStatus } from "@/lib/generated/prisma";
import { format } from "date-fns";

export interface ReportFiltersState {
  eventId?: string;
  status?: RegistrationStatus;
  divisionId?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface ReportFiltersProps {
  filters: ReportFiltersState;
  onFiltersChange: (filters: ReportFiltersState) => void;
  events: { id: string; name: string; startDate: Date }[];
  divisions: { id: string; name: string }[];
  isLoadingEvents?: boolean;
  isLoadingDivisions?: boolean;
}

const STATUS_OPTIONS: { value: RegistrationStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export function ReportFilters({
  filters,
  onFiltersChange,
  events,
  divisions,
  isLoadingEvents,
  isLoadingDivisions,
}: ReportFiltersProps) {
  const updateFilter = <K extends keyof ReportFiltersState>(
    key: K,
    value: ReportFiltersState[K] | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasFilters =
    filters.eventId ||
    filters.status ||
    filters.divisionId ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Event Filter */}
        <div className="space-y-2">
          <Label htmlFor="event-filter">Event</Label>
          <Select
            value={filters.eventId || "all"}
            onValueChange={(value) =>
              updateFilter("eventId", value === "all" ? undefined : value)
            }
            disabled={isLoadingEvents}
          >
            <SelectTrigger id="event-filter">
              <SelectValue placeholder="All Events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name} ({format(new Date(event.startDate), "MMM yyyy")})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Division Filter */}
        <div className="space-y-2">
          <Label htmlFor="division-filter">Division</Label>
          <Select
            value={filters.divisionId || "all"}
            onValueChange={(value) =>
              updateFilter("divisionId", value === "all" ? undefined : value)
            }
            disabled={isLoadingDivisions}
          >
            <SelectTrigger id="division-filter">
              <SelectValue placeholder="All Divisions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Divisions</SelectItem>
              {divisions.map((division) => (
                <SelectItem key={division.id} value={division.id}>
                  {division.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select
            value={filters.status || "all"}
            onValueChange={(value) =>
              updateFilter(
                "status",
                value === "all" ? undefined : (value as RegistrationStatus)
              )
            }
          >
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date From Filter */}
        <div className="space-y-2">
          <Label htmlFor="date-from">Registration Date From</Label>
          <Input
            id="date-from"
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) =>
              updateFilter("dateFrom", e.target.value || undefined)
            }
          />
        </div>

        {/* Date To Filter */}
        <div className="space-y-2">
          <Label htmlFor="date-to">Registration Date To</Label>
          <Input
            id="date-to"
            type="date"
            value={filters.dateTo || ""}
            onChange={(e) =>
              updateFilter("dateTo", e.target.value || undefined)
            }
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1 text-muted-foreground"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
