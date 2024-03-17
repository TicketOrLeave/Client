'use client'

import { IOrganization } from '@/types'
import { Button } from '../ui/button'
import { SelectOrganization } from './SelectOrganization'
import CreateOrganizationModal from './createOrgModal'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function NavigateToOrganization({ organizations }: { organizations: IOrganization[] }) {
  const [selected, setSelected] = useState<IOrganization>(organizations[0])
  const router = useRouter()
  function onSelect(org: IOrganization) {
    setSelected(org)
  }
  function onClick() {
    router.push(`/dashboard/${selected.id}`)
  }
  return (
    <>
      <SelectOrganization organizations={organizations} onSelect={onSelect} />
      <CreateOrganizationModal />
      <Button variant={'destructive'} onClick={onClick}>
        Submit
      </Button>
    </>
  )
}
