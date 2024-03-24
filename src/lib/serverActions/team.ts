'use server'
import { APIError, APIRespone, IUser } from '@/types'
import fetcher from '../fetcher'

export async function getOrgMembers(orgId: string): Promise<APIRespone<IUser[]>> {
  try {
    const res = await fetcher.get(`/organizations/${orgId}/members`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}
