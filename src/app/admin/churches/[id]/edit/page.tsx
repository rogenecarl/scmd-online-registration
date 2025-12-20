import { notFound } from "next/navigation";
import { PageHeader, FormCard } from "@/components/shared";
import { ChurchForm } from "@/components/admin/churches";
import { getChurchById } from "@/actions/churches";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditChurchPage({ params }: Props) {
  const { id } = await params;
  const result = await getChurchById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Church"
        description={`Editing ${result.data.name}`}
      />

      <FormCard>
        <ChurchForm
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
