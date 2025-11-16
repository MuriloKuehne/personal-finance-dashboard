'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { deleteTransaction } from '@/app/(dashboard)/transactions/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatCurrency } from '@/lib/utils/date'
import { Edit, Trash2 } from 'lucide-react'
import type { Database } from '@/lib/types/database'

type Transaction = Database['public']['Tables']['transactions']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row']
}

interface TransactionListProps {
  transactions: Transaction[]
}

export const TransactionList = ({ transactions: initialTransactions }: TransactionListProps) => {
  const router = useRouter()
  const [transactions, setTransactions] = useState(initialTransactions)
  const [filterType, setFilterType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<{
    id: string
    description: string | null
    amount: number
  } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filterType === 'all' || transaction.type === filterType
    const matchesSearch =
      !searchTerm ||
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.categories?.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleDeleteClick = (transaction: Transaction) => {
    setTransactionToDelete({
      id: transaction.id,
      description: transaction.description,
      amount: Number(transaction.amount),
    })
    setDeleteError(null)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!transactionToDelete) return

    setIsDeleting(true)
    setDeleteError(null)
    const result = await deleteTransaction(transactionToDelete.id)
    setIsDeleting(false)

    if (result.error) {
      setDeleteError(result.error)
      return
    }

    setTransactions(transactions.filter((t) => t.id !== transactionToDelete.id))
    setDeleteDialogOpen(false)
    setTransactionToDelete(null)
    setDeleteError(null)
    router.refresh()
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setTransactionToDelete(null)
    setDeleteError(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-h-[44px]"
        />
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full sm:w-48 min-h-[44px]"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>
      </div>

      {filteredTransactions.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-[var(--color-text-muted)]">
            No transactions found
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id}>
              <CardContent className="p-3 md:p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="inline-block h-3 w-3 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: transaction.categories?.color || '#3B82F6',
                        }}
                      />
                      <span className="font-medium text-[var(--color-text-primary)] truncate">
                        {transaction.categories?.name || 'Uncategorized'}
                      </span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium flex-shrink-0 ${
                          transaction.type === 'income'
                            ? 'bg-[var(--color-success-bg-light)] text-[var(--color-success-text)]'
                            : 'bg-[var(--color-stats-expense-bg)] text-[var(--color-stats-expense-text)]'
                        }`}
                      >
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </div>
                    {transaction.description && (
                      <p className="mt-1 text-sm text-[var(--color-text-secondary)] truncate">
                        {transaction.description}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4">
                    <span
                      className={`text-base md:text-lg font-bold ${
                        transaction.type === 'income'
                          ? 'text-[var(--color-success-text-light)]'
                          : 'text-[var(--color-error-text-light)]'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(Number(transaction.amount))}
                    </span>
                    <div className="flex gap-1 md:gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          router.push(`/transactions/${transaction.id}`)
                        }
                        className="min-h-[44px] min-w-[44px] p-2"
                        aria-label="Edit transaction"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(transaction)}
                        className="min-h-[44px] min-w-[44px] p-2"
                        aria-label="Delete transaction"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent onClose={handleDeleteCancel}>
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this transaction? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteError && (
            <div className="my-4 rounded-md bg-[var(--color-error-bg)] p-3 text-sm text-[var(--color-error-text)]">
              {deleteError}
            </div>
          )}
          {transactionToDelete && (
            <div className="my-4 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-background-secondary)] p-4">
              <div className="space-y-1">
                {transactionToDelete.description && (
                  <p className="font-medium text-[var(--color-text-primary)]">
                    {transactionToDelete.description}
                  </p>
                )}
                <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {formatCurrency(transactionToDelete.amount)}
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

