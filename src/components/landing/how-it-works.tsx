"use client";

import { UserPlus, ClipboardList, CheckCircle, Calendar } from "lucide-react";
import { ScrollAnimation } from "@/components/shared/scroll-animation";

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    description:
      "Church presidents register with their church details and get verified by the administrator. Once approved, you'll have full access to the registration system.",
    icon: UserPlus,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    title: "Browse Active Events",
    description:
      "View all upcoming SCMD events with their registration deadlines, requirements, and available slots. Choose the events your church wants to participate in.",
    icon: Calendar,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    step: "03",
    title: "Register Delegates",
    description:
      "Add your church delegates with their complete information including roles, accommodations, dietary requirements, and any special needs for the event.",
    icon: ClipboardList,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    step: "04",
    title: "Track & Get Approved",
    description:
      "Monitor your registration status in real-time. Receive notifications when your registration is reviewed, and get confirmation once approved by administrators.",
    icon: CheckCircle,
    gradient: "from-amber-500 to-orange-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-background">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation animation="fade-up" className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            How it{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
              works
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Register your church delegates for SCMD events in four simple steps.
            Our streamlined process makes delegate registration quick and effortless.
          </p>
        </ScrollAnimation>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <StepCard key={item.step} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  item,
  index,
}: {
  item: (typeof steps)[0];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <ScrollAnimation
      animation="fade-up"
      delay={index * 150}
      duration={600}
      threshold={0.1}
    >
      <div className="group relative flex flex-col items-center text-center">
        {/* Step Number */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl font-bold text-muted-foreground/10 select-none">
          {item.step}
        </div>

        {/* Icon Container */}
        <div
          className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-black/10 transition-transform group-hover:scale-110`}
        >
          <Icon className="h-8 w-8" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>
    </ScrollAnimation>
  );
}
