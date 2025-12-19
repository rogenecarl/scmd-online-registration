import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPresidentById } from "@/actions/presidents";
import {
  Pencil,
  ArrowLeft,
  Church,
  Building2,
  Mail,
  Calendar,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PresidentDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getPresidentById(id);

  if (!result.success) {
    notFound();
  }

  const president = result.data;

  return (
    <div>
      <PageHeader title={president.name} description="President details">
        <Button variant="outline" asChild>
          <Link href="/admin/presidents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/admin/presidents/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Contact Info Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Contact</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{president.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              {president.emailVerified ? (
                <Badge variant="secondary">Email Verified</Badge>
              ) : (
                <Badge variant="outline">Pending Verification</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Church Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Church className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Church</h3>
          </div>
          {president.church ? (
            <Link
              href={`/admin/churches/${president.church.id}`}
              className="text-primary hover:underline font-medium"
            >
              {president.church.name}
            </Link>
          ) : (
            <p className="text-muted-foreground italic">No church assigned</p>
          )}
        </div>

        {/* Division Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Division</h3>
          </div>
          {president.church?.division ? (
            <Link
              href={`/admin/divisions/${president.church.division.id}`}
              className="text-primary hover:underline font-medium"
            >
              {president.church.division.name}
            </Link>
          ) : (
            <p className="text-muted-foreground">-</p>
          )}
        </div>

        {/* Registrations Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Registrations</h3>
          </div>
          <p className="text-3xl font-bold">{president._count.registrations}</p>
          <p className="text-sm text-muted-foreground">Total registrations</p>
        </div>

        {/* Metadata Card */}
        <div className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Details</h3>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-muted-foreground">Created</dt>
              <dd className="font-medium">
                {new Date(president.createdAt).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Last Updated</dt>
              <dd className="font-medium">
                {new Date(president.updatedAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
