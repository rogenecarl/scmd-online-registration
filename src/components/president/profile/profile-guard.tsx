"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfileComplete } from "@/hooks/use-president-profile";
import { Loader2 } from "lucide-react";

interface ProfileGuardProps {
  children: React.ReactNode;
}

/**
 * Guard component that redirects to complete-profile if president
 * hasn't selected their church yet.
 *
 * Mobile-optimized with proper viewport height handling.
 */
export function ProfileGuard({ children }: ProfileGuardProps) {
  const router = useRouter();
  const { data: profileStatus, isLoading } = useProfileComplete();

  useEffect(() => {
    if (!isLoading && profileStatus && !profileStatus.isComplete) {
      router.replace("/president/complete-profile");
    }
  }, [profileStatus, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] md:min-h-[60vh] items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading while redirecting
  if (!profileStatus?.isComplete) {
    return (
      <div className="flex min-h-[50vh] md:min-h-[60vh] items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
