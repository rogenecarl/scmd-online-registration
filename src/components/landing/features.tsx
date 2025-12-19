"use client";

import {
  Church,
  Users,
  Calendar,
  ClipboardCheck,
  Building2,
  UserCog,
  FileText,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Church,
    title: "Multi-Division Support",
    description:
      "Organize churches across multiple divisions with dedicated coordinators. Hierarchical structure for efficient management of the entire SCMD network.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Delegate Management",
    description:
      "Register and manage delegates with detailed information including roles, accommodations, and dietary requirements. Track delegate counts per church.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Calendar,
    title: "Event Scheduling",
    description:
      "Create and manage church events with customizable registration periods. Set deadlines and track event status from upcoming to completed.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: ClipboardCheck,
    title: "Approval Workflow",
    description:
      "Streamlined registration approval process for administrators. Review, approve, or reject registrations with detailed remarks and tracking.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Building2,
    title: "Church Profiles",
    description:
      "Complete church information management including pastor details, contact information, and location. Link churches to their respective divisions.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: UserCog,
    title: "Role-Based Access",
    description:
      "Separate dashboards for Administrators and Church Presidents. Each role has tailored views and permissions for their responsibilities.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "Registration Reports",
    description:
      "Export delegate lists and registration summaries. Generate reports for event planning, accommodation arrangements, and food preparation.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Bell,
    title: "Status Notifications",
    description:
      "Track registration status in real-time. Presidents receive updates when their registrations are approved or require attention.",
    gradient: "from-teal-500 to-emerald-500",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-primary via-violet-600 to-primary bg-clip-text text-transparent dark:from-white dark:via-violet-400 dark:to-white">
              event registration
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete solution for managing church event registrations.
            From delegate sign-ups to admin approvals, everything is
            streamlined and organized.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <div
      className="group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-border/80 hover:bg-card hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Icon */}
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg shadow-black/10 mb-4 transition-transform group-hover:scale-110`}
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {feature.description}
      </p>

      {/* Hover Gradient */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none`}
      />
    </div>
  );
}
