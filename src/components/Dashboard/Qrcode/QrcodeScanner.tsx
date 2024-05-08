'use client'
import { APIRespone, ITicket } from '@/types'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useZxing } from 'react-zxing'
import * as z from 'zod'

interface IProps {
  verify: (ticketId: string, eventId: string) => Promise<APIRespone<ITicket>>
  eventId: string
}

export function QrcodeScanner({ verify, eventId }: IProps) {
  const [result, setResult] = useState('')
  const { ref } = useZxing({
    async onDecodeResult(result) {
      setResult(result.getText())
      await handleVerifyTicket(result.getText())
    },
  })

  async function handleVerifyTicket(result: string) {
    const schema = z.string().uuid('Invalid ticket ID')
    if (!schema.safeParse(result).success) {
      toast.error('Invalid ticket ID')
      return
    }
    const res = await verify(result, eventId)
    if (res.success) {
      toast.success('Ticket verified successfully')
    } else {
      toast.error(res.error.response.data.detail || 'Failed to verify ticket')
    }
  }

  return (
    <>
      <video
        ref={ref}
        width={200}
        style={{
          aspectRatio: '200/200',
          objectFit: 'cover',
        }}
      />
    </>
  )
}
