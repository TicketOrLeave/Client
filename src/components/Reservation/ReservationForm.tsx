'use client'
import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ticketReservationSchema } from '@/lib/formSchemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { APIRespone, ITicket } from '@/types'
import { useRouter } from 'next/navigation'

export default function TicketReservationForm({
  eventId,
  createTicket,
}: {
  eventId: string
  createTicket: (eventId: string, name: string, email: string) => Promise<APIRespone<ITicket>>
}) {
  const router = useRouter()
  const [isSuccess, setIsSuccess] = React.useState(false)
  const form = useForm<z.infer<typeof ticketReservationSchema>>({
    resolver: zodResolver(ticketReservationSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  async function onSubmit(data: z.infer<typeof ticketReservationSchema>) {
    const res = await createTicket(eventId, data.name, data.email)
    if (!res.success) {
      toast.error(res.error.response.data.detail || 'Failed to reserve ticket. Please try again.', { duration: 3000 })
      return
    }
    setIsSuccess(true)
    form.reset()
    toast.success('Ticket reserved successfully! Check your email for the ticket.', { duration: 5000 })
  }

  if (isSuccess) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Ticket reserved successfully!</h1>
          <p className="text-gray-500">Check your email for the ticket.</p>
          <Button className="mt-4 bg-green-400 hover:bg-green-500" onClick={() => setIsSuccess(false)}>
            Back to reservation
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full rounded-2xl space-y-4">
      <h2 className="text-xl font-bold tracking-tighter">Register for the Event</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full bg-green-400 hover:bg-green-500" type="submit">
            Reserve my ticket
          </Button>
        </form>
      </Form>
    </div>
  )
}
