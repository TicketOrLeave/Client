'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifyTicketSchema } from '@/lib/formSchemas'
import * as z from 'zod'

interface IProps {
  verify: (ticketId: string, eventId: string) => Promise<any>
  eventId: string
}

export function ManualTicketScan({ verify, eventId }: IProps) {

  const form = useForm<z.infer<typeof verifyTicketSchema>>({
    resolver: zodResolver(verifyTicketSchema),
    defaultValues: {
      ticketId: '',
    },
  })

  async function onSubmit(data: z.infer<typeof verifyTicketSchema>) {
    const res = await verify(data.ticketId, eventId)
    if (res.success) {
      toast.success('Ticket verified successfully')
    } else {
      toast.error(res.error.response.data.detail || 'Failed to verify ticket')
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-wrap justify-center gap-2 sm:flex-nowrap"
        >
          <div className="w-full">
            <FormField
              control={form.control}
              name="ticketId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input id="name" placeholder="Enter ticket ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="ml-2 bg-green-400 hover:bg-green-500">
            Verify
          </Button>
        </form>
      </Form>
    </>
  )
}
