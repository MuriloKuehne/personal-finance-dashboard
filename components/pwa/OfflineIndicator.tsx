'use client'

import { useOffline } from '@/lib/hooks/useOffline'
import { WifiOff } from 'lucide-react'

export function OfflineIndicator() {
  const offline = useOffline()

  if (!offline) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-error-bg)] border-b border-[var(--color-error-border)] px-4 py-2">
      <div className="flex items-center gap-2 text-sm text-[var(--color-error-text)]">
        <WifiOff className="h-4 w-4" />
        <span>You're offline. Some features may be limited.</span>
      </div>
    </div>
  )
}

