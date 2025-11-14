'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/lib/types/database'

type Category = Database['public']['Tables']['categories']['Row']
type CategoryInsert = Database['public']['Tables']['categories']['Insert']
type CategoryUpdate = Database['public']['Tables']['categories']['Update']

export async function createCategory(data: Omit<CategoryInsert, 'user_id'>) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    const { data: category, error } = await supabase
      .from('categories')
      .insert({
        ...data,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/categories')
    revalidatePath('/transactions')
    return { data: category }
  } catch (error) {
    return { error: 'Failed to create category' }
  }
}

export async function updateCategory(id: string, data: CategoryUpdate) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    const { data: category, error } = await supabase
      .from('categories')
      .update(data)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/categories')
    revalidatePath('/transactions')
    return { data: category }
  } catch (error) {
    return { error: 'Failed to update category' }
  }
}

export async function deleteCategory(id: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    // Check if category is used in transactions
    const { data: transactions } = await supabase
      .from('transactions')
      .select('id')
      .eq('category_id', id)
      .eq('user_id', user.id)
      .limit(1)

    if (transactions && transactions.length > 0) {
      return { error: 'Cannot delete category with existing transactions' }
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/categories')
    revalidatePath('/transactions')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete category' }
  }
}

export async function getCategories(type?: 'income' | 'expense') {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized', data: null }
    }

    let query = supabase
      .from('categories')
      .select('*')
      .eq('user_id', user.id)
      .order('name', { ascending: true })

    if (type) {
      query = query.eq('type', type)
    }

    const { data, error } = await query

    if (error) {
      return { error: error.message, data: null }
    }

    return { data, error: null }
  } catch (error) {
    return { error: 'Failed to fetch categories', data: null }
  }
}

