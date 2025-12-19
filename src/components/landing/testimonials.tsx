"use client";

import { Star, Quote } from "lucide-react";
import { ScrollAnimation } from "@/components/shared/scroll-animation";

const testimonials = [
  {
    content:
      "The registration process used to take hours with paper forms. Now our delegates are registered in minutes. This system has transformed how we manage church events.",
    author: "Pastor Samuel Reyes",
    role: "Church President, Davao Central",
    avatar: "SR",
    rating: 5,
  },
  {
    content:
      "As a division coordinator, I can now see all registrations across churches in real-time. The approval workflow is straightforward and saves us so much time.",
    author: "Sis. Maria Santos",
    role: "Division Coordinator",
    avatar: "MS",
    rating: 5,
  },
  {
    content:
      "Managing delegate accommodations and dietary requirements is now effortless. The reports feature helps us prepare for events with accurate headcounts.",
    author: "Bro. Daniel Cruz",
    role: "Event Coordinator",
    avatar: "DC",
    rating: 5,
  },
  {
    content:
      "Our church used to miss registration deadlines. The notification system keeps us updated, and tracking our registration status is so convenient.",
    author: "Pastor Grace Tan",
    role: "Church President, GenSan District",
    avatar: "GT",
    rating: 5,
  },
  {
    content:
      "The multi-church support is exactly what SCMD needed. Each church has its own space, but we can coordinate across the entire district seamlessly.",
    author: "Elder John Aquino",
    role: "District Administrator",
    avatar: "JA",
    rating: 5,
  },
  {
    content:
      "From registration to approval, everything is transparent. Church presidents can see their status, and admins can manage everything efficiently.",
    author: "Sis. Ruth Mendoza",
    role: "Church Secretary",
    avatar: "RM",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-violet-500/5 blur-[128px]" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-primary/5 blur-[128px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation animation="fade-up" className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-orange-400">
              SCMD churches
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from church leaders who have streamlined their event registration
            process.
          </p>
        </ScrollAnimation>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats */}
        <ScrollAnimation animation="fade-up" delay={300} className="mt-20">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Stat value="100+" label="Churches" />
            <Stat value="50+" label="Events Managed" />
            <Stat value="5,000+" label="Delegates Registered" />
            <Stat value="10+" label="Divisions" />
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <ScrollAnimation
      animation="fade-up"
      delay={index * 100}
      duration={500}
      threshold={0.05}
    >
      <div className="group relative h-full rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-border/80 hover:bg-card hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        {/* Quote Icon */}
        <Quote className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/10" />

        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-amber-400 text-amber-400"
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 text-sm font-semibold">
            {testimonial.avatar}
          </div>
          <div>
            <p className="text-sm font-medium">{testimonial.author}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent dark:from-white dark:to-violet-400">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
