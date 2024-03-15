import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createOrganizationSchema } from '@/lib/formSchemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { createOrganization } from '@/lib/serverActions/organization'

interface CreateBoardFormProps {
  closeModal: () => void
}

export default function CreateOrganizationForm({ closeModal }: CreateBoardFormProps) {
  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(data: z.infer<typeof createOrganizationSchema>) {
    const res = await createOrganization(data.name)
    closeModal()
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className=""
                  placeholder="Your new organization's name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="">
          Submit
        </Button>
      </form>
    </Form>
  )
}