'use client'
import { TableRow, TableCell } from '@/components/ui/table'
import { ITicket } from '@/types'
import { JSX, SVGProps } from 'react'
import { Badge } from '@/components/ui/badge'
import { dateToUs } from '@/lib/utils'
import { deleteTicket } from '@/lib/serverActions/ticket'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

export function Ticket({ ticket }: { ticket: ITicket }) {
  async function onDelete() {
    const res = await deleteTicket(ticket.id)
    if (!res.success) {
      toast.error(res.error.response.data.detail || 'An error occurred')
      return
    }
    toast.success('Ticket deleted successfully')
  }
  return (
    <TableRow>
      <TableCell className="font-medium truncate">{ticket.id}</TableCell>
      <TableCell>{ticket.owner_name}</TableCell>
      <TableCell>{ticket.owner_email}</TableCell>
      <TableCell>{dateToUs(ticket.created_at).split('at')[0]}</TableCell>
      <TableCell>{dateToUs(ticket.created_at).split('at')[1]}</TableCell>
      <TableCell className="text-right">
        <Badge className="bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-100">Active</Badge>
      </TableCell>
      <TableCell className="flex gap-2 justify-end">
        <Button className="h-8 w-8" size="icon" variant="outline">
          <FileEditIcon className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button onClick={() => onDelete()} className="h-8 w-8 hover:bg-red-500" size="icon" variant="outline">
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">
            Delete
          </span>
        </Button>
      </TableCell>
    </TableRow>
  )
}

function FileEditIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  )
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
