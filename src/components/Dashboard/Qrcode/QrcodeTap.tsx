import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CardHeader, CardContent, Card } from '@/components/ui/card'
import { QrcodeScanner } from '@/components/Dashboard/Qrcode/QrcodeScanner'
import { verifyTicket } from '@/lib/serverActions/ticket'
import { ManualTicketScan } from './ManualTicketScan'

export function QrcodeTap({ eventId }: { eventId: string }) {
  return (
    <Tabs defaultValue="account" className="w-full text-center">
      <TabsList className='w-full'>
        <TabsTrigger value="account" className="w-1/2">Scan</TabsTrigger>
        <TabsTrigger value="password" className="w-1/2">Manually</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="container m-auto">
          <CardHeader className="px-4">
            <div className="text-base font-medium">Scan QR Code</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Scan the ticket QR code to verify</div>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-center">
            <QrcodeScanner verify={verifyTicket} eventId={eventId} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="w-full">
          <CardHeader className="px-4">
            <div className="text-base font-medium">Manual Entry</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Enter the ticket ID manually</div>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-center">
            <ManualTicketScan verify={verifyTicket} eventId={eventId} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
