import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'focus-visible:ring-[var(--color-button-primary-focus)]':
              variant === 'default',
            'bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] hover:bg-[var(--color-button-primary-hover)]':
              variant === 'default',
            'border focus-visible:ring-[var(--color-button-outline-focus)]':
              variant === 'outline',
            'bg-[var(--color-button-outline-bg)] text-[var(--color-button-outline-text)] border-[var(--color-button-outline-border)] hover:bg-[var(--color-button-outline-hover)]':
              variant === 'outline',
            'focus-visible:ring-[var(--color-button-ghost-focus)]':
              variant === 'ghost',
            'bg-[var(--color-button-ghost-bg)] text-[var(--color-button-ghost-text)] hover:bg-[var(--color-button-ghost-hover)]':
              variant === 'ghost',
            'focus-visible:ring-[var(--color-button-destructive-focus)]':
              variant === 'destructive',
            'bg-[var(--color-button-destructive-bg)] text-[var(--color-button-destructive-text)] hover:bg-[var(--color-button-destructive-hover)]':
              variant === 'destructive',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }

