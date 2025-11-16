import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { AuthGuard } from '@/components/layout/AuthGuard'
import { MobileMenuProvider } from '@/components/layout/MobileMenuContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <MobileMenuProvider>
        <div className="flex h-screen flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-[var(--color-background-secondary)] p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </MobileMenuProvider>
    </AuthGuard>
  )
}

