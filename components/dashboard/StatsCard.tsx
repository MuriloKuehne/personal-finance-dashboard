import { type ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils/date'

interface StatsCardProps {
  title: string
  value: number
  change?: number
  icon?: ReactNode
  variant?: 'default' | 'income' | 'expense' | 'balance'
}

export const StatsCard = ({
  title,
  value,
  change,
  icon,
  variant = 'default',
}: StatsCardProps) => {
  const variantStyles = {
    default: 'border-[var(--color-stats-default-border)] !bg-[var(--color-stats-default-bg)]',
    income: 'border-[var(--color-stats-income-border)] !bg-[var(--color-stats-income-bg)]',
    expense: 'border-[var(--color-stats-expense-border)] !bg-[var(--color-stats-expense-bg)]',
    balance: 'border-[var(--color-stats-balance-border)] !bg-[var(--color-stats-balance-bg)]',
  }

  const valueStyles = {
    default: 'text-[var(--color-stats-default-text)]',
    income: 'text-[var(--color-stats-income-text)]',
    expense: 'text-[var(--color-stats-expense-text)]',
    balance: 'text-[var(--color-stats-balance-text)]',
  }

  return (
    <Card className={cn(variantStyles[variant])}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">{title}</p>
            <p className={cn('text-xl md:text-2xl font-bold truncate', valueStyles[variant])}>
              {formatCurrency(value)}
            </p>
            {change !== undefined && (
              <p
                className={cn(
                  'text-xs md:text-sm',
                  change >= 0 ? 'text-[var(--color-success-text-light)]' : 'text-[var(--color-error-text-light)]'
                )}
              >
                {change >= 0 ? '+' : ''}
                {formatCurrency(change)} this month
              </p>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                'rounded-full p-2 md:p-3 flex-shrink-0',
                variant === 'income' && 'bg-[var(--color-stats-income-icon-bg)]',
                variant === 'expense' && 'bg-[var(--color-stats-expense-icon-bg)]',
                variant === 'balance' && 'bg-[var(--color-stats-balance-icon-bg)]',
                variant === 'default' && 'bg-[var(--color-stats-default-icon-bg)]'
              )}
            >
              <div>
                {icon}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

