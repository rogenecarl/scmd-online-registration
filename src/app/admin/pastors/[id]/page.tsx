import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { getPastorById } from "@/actions/pastors";
import { Pencil, ArrowLeft, Church, Building2 } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PastorDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getPastorById(id);

  if (!result.success) {
    notFound();
  }

  const pastor = result.data;

  return (
    <div>
      <PageHeader title={pastor.name} description="Pastor details">
        <Button variant="outline" asChild>
          <Link href="/admin/pastors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/admin/pastors/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Church Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Church className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Church</h3>
          </div>
          <Link
            href={`/admin/churches/${pastor.church.id}`}
            className="text-primary hover:underline font-medium"
          >
            {pastor.church.name}
          </Link>
        </div>

        {/* Division Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Division</h3>
          </div>
          <Link
            href={`/admin/divisions/${pastor.church.division.id}`}
            className="text-primary hover:underline font-medium"
          >
            {pastor.church.division.name}
          </Link>
        </div>

        {/* Metadata Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Details</h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-muted-foreground">Created</dt>
              <dd className="font-medium">
                {new Date(pastor.createdAt).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Last Updated</dt>
              <dd className="font-medium">
                {new Date(pastor.updatedAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
