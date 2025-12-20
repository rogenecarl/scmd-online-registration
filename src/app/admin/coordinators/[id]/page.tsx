import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCoordinatorById } from "@/actions/coordinators";
import {
  DetailCard,
  DetailCardHeader,
  DetailGrid,
  DetailMetadata,
} from "@/components/shared";
import { PageHeader } from "@/components/shared/page-header";
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
    <div className="space-y-4 md:space-y-6">
      <PageHeader title={coordinator.name} description="Coordinator details">
        <Button variant="outline" asChild className="touch-target">
          <Link href="/admin/coordinators">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </Button>
        <Button asChild className="touch-target">
          <Link href={`/admin/coordinators/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      <DetailGrid columns={2}>
        {/* Division Card */}
        <DetailCard>
          <DetailCardHeader icon={<Building2 />} title="Division" />
          <Link
            href={`/admin/divisions/${coordinator.division.id}`}
            className="text-sm md:text-base text-primary hover:underline font-medium"
          >
            {coordinator.division.name}
          </Link>
        </DetailCard>

        {/* Metadata Card */}
        <DetailCard>
          <DetailCardHeader title="Details" />
          <DetailMetadata
            columns={1}
            items={[
              {
                label: "Created",
                value: new Date(coordinator.createdAt).toLocaleDateString(),
              },
              {
                label: "Last Updated",
                value: new Date(coordinator.updatedAt).toLocaleDateString(),
              },
            ]}
          />
        </DetailCard>
      </DetailGrid>
    </div>
  );
}
