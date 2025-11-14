'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/lib/types/database'

type Transaction = Database['public']['Tables']['transactions']['Row']
type TransactionInsert = Database['public']['Tables']['transactions']['Insert']
type TransactionUpdate = Database['public']['Tables']['transactions']['Update']

export async function createTransaction(data: Omit<TransactionInsert, 'user_id'>) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert({
        ...data,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/transactions')
    return { data: transaction }
  } catch (error) {
    return { error: 'Failed to create transaction' }
  }
}

export async function updateTransaction(
  id: string,
  data: TransactionUpdate
) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    const { data: transaction, error } = await supabase
      .from('transactions')
      .update(data)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/transactions')
    revalidatePath(`/transactions/${id}`)
    return { data: transaction }
  } catch (error) {
    return { error: 'Failed to update transaction' }
  }
}

export async function deleteTransaction(id: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/transactions')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete transaction' }
  }
}

export async function getTransactions(filters?: {
  type?: 'income' | 'expense'
  startDate?: string
  endDate?: string
}) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized', data: null }
    }

    let query = supabase
      .from('transactions')
      .select('*, categories(*)')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })

    if (filters?.type) {
      query = query.eq('type', filters.type)
    }

    if (filters?.startDate) {
      query = query.gte('date', filters.startDate)
    }

    if (filters?.endDate) {
      query = query.lte('date', filters.endDate)
    }

    const { data, error } = await query

    if (error) {
      return { error: error.message, data: null }
    }

    return { data, error: null }
  } catch (error) {
    return { error: 'Failed to fetch transactions', data: null }
  }
}

export async function getTransaction(id: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized', data: null }
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('*, categories(*)')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      return { error: error.message, data: null }
    }

    return { data, error: null }
  } catch (error) {
    return { error: 'Failed to fetch transaction', data: null }
  }
}

