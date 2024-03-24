'use server'
import { APIError, APIRespone, IInvitation } from '@/types'
import fetcher from '../fetcher'

export async function getInvitations(): Promise<APIRespone<IInvitation[]>> {
  try {
    const res = await fetcher.get(`/invitations/`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}

export async function acceptDeclineInvitations(
  invitationId: string,
  status: string,
): Promise<APIRespone<string | null>> {
  try {
    const res = await fetcher.put(`/invitations/${invitationId}`, { status })
    return { success: true, data: res.data }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}

export async function createInvitation(email: string, orgId: string): Promise<APIRespone<null>> {
  try {
    const res = await fetcher.post(`/invitations/organizations/${orgId}`, { email })
    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}
