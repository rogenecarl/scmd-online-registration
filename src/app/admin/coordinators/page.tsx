import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { CoordinatorTable } from "@/components/admin/coordinators";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CoordinatorsPage() {
  return (
    <div>
      <PageHeader
        title="Coordinators"
        description="Manage division coordinators (one per division)"
      >
        <Button asChild>
          <Link href="/admin/coordinators/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Coordinator
          </Link>
        </Button>
      </PageHeader>

      <CoordinatorTable />
    </div>
  );
}
