import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { PastorTable } from "@/components/admin/pastors";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function PastorsPage() {
  return (
    <div>
      <PageHeader
        title="Pastors"
        description="Manage church pastors (one per church)"
      >
        <Button asChild>
          <Link href="/admin/pastors/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Pastor
          </Link>
        </Button>
      </PageHeader>

      <PastorTable />
    </div>
  );
}
