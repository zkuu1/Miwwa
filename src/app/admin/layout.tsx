import { AdminSidebar } from '@/components/admin-sidebar'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'Admin Dashboard | Miiwa',
  description: 'Panel administrasi Miiwa',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  )
}
