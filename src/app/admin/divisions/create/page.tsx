import { PageHeader } from "@/components/shared/page-header";
import { DivisionForm } from "@/components/admin/divisions";

export default function CreateDivisionPage() {
  return (
    <div>
      <PageHeader
        title="Create Division"
        description="Add a new organizational division"
      />

      <div className="rounded-xl border border-border bg-card p-6">
        <DivisionForm mode="create" />
      </div>
    </div>
  );
}
