import { PageHeader, FormCard } from "@/components/shared";
import { PastorForm } from "@/components/admin/pastors";

export default function CreatePastorPage() {
  return (
    <div>
      <PageHeader
        title="Create Pastor"
        description="Assign a pastor to a church"
      />

      <FormCard>
        <PastorForm mode="create" />
      </FormCard>
    </div>
  );
}
