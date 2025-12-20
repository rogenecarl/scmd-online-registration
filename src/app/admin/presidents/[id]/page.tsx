import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPresidentById } from "@/actions/presidents";
import {
  DetailCard,
  DetailCardHeader,
  DetailGrid,
  DetailMetadata,
  StatsCard,
} from "@/components/shared";
import { PageHeader } from "@/components/shared/page-header";
import {
  Pencil,
  ArrowLeft,
  Church,
  Building2,
  Mail,
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
    <div className="space-y-4 md:space-y-6">
      <PageHeader title={president.name} description="President details">
        <Button variant="outline" asChild className="touch-target">
          <Link href="/admin/presidents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </Button>
        <Button asChild className="touch-target">
          <Link href={`/admin/presidents/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      <DetailGrid columns={3}>
        {/* Contact Info Card */}
        <DetailCard>
          <DetailCardHeader icon={<Mail />} title="Contact" />
          <div className="space-y-3">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Email</p>
              <p className="text-sm md:text-base font-medium break-all">
                {president.email}
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Status</p>
              {president.emailVerified ? (
                <Badge variant="secondary">Email Verified</Badge>
              ) : (
                <Badge variant="outline">Pending Verification</Badge>
              )}
            </div>
          </div>
        </DetailCard>

        {/* Church Card */}
        <DetailCard>
          <DetailCardHeader icon={<Church />} title="Church" />
          {president.church ? (
            <Link
              href={`/admin/churches/${president.church.id}`}
              className="text-sm md:text-base text-primary hover:underline font-medium"
            >
              {president.church.name}
            </Link>
          ) : (
            <p className="text-sm md:text-base text-muted-foreground italic">
              No church assigned
            </p>
          )}
        </DetailCard>

        {/* Division Card */}
        <DetailCard>
          <DetailCardHeader icon={<Building2 />} title="Division" />
          {president.church?.division ? (
            <Link
              href={`/admin/divisions/${president.church.division.id}`}
              className="text-sm md:text-base text-primary hover:underline font-medium"
            >
              {president.church.division.name}
            </Link>
          ) : (
            <p className="text-sm md:text-base text-muted-foreground">-</p>
          )}
        </DetailCard>
      </DetailGrid>

      <DetailGrid columns={2}>
        {/* Registrations Card */}
        <DetailCard>
          <DetailCardHeader icon={<ClipboardList />} title="Registrations" />
          <StatsCard
            value={president._count.registrations}
            label="Total registrations"
          />
        </DetailCard>

        {/* Metadata Card */}
        <DetailCard>
          <DetailCardHeader title="Details" />
          <DetailMetadata
            items={[
              {
                label: "Created",
                value: new Date(president.createdAt).toLocaleDateString(),
              },
              {
                label: "Last Updated",
                value: new Date(president.updatedAt).toLocaleDateString(),
              },
            ]}
          />
        </DetailCard>
      </DetailGrid>
    </div>
  );
}
