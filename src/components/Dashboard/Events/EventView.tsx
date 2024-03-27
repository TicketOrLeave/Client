import { dateToUs } from '@/lib/utils'
import { IEvent } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { CopyEventLink } from './CopyEventLint'

export async function EventView({ event, orgId }: { event: IEvent; orgId: string }) {
  return (
    <section className="w-full py-12 md:pb-24 font-mono">
      <div className="container px-4 justify-center items-center flex flex-col gap-6 md:gap-10">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-2 lg:col-span-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {event.organization_name}: {event.name}
            </h1>
            <div className="text-gray-500 grid gap-1 md:text-base lg:text-sm/relaxed xl:text-base/relaxed dark:text-gray-400">
              <CopyEventLink link={`${process.env.NEXTAUTH_URL}/reservation/${event.id}`} />
            </div>
          </div>
          <div className="flex items-start flex-wrap md:flex-nowrap gap-2 lg:gap-0 lg:justify-end lg:space-x-6">
            <Link
              href={`/dashboard/${orgId}/events/${event.id}/tickets`}
              className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 border-green-400 hover:bg-green-400 hover:text-white text-green-400 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Manage Tickets
            </Link>
            <Link
              href={`/dashboard/${orgId}/events/${event.id}/update-event`}
              className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 border-green-400 hover:bg-green-400 hover:text-white text-green-400 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Update Event
            </Link>
          </div>
        </div>
        <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-[1fr_500px] lg:gap-8">
          <Image
            alt="Cover"
            className="aspect-video overflow-hidden rounded-xl object-cover object-center"
            height="280"
            src={event.cover_image_url || '/placeholder.svg'}
            width="500"
          />
          <div className="space-y-4 text-base/relaxed">
            <p>{event.description}</p>
            <h3 className="font-bold">Date & Time</h3>
            <p>
              {dateToUs(event.start_date)}, {dateToUs(event.end_date)}
            </p>
            {event.location && (
              <>
                <h3 className="font-bold">Location</h3>
                <p>{event.location}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
