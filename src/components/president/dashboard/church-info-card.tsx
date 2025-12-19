"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard";
import { Church, Users, MapPin } from "lucide-react";

interface ChurchInfoCardProps {
  church: {
    id: string;
    name: string;
    division: {
      id: string;
      name: string;
    };
    pastor: {
      id: string;
      name: string;
    } | null;
  } | null;
}

export function ChurchInfoCard({ church }: ChurchInfoCardProps) {
  if (!church) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Church className="h-5 w-5" />
            Church Information
          </CardTitle>
          <CardDescription>Your assigned church details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-border p-6 text-center">
            <Church className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              You are not assigned to any church yet.
            </p>
            <p className="text-xs text-muted-foreground">
              Please contact an administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Church className="h-5 w-5" />
          Church Information
        </CardTitle>
        <CardDescription>Your assigned church details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Church className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Church</p>
              <p className="font-semibold">{church.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Division</p>
              <p className="font-semibold">{church.division.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pastor</p>
              <p className="font-semibold">
                {church.pastor?.name || "Not assigned"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
