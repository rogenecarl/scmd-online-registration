"use client";

import { PageHeader } from "@/components/shared/page-header";
import { AdminParticipantsTable } from "@/components/admin/delegates";

export default function AdminDelegatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All Delegates"
        description="View all approved delegates, siblings, and cooks across all churches"
      />
      <AdminParticipantsTable />
    </div>
  );
}
