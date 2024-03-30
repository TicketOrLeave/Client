import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table'
import { JSX, SVGProps } from 'react'
import { ITicket } from '@/types'

import { Ticket } from './Ticket'

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
