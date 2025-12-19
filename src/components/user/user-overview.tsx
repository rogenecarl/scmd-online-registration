"use client";

import { useAuth } from "@/hooks";
import {
  StatsCard,
  StatsGrid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  ActivityFeed,
} from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  ClipboardCheck,
  Clock,
  ChevronRight,
  CalendarPlus,
  FileText,
  Bell,
  CheckCircle,
  AlertCircle,
  CalendarDays,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const recentActivity = [
  {
    id: "1",
    title: "Registration Submitted",
    description: "You registered for SCMD Youth Convention 2025",
    timestamp: "2 hours ago",
    icon: ClipboardCheck,
    iconColor: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: "2",
    title: "Registration Approved",
    description: "Your registration for District Fellowship was approved",
    timestamp: "1 day ago",
    icon: CheckCircle,
    iconColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    id: "3",
    title: "Event Reminder",
    description: "Leadership Training starts in 3 days",
    timestamp: "2 days ago",
    icon: Bell,
    iconColor: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    id: "4",
    title: "New Event Available",
    description: "Women's Ministry Conference registration is now open",
    timestamp: "1 week ago",
    icon: Calendar,
    iconColor: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  },
];

const upcomingEvents = [
  {
    id: "1",
    title: "SCMD Youth Convention 2025",
    date: "March 15-17, 2025",
    location: "GenSan Convention Center",
    status: "registered",
  },
  {
    id: "2",
    title: "Leadership Training Seminar",
    date: "February 28, 2025",
    location: "Davao City Church",
    status: "pending",
  },
  {
    id: "3",
    title: "District Fellowship",
    date: "April 5, 2025",
    location: "Koronadal Church",
    status: "approved",
  },
  {
    id: "4",
    title: "Women's Ministry Conference",
    date: "May 10-11, 2025",
    location: "Tacurong Church",
    status: "open",
  },
];

export function UserOverview() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-xl border border-border bg-gradient-to-r from-primary/5 via-violet-500/5 to-blue-500/5 p-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(" ")[0] || "Member"}!
        </h2>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s an overview of your event registrations and upcoming activities.
        </p>
      </div>

      {/* Stats Grid */}
      <StatsGrid columns={4}>
        <StatsCard
          title="Registered Events"
          value="3"
          description="Total registrations"
          icon={ClipboardCheck}
          trend={{ value: 1, label: "this month" }}
        />
        <StatsCard
          title="Upcoming Events"
          value="2"
          description="Events you're attending"
          icon={Calendar}
        />
        <StatsCard
          title="Pending Approvals"
          value="1"
          description="Awaiting confirmation"
          icon={Clock}
        />
        <StatsCard
          title="Events Attended"
          value="8"
          description="Total participation"
          icon={Users}
        />
      </StatsGrid>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <CardHeader
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/events" className="flex items-center gap-1">
                  View all events
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          >
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events you&apos;re registered for or can join</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.location}
                    </p>
                  </div>
                  <EventStatusBadge status={event.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/activity" className="flex items-center gap-1">
                  View all
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          >
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest registration updates</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityFeed items={recentActivity} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common registration tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              icon={CalendarPlus}
              label="Browse Events"
              href="/dashboard/events"
            />
            <QuickAction
              icon={FileText}
              label="My Registrations"
              href="/dashboard/registrations"
            />
            <QuickAction
              icon={Bell}
              label="Notifications"
              href="/dashboard/notifications"
              badge={2}
            />
            <QuickAction
              icon={HelpCircle}
              label="Help & Support"
              href="/dashboard/help"
            />
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/10">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-200">Registration Reminder</h4>
              <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                The deadline for SCMD Youth Convention 2025 registration is approaching.
                Make sure to complete your registration before February 28, 2025.
              </p>
              <Button variant="outline" size="sm" className="mt-3 border-amber-300 dark:border-amber-800" asChild>
                <Link href="/dashboard/events">Complete Registration</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EventStatusBadge({ status }: { status: string }) {
  const config = {
    approved: {
      label: "Approved",
      className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    registered: {
      label: "Registered",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    pending: {
      label: "Pending",
      className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
    open: {
      label: "Open",
      className: "bg-muted text-muted-foreground",
    },
  };

  const { label, className } = config[status as keyof typeof config] || config.open;

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

function QuickAction({
  icon: Icon,
  label,
  href,
  badge,
}: {
  icon: typeof Calendar;
  label: string;
  href: string;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg border border-border p-4 transition-all hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="font-medium">{label}</span>
      {badge && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-semibold text-destructive-foreground">
          {badge}
        </span>
      )}
    </Link>
  );
}
