"use client";

import { useAuth } from "@/hooks";
import { useAdminDashboard } from "@/hooks/use-dashboard";
import {
  StatsCard,
  StatsGrid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  DataTable,
  ActivityFeed,
} from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import {
  Skeleton,
  RegistrationStatusBadge,
  EventStatusBadge,
} from "@/components/shared";
import {
  Users,
  Building2,
  Calendar,
  FileText,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
  UserCheck,
  ChefHat,
  AlertCircle,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";

export function AdminOverview() {
  const { user } = useAuth();
  const { data: dashboard, isLoading, error } = useAdminDashboard();

  if (isLoading) {
    return <AdminOverviewSkeleton />;
  }

  if (error || !dashboard) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold">Failed to load dashboard</h3>
        <p className="text-muted-foreground">
          {error?.message || "Please try again later."}
        </p>
      </div>
    );
  }

  const { stats, recentBatches, eventsSummary } = dashboard;

  // Transform recent batches for ActivityFeed
  const activityItems = recentBatches.map((batch) => ({
    id: batch.id,
    title: `${batch.church.name} - Batch #${batch.batchNumber}`,
    description: `${batch.delegateCount} delegates, ${batch.cookCount} cooks for ${batch.event.name}`,
    timestamp: formatDistanceToNow(new Date(batch.createdAt), { addSuffix: true }),
    icon:
      batch.status === "APPROVED"
        ? CheckCircle
        : batch.status === "REJECTED"
          ? XCircle
          : Clock,
    iconColor:
      batch.status === "APPROVED"
        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        : batch.status === "REJECTED"
          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  }));

  // Batch columns with mobile support
  const batchColumns = [
    {
      key: "church",
      header: "Church",
      mobilePriority: "primary" as const,
      render: (item: (typeof recentBatches)[0]) => (
        <div>
          <p className="font-medium">{item.church.name}</p>
          <p className="text-xs text-muted-foreground">{item.event.name} - Batch #{item.batchNumber}</p>
        </div>
      ),
    },
    {
      key: "attendees",
      header: "Attendees",
      mobilePriority: "primary" as const,
      mobileLabel: "Attendees",
      render: (item: (typeof recentBatches)[0]) => (
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1">
            <UserCheck className="h-3 w-3" />
            {item.delegateCount}
          </span>
          <span className="flex items-center gap-1">
            <ChefHat className="h-3 w-3" />
            {item.cookCount}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      mobilePriority: "primary" as const,
      mobileLabel: "Status",
      render: (item: (typeof recentBatches)[0]) => (
        <RegistrationStatusBadge status={item.status} />
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      mobilePriority: "secondary" as const,
      mobileLabel: "Date",
      render: (item: (typeof recentBatches)[0]) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(item.createdAt), "MMM d, yyyy")}
        </span>
      ),
    },
  ];

  // Event columns with mobile support
  const eventColumns = [
    {
      key: "name",
      header: "Event",
      mobilePriority: "primary" as const,
      render: (item: (typeof eventsSummary)[0]) => (
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(item.startDate), "MMM d, yyyy")}
          </p>
        </div>
      ),
    },
    {
      key: "registrations",
      header: "Registrations",
      mobilePriority: "primary" as const,
      mobileLabel: "Registrations",
      render: (item: (typeof eventsSummary)[0]) => (
        <span className="text-sm font-medium">{item.registrationCount}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      mobilePriority: "primary" as const,
      mobileLabel: "Status",
      render: (item: (typeof eventsSummary)[0]) => (
        <EventStatusBadge status={item.status} />
      ),
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Section */}
      <div className="rounded-xl border border-border bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-fuchsia-500/5 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Admin Dashboard
            </h2>
            <p className="mt-1 text-sm md:text-base text-muted-foreground">
              Welcome back, {user?.name || "Administrator"}.
              <span className="hidden sm:inline"> Here&apos;s an overview of SCMD Online Registration.</span>
            </p>
          </div>
          {stats.pendingBatches > 0 && (
            <Link
              href="/admin/registrations?status=PENDING"
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-sm font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors touch-target w-full sm:w-auto"
            >
              <Clock className="h-4 w-4" />
              {stats.pendingBatches} Pending Approval
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid - Row 1: Organization */}
      <StatsGrid columns={4}>
        <StatsCard
          title="Divisions"
          value={stats.totalDivisions.toString()}
          description="Regional divisions"
          icon={Layers}
        />
        <StatsCard
          title="Churches"
          value={stats.totalChurches.toString()}
          description="Registered churches"
          icon={Building2}
        />
        <StatsCard
          title="Presidents"
          value={stats.totalPresidents.toString()}
          description="Church presidents"
          icon={Users}
        />
        <StatsCard
          title="Active Events"
          value={stats.activeEvents.toString()}
          description="Upcoming & ongoing"
          icon={Calendar}
        />
      </StatsGrid>

      {/* Stats Grid - Row 2: Batches */}
      <StatsGrid columns={4}>
        <StatsCard
          title="Total Registrations"
          value={stats.totalRegistrations.toString()}
          description="All time"
          icon={FileText}
        />
        <StatsCard
          title="Pending Batches"
          value={stats.pendingBatches.toString()}
          description="Awaiting approval"
          icon={Clock}
        />
        <StatsCard
          title="Approved Batches"
          value={stats.approvedBatches.toString()}
          description="Confirmed"
          icon={CheckCircle}
        />
        <StatsCard
          title="Rejected Batches"
          value={stats.rejectedBatches.toString()}
          description="Declined"
          icon={XCircle}
        />
      </StatsGrid>

      {/* Stats Grid - Row 3: Attendees */}
      <StatsGrid columns={2}>
        <StatsCard
          title="Total Delegates"
          value={stats.totalDelegates.toString()}
          description="Registered delegates across all events"
          icon={UserCheck}
        />
        <StatsCard
          title="Total Cooks"
          value={stats.totalCooks.toString()}
          description="Registered cooks across all events"
          icon={ChefHat}
        />
      </StatsGrid>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {/* Recent Batches */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader
              action={
                <Button variant="ghost" size="sm" asChild className="touch-target">
                  <Link
                    href="/admin/registrations"
                    className="flex items-center gap-1"
                  >
                    View all
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              }
            >
              <CardTitle className="text-base md:text-lg">Recent Batches</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Latest registration batches for events
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
              {recentBatches.length > 0 ? (
                <DataTable
                  columns={batchColumns}
                  data={recentBatches}
                  emptyMessage="No batches found"
                />
              ) : (
                <div className="text-center py-6 md:py-8 text-muted-foreground text-sm">
                  No batches yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Activity</CardTitle>
            <CardDescription className="text-xs md:text-sm">Recent registration activity</CardDescription>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
            {activityItems.length > 0 ? (
              <ActivityFeed items={activityItems} />
            ) : (
              <div className="text-center py-6 md:py-8 text-muted-foreground text-sm">
                No recent activity
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Events Summary & Quick Actions */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Events Summary */}
        <Card>
          <CardHeader
            action={
              <Button variant="ghost" size="sm" asChild className="touch-target">
                <Link href="/admin/events" className="flex items-center gap-1">
                  View all
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          >
            <CardTitle className="text-base md:text-lg">Events Summary</CardTitle>
            <CardDescription className="text-xs md:text-sm">Recent events and registrations</CardDescription>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
            {eventsSummary.length > 0 ? (
              <DataTable
                columns={eventColumns}
                data={eventsSummary}
                emptyMessage="No events found"
              />
            ) : (
              <div className="text-center py-6 md:py-8 text-muted-foreground text-sm">
                No events created yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Quick Actions</CardTitle>
            <CardDescription className="text-xs md:text-sm">Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
            <div className="space-y-2 md:space-y-3">
              <ActionItem
                icon={FileText}
                title="Review Batches"
                description="Approve or reject pending registration batches"
                href="/admin/registrations?status=PENDING"
                badge={
                  stats.pendingBatches > 0
                    ? stats.pendingBatches
                    : undefined
                }
              />
              <ActionItem
                icon={Calendar}
                title="Create Event"
                description="Set up a new event for registration"
                href="/admin/events/create"
              />
              <ActionItem
                icon={Users}
                title="Manage Presidents"
                description="Add or update church president accounts"
                href="/admin/presidents"
              />
              <ActionItem
                icon={Building2}
                title="Manage Churches"
                description="View and edit church information"
                href="/admin/churches"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminOverviewSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      <Skeleton className="h-24 md:h-28 w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 md:h-32 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 md:h-32 w-full" />
        ))}
      </div>
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Skeleton className="h-64 md:h-96 lg:col-span-2" />
        <Skeleton className="h-64 md:h-96" />
      </div>
    </div>
  );
}

function ActionItem({
  icon: Icon,
  title,
  description,
  href,
  badge,
}: {
  icon: typeof Users;
  title: string;
  description: string;
  href: string;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 md:gap-4 rounded-lg border border-border p-3 transition-all hover:border-primary/20 hover:bg-primary/5 active:bg-primary/10 touch-target"
    >
      <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{title}</p>
          {badge && (
            <span className="shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}
