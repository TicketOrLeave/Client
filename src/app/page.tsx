import { getServerSession } from 'next-auth'
export default async function Home() {
  const session = await getServerSession()
  console.log(session)
  return (
      <h1>{JSON.stringify(session, null, 2)}</h1>
  )
}
