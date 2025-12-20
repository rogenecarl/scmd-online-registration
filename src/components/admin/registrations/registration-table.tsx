"use client";

import { useState } from "react";
import { PaginatedDataTable } from "@/components/dashboard/paginated-data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableSkeleton, MobileFilterSheet, FilterGroup } from "@/components/shared";
import { EmptyState } from "@/components/shared/empty-state";
import {
  useRegistrations,
  useEventsForFilter,
  useDivisionsForFilter,
  useApproveRegistration,
  useRejectRegistration,
} from "@/hooks/use-registrations";
import { getRegistrationColumns } from "./registration-columns";
import { ApprovalDialog } from "./approval-dialog";
import { RejectionDialog } from "./rejection-dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { ClipboardCheck, Search } from "lucide-react";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination";
import type { RegistrationStatus } from "@/lib/generated/prisma";

const STATUS_OPTIONS: { value: RegistrationStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Status" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export function RegistrationTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [statusFilter, setStatusFilter] = useState<RegistrationStatus | "ALL">("ALL");
  const [eventFilter, setEventFilter] = useState<string>("ALL");
  const [divisionFilter, setDivisionFilter] = useState<string>("ALL");
  const debouncedSearch = useDebounce(search, 300);

  // Dialogs
  const [approveTarget, setApproveTarget] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = () => {
    setPage(1);
  };

  // Build filters
  const filters = {
    page,
    pageSize,
    search: debouncedSearch || undefined,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    eventId: eventFilter !== "ALL" ? eventFilter : undefined,
    divisionId: divisionFilter !== "ALL" ? divisionFilter : undefined,
  };

  const { data, isLoading, error, isFetching } = useRegistrations(filters);
  const { data: events } = useEventsForFilter();
  const { data: divisions } = useDivisionsForFilter();
  const approveMutation = useApproveRegistration();
  const rejectMutation = useRejectRegistration();

  const handleApprove = (id: string) => {
    setApproveTarget(id);
  };

  const handleReject = (id: string) => {
    setRejectTarget(id);
  };

  const confirmApprove = async () => {
    if (approveTarget) {
      await approveMutation.mutateAsync(approveTarget);
      setApproveTarget(null);
    }
  };

  const confirmReject = async (remarks: string) => {
    if (rejectTarget) {
      await rejectMutation.mutateAsync({ registrationId: rejectTarget, remarks });
      setRejectTarget(null);
    }
  };

  const columns = getRegistrationColumns({
    onApprove: handleApprove,
    onReject: handleReject,
  });

  if (isLoading) {
    return <TableSkeleton rows={5} columns={6} />;
  }

  if (error) {
    return (
      <EmptyState
        icon={ClipboardCheck}
        title="Error loading registrations"
        description={error.message}
      />
    );
  }

  const registrations = data?.items ?? [];
  const hasFilters = debouncedSearch || statusFilter !== "ALL" || eventFilter !== "ALL" || divisionFilter !== "ALL";
  const hasData = registrations.length > 0 || hasFilters;

  // Count active filters for mobile badge
  const activeFilterCount = [
    statusFilter !== "ALL",
    eventFilter !== "ALL",
    divisionFilter !== "ALL",
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    setStatusFilter("ALL");
    setEventFilter("ALL");
    setDivisionFilter("ALL");
    setPage(1);
  };

  // Select content elements (reused in desktop and mobile views)
  const statusSelectContent = (
    <SelectContent>
      {STATUS_OPTIONS.map((option) => (
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

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as RegistrationStatus | "ALL");
    handleFilterChange();
  };

  const handleEventFilterChange = (value: string) => {
    setEventFilter(value);
    handleFilterChange();
  };

  const handleDivisionFilterChange = (value: string) => {
    setDivisionFilter(value);
    handleFilterChange();
  };

  return (
    <>
      {/* Filters */}
      <div className="flex gap-3 mb-4">
        {/* Search - Full width on mobile */}
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search churches, events..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Desktop Filter Controls - Hidden on mobile */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            {statusSelectContent}
          </Select>
          <Select value={eventFilter} onValueChange={handleEventFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Event" />
            </SelectTrigger>
            {eventSelectContent}
          </Select>
          <Select value={divisionFilter} onValueChange={handleDivisionFilterChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Division" />
            </SelectTrigger>
            {divisionSelectContent}
          </Select>
        </div>

        {/* Mobile filter sheet */}
        <MobileFilterSheet
          activeFilterCount={activeFilterCount}
          onClear={handleClearFilters}
        >
          <FilterGroup label="Status">
            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              {statusSelectContent}
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
          <FilterGroup label="Division">
            <Select value={divisionFilter} onValueChange={handleDivisionFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              {divisionSelectContent}
            </Select>
          </FilterGroup>
        </MobileFilterSheet>
      </div>

      {/* Table or Empty State */}
      {hasData ? (
        <PaginatedDataTable
          columns={columns}
          data={registrations}
          emptyMessage={
            hasFilters
              ? "No registrations match your filters"
              : "No registrations found"
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
          icon={ClipboardCheck}
          title="No registrations yet"
          description="Registrations will appear here once churches submit them"
        />
      )}

      {/* Approval Dialog */}
      <ApprovalDialog
        open={!!approveTarget}
        onOpenChange={(open) => !open && setApproveTarget(null)}
        onConfirm={confirmApprove}
        isLoading={approveMutation.isPending}
      />

      {/* Rejection Dialog */}
      <RejectionDialog
        open={!!rejectTarget}
        onOpenChange={(open) => !open && setRejectTarget(null)}
        onConfirm={confirmReject}
        isLoading={rejectMutation.isPending}
      />
    </>
  );
}
