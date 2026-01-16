"use client";

import { useState, useMemo } from "react";
import { PaginatedDataTable } from "@/components/dashboard/paginated-data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableSkeleton, MobileFilterSheet, FilterGroup } from "@/components/shared";
import { EmptyState } from "@/components/shared/empty-state";
import {
  useAdminApprovedParticipants,
  useAdminParticipantsSummary,
  useEventsWithApprovedParticipantsAdmin,
  useChurchesWithApprovedParticipants,
  useDivisionsForFilter,
} from "@/hooks/use-registrations";
import { getAdminParticipantsColumns } from "./admin-participants-columns";
import { useDebounce } from "@/hooks/use-debounce";
import { Users, Heart, ChefHat, Search, UsersRound, Church } from "lucide-react";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination";
import type { AdminParticipantType } from "@/actions/approval";
import type { Gender } from "@/lib/generated/prisma";

const TYPE_OPTIONS: { value: AdminParticipantType | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Types" },
  { value: "delegate", label: "Delegates" },
  { value: "sibling", label: "Siblings" },
  { value: "cook", label: "Cooks" },
];

const GENDER_OPTIONS: { value: Gender | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Genders" },
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

export function AdminParticipantsTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [typeFilter, setTypeFilter] = useState<AdminParticipantType | "ALL">("ALL");
  const [eventFilter, setEventFilter] = useState<string>("ALL");
  const [churchFilter, setChurchFilter] = useState<string>("ALL");
  const [divisionFilter, setDivisionFilter] = useState<string>("ALL");
  const [genderFilter, setGenderFilter] = useState<Gender | "ALL">("ALL");
  const debouncedSearch = useDebounce(search, 300);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = () => {
    setPage(1);
  };

  // When division changes, reset church filter
  const handleDivisionFilterChange = (value: string) => {
    setDivisionFilter(value);
    setChurchFilter("ALL");
    handleFilterChange();
  };

  // Build filters
  const filters = {
    page,
    pageSize,
    search: debouncedSearch || undefined,
    type: typeFilter !== "ALL" ? typeFilter : undefined,
    eventId: eventFilter !== "ALL" ? eventFilter : undefined,
    churchId: churchFilter !== "ALL" ? churchFilter : undefined,
    divisionId: divisionFilter !== "ALL" ? divisionFilter : undefined,
    gender: genderFilter !== "ALL" ? genderFilter : undefined,
  };

  // Summary filters (without pagination, search, type, gender)
  const summaryFilters = useMemo(() => ({
    eventId: eventFilter !== "ALL" ? eventFilter : undefined,
    churchId: churchFilter !== "ALL" ? churchFilter : undefined,
    divisionId: divisionFilter !== "ALL" ? divisionFilter : undefined,
  }), [eventFilter, churchFilter, divisionFilter]);

  const { data, isLoading, error, isFetching } = useAdminApprovedParticipants(filters);
  const { data: summary } = useAdminParticipantsSummary(summaryFilters);
  const { data: events } = useEventsWithApprovedParticipantsAdmin();
  const { data: divisions } = useDivisionsForFilter();
  const { data: churches } = useChurchesWithApprovedParticipants({
    eventId: eventFilter !== "ALL" ? eventFilter : undefined,
    divisionId: divisionFilter !== "ALL" ? divisionFilter : undefined,
  });

  const columns = getAdminParticipantsColumns();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-8 bg-muted rounded w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
        <TableSkeleton rows={5} columns={6} />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={Users}
        title="Error loading participants"
        description={error.message}
      />
    );
  }

  const participants = data?.items ?? [];
  const hasFilters =
    debouncedSearch ||
    typeFilter !== "ALL" ||
    eventFilter !== "ALL" ||
    churchFilter !== "ALL" ||
    divisionFilter !== "ALL" ||
    genderFilter !== "ALL";
  const hasData = participants.length > 0 || hasFilters;

  // Count active filters for mobile badge
  const activeFilterCount = [
    typeFilter !== "ALL",
    eventFilter !== "ALL",
    churchFilter !== "ALL",
    divisionFilter !== "ALL",
    genderFilter !== "ALL",
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    setTypeFilter("ALL");
    setEventFilter("ALL");
    setChurchFilter("ALL");
    setDivisionFilter("ALL");
    setGenderFilter("ALL");
    setPage(1);
  };

  // Select content elements
  const typeSelectContent = (
    <SelectContent>
      {TYPE_OPTIONS.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  );

  const genderSelectContent = (
    <SelectContent>
      {GENDER_OPTIONS.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  );

  const eventSelectContent = (
    <SelectContent>
      <SelectItem value="ALL">All Events</SelectItem>
      {events?.map((event) => (
        <SelectItem key={event.id} value={event.id}>
          {event.name}
        </SelectItem>
      ))}
    </SelectContent>
  );

  const divisionSelectContent = (
    <SelectContent>
      <SelectItem value="ALL">All Divisions</SelectItem>
      {divisions?.map((division) => (
        <SelectItem key={division.id} value={division.id}>
          {division.name}
        </SelectItem>
      ))}
    </SelectContent>
  );

  const churchSelectContent = (
    <SelectContent>
      <SelectItem value="ALL">All Churches</SelectItem>
      {churches?.map((church) => (
        <SelectItem key={church.id} value={church.id}>
          {church.name}
          {divisionFilter === "ALL" && (
            <span className="text-muted-foreground ml-1">({church.divisionName})</span>
          )}
        </SelectItem>
      ))}
    </SelectContent>
  );

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value as AdminParticipantType | "ALL");
    handleFilterChange();
  };

  const handleGenderFilterChange = (value: string) => {
    setGenderFilter(value as Gender | "ALL");
    handleFilterChange();
  };

  const handleEventFilterChange = (value: string) => {
    setEventFilter(value);
    handleFilterChange();
  };

  const handleChurchFilterChange = (value: string) => {
    setChurchFilter(value);
    handleFilterChange();
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.totalParticipants ?? 0}</div>
            <p className="text-xs text-muted-foreground">Approved registrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delegates</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.totalDelegates ?? 0}</div>
            <p className="text-xs text-muted-foreground">Regular delegates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Siblings</CardTitle>
            <Heart className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.totalSiblings ?? 0}</div>
            <p className="text-xs text-muted-foreground">With sibling discount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cooks</CardTitle>
            <ChefHat className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.totalCooks ?? 0}</div>
            <p className="text-xs text-muted-foreground">Kitchen staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churches</CardTitle>
            <Church className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.churchCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">With approved batches</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        {/* Search - Full width on mobile */}
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, church, event..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Desktop Filter Controls - Hidden on mobile */}
        <div className="hidden md:flex md:items-center md:gap-2 md:flex-wrap">
          <Select value={divisionFilter} onValueChange={handleDivisionFilterChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Division" />
            </SelectTrigger>
            {divisionSelectContent}
          </Select>
          <Select value={churchFilter} onValueChange={handleChurchFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Church" />
            </SelectTrigger>
            {churchSelectContent}
          </Select>
          <Select value={eventFilter} onValueChange={handleEventFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Event" />
            </SelectTrigger>
            {eventSelectContent}
          </Select>
          <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            {typeSelectContent}
          </Select>
          <Select value={genderFilter} onValueChange={handleGenderFilterChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            {genderSelectContent}
          </Select>
        </div>

        {/* Mobile filter sheet */}
        <MobileFilterSheet
          activeFilterCount={activeFilterCount}
          onClear={handleClearFilters}
        >
          <FilterGroup label="Division">
            <Select value={divisionFilter} onValueChange={handleDivisionFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              {divisionSelectContent}
            </Select>
          </FilterGroup>
          <FilterGroup label="Church">
            <Select value={churchFilter} onValueChange={handleChurchFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Church" />
              </SelectTrigger>
              {churchSelectContent}
            </Select>
          </FilterGroup>
          <FilterGroup label="Event">
            <Select value={eventFilter} onValueChange={handleEventFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Event" />
              </SelectTrigger>
              {eventSelectContent}
            </Select>
          </FilterGroup>
          <FilterGroup label="Type">
            <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              {typeSelectContent}
            </Select>
          </FilterGroup>
          <FilterGroup label="Gender">
            <Select value={genderFilter} onValueChange={handleGenderFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              {genderSelectContent}
            </Select>
          </FilterGroup>
        </MobileFilterSheet>
      </div>

      {/* Table or Empty State */}
      {hasData ? (
        <PaginatedDataTable
          columns={columns}
          data={participants}
          emptyMessage={
            hasFilters
              ? "No participants match your filters"
              : "No approved participants found"
          }
          isLoading={isFetching}
          pagination={{
            page: data?.page ?? 1,
            pageSize: data?.pageSize ?? pageSize,
            total: data?.total ?? 0,
            totalPages: data?.totalPages ?? 0,
            onPageChange: setPage,
            onPageSizeChange: setPageSize,
          }}
        />
      ) : (
        <EmptyState
          icon={Users}
          title="No approved participants yet"
          description="Once registrations are approved, delegates, siblings, and cooks will appear here"
        />
      )}
    </div>
  );
}
