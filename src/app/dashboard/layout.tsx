import BreadcrumbComponent from '@/components/Dashboard/Breadcrumb'
import Footer from '@/components/Dashboard/Footer'
import { Header } from '@/components/Dashboard/Header/Header'
import { Toaster } from 'react-hot-toast'

export default function OrganzationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex items-start justify-start mt-4 mx-4 px-6">
        <BreadcrumbComponent />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster  position='bottom-right' />
    </div>
  )
}
