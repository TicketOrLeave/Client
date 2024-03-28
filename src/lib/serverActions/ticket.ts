'use server'
import { APIRespone, ITicket } from '@/types'
import fetcher from '../fetcher'


export async function getTickets(eventId: string): Promise<APIRespone<ITicket[]>> {
  try {
    const res = await fetcher.get(`/tickets?event_id=${eventId}`)
    return { success: true, data: res.data }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}
