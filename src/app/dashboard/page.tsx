import { fetcher } from '@/utils'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Page() {
  const session = await getServerSession()
  if (session)
    await fetcher.get('/')
  return (
    <>
      <nav className="w-full p-4 flex justify-center items-end bg-black text-white text-4xl hover:text-yellow-300">
        <Link href="/api/auth/signout?callbackUrl=/">Logout </Link>
      </nav>
      <div className="flex justify-center items-center min-h-full">
        <h1 className="text-9xl">Dashboard</h1>
      </div>
    </>
  )
}
