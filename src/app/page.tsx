import LandingPage from '@/components/LandingPage/LandingPage'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
export default async function Home() {
  const session = await getServerSession()
  if (session) {
    redirect('/dashboard')
  }
  return (
    <LandingPage />
  )
}
