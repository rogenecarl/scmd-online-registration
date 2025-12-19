"use client";

import { StatsCard, StatsGrid } from "@/components/dashboard";
import {
  ChurchInfoCard,
  UpcomingEventsCard,
  RegistrationSummary,
  ProfileGuard,
} from "@/components/president";
import { StatsSkeleton, CardSkeleton, EmptyState } from "@/components/shared";
import { usePresidentDashboard } from "@/hooks/use-dashboard";
import { Calendar, Users, Clock, CheckCircle, AlertTriangle } from "lucide-react";

function DashboardContent() {
  const { data, isLoading, error } = usePresidentDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <StatsSkeleton />
        <div className="grid gap-6 md:grid-cols-2">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Failed to load dashboard"
        description={error.message}
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <StatsGrid>
        <StatsCard
          title="Active Events"
          value={data.stats.activeEvents}
          description="Events open for registration"
          icon={Calendar}
        />
        <StatsCard
          title="Total Delegates"
          value={data.stats.totalDelegates}
          description="Registered delegates"
          icon={Users}
        />
        <StatsCard
          title="Pending Approvals"
          value={data.stats.pendingRegistrations}
          description="Awaiting admin review"
          icon={Clock}
        />
        <StatsCard
          title="Approved Registrations"
          value={data.stats.approvedRegistrations}
          description="Confirmed registrations"
          icon={CheckCircle}
        />
      </StatsGrid>

      {/* Church Info & Upcoming Events */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChurchInfoCard church={data.church} />
        <UpcomingEventsCard events={data.upcomingEvents} />
      </div>

      {/* Recent Registrations */}
      <RegistrationSummary registrations={data.recentRegistrations} />
    </div>
  );
}

export default function PresidentDashboardPage() {
  return (
    <ProfileGuard>
      <DashboardContent />
    </ProfileGuard>
  );
}
