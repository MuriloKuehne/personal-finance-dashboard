'use client'

import { useState } from 'react'
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Transactions</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage your income and expenses
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
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
              window.location.reload()
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

