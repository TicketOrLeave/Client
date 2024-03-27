import { EventCard } from '@/components/Dashboard/Events/EventCard'
import { Button } from '@/components/ui/button'
import { getEvents } from '@/lib/serverActions/event'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page({ params: { orgId } }: { params: { orgId: string } }) {
  const events = await getEvents(orgId)
  if (!events.success) redirect('/')

  return (
    <div className="container m-auto">
      <div className="flex justify-between items-center mb-4">
      <h1 className="font-semibold text-lg md:text-2xl">Events</h1>
        <Button asChild className="ml-auto bg-green-500 p-4 hover:bg-green-600" size="default">
          <Link href={`/dashboard/${orgId}/events/create-event`}>Create Event</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {events.data.map((event) => (
          <EventCard key={event.id} event={event} orgId={orgId} />
        ))}
      </div>
    </div>
  )
}
