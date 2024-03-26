import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { JSX, SVGProps } from 'react'
import { MapPinIcon } from 'lucide-react'
import { IEvent } from '@/types'
import { dateToUs } from '@/lib/utils'

export function Reservation({ event }: { event: IEvent }) {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-8 font-mono">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {event.organization_name}:{event.name}
          </h1>
          <div className="flex items-center space-x-2 text-sm">
            <CalendarIcon className="w-4 h-4" />
            <span>{dateToUs(event.start_date)}</span>
            <span>:</span>
            <span>{dateToUs(event.end_date)}</span>
          </div>
            <div className='flex items-center space-x-2 text-sm'>
            <MapPinIcon className="w-4 h-4" />
            <span>{event.location}</span>
            </div>
        </div>
        {event.cover_image_url && (
          <Image
            alt={`${event.organization_name}: ${event.name}`}
            className="aspect-video overflow-hidden rounded-lg object-cover"
            height={500}
            src={event.cover_image_url}
            width={1000}
          />
        )}
        <div className="prose lg:prose-lg max-w-none">
          <p>{event.description}</p>
        </div>
        <Separator />
        <div className="mx-auto w-full rounded-2xl space-y-4">
          <h2 className="text-xl font-bold tracking-tighter">Register for the Event</h2>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" required type="email" />
            </div>
            <Button className="w-full bg-green-400 hover:bg-green-500" type="submit">
              Reserve my ticket
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

function CalendarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
