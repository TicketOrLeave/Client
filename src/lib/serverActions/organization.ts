'use server'
import { APIError, APIRespone, IEvent, IOrganization } from '@/types'
import fetcher from '../fetcher'
import { revalidatePath } from 'next/cache'

export async function createOrganization({
  name,
  email,
  description,
  logo,
  website,
}: {
  name: string
  email: string
  description: string | undefined
  website: string | undefined
  logo: string | undefined
}): Promise<APIRespone<IOrganization>> {
  try {
    const res = await fetcher.post(`/organizations/`, {
      name,
      contact_email: email,
      description,
      logo_url: logo,
      website,
    
    })
    revalidatePath('/dashboard')
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}

export async function getOrganizations(): Promise<APIRespone<IOrganization[]>> {
  try {
    const res = await fetcher.get(`/organizations/`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}

export async function getOrganization(orgId: string): Promise<APIRespone<IOrganization>> {
  try {
    const res = await fetcher.get(`/organizations/${orgId}`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}

export async function createEvent({
  name,
  dateStart,
  dateEnd,
  location,
  description,
  image,
  maxTickets,
  orgId,
}: {
  name: string
  dateStart: string
  dateEnd: string
  location?: string | undefined
  description?: string | undefined
  image?: string | undefined
  maxTickets: number
  orgId: string
}): Promise<APIRespone<IEvent>> {
  try {
    const res = await fetcher.post(`/events`, {
      name,
      cover_image_url: image,
      description: description,
      location: location,
      start_date: dateStart,
      end_date: dateEnd,
      max_tickets: maxTickets,
      orgId,
    })
    revalidatePath('/dashboard/{orgId}')
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}
