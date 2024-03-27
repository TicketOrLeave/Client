import { EventView } from "@/components/Dashboard/Events/EventView";
import { getEvent } from "@/lib/serverActions/event";
import { notFound, redirect } from "next/navigation";

export default async function page({ params: { eventId, orgId } }: { params: { eventId: string, orgId: string } }) {
  const res = await getEvent(eventId)
  if (!res.success) notFound()
  return (
    <div className="container m-auto">
      <EventView event={res.data} orgId={orgId} />
    </div>
  )
}
