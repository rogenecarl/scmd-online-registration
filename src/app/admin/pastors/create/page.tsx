import { PageHeader } from "@/components/shared/page-header";
import { PastorForm } from "@/components/admin/pastors";

export default function CreatePastorPage() {
  return (
    <div>
      <PageHeader
        title="Create Pastor"
        description="Assign a pastor to a church"
      />

      <div className="rounded-xl border border-border bg-card p-6">
        <PastorForm mode="create" />
      </div>
    </div>
  );
}
