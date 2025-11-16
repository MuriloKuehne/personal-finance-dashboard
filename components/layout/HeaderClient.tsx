'use client'

import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMobileMenu } from './MobileMenuContext'

interface HeaderClientProps {
  userName: string | null
}

export const HeaderClient = ({ userName }: HeaderClientProps) => {
  const { toggleMenu, isOpen } = useMobileMenu()

  return (
    <header className="border-b border-[var(--color-border-divider)] bg-[var(--color-background-primary)]">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)] truncate">
            {userName || 'User'}
          </h1>
        </div>
      </div>
    </header>
  )
}

