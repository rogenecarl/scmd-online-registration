import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { EventTable } from "@/components/admin/events";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div>
      <PageHeader title="Events" description="Manage events and registrations">
        <Button asChild>
          <Link href="/admin/events/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Link>
        </Button>
      </PageHeader>

      <EventTable />
    </div>
  );
}
