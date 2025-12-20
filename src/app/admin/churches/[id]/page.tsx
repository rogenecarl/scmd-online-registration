import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getChurchById } from "@/actions/churches";
import {
  DetailCard,
  DetailCardHeader,
  DetailGrid,
  DetailMetadata,
  DetailList,
} from "@/components/shared";
import { PageHeader } from "@/components/shared/page-header";
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
    <div className="space-y-4 md:space-y-6">
      <PageHeader title={church.name} description="Church details">
        <Button variant="outline" asChild className="touch-target">
          <Link href="/admin/churches">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </Button>
        <Button asChild className="touch-target">
          <Link href={`/admin/churches/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      <DetailGrid columns={3}>
        {/* Division Card */}
        <DetailCard>
          <DetailCardHeader icon={<Building2 />} title="Division" />
          <Link
            href={`/admin/divisions/${church.division.id}`}
            className="text-sm md:text-base text-primary hover:underline font-medium"
          >
            {church.division.name}
          </Link>
        </DetailCard>

        {/* Pastor Card */}
        <DetailCard>
          <DetailCardHeader icon={<User />} title="Pastor" />
          {church.pastor ? (
            <p className="text-sm md:text-base font-medium">
              {church.pastor.name}
            </p>
          ) : (
            <p className="text-sm md:text-base text-muted-foreground">
              No pastor assigned
            </p>
          )}
        </DetailCard>

        {/* Presidents Card */}
        <DetailCard>
          <DetailCardHeader
            icon={<Users />}
            title="Presidents"
            badge={
              <Badge variant="secondary">{church.presidents.length}</Badge>
            }
          />
          <DetailList
            items={church.presidents.map((president) => ({
              id: president.id,
              label: president.name,
              sublabel: president.email,
            }))}
            emptyMessage="No presidents assigned"
          />
        </DetailCard>
      </DetailGrid>

      {/* Metadata */}
      <DetailCard>
        <DetailCardHeader title="Details" />
        <DetailMetadata
          items={[
            {
              label: "Created",
              value: new Date(church.createdAt).toLocaleDateString(),
            },
            {
              label: "Last Updated",
              value: new Date(church.updatedAt).toLocaleDateString(),
            },
          ]}
        />
      </DetailCard>
    </div>
  );
}
