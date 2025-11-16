'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { TransactionForm } from '@/components/dashboard/TransactionForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import type { Database } from '@/lib/types/database'

type Transaction = Database['public']['Tables']['transactions']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row']
}

interface TransactionsPageClientProps {
  transactions: Transaction[]
}

export function TransactionsPageClient({
  transactions: initialTransactions,
}: TransactionsPageClientProps) {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Transactions</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Manage your income and expenses
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="w-full sm:w-auto min-h-[44px]">
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <TransactionList transactions={initialTransactions} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent onClose={() => setIsDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm
            onSuccess={() => {
              setIsDialogOpen(false)
              router.refresh()
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

