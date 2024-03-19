'use client'
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createOrganizationSchema } from '@/lib/formSchemas'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createOrganization } from '@/lib/serverActions/organization'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function CreateOrganizationForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
      contactEmail: '',
    },
  })
  async function onSubmit(data: z.infer<typeof createOrganizationSchema>) {
    const res = await createOrganization({
      name: data.name,
      description: data.description,
      email: data.contactEmail,
      logo: data.logo,
      website: data.website,
    })
    if (!res.success) {
      toast.error('Error creating organization')
      return
    }
    toast.success('Organization created successfully')
    router.push('/dashboard')
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-mono p-4 flex flex-col gap-5 h-full justify-center items-center w-[70%] m-auto shadow-md my-4 rounded-md border-green-200 border"
      >
        <div className="w-[70%]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Organization name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Enter the name of your organization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-[70%]">
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Contact Email</FormLabel>
                <FormControl>
                  <Input id="contactEmail" placeholder="Enter the contact email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-[70%]">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Enter a description for your organization. (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <div className="w-[70%]">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Logo</FormLabel>
                <FormControl>
                  <Input accept="image/*" id="logo" type="file" />
                </FormControl>
                <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <div className="w-[70%]">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Website</FormLabel>
                <FormControl>
                  <Input id="website" placeholder="https://example.com (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-[70%] bg-green-400 hover:bg-green-600 mt-4">
          Create Organization
        </Button>
      </form>
    </Form>
  )
}
