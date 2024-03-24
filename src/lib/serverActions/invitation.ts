'use server'
import { APIError, APIRespone, IInvitation } from '@/types'
import fetcher from '../fetcher'

export async function createInvitation(email: string, orgId: string): Promise<APIRespone<null>> {
  try {
    const res = await fetcher.post(`/invitations/organizations/${orgId}`, { email })
    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}
