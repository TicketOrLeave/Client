import { Reservation } from '@/components/Reservation/Reservation'
import { getReservationEvent } from '@/lib/serverActions/reservation'
import { notFound } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

export default async function page({ params: { eventId } }: { params: { eventId: string } }) {
  const res = await getReservationEvent(eventId)
  if (!res.success) notFound()
  
  return (
    <div className="container m-auto">
      <Reservation event={res.data} />
      <Toaster />
    </div>
  )
}
