"use client";

import { useEffect, useRef, useState } from "react";
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
        {/* Floating Gradient Orbs */}
        <div
          className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[128px]"
          style={{ animation: "landing-float 20s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[128px]"
          style={{
            animation: "landing-float 25s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]"
          style={{ animation: "landing-float 22s ease-in-out infinite 5s" }}
        />

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
              <span className="relative z-10 bg-gradient-to-r from-primary via-violet-600 to-primary bg-clip-text text-transparent dark:from-white dark:via-violet-400 dark:to-white bg-[length:200%_auto] animate-[landing-shimmer_6s_ease-in-out_infinite]">
                Event Registration
              </span>
            </span>{" "}
            for Church Delegates
          </h1>

          {/* Subheadline */}
          <p
            className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            style={{ animationDelay: "150ms", animationFillMode: "both" }}
          >
            Easily register your church delegates for SCMD events. Manage
            registrations, track approval status, and coordinate across
            divisions — all in one centralized platform.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-10 flex flex-col sm:flex-row items-center gap-4"
            style={{ animationDelay: "300ms", animationFillMode: "both" }}
          >
            <Button
              size="lg"
              asChild
              className="group w-full sm:w-auto shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link href="/login">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div
            className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            style={{ animationDelay: "450ms", animationFillMode: "both" }}
          >
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
          <div
            className="animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-20 w-full max-w-3xl"
            style={{ animationDelay: "600ms", animationFillMode: "both" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Divisions" value={8} />
              <StatCard label="Churches" value={78} />
              <StatCard label="Active Events" value={1} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes landing-float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -25px) scale(1.03);
          }
          50% {
            transform: translate(-20px, 30px) scale(0.97);
          }
          75% {
            transform: translate(25px, 15px) scale(1.02);
          }
        }
        @keyframes landing-shimmer {
          0%,
          100% {
            background-position: 0% center;
          }
          50% {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
  );
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-background/80 hover:text-foreground cursor-default">
      <span className="text-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="group rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
      <p className="text-3xl font-bold text-foreground">
        <CountUp target={value} />
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function CountUp({
  target,
  duration = 1500,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}
