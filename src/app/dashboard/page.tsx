import { getServerSession } from 'next-auth'
import fetcher from '@/lib/fetcher'
import { getOrganizations } from '@/lib/serverActions/organization'
import { NavigateToOrganization } from '@/components/Dashboard/NavigateToOrganization'

export default async function Page() {
  const session = await getServerSession()
  if (session) await fetcher.get('/')
  const organizations = await getOrganizations()

  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
      <h1>Select an organization or Create a new one: </h1>
      {organizations.success ? <NavigateToOrganization organizations={organizations.data} /> : null}
    </div>
  )
}
