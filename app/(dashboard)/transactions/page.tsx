import type { Metadata } from 'next'
import { getTransactions } from './actions'
import { TransactionsPageClient } from './TransactionsPageClient'

export const metadata: Metadata = {
  title: 'Transactions',
  description: 'View and manage all your financial transactions. Add, edit, and delete transactions to keep your finances organized.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function TransactionsPage() {
  const result = await getTransactions()

  if (result.error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Transactions</h2>
        </div>
        <div className="rounded-md bg-red-50 p-4 text-red-800">
          {result.error}
        </div>
      </div>
    )
  }

  return <TransactionsPageClient transactions={result.data || []} />
}
