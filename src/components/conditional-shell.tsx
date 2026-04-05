'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const NO_SHELL_PATHS = ['/admin', '/login', '/register']

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideShell = NO_SHELL_PATHS.some((p) => pathname.startsWith(p))

  if (hideShell) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
