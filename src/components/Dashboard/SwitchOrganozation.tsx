'use client'

import { IOrganization } from '@/types'
import { SelectOrganization } from './SelectOrganization'
import { usePathname, useRouter } from 'next/navigation'

export function SwitchOrganization({ organizations }: { organizations: IOrganization[] }) {
  const router = useRouter()
  const pathname = usePathname()
  if (pathname === '/dashboard') return null
  function onSelect(org: IOrganization) {
    router.push(`/dashboard/${org.id}`)
  }
  return (
    <div className='max-w-full'>
      <SelectOrganization organizations={organizations} onSelect={onSelect} />
    </div>
  )
}
