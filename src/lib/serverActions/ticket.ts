'use server'
import { APIRespone, ITicket } from '@/types'
import fetcher from '../fetcher'
import { revalidatePath } from 'next/cache'


export async function getTickets(eventId: string): Promise<APIRespone<ITicket[]>> {
  try {
    const res = await fetcher.get(`/tickets?event_id=${eventId}`)
    return { success: true, data: res.data }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}

export async function deleteTicket(ticketId: string): Promise<APIRespone<null>> {
  try {
    const res = await fetcher.delete(`/tickets/${ticketId}`)
    revalidatePath('/dashboard/{orgId}/events/{eventId}/tickets')
    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}

export async function verifyTicket(ticketId: string, eventId: string): Promise<APIRespone<ITicket>> {
  try {
    const res = await fetcher.get(`/tickets/${ticketId}?event_id=${eventId}`)
    return { success: true, data: res.data }
  } catch (error: any) {
    // TODO: Handle pydantic errors
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}