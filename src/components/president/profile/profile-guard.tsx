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
 * hasn't selected their church yet
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Show loading while redirecting
  if (!profileStatus?.isComplete) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
