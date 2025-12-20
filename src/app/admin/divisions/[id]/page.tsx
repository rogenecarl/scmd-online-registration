import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDivisionById } from "@/actions/divisions";
import {
  DetailCard,
  DetailCardHeader,
  DetailGrid,
  DetailMetadata,
  DetailList,
} from "@/components/shared";
import { PageHeader } from "@/components/shared/page-header";
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
    <div className="space-y-4 md:space-y-6">
      <PageHeader title={division.name} description="Division details">
        <Button variant="outline" asChild className="touch-target">
          <Link href="/admin/divisions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </Button>
        <Button asChild className="touch-target">
          <Link href={`/admin/divisions/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      <DetailGrid columns={2}>
        {/* Coordinator Card */}
        <DetailCard>
          <DetailCardHeader icon={<User />} title="Coordinator" />
          {division.coordinator ? (
            <p className="text-sm md:text-base font-medium">
              {division.coordinator.name}
            </p>
          ) : (
            <p className="text-sm md:text-base text-muted-foreground">
              No coordinator assigned
            </p>
          )}
        </DetailCard>

        {/* Churches Card */}
        <DetailCard>
          <DetailCardHeader
            icon={<Church />}
            title="Churches"
            badge={
              <Badge variant="secondary">{division.churches.length}</Badge>
            }
          />
          <DetailList
            items={division.churches.map((church) => ({
              id: church.id,
              label: church.name,
              href: `/admin/churches/${church.id}`,
            }))}
            emptyMessage="No churches in this division"
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
              value: new Date(division.createdAt).toLocaleDateString(),
            },
            {
              label: "Last Updated",
              value: new Date(division.updatedAt).toLocaleDateString(),
            },
          ]}
        />
      </DetailCard>
    </div>
  );
}
