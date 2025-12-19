import { PageHeader } from "@/components/shared/page-header";
import { ChurchForm } from "@/components/admin/churches";

export default function CreateChurchPage() {
  return (
    <div>
      <PageHeader
        title="Create Church"
        description="Add a new church to a division"
      />

      <div className="rounded-xl border border-border bg-card p-6">
        <ChurchForm mode="create" />
      </div>
    </div>
  );
}
