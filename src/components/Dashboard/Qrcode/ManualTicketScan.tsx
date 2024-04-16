'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface IProps {
  verify: (ticketId: string, eventId: string) => Promise<any>
  eventId: string
}

export function ManualTicketScan({ verify, eventId }: IProps) {
  const [ticketId, setTicketId] = useState('')

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = await verify(ticketId, eventId)
    if (res.success) {
      toast.success('Ticket verified successfully')
      setTicketId('')
    } else {
      toast.error(res.error.response.data.detail || 'Failed to verify ticket')
    }
  }
  return (
    <>
      <form onSubmit={handleVerify} className='w-full flex flex-wrap justify-center gap-2 sm:flex-nowrap'>
        <div className="w-full">
          <Input id="ticket-id-2" placeholder="Enter ticket ID" value={ticketId} onChange={(e) => setTicketId(e.target.value)} />
        </div>

        <Button type="submit" className="ml-2 bg-green-400 hover:bg-green-500">
          Verify
        </Button>
      </form>
    </>
  )
}
