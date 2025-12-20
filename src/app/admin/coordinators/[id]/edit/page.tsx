import { notFound } from "next/navigation";
import { PageHeader, FormCard } from "@/components/shared";
import { CoordinatorForm } from "@/components/admin/coordinators";
import { getCoordinatorById } from "@/actions/coordinators";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCoordinatorPage({ params }: Props) {
  const { id } = await params;
  const result = await getCoordinatorById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Coordinator"
        description={`Editing ${result.data.name}`}
      />

      <FormCard>
        <CoordinatorForm
          mode="edit"
          initialData={{
            id,
            name: result.data.name,
            divisionId: result.data.divisionId,
          }}
        />
      </FormCard>
    </div>
  );
}
