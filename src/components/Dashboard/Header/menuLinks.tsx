'use client'
import { Calendar, HomeIcon, TicketIcon, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function MenuLinks() {
  const [cur, setCur] = useState('/')

  const pathname = usePathname()
  const path = pathname.split('/dashboard')[1].split('/') // ['', '{OrgId}', 'events']
  const orgId = path[1]
  useEffect(() => {
    setCur(path[2] || '/')
  }, [pathname])
  if (pathname === '/dashboard') return null
  return (
    <div className="hidden lg:flex lg:gap-3 lg:font-semibold">
      <Link
        href={`/dashboard/${orgId}`}
        className={`p-2 underline text-black hover:bg-green-400 w-full rounded hover:text-white flex gap-2 ${
          cur === '/' ? 'bg-green-400 text-white' : ''
        }`}
      >
        <HomeIcon className="h-6 w-6" />
        <span>Home</span>
      </Link>
      <Link
        href={`/dashboard/${orgId}/events/`}
        className={`p-2 underline text-black hover:bg-green-400 w-full rounded hover:text-white flex gap-2 ${
          cur === 'events' ? 'bg-green-400 text-white' : ''
        }`}
      >
        <Calendar className="h-6 w-6" />
        <span>Events</span>
      </Link>
      <Link
        href={`/dashboard/${orgId}/tickets`}
        className={`p-2 underline text-black hover:bg-green-400 w-full rounded hover:text-white flex gap-2 ${
          cur === '/tickets' ? 'bg-green-400 text-white' : ''
        }`}
      >
        <TicketIcon className="h-6 w-6" />
        <span>Tickets</span>
      </Link>
      <Link
        href={`/dashboard/${orgId}/team`}
        className={`p-2 underline text-black hover:bg-green-400 w-full rounded hover:text-white flex gap-2 ${
          cur === '/team' ? 'bg-green-400 text-white' : ''
        }`}
      >
        <Users className="h-6 w-6" />
        <span>Team</span>
      </Link>
    </div>
  )
}
