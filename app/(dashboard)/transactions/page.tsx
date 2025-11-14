import { getTransactions } from './actions'
import { TransactionsPageClient } from './TransactionsPageClient'

export default async function TransactionsPage() {
  const result = await getTransactions()

  if (result.error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Transactions</h2>
        </div>
        <div className="rounded-md bg-red-50 p-4 text-red-800">
          {result.error}
        </div>
      </div>
    )
  }

  return <TransactionsPageClient transactions={result.data || []} />
}
