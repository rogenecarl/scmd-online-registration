import { notFound } from "next/navigation";
import { PageHeader, FormCard } from "@/components/shared";
import { PastorForm } from "@/components/admin/pastors";
import { getPastorById } from "@/actions/pastors";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPastorPage({ params }: Props) {
  const { id } = await params;
  const result = await getPastorById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Pastor"
        description={`Editing ${result.data.name}`}
      />

      <FormCard>
        <PastorForm
          mode="edit"
          initialData={{
            id,
            name: result.data.name,
            churchId: result.data.churchId,
          }}
        />
      </FormCard>
    </div>
  );
}
