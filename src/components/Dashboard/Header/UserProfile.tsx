import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

export default function UserProfile({ session }: { session: Session | null }) {
  return (
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
        {/* <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <span>Dark Theme</span>
        </DropdownMenuItem> */}
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/api/auth/signout?callbackUrl=/" className="flex items-center gap-2">
            <span>Logout</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
