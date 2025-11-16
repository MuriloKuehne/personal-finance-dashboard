'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Receipt, Tag, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useMobileMenu } from './MobileMenuContext'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Receipt },
  { name: 'Categories', href: '/categories', icon: Tag },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const { isOpen, closeMenu } = useMobileMenu()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const handleLinkClick = () => {
    closeMenu()
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--color-background-overlay)] md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-50 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-[var(--color-border-divider)] bg-[var(--color-background-primary)] transition-transform duration-300 ease-in-out md:relative md:top-0 md:z-auto md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-[44px]',
                  active
                    ? 'bg-[var(--color-nav-active-bg)] text-[var(--color-nav-active-text)] [&_svg]:text-[var(--color-nav-active-text)]'
                    : 'text-[var(--color-nav-inactive-text)] hover:bg-[var(--color-nav-hover-bg)]'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-[var(--color-border-divider)] p-4">
          <Link
            href="/settings"
            onClick={handleLinkClick}
            className={cn(
              'mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-[44px]',
              isActive('/settings')
                ? 'bg-[var(--color-nav-active-bg)] text-[var(--color-nav-active-text)] [&_svg]:text-[var(--color-nav-active-text)]'
                : 'text-[var(--color-nav-inactive-text)] hover:bg-[var(--color-nav-hover-bg)]'
            )}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            Settings
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start min-h-[44px]"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}

