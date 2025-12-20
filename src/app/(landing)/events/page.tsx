import { getPublicEvents } from "@/actions/events";
import { PublicEventsContent } from "@/components/public/events-content";

export const metadata = {
  title: "Events | SCMD Online Registration",
  description: "Browse upcoming and ongoing church events. View event details, locations, dates, and registration information.",
};

export default async function PublicEventsPage() {
  const result = await getPublicEvents({ pageSize: 12 });

  return <PublicEventsContent initialData={result} />;
}
