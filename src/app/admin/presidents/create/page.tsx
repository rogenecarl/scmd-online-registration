import { PageHeader } from "@/components/shared/page-header";
import { PresidentForm } from "@/components/admin/presidents";

export default function CreatePresidentPage() {
  return (
    <div>
      <PageHeader
        title="Create President"
        description="Create a new church president account"
      />

      <div className="rounded-xl border border-border bg-card p-6">
        <PresidentForm mode="create" />
      </div>
    </div>
  );
}
