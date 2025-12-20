import { notFound } from "next/navigation";
import { PageHeader, FormCard } from "@/components/shared";
import { DivisionForm } from "@/components/admin/divisions";
import { getDivisionById } from "@/actions/divisions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditDivisionPage({ params }: Props) {
  const { id } = await params;
  const result = await getDivisionById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Division"
        description={`Editing ${result.data.name}`}
      />

      <FormCard>
        <DivisionForm mode="edit" initialData={{ id, name: result.data.name }} />
      </FormCard>
    </div>
  );
}
