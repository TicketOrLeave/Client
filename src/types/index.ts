export interface IOrganization {
  id: string
  name: string
  owner: string
  created_at: string
  updated_at: string
}

export interface IEvent {
  id: string
  name: string
  start_date: string
  end_date: string
  description?: string
  image?: string
  location?: string
  maxTickets: number,
  status: string
  created_at: string
  updated_at: string
}

export type APIError = {
  error: any
}

export type APIRespone<T> = { success: false; error: APIError } | { success: true; data: T }
