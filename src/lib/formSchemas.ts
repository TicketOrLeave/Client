import { z } from 'zod'

export const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255, 'Name must be less than 255 characters'),
  description: z.string().max(400, 'Description must be less than 400 characters').optional(),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  contactEmail: z.string().email(),
})

export const createEventSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255, 'Name must be less than 255 characters'),
  timeStart: z.string(),
  timeEnd: z.string(),
  dateStart: z.string(),
  dateEnd: z.string(),
  location: z.string().optional(),
  description: z.string().max(400, 'Description must be less than 400 characters').optional(),
  image: z.string().optional(),
  maxTickets: z.string().min(1).optional().default('0'),
})

export const inviteUserFromSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(120, { message: 'name must be at most 120 characters.' })
    .email(),
})

export const ticketReservationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255, 'Name must be less than 255 characters'),
  email: z.string().email(),
})

export const verifyTicketSchema = z.object({
  ticketId: z.string().uuid('Invalid ticket ID'),
})

export const updateEventSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255, 'Name must be less than 255 characters'),
  timeStart: z.string(),
  timeEnd: z.string(),
  dateStart: z.string(),
  dateEnd: z.string(),
  location: z.string().optional(),
  description: z.string().max(400, 'Description must be less than 400 characters').optional(),
  image: z.string().optional(),
  maxTickets: z.string().min(1).optional().default('0'),
  status: z.string(),
})
