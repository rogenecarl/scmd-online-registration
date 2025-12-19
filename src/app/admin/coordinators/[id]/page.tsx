import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { getCoordinatorById } from "@/actions/coordinators";
import { Pencil, ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CoordinatorDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getCoordinatorById(id);

  if (!result.success) {
    notFound();
  }

  const coordinator = result.data;

  return (
    <div>
      <PageHeader title={coordinator.name} description="Coordinator details">
        <Button variant="outline" asChild>
          <Link href="/admin/coordinators">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/admin/coordinators/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Division Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Division</h3>
          </div>
          <Link
            href={`/admin/divisions/${coordinator.division.id}`}
            className="text-primary hover:underline font-medium"
          >
            {coordinator.division.name}
          </Link>
        </div>

        {/* Metadata Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Details</h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-muted-foreground">Created</dt>
              <dd className="font-medium">
                {new Date(coordinator.createdAt).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Last Updated</dt>
              <dd className="font-medium">
                {new Date(coordinator.updatedAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
