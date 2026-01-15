import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/admin/events";
import { getEventById } from "@/actions/events";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  const result = await getEventById(id);

  if (!result.success) {
    notFound();
  }

  const event = result.data;

  return (
    <div>
      <PageHeader title="Edit Event" description={`Editing: ${event.name}`}>
        <Button variant="outline" asChild className="touch-target">
          <Link href={`/admin/events/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </PageHeader>

      <EventForm
        mode="edit"
        initialData={{
          id: event.id,
          name: event.name,
          description: event.description,
          location: event.location,
          banner: event.banner,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
          preRegistrationFee: event.preRegistrationFee,
          preRegistrationSiblingDiscount: event.preRegistrationSiblingDiscount,
          preRegistrationStart: new Date(event.preRegistrationStart),
          preRegistrationEnd: new Date(event.preRegistrationEnd),
          onsiteRegistrationFee: event.onsiteRegistrationFee,
          onsiteSiblingDiscount: event.onsiteSiblingDiscount,
          cookRegistrationFee: event.cookRegistrationFee,
          status: event.status,
        }}
      />
    </div>
  );
}
