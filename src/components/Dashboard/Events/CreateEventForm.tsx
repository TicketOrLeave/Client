'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { createEventSchema } from '@/lib/formSchemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { createEvent } from '@/lib/serverActions/organization'
import { FileUploader } from '@/components/FileUploader'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'

export default function CreateEventForm({ orgId }: { orgId: string }) {
  const [logo, setLogo] = useState<File[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [noMaxTickets, setNoMaxTickets] = useState(false)
  const { startUpload } = useUploadThing('imageUploader')
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: '',
      maxTickets: '1',
    },
  })

  function checkValidDate(dateStart: string, timeStart: string, dateEnd: string, timeEnd: string) {
    const start = new Date(`${dateStart}T${timeStart}`)
    const end = new Date(`${dateEnd}T${timeEnd}`)
    const now = new Date()

    if (start < now) {
      form.setError('dateStart', { type: 'manual', message: 'Start date must be in the future' })
      form.setError('timeStart', { type: 'manual', message: '' })
      form.setFocus('dateStart')
      return false
    }
    if (start > end) {
      form.setError('dateEnd', { type: 'manual', message: 'End date must be after start date' })
      form.setError('timeEnd', { type: 'manual', message: '' })
      form.setFocus('dateEnd')
      return false
    }
    return {
      start: start.toISOString(),
      end: end.toISOString(),
    }
  }

  async function onSubmit(data: z.infer<typeof createEventSchema>) {
    const dates = checkValidDate(data.dateStart, data.timeStart, data.dateEnd, data.timeEnd)
    if (!dates) return
    data.dateStart = dates.start
    data.dateEnd = dates.end

    setLoading(true)
    toast.loading('Creating Event...', { id: 'creating-Event' })
    if (logo.length > 0) {
      const uploadedImage = await startUpload(logo)
      if (!uploadedImage) {
        toast.error('Error uploading image')
        return
      }
      data.image = uploadedImage[0].url
    }
    
    const res = await createEvent({
      name: data.name,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
      location: data.location,
      description: data.description,
      image: data.image,
      maxTickets: noMaxTickets ? 0 : parseInt(data.maxTickets),
      orgId,
    })
    toast.dismiss('creating-Event')
    setLoading(false)
    if (!res.success) {
      toast.error('Error creating Event')
      return
    }
    toast.success('Event created successfully')
    router.push('/dashboard')
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-mono p-4 flex flex-col gap-5 h-full justify-center items-center w-[90%] m-auto shadow-md my-4 rounded-md border-green-200 border"
      >
        <div className="w-[90%]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Enter the name of your event" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div
          className={cn('w-[90%] flex lg:flex-row lg:items-center md:flex-row md:items-center flex-col items-start', {
            'mb-5': form.formState.errors.dateStart || form.formState.errors.dateEnd,
          })}
        >
          <div className="w-1/2 flex gap-2">
            <FormField
              control={form.control}
              name="dateStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start</FormLabel>
                  <FormControl>
                    <Input id="dateStart" type="date" {...field} />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>time</FormLabel>
                  <FormControl>
                    <Input id="timeStart" type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 flex gap-2">
            <FormField
              control={form.control}
              name="dateEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End</FormLabel>
                  <FormControl>
                    <Input id="dateEnd" type="date" {...field} />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>time</FormLabel>
                  <FormControl>
                    <Input id="timeEnd" type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-[90%] flex items-center gap-2">
          <FormField
            control={form.control}
            name="maxTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Tickets</FormLabel>
                <div className="flex justify-center items-center gap-2">
                  <FormControl>
                    <Input
                      id="maxTickets"
                      type="number"
                      min={1}
                      disabled={noMaxTickets}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex items-center space-x-2 my-4">
                    <Checkbox ref={(e) => setNoMaxTickets(e?.ariaChecked === 'true' ? true : false)} />
                    <span className="text-nowrap text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      No max tickets
                    </span>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-[90%]">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Location <span className="text-gray-400">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input id="website" placeholder="Enter event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-[90%]">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-gray-400">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea id="description" placeholder="Enter a description for your event." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-[90%]">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Event image <span className="text-gray-400">(optional)</span>
                </FormLabel>
                <FormControl>
                  <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setLogo} />
                </FormControl>
                <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 4MB</p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-[90%] bg-green-400 hover:bg-green-600 mt-4">
          {loading ? 'Creating Event...' : 'Create Event'}
        </Button>
      </form>
    </Form>
  )
}
