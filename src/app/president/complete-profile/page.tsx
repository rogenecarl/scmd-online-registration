"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CompleteProfileForm } from "@/components/president/profile/complete-profile-form";
import { useProfileComplete } from "@/hooks/use-president-profile";
import { Loader2 } from "lucide-react";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { data: profileStatus, isLoading } = useProfileComplete();

  useEffect(() => {
    // If profile is already complete, redirect to dashboard
    if (profileStatus?.isComplete) {
      router.replace("/president/dashboard");
    }
  }, [profileStatus, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // If profile is complete, show loading while redirecting
  if (profileStatus?.isComplete) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <CompleteProfileForm />
    </div>
  );
}
