'use server'

import { APIError, APIRespone, IEvent } from '@/types'
import fetcher from '../fetcher'

export async function getEvents(orgId: string): Promise<APIRespone<IEvent[]>> {
  try {
    const res = await fetcher.get(`/events?org_id=${orgId}`)
    return { success: true, data: res.data as IEvent[] }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}

export async function getEvent(eventId: string): Promise<APIRespone<IEvent>> {
  try {
    const res = await fetcher.get(`/events/event?event_id=${eventId}`)
    return { success: true, data: res.data as IEvent }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}
