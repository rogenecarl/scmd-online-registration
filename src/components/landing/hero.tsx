"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, ClipboardCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-violet-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/30" />

      {/* Secondary Gradient Layer for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-primary/5 dark:from-slate-950 dark:via-transparent dark:to-violet-500/10" />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[128px] animate-pulse" />
        <div className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[128px] animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px] animate-pulse delay-1000" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Bottom Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 dark:to-slate-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Headline */}
          <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary via-violet-600 to-primary bg-clip-text text-transparent dark:from-white dark:via-violet-400 dark:to-white">
                Event Registration
              </span>
            </span>
            {" "}for Church Delegates
          </h1>

          {/* Subheadline */}
          <p className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Easily register your church delegates for SCMD events. Manage
            registrations, track approval status, and coordinate across
            divisions — all in one centralized platform.
          </p>

          {/* CTA Buttons */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto shadow-lg shadow-primary/25">
              <Link href="/login">
                 Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <FeaturePill
              icon={<Users className="h-4 w-4" />}
              text="Register delegates"
            />
            <FeaturePill
              icon={<Calendar className="h-4 w-4" />}
              text="Browse events"
            />
            <FeaturePill
              icon={<ClipboardCheck className="h-4 w-4" />}
              text="Track approvals"
            />
          </div>

          {/* Stats Preview */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 mt-20 w-full max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Divisions" value="8" />
              <StatCard label="Churches" value="78" />
              <StatCard label="Active Events" value="1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground">
      <span className="text-primary">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 text-center">
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
