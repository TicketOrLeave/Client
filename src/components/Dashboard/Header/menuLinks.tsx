'use client'
import { Calendar, HomeIcon, QrCode, TicketIcon, Users } from 'lucide-react'
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
  return (
    <div className="hidden lg:flex lg:gap-3 lg:font-mono">
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
