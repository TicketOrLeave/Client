import { Header } from '@/components/Dashboard/Header/Header'

export default function OrganzationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      {/* TODO: Footer */}
      {/* <Footer /> */}
    </div>
  )
}
