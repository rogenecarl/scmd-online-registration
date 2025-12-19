import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { DivisionTable } from "@/components/admin/divisions";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DivisionsPage() {
  return (
    <div>
      <PageHeader title="Divisions" description="Manage organizational divisions">
        <Button asChild>
          <Link href="/admin/divisions/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Division
          </Link>
        </Button>
      </PageHeader>

      <DivisionTable />
    </div>
  );
}
