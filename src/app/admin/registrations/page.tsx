"use client";

import { PageHeader } from "@/components/shared/page-header";
import { RegistrationTable } from "@/components/admin/registrations";

export default function AdminRegistrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Registrations"
        description="Review and manage event registrations from all churches"
      />
      <RegistrationTable />
    </div>
  );
}
