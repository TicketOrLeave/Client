import { Reservation } from '@/components/Reservation/Reservation'
import { getEvent } from '@/lib/serverActions/event'
import { redirect } from 'next/navigation'

export default async function page({ params: { eventId } }: { params: { eventId: string } }) {
  const res = await getEvent(eventId)
  if (!res.success) {
    redirect('/reservation')
  }
  return (
    <div className="container m-auto">
      <Reservation event={res.data} />
    </div>
  )
}
