import { notFound } from "next/navigation";
import { getPublicEventById } from "@/actions/events";
import { EventDetailContent } from "@/components/public/event-detail-content";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  const { id } = await params;
  const result = await getPublicEventById(id);

  if (!result.success) {
    return {
      title: "Event Not Found | SCMD Online Registration",
    };
  }

  return {
    title: `${result.data.name} | SCMD Online Registration`,
    description: result.data.description || `View details for ${result.data.name} at ${result.data.location}`,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const result = await getPublicEventById(id);

  if (!result.success) {
    notFound();
  }

  return <EventDetailContent event={result.data} />;
}
