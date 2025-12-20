import { notFound } from "next/navigation";
import { PageHeader, FormCard } from "@/components/shared";
import { PresidentForm } from "@/components/admin/presidents";
import { getPresidentById } from "@/actions/presidents";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPresidentPage({ params }: Props) {
  const { id } = await params;
  const result = await getPresidentById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit President"
        description={`Editing ${result.data.name}`}
      />

      <FormCard>
        <PresidentForm
          mode="edit"
          initialData={{
            id,
            name: result.data.name,
            email: result.data.email,
            churchId: result.data.churchId,
          }}
        />
      </FormCard>
    </div>
  );
}
