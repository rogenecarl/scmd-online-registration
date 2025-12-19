import { PageHeader } from "@/components/shared/page-header";
import { CoordinatorForm } from "@/components/admin/coordinators";

export default function CreateCoordinatorPage() {
  return (
    <div>
      <PageHeader
        title="Create Coordinator"
        description="Assign a coordinator to a division"
      />

      <div className="rounded-xl border border-border bg-card p-6">
        <CoordinatorForm mode="create" />
      </div>
    </div>
  );
}
