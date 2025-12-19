import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getChurchById } from "@/actions/churches";
import { Pencil, ArrowLeft, User, Building2, Users } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ChurchDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getChurchById(id);

  if (!result.success) {
    notFound();
  }

  const church = result.data;

  return (
    <div>
      <PageHeader title={church.name} description="Church details">
        <Button variant="outline" asChild>
          <Link href="/admin/churches">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/admin/churches/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Division Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Division</h3>
          </div>
          <Link
            href={`/admin/divisions/${church.division.id}`}
            className="text-primary hover:underline font-medium"
          >
            {church.division.name}
          </Link>
        </div>

        {/* Pastor Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Pastor</h3>
          </div>
          {church.pastor ? (
            <div className="space-y-2">
              <p className="font-medium">{church.pastor.name}</p>
              {church.pastor.email && (
                <p className="text-sm text-muted-foreground">
                  {church.pastor.email}
                </p>
              )}
              {church.pastor.phone && (
                <p className="text-sm text-muted-foreground">
                  {church.pastor.phone}
                </p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No pastor assigned</p>
          )}
        </div>

        {/* Presidents Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Presidents</h3>
            <Badge variant="secondary" className="ml-auto">
              {church.presidents.length}
            </Badge>
          </div>
          {church.presidents.length > 0 ? (
            <ul className="space-y-2">
              {church.presidents.map((president) => (
                <li key={president.id} className="text-sm">
                  <p className="font-medium">{president.name}</p>
                  <p className="text-muted-foreground">{president.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No presidents assigned</p>
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
              {new Date(church.createdAt).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Last Updated</dt>
            <dd className="font-medium">
              {new Date(church.updatedAt).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
