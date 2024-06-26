'use client'
import React, { SVGProps, useEffect, useReducer, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { APIRespone, IOrganization } from '@/types'
import { SwitchOrganization } from './SwitchOrganozation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Calendar, HomeIcon, MailQuestionIcon, TicketIcon, Users } from 'lucide-react'

export default function SidebarMenu({ organizations }: { organizations: APIRespone<IOrganization[]> }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const orgId = pathname.split('/dashboard')[1].split('/')[1]
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden rounded-full border border-gray-200 dark:border-gray-800 p-1">
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </SheetTrigger>
      <SheetContent className="sm:w-[30%]" side={'left'}>
        <SheetHeader>
          {organizations.success ? <SwitchOrganization organizations={organizations.data} /> : null}
          <div className="flex justify-center items-center flex-col gap-3 font-mono">
            <Link
              href={`/dashboard/${orgId}`}
              className="p-2 underline text-black hover:bg-green-400 w-full rounded hover:text-white flex flex-wrap gap-2"
              onClick={() => setOpen(false)}
            >
              <HomeIcon className="h-6 w-6" />
              <span>Home</span>
            </Link>
            <Link
              href={`/dashboard/${orgId}/team`}
              className="p-2 underline text-black hover:bg-green-400 w-full rounded hover:text-white flex flex-wrap gap-2"
              onClick={() => setOpen(false)}
            >
              <Users className="h-6 w-6" />
              <span>Team</span>
            </Link>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
