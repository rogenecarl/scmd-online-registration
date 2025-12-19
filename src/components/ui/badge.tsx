import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-white",
        outline:
          "text-foreground border-border",
        // Semantic variants
        success:
          "border-transparent bg-[var(--success)] text-[var(--success-foreground)]",
        warning:
          "border-transparent bg-[var(--warning)] text-[var(--warning-foreground)]",
        info:
          "border-transparent bg-[var(--info)] text-[var(--info-foreground)]",
        // Status variants for Registration
        pending:
          "border-transparent bg-[var(--status-pending)] text-[var(--status-pending-foreground)]",
        approved:
          "border-transparent bg-[var(--status-approved)] text-[var(--status-approved-foreground)]",
        rejected:
          "border-transparent bg-[var(--status-rejected)] text-[var(--status-rejected-foreground)]",
        // Status variants for Events
        upcoming:
          "border-transparent bg-[var(--status-upcoming)] text-[var(--status-upcoming-foreground)]",
        ongoing:
          "border-transparent bg-[var(--status-ongoing)] text-[var(--status-ongoing-foreground)]",
        completed:
          "border-transparent bg-[var(--status-completed)] text-[var(--status-completed-foreground)]",
        cancelled:
          "border-transparent bg-[var(--status-cancelled)] text-[var(--status-cancelled-foreground)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
