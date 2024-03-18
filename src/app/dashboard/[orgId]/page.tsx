import { getOrganization } from '@/lib/serverActions/organization'
import { redirect } from 'next/navigation'

export default async function Page({ params: { orgId } }: { params: { orgId: string } }) {
  const organization = await getOrganization(orgId)
  if (!organization.success) redirect('/dashboard')

  return <div></div>
}
