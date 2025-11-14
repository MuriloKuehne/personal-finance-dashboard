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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg rounded-lg bg-white shadow-lg">
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
    <div className={cn('p-6', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-4"
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
    <h2 className={cn('text-2xl font-semibold text-gray-900', className)}>
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
    <p className={cn('text-sm text-gray-500 mt-2', className)}>
      {children}
    </p>
  )
}

