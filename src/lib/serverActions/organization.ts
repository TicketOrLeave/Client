'use server'
import { APIError, APIRespone, IOrganization } from '@/types'
import fetcher from '../fetcher'

export async function createOrganization(name: string): Promise<APIRespone<IOrganization>> {
  try {
    const res = await fetcher.post(`/organization/?name=${name}`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}
