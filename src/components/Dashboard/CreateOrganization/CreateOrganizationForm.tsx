'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { createOrganizationSchema } from '@/lib/formSchemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createOrganization } from '@/lib/serverActions/organization'
import { FileUploader } from '@/components/FileUploader'
import { useUploadThing } from '@/lib/uploadthing'

export default function CreateOrganizationForm() {
  const [logo, setLogo] = useState<File[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { startUpload } = useUploadThing('imageUploader')
  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
      contactEmail: '',
    },
  })

  async function onSubmit(data: z.infer<typeof createOrganizationSchema>) {
    setLoading(true)
    toast.loading('Creating organization...', { id: 'creating-organization' })
    if (logo.length > 0) {
      const uploadedImage = await startUpload(logo)
      if (!uploadedImage) {
        toast.error('Error uploading image')
        return
      }
      data.logo = uploadedImage[0].url
    }
    const res = await createOrganization({
      name: data.name,
      description: data.description,
      email: data.contactEmail,
      logo: data.logo,
      website: data.website,
    })
    toast.dismiss('creating-organization')
    if (!res.success) {
      toast.error('Error creating organization')
      setLoading(false)
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
                <FormLabel className="">
                  Description <span className="text-gray-400">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea id="description" placeholder="Enter a description for your organization." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-[70%]">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">
                  Logo <span className="text-gray-400">(optional)</span>
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
        <div className="w-[70%]">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">
                  Website <span className="text-gray-400">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input id="website" placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-[70%] bg-green-400 hover:bg-green-600 mt-4">
          {loading ? 'Creating Organization...' : 'Create Organization'}
        </Button>
      </form>
    </Form>
  )
}
