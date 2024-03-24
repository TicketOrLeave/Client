import { TeamTable } from '@/components/Dashboard/TeamTable'
import { getOrgMembers } from '@/lib/serverActions/team'
import { redirect } from 'next/navigation'

export default async function Page({ params: { orgId } }: { params: { orgId: string } }) {
  const res = await getOrgMembers(orgId)
  if (!res.success) redirect(`/dashboard/${orgId}`)
  return (
    <div className="container m-auto">
      <TeamTable orgId={orgId} members={res.data} />
    </div>
  )
}
