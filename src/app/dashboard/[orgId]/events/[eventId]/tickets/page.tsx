import { TicketsTable } from '@/components/TicketsTable'
import { getTickets } from '@/lib/serverActions/ticket'
import { notFound } from 'next/navigation'

export default async function page({ params: { eventId } }: { params: { eventId: string } }) {
  const res = await getTickets(eventId)
  if (!res.success) notFound()

  return (
    <div className="container m-auto">
      <TicketsTable tickets={res.data} />
    </div>
  )
}
