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

  const { stats, recentRegistrations, eventsSummary } = dashboard;

  // Transform recent registrations for ActivityFeed
  const activityItems = recentRegistrations.map((reg) => ({
    id: reg.id,
    title: `${reg.church.name} registered for ${reg.event.name}`,
    description: `${reg._count.delegates} delegates, ${reg._count.cooks} cooks`,
    timestamp: formatDistanceToNow(new Date(reg.createdAt), { addSuffix: true }),
    icon:
      reg.status === "APPROVED"
        ? CheckCircle
        : reg.status === "REJECTED"
          ? XCircle
          : Clock,
    iconColor:
      reg.status === "APPROVED"
        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        : reg.status === "REJECTED"
          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  }));

  // Registration columns
  const registrationColumns = [
    {
      key: "church",
      header: "Church",
      render: (item: (typeof recentRegistrations)[0]) => (
        <div>
          <p className="font-medium">{item.church.name}</p>
          <p className="text-xs text-muted-foreground">{item.event.name}</p>
        </div>
      ),
    },
    {
      key: "attendees",
      header: "Attendees",
      render: (item: (typeof recentRegistrations)[0]) => (
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1">
            <UserCheck className="h-3 w-3" />
            {item._count.delegates}
          </span>
          <span className="flex items-center gap-1">
            <ChefHat className="h-3 w-3" />
            {item._count.cooks}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: (typeof recentRegistrations)[0]) => (
        <RegistrationStatusBadge status={item.status} />
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (item: (typeof recentRegistrations)[0]) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(item.createdAt), "MMM d, yyyy")}
        </span>
      ),
    },
  ];

  // Event columns
  const eventColumns = [
    {
      key: "name",
      header: "Event",
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
      render: (item: (typeof eventsSummary)[0]) => (
        <span className="text-sm font-medium">{item._count.registrations}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: (typeof eventsSummary)[0]) => (
        <EventStatusBadge status={item.status} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-xl border border-border bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-fuchsia-500/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Admin Dashboard
            </h2>
            <p className="mt-1 text-muted-foreground">
              Welcome back, {user?.name || "Administrator"}. Here&apos;s an
              overview of SCMD Online Registration.
            </p>
          </div>
          {stats.pendingRegistrations > 0 && (
            <Link
              href="/admin/registrations?status=PENDING"
              className="hidden sm:flex items-center gap-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
            >
              <Clock className="h-4 w-4" />
              {stats.pendingRegistrations} Pending Approval
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

      {/* Stats Grid - Row 2: Registrations */}
      <StatsGrid columns={4}>
        <StatsCard
          title="Total Registrations"
          value={stats.totalRegistrations.toString()}
          description="All time"
          icon={FileText}
        />
        <StatsCard
          title="Pending"
          value={stats.pendingRegistrations.toString()}
          description="Awaiting approval"
          icon={Clock}
        />
        <StatsCard
          title="Approved"
          value={stats.approvedRegistrations.toString()}
          description="Confirmed"
          icon={CheckCircle}
        />
        <StatsCard
          title="Rejected"
          value={stats.rejectedRegistrations.toString()}
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
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Registrations */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader
              action={
                <Button variant="ghost" size="sm" asChild>
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
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>
                Latest church registrations for events
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentRegistrations.length > 0 ? (
                <DataTable
                  columns={registrationColumns}
                  data={recentRegistrations}
                  emptyMessage="No registrations found"
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No registrations yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Recent registration activity</CardDescription>
          </CardHeader>
          <CardContent>
            {activityItems.length > 0 ? (
              <ActivityFeed items={activityItems} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No recent activity
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Events Summary & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Events Summary */}
        <Card>
          <CardHeader
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/events" className="flex items-center gap-1">
                  View all
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          >
            <CardTitle>Events Summary</CardTitle>
            <CardDescription>Recent events and registrations</CardDescription>
          </CardHeader>
          <CardContent>
            {eventsSummary.length > 0 ? (
              <DataTable
                columns={eventColumns}
                data={eventsSummary}
                emptyMessage="No events found"
              />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No events created yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ActionItem
                icon={FileText}
                title="Review Registrations"
                description="Approve or reject pending registrations"
                href="/admin/registrations?status=PENDING"
                badge={
                  stats.pendingRegistrations > 0
                    ? stats.pendingRegistrations
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
    <div className="space-y-6">
      <Skeleton className="h-28 w-full rounded-xl" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-96 lg:col-span-2" />
        <Skeleton className="h-96" />
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
      className="flex items-center gap-4 rounded-lg border border-border p-3 transition-all hover:border-primary/20 hover:bg-primary/5"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{title}</p>
          {badge && (
            <span className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}
