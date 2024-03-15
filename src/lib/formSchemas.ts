import { z } from 'zod'

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(255, { message: 'name must be at most 255 characters.' }),
})