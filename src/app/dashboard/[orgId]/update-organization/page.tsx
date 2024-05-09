import UpdateOrganizationForm from '@/components/Dashboard/UpdateOrganization/UpdateOrganizationForm'
import { getOrganization } from '@/lib/serverActions/organization'
import { redirect } from 'next/navigation'

export default async function Page({ params: { orgId } }: { params: { orgId: string } }) {
  const organization = await getOrganization(orgId)
  if (!organization.success) redirect('/')
  return <UpdateOrganizationForm organization={organization.data} />
}
