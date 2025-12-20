import { PageHeader, FormCard } from "@/components/shared";
import { CoordinatorForm } from "@/components/admin/coordinators";

export default function CreateCoordinatorPage() {
  return (
    <div>
      <PageHeader
        title="Create Coordinator"
        description="Assign a coordinator to a division"
      />

      <FormCard>
        <CoordinatorForm mode="create" />
      </FormCard>
    </div>
  );
}
