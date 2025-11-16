'use client'

import { type ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
      <div
        className="fixed inset-0"
        style={{ backgroundColor: 'var(--color-background-overlay)' }}
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full h-full md:h-auto md:max-w-lg md:rounded-lg bg-[var(--color-background-card)] shadow-lg md:max-h-[90vh] md:overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

interface DialogContentProps {
  children: ReactNode
  onClose: () => void
  className?: string
}

export const DialogContent = ({
  children,
  onClose,
  className,
}: DialogContentProps) => {
  return (
    <div className={cn('p-4 md:p-6', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 md:right-4 md:top-4 min-h-[44px] min-w-[44px]"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </Button>
      {children}
    </div>
  )
}

interface DialogHeaderProps {
  children: ReactNode
  className?: string
}

export const DialogHeader = ({ children, className }: DialogHeaderProps) => {
  return (
    <div className={cn('mb-4 pr-8', className)}>
      {children}
    </div>
  )
}

interface DialogTitleProps {
  children: ReactNode
  className?: string
}

export const DialogTitle = ({ children, className }: DialogTitleProps) => {
  return (
    <h2 className={cn('text-2xl font-semibold text-[var(--color-text-primary)]', className)}>
      {children}
    </h2>
  )
}

interface DialogDescriptionProps {
  children: ReactNode
  className?: string
}

export const DialogDescription = ({
  children,
  className,
}: DialogDescriptionProps) => {
  return (
    <p className={cn('text-sm text-[var(--color-text-muted)] mt-2', className)}>
      {children}
    </p>
  )
}

