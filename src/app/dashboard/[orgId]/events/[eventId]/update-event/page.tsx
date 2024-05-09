import UpdateEventForm from '@/components/Dashboard/Events/UpdateEventForm'
import { getEvent } from '@/lib/serverActions/event'
import { notFound } from 'next/navigation'

export default async function page({ params: { orgId, eventId } }: { params: { orgId: string; eventId: string } }) {
  const res = await getEvent(eventId)
  if (!res.success) notFound()
  return <UpdateEventForm orgId={orgId} event={res.data} />
}
