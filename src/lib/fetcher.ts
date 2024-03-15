import axios from 'axios'
import { cookies } from 'next/headers'

export default axios.create({
  baseURL: process.env.SERVER_API_URL,
  headers: { Cookie: cookies().toString() },
})
