import { notFound } from 'next/navigation'
import { getTransaction } from '../actions'
import { EditTransactionPageClient } from './EditTransactionPageClient'

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getTransaction(id)

  if (result.error || !result.data) {
    notFound()
  }

  return <EditTransactionPageClient transaction={result.data as any} />
}
