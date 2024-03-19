'use server'
import { APIError, APIRespone, IOrganization } from '@/types'
import fetcher from '../fetcher'

export async function createOrganization({
  name,
  email,
  description,
  logo,
  website,
}: {
  name: string
  email: string
  description: string | undefined
  website: string | undefined
  logo: string | undefined
}): Promise<APIRespone<IOrganization>> {
  try {
    const res = await fetcher.post(`/organizations/?name=${name}`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}

export async function getOrganizations(): Promise<APIRespone<IOrganization[]>> {
  try {
    const res = await fetcher.get(`/organizations/`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}

export async function getOrganization(orgId: string): Promise<APIRespone<IOrganization>> {
  try {
    const res = await fetcher.get(`/organizations/${orgId}`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error as APIError }
  }
}
