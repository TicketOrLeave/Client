import axios from 'axios'
import { cookies } from 'next/headers'

async function fetcher() {
  const fetcher = axios.create({
    baseURL: process.env.SERVER_API_URL,
  })
  return {
    get: (url: string, config: any = {}) => {
      return fetcher.get(url, { ...config, headers: { Cookie: cookies().toString() } })
    },
    post: (url: string, data?: any, config: any = {}) => {
      return fetcher.post(url, data, { ...config, headers: { Cookie: cookies().toString() } })
    },
    put: (url: string, data?: any, config: any = {}) => {
      return fetcher.put(url, data, { ...config, headers: { Cookie: cookies().toString() } })
    },
    delete: (url: string, config: any = {}) => {
      return fetcher.delete(url, { ...config, headers: { Cookie: cookies().toString() } })
    },
  }
}

export default await fetcher()
