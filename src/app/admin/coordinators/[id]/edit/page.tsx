import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
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

      <div className="rounded-xl border border-border bg-card p-6">
        <CoordinatorForm
          mode="edit"
          initialData={{
            id,
            name: result.data.name,
            divisionId: result.data.divisionId,
          }}
        />
      </div>
    </div>
  );
}
