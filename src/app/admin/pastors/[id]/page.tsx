import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getPastorById } from "@/actions/pastors";
import {
  DetailCard,
  DetailCardHeader,
  DetailGrid,
  DetailMetadata,
} from "@/components/shared";
import { PageHeader } from "@/components/shared/page-header";
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
    <div className="space-y-4 md:space-y-6">
      <PageHeader title={pastor.name} description="Pastor details">
        <Button variant="outline" asChild className="touch-target">
          <Link href="/admin/pastors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </Button>
        <Button asChild className="touch-target">
          <Link href={`/admin/pastors/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </PageHeader>

      <DetailGrid columns={3}>
        {/* Church Card */}
        <DetailCard>
          <DetailCardHeader icon={<Church />} title="Church" />
          <Link
            href={`/admin/churches/${pastor.church.id}`}
            className="text-sm md:text-base text-primary hover:underline font-medium"
          >
            {pastor.church.name}
          </Link>
        </DetailCard>

        {/* Division Card */}
        <DetailCard>
          <DetailCardHeader icon={<Building2 />} title="Division" />
          <Link
            href={`/admin/divisions/${pastor.church.division.id}`}
            className="text-sm md:text-base text-primary hover:underline font-medium"
          >
            {pastor.church.division.name}
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
                value: new Date(pastor.createdAt).toLocaleDateString(),
              },
              {
                label: "Last Updated",
                value: new Date(pastor.updatedAt).toLocaleDateString(),
              },
            ]}
          />
        </DetailCard>
      </DetailGrid>
    </div>
  );
}
