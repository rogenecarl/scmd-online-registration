"use client";

import { PageHeader } from "@/components/shared";
import { ProfileGuard } from "@/components/president";
import { ParticipantsTable } from "@/components/president/delegates";

function DelegatesContent() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Approved Participants"
        description="View all your approved delegates, siblings, and cooks"
      />
      <ParticipantsTable />
    </div>
  );
}

export default function PresidentDelegatesPage() {
  return (
    <ProfileGuard>
      <DelegatesContent />
    </ProfileGuard>
  );
}
