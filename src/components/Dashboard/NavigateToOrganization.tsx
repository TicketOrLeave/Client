'use client'

import { IOrganization } from '@/types'
import { Button } from '../ui/button'
import { SelectOrganization } from './SelectOrganization'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
      <Link href="/dashboard/create-organization" className='underline text-green-600 hover:text-green-400'>Create a new organization</Link>
      <Button className='bg-green-600 hover:bg-green-400' size={'lg'} onClick={onClick}>
        Submit
      </Button>
    </>
  )
}
