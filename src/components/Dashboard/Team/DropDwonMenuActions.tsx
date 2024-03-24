import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

export function DropdownMenuActions({ role }: { role: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>{role === 'admin' ? 'Remove from admin' : 'Make as admin'}</DropdownMenuItem>
        <DropdownMenuItem>Kick</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
