'use client'

import { IOrganization } from '@/types'
import { SelectOrganization } from './SelectOrganization'
import { useRouter } from 'next/navigation'

export function SwitchOrganization({ organizations }: { organizations: IOrganization[] }) {
  const router = useRouter()
  function onSelect(org: IOrganization) {
    router.push(`/dashboard/${org.id}`)
  }
  return <SelectOrganization organizations={organizations} onSelect={onSelect} />
}
