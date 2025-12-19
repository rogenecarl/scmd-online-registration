import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDivisionById } from "@/actions/divisions";
import { Pencil, ArrowLeft, User, Church } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DivisionDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getDivisionById(id);

  if (!result.success) {
    notFound();
  }

  const division = result.data;

  return (
    <div>
      <PageHeader title={division.name} description="Division details">
        <Button variant="outline" asChild>
          <Link href="/admin/divisions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/admin/divisions/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Coordinator Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Coordinator</h3>
          </div>
          {division.coordinator ? (
            <div className="space-y-2">
              <p className="font-medium">{division.coordinator.name}</p>
              {division.coordinator.email && (
                <p className="text-sm text-muted-foreground">
                  {division.coordinator.email}
                </p>
              )}
              {division.coordinator.phone && (
                <p className="text-sm text-muted-foreground">
                  {division.coordinator.phone}
                </p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No coordinator assigned</p>
          )}
        </div>

        {/* Churches Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Church className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Churches</h3>
            <Badge variant="secondary" className="ml-auto">
              {division.churches.length}
            </Badge>
          </div>
          {division.churches.length > 0 ? (
            <ul className="space-y-2">
              {division.churches.map((church) => (
                <li key={church.id}>
                  <Link
                    href={`/admin/churches/${church.id}`}
                    className="text-primary hover:underline"
                  >
                    {church.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No churches in this division</p>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Details</h3>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Created</dt>
            <dd className="font-medium">
              {new Date(division.createdAt).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Last Updated</dt>
            <dd className="font-medium">
              {new Date(division.updatedAt).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
