import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { PresidentTable } from "@/components/admin/presidents";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function PresidentsPage() {
  return (
    <div>
      <PageHeader
        title="Presidents"
        description="Manage church president accounts (one per church)"
      >
        <Button asChild>
          <Link href="/admin/presidents/create">
            <Plus className="mr-2 h-4 w-4" />
            Add President
          </Link>
        </Button>
      </PageHeader>

      <PresidentTable />
    </div>
  );
}
