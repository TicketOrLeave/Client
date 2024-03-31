'use server'
import { APIRespone, IInvitation } from '@/types'
import fetcher from '../fetcher'
import { revalidatePath } from 'next/cache'

export async function getInvitations(): Promise<APIRespone<IInvitation[]>> {
  try {
    const res = await fetcher.get(`/invitations/`)
    return { success: true, data: res.data }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}

export async function acceptDeclineInvitations(
  invitationId: string,
  status: string,
): Promise<APIRespone<string | null>> {
  try {
    const res = await fetcher.put(`/invitations/${invitationId}`, { status })
    revalidatePath('/dashboard')
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
