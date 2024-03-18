'use client'

import { usePathname } from 'next/navigation'

export function ToggleComponents({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hide = ['/dashboard', '/dashboard/create-organization']
  if (hide.includes(pathname)) return null
  return <>{children}</>
}
