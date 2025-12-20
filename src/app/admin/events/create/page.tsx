import { PageHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/admin/events";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateEventPage() {
  return (
    <div>
      <PageHeader title="Create Event" description="Add a new event">
        <Button variant="outline" asChild className="touch-target">
          <Link href="/admin/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </PageHeader>

      <EventForm mode="create" />
    </div>
  );
}
