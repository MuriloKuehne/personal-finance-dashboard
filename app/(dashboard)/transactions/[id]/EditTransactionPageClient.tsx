'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { TransactionForm } from '@/components/dashboard/TransactionForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Database } from '@/lib/types/database'

type Transaction = Database['public']['Tables']['transactions']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row']
}

interface EditTransactionPageClientProps {
  transaction: Transaction
}

export function EditTransactionPageClient({
  transaction,
}: EditTransactionPageClientProps) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Edit Transaction</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Update transaction details
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm
            transaction={transaction}
            onSuccess={() => {
              router.push('/transactions')
              router.refresh()
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

