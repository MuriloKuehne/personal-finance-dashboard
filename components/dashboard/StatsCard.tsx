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
    default: 'border-gray-200',
    income: 'border-green-200 bg-green-50',
    expense: 'border-red-200 bg-red-50',
    balance: 'border-blue-200 bg-blue-50',
  }

  const valueStyles = {
    default: 'text-gray-900',
    income: 'text-green-700',
    expense: 'text-red-700',
    balance: 'text-blue-700',
  }

  return (
    <Card className={cn(variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={cn('text-2xl font-bold', valueStyles[variant])}>
              {formatCurrency(value)}
            </p>
            {change !== undefined && (
              <p
                className={cn(
                  'text-sm',
                  change >= 0 ? 'text-green-600' : 'text-red-600'
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
                'rounded-full p-3',
                variant === 'income' && 'bg-green-100',
                variant === 'expense' && 'bg-red-100',
                variant === 'balance' && 'bg-blue-100',
                variant === 'default' && 'bg-gray-100'
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

