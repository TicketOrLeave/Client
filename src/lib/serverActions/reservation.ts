"use server"
import { APIRespone, IEvent, ITicket } from '@/types'
import fetcher from '../fetcher'

export async function createTicket(eventId: string, name: string, email: string): Promise<APIRespone<ITicket>> {
  try {
    const res = await fetcher.post(`/reservation/${eventId}`, { name, email })
    return { success: true, data: res.data }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}


export async function getReservationEvent(eventId: string): Promise<APIRespone<IEvent>> {
  try {
    const res = await fetcher.get(`/reservation/${eventId}`)
    return { success: true, data: res.data }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}