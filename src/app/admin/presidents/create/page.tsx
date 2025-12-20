import { PageHeader, FormCard } from "@/components/shared";
import { PresidentForm } from "@/components/admin/presidents";

export default function CreatePresidentPage() {
  return (
    <div>
      <PageHeader
        title="Create President"
        description="Create a new church president account"
      />

      <FormCard>
        <PresidentForm mode="create" />
      </FormCard>
    </div>
  );
}
