import { PageHeader, FormCard } from "@/components/shared";
import { DivisionForm } from "@/components/admin/divisions";

export default function CreateDivisionPage() {
  return (
    <div>
      <PageHeader
        title="Create Division"
        description="Add a new organizational division"
      />

      <FormCard>
        <DivisionForm mode="create" />
      </FormCard>
    </div>
  );
}
