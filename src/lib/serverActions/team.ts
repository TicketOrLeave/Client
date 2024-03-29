'use server'
import { APIError, APIRespone, IUser } from '@/types'
import fetcher from '../fetcher'
import { revalidatePath } from 'next/cache'

export async function getOrgMembers(orgId: string): Promise<APIRespone<IUser[]>> {
  try {
    const res = await fetcher.get(`/organizations/${orgId}/members`)
    return { success: true, data: res.data }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}

export async function kickMember(orgId: string, userId: string): Promise<APIRespone<null>> {
  try {
    const res = await fetcher.delete(`/organizations/${orgId}/members/${userId}`)
    revalidatePath(`/organizations/${orgId}/team`)
    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}

export async function changeMemberRole(orgId: string, userId: string, role: 'admin' | 'staff'): Promise<APIRespone<null>> {
  try {
    const res = await fetcher.put(`/organizations/${orgId}/members/${userId}/`, { role })
    revalidatePath(`/organizations/${orgId}/team`)
    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: { response: { data: { detail: error.response.data.detail } } } }
  }
}

