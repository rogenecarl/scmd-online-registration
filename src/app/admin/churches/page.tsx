import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { ChurchTable } from "@/components/admin/churches";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ChurchesPage() {
  return (
    <div>
      <PageHeader title="Churches" description="Manage churches across divisions">
        <Button asChild>
          <Link href="/admin/churches/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Church
          </Link>
        </Button>
      </PageHeader>

      <ChurchTable />
    </div>
  );
}
