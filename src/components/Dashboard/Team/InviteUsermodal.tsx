'use client'

import { useState } from 'react'
import { HiOutlineUserPlus } from 'react-icons/hi2'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createInvitation } from '@/lib/serverActions/invitation'
import { inviteUserFromSchema } from '@/lib/formSchemas'

export default function InviteUserModal({ orgId }: { orgId: string }) {
  const [isModalActive, setIsModalActive] = useState(false)

  function closeModal() {
    setIsModalActive(false)
  }

  return (
    <Dialog open={isModalActive} onOpenChange={setIsModalActive}>
      <DialogTrigger asChild>
        <Button className="ml-auto bg-green-500 p-4 hover:bg-green-600" size="default">
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="mb-5">Invite a new member</h2>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <InviteUserForm orgId={orgId} closeModal={closeModal} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

interface InviteUserFormProps {
  orgId: string
  closeModal: () => void
}

function InviteUserForm({ orgId, closeModal }: InviteUserFormProps) {
  const form = useForm<z.infer<typeof inviteUserFromSchema>>({
    resolver: zodResolver(inviteUserFromSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(data: z.infer<typeof inviteUserFromSchema>) {
    const res = await createInvitation(data.email, orgId)

    if (!res.success) {
      form.setError('email', { message: res.error.response.data.detail || 'Error' })
      return
    }

    toast.success('User invited successfully')
    closeModal()
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormControl>
                <Input
                  className="focus:outline-green-500 focus:border-green-500 focus:ring-green-500"
                  placeholder="Add a new user to the board..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          Submit
        </Button>
      </form>
    </Form>
  )
}
