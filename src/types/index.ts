export type APIError = {
  response: {
    data: {
      detail: any
    }
  }
}

export type APIRespone<T> = { success: false; error: APIError } | { success: true; data: T }

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
  cover_image_url?: string
  location?: string
  maxTickets: number
  status: string
  created_at: string
  updated_at: string
}

export interface IUser {
  id: string
  email: string
  name: string
  image_url: string
  role?: string
}

export interface IInvitation {
  id: string
  status: string
  created_at: string
  inviter: {
    id: string
    name: string
    email: string
  }
  organization: {
    id: string
    name: string
  }
}
