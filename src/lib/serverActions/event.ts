'use server'

import { APIRespone, IEvent } from '@/types'
import fetcher from '../fetcher'

export async function getEvents(orgId: string): Promise<APIRespone<IEvent[]>> {
  try {
    const res = await fetcher.get(`/events?org_id=${orgId}`)
    return { success: true, data: res.data as IEvent[] }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}

export async function getEvent(eventId: string): Promise<APIRespone<IEvent>> {
  try {
    const res = await fetcher.get(`/events/event?event_id=${eventId}`)
    return { success: true, data: res.data as IEvent }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}
