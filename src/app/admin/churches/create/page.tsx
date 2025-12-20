import { PageHeader, FormCard } from "@/components/shared";
import { ChurchForm } from "@/components/admin/churches";

export default function CreateChurchPage() {
  return (
    <div>
      <PageHeader
        title="Create Church"
        description="Add a new church to a division"
      />

      <FormCard>
        <ChurchForm mode="create" />
      </FormCard>
    </div>
  );
}
