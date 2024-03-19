import { z } from 'zod'

export const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255, 'Name must be less than 255 characters'),
  description: z
    .string()
    .max(400, 'Description must be less than 400 characters')
    .optional(),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  contactEmail: z.string().email(),
})
