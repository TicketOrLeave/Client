import Link from 'next/link'
import Image from 'next/image'
import React, { JSX, SVGProps } from 'react'
import { LucideTicketCheck } from 'lucide-react'
import { getOrganizations } from '@/lib/serverActions/organization'
import { SwitchOrganization } from './SwitchOrganozation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getServerSession } from 'next-auth'
import SidebarMenu from './SidebarMenu'

export async function Header() {
  const organizations = await getOrganizations()
  const session = await getServerSession()

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 justify-between lg:mx-4">
        <SidebarMenu organizations={organizations} />
      <Link className="flex items-center gap-2 text-xl font-semibold text-red" href="#">
        <TicketIcon className="h-8 w-8" />
        <span className="">TicketOrLeave</span>
      </Link>
      <div className="flex items-center gap-6">
        <div className="hidden lg:block">
          {organizations.success ? <SwitchOrganization organizations={organizations.data} /> : null}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              alt="Avatar"
              className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800 select-none"
              height="32"
              src={session?.user?.image || '/user-svgrepo-com.svg'}
              style={{
                aspectRatio: '32/32',
                objectFit: 'cover',
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-gray-500">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <span>Dark Theme</span>
            </DropdownMenuItem>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/api/auth/signout?callbackUrl=/" className="flex items-center gap-2">
                <span>Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function TicketIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <path
        fill="#34a853"
        d="M24 64.414L16.586 57l.707-.707C18.617 54.969 19 54.006 19 52c0-4.056-2.944-7-7-7-2.006 0-2.969.383-4.293 1.707L7 47.414-.414 40 40-.414 47.414 7l-.707.707C45.383 9.031 45 9.994 45 12c0 4.056 2.944 7 7 7 2.006 0 2.969-.383 4.293-1.707l.707-.707L64.414 24 24 64.414zm-4.614-7.443L24 61.586 61.586 24l-4.614-4.614C55.55 20.578 54.181 21 52 21c-5.131 0-9-3.869-9-9 0-2.181.422-3.55 1.614-4.971L40 2.414 2.414 40l4.614 4.614C8.45 43.422 9.819 43 12 43c5.131 0 9 3.869 9 9 0 2.181-.422 3.55-1.614 4.971z"
        className="color000000 svgShape"
      ></path>
      <path
        fill="#34a853"
        d="M26.707 14.293l4 4-1.414 1.414-4-4zm19 19l4 4-1.414 1.414-4-4zm-13-13l4 4-1.414 1.414-4-4zm7 7l4 4-1.414 1.414-4-4z"
        className="color000000 svgShape"
      ></path>
    </svg>
  )
}
