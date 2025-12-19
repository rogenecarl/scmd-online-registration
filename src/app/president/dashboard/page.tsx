import { Card, CardHeader, CardTitle, CardDescription, CardContent, StatsCard } from "@/components/dashboard";
import { Calendar, Users, ClipboardCheck, Clock } from "lucide-react";

export default function PresidentDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Events"
          value="2"
          description="Events open for registration"
          icon={Calendar}
          trend={{ value: 1, label: "from last month" }}
        />
        <StatsCard
          title="Total Delegates"
          value="24"
          description="Registered delegates"
          icon={Users}
        />
        <StatsCard
          title="Pending Approvals"
          value="1"
          description="Awaiting admin review"
          icon={Clock}
          trend={{ value: -1, label: "from last month" }}
        />
        <StatsCard
          title="Approved Registrations"
          value="3"
          description="This year"
          icon={ClipboardCheck}
          trend={{ value: 2, label: "from last month" }}
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for your church</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <QuickActionButton
              href="/president/register"
              label="Register Delegates"
              description="Sign up delegates for an upcoming event"
            />
            <QuickActionButton
              href="/president/registrations"
              label="View Registrations"
              description="Check status of your submissions"
            />
            <QuickActionButton
              href="/president/events"
              label="Browse Events"
              description="See all available events"
            />
          </CardContent>
        </Card>

        {/* Recent Registrations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>Your latest registration activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <RegistrationItem
                eventName="Annual Conference 2025"
                delegates={12}
                status="approved"
                date="Dec 15, 2024"
              />
              <RegistrationItem
                eventName="Youth Camp 2025"
                delegates={8}
                status="pending"
                date="Dec 10, 2024"
              />
              <RegistrationItem
                eventName="Leadership Summit"
                delegates={4}
                status="approved"
                date="Nov 28, 2024"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickActionButton({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col rounded-lg border border-border p-4 hover:bg-accent transition-colors"
    >
      <span className="font-medium">{label}</span>
      <span className="text-sm text-muted-foreground">{description}</span>
    </a>
  );
}

function RegistrationItem({
  eventName,
  delegates,
  status,
  date,
}: {
  eventName: string;
  delegates: number;
  status: "pending" | "approved" | "rejected";
  date: string;
}) {
  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-600",
    approved: "bg-green-500/10 text-green-600",
    rejected: "bg-red-500/10 text-red-600",
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{eventName}</p>
        <p className="text-sm text-muted-foreground">
          {delegates} delegates • {date}
        </p>
      </div>
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[status]}`}
      >
        {status}
      </span>
    </div>
  );
}
