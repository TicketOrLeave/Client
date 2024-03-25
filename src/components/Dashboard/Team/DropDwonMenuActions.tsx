'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { changeMemberRole, kickMember } from '@/lib/serverActions/team'
import { ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'

export function DropdownMenuActions({ role, memberId, orgId }: { role: string; memberId: string; orgId: string }) {
  async function kick() {
    const res = await kickMember(orgId, memberId)
    if (!res.success) {
      toast.error('Failed to kick member')
      return
    }
    toast.success('Member kicked')
  }
  async function changeRole() {
    const res = await changeMemberRole(orgId, memberId, role === 'admin' ? 'staff' : 'admin')
    if (!res.success) {
      toast.error('Failed to change role')
      return
    }
    toast.success('Role changed')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={changeRole}>
          {role === 'admin' ? 'Remove from admin' : 'Make as admin'}
        </DropdownMenuItem>
        <DropdownMenuItem className="bg-red-600 focus:bg-red-400" onClick={kick}>
          Kick
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
