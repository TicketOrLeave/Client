'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { acceptDeclineInvitations } from '@/lib/serverActions/invitation'
import { IInvitation } from '@/types'
import { Bell } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function DropdownNotification({ invitations }: { invitations: IInvitation[] }) {
  // const params = useSearchParams()
  // const [open, setOpen] = useState(params.get('invitations') === 'true')

  return (
    <Dialog>
      <DialogTrigger className="relative">
        <Bell width={18} height={18} />
        {invitations.length > 0 && (
          <span className="absolute -top-2 -right-2 h-4 w-4 text-gray-100 rounded-full bg-green-400 flex justify-center items-center items">
            <span>{invitations.length}</span>
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="container h-[90%] overflow-y-scroll flex flex-col">
        <DialogHeader>
          <DialogTitle className='text-2xl'>Notifications</DialogTitle>
        </DialogHeader>
        {invitations.map(
          (invitation) => (
            <CardInvitation key={invitation.id} invitation={invitation} />
          ),
        )}
      </DialogContent>
    </Dialog>
  )
}

function CardInvitation({ invitation }: { invitation: IInvitation }) {
  async function responseInvitation(invitationId: string, status: string) {
    const res = await acceptDeclineInvitations(invitationId, status)
    if (!res.success) {
      toast.error(res.error.response.data.detail || `Faild to ${status} invitation`)
      return
    }
    toast.success(`Invitation ${status}ed successfuly`)    
  }
  return (
    <Card className="w-full group hover:shadow-lg hover:border-green-500 border transition">
      <CardHeader className="p-4">
        <div className="space-y-1.5">
          <CardTitle className="group-hover:text-green-500">{invitation.organization.name}</CardTitle>
          <CardDescription>
            <span className="font-bold underline group-hover:text-green-500">{invitation.inviter.name}</span> invited
            you to join the{' '}
            <span className="font-bold underline group-hover:text-green-500">{invitation.organization.name}</span>{' '}
            organization.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent hover:bg-red-500 border border-red-400 hover:text-white text-red-400"
            onClick={() => responseInvitation(invitation.id, 'rejected')}
          >
            reject
          </Button>
          <Button
            className="ml-2 border bg-transparent text-green-400 border-green-400 hover:text-white hover:bg-green-500"
            size="sm"
            onClick={() => responseInvitation(invitation.id, 'accepted')}
          >
            Accept
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
