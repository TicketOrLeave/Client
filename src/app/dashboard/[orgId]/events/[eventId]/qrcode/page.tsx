import { QrcodeTap } from '@/components/Dashboard/Qrcode/QrcodeTap'

export default function Page({ params: { orgId, eventId } }: { params: { orgId: string, eventId: string } }) {
  return (
    <div className="container m-auto w-[80%] h-full mt-4">
      <QrcodeTap eventId={eventId} />
    </div>
  )
}
