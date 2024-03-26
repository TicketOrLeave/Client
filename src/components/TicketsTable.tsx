import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { JSX, SVGProps } from 'react'
import { ITicket } from '@/types'
import { dateToUs } from '@/lib/utils'

export function TicketsTable({ tickets }: { tickets: ITicket[] }) {
  return (
    <Card className="w-full h-full my-6">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Ticket Sales</CardTitle>
          <CardDescription>View and manage tickets sold for your event</CardDescription>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Tickets: {tickets.length}</div>
        </div>
        <div className="flex flex-col gap-1 md:flex-row md:ml-auto md:gap-1 lg:gap-2">
          <form className="flex items-center gap-2 md:gap-3 lg:gap-4">
            <Label className="sr-only" htmlFor="search">
              Search
            </Label>
            <SearchIcon className="h-4 w-4 opacity-50" />
            <Input
              className="w-full max-w-xs form:translate-y-[-1px] md:max-w-sm lg:max-w-md"
              id="search"
              placeholder="Search"
              type="search"
            />
            <Button size="sm" className="bg-green-400 hover:bg-green-500">
              Search
            </Button>
          </form>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ticket ID</TableHead>
              <TableHead>Buyer&apos;s Name</TableHead>
              <TableHead>Buyer&apos;s Email</TableHead>
              <TableHead>Tickets Sold Date</TableHead>
              <TableHead>Tickets Sold Time</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function Ticket({ ticket }: { ticket: ITicket }) {
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
        <Button className="h-8 w-8 hover:bg-red-500" size="icon" variant="outline">
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
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
