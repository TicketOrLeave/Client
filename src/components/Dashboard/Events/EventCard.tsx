import Link from 'next/link'
import { CardContent, Card } from '@/components/ui/card'
import Image from 'next/image'
import { IEvent } from '@/types'
import { dateToUs } from '@/lib/utils'

export function EventCard({ event, orgId }: { event: IEvent, orgId: string}) {
  return (
    <Link href={`/dashboard/${orgId}/events/${event.id}`} className="relative group rounded-lg overflow-hidden hover:border-[2px] hover:border-green-400">
      <Card>
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            alt="Event cover"
            className="object-cover aspect-[16/9] w-full group-hover:scale-105 transition-transform"
            height={225}
            src={event.cover_image_url || '/placeholder.svg'}
            width={400}
          />
        </div>
        <CardContent className="p-4 grid gap-2">
          <h3 className="font-bold text-lg group-hover:underline group-hover:text-green-400 truncate group-hover:translate-x-2 transition-transform">{event.name}</h3>
          <p className="text-sm text-gray-500">Status: {event.status.toLocaleLowerCase()}</p>

          <p className="text-sm text-gray-500 truncate">
            Start Date: {dateToUs(event.start_date)}
          </p>
          <p className="text-sm text-gray-500 truncate">
            End Date: {dateToUs(event.end_date)}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
