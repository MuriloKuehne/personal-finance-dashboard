'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createTransaction, updateTransaction } from '@/app/(dashboard)/transactions/actions'
import { getCategories } from '@/app/(dashboard)/categories/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { CategorySelect } from './CategorySelect'
import type { Database } from '@/lib/types/database'

type Transaction = Database['public']['Tables']['transactions']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row']
}

const transactionSchema = z.object({
  amount: z.string().min(1, 'Amount is required').refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    'Amount must be a positive number'
  ),
  type: z.enum(['income', 'expense']),
  category_id: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
})

type TransactionFormData = z.infer<typeof transactionSchema>

interface TransactionFormProps {
  transaction?: Transaction
  onSuccess?: () => void
}

export const TransactionForm = ({ transaction, onSuccess }: TransactionFormProps) => {
  const [categories, setCategories] = useState<
    Database['public']['Tables']['categories']['Row'][]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transaction
      ? {
          amount: String(transaction.amount),
          type: transaction.type as 'income' | 'expense',
          category_id: transaction.category_id,
          description: transaction.description || '',
          date: transaction.date,
        }
      : {
          type: 'expense',
          date: new Date().toISOString().split('T')[0],
        },
  })

  const transactionType = watch('type')

  useEffect(() => {
    const loadCategories = async () => {
      const result = await getCategories()
      if (result.data) {
        setCategories(result.data)
      }
    }
    loadCategories()
  }, [])

  const onSubmit = async (data: TransactionFormData) => {
    try {
      setError(null)
      setIsLoading(true)

      const transactionData = {
        amount: Number(data.amount),
        type: data.type,
        category_id: data.category_id,
        description: data.description || null,
        date: data.date,
      }

      let result
      if (transaction) {
        result = await updateTransaction(transaction.id, transactionData)
      } else {
        result = await createTransaction(transactionData)
      }

      if (result.error) {
        setError(result.error)
        return
      }

      onSuccess?.()
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-md bg-[var(--color-error-bg)] p-3 text-sm text-[var(--color-error-text)]">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium text-[var(--color-text-label)]">
          Type
        </label>
        <Select
          id="type"
          {...register('type')}
          onChange={(e) => {
            setValue('type', e.target.value as 'income' | 'expense')
            setValue('category_id', '')
          }}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>
        {errors.type && (
          <p className="text-sm text-[var(--color-error-text-light)]">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="category_id" className="text-sm font-medium text-[var(--color-text-label)]">
          Category
        </label>
        <CategorySelect
          categories={categories}
          value={watch('category_id')}
          onChange={(value) => setValue('category_id', value)}
          type={transactionType}
        />
        {errors.category_id && (
          <p className="text-sm text-[var(--color-error-text-light)]">{errors.category_id.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium text-[var(--color-text-label)]">
          Amount
        </label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register('amount')}
        />
        {errors.amount && (
          <p className="text-sm text-[var(--color-error-text-light)]">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-[var(--color-text-label)]">
          Description
        </label>
        <Input
          id="description"
          type="text"
          placeholder="Optional description"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-[var(--color-error-text-light)]">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium text-[var(--color-text-label)]">
          Date
        </label>
        <Input 
          id="date" 
          type="date" 
          className="date-input-no-icon cursor-pointer" 
          {...register('date')} 
        />
        {errors.date && (
          <p className="text-sm text-[var(--color-error-text-light)]">{errors.date.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading
          ? transaction
            ? 'Updating...'
            : 'Creating...'
          : transaction
            ? 'Update Transaction'
            : 'Create Transaction'}
      </Button>
    </form>
  )
}

