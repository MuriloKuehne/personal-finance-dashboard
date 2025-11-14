'use server'

import { createClient } from '@/lib/supabase/server'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, subMonths } from 'date-fns'

export async function getDashboardStats() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized', data: null }
    }

    const now = new Date()
    const monthStart = startOfMonth(now).toISOString().split('T')[0]
    const monthEnd = endOfMonth(now).toISOString().split('T')[0]

    // Get all transactions
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('amount, type, date')
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message, data: null }
    }

    if (!transactions) {
      return {
        data: {
          totalIncome: 0,
          totalExpenses: 0,
          netBalance: 0,
          monthlyIncome: 0,
          monthlyExpenses: 0,
        },
        error: null,
      }
    }

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const monthlyTransactions = transactions.filter(
      (t) => t.date >= monthStart && t.date <= monthEnd
    )

    const monthlyIncome = monthlyTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const monthlyExpenses = monthlyTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    return {
      data: {
        totalIncome,
        totalExpenses,
        netBalance: totalIncome - totalExpenses,
        monthlyIncome,
        monthlyExpenses,
      },
      error: null,
    }
  } catch (error) {
    return { error: 'Failed to fetch dashboard stats', data: null }
  }
}

export async function getMonthlySummary(months: number = 6) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized', data: null }
    }

    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('amount, type, date')
      .eq('user_id', user.id)
      .gte('date', subMonths(new Date(), months).toISOString().split('T')[0])
      .order('date', { ascending: true })

    if (error) {
      return { error: error.message, data: null }
    }

    if (!transactions) {
      return { data: [], error: null }
    }

    // Group by month
    const monthlyData: Record<string, { income: number; expense: number }> = {}

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 }
      }

      if (transaction.type === 'income') {
        monthlyData[monthKey].income += Number(transaction.amount)
      } else {
        monthlyData[monthKey].expense += Number(transaction.amount)
      }
    })

    const result = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    }))

    return { data: result, error: null }
  } catch (error) {
    return { error: 'Failed to fetch monthly summary', data: null }
  }
}

export async function getWeeklySummary() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized', data: null }
    }

    const weekStart = startOfWeek(new Date()).toISOString().split('T')[0]
    const weekEnd = endOfWeek(new Date()).toISOString().split('T')[0]

    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('amount, type, date')
      .eq('user_id', user.id)
      .gte('date', weekStart)
      .lte('date', weekEnd)
      .order('date', { ascending: true })

    if (error) {
      return { error: error.message, data: null }
    }

    if (!transactions) {
      return { data: [], error: null }
    }

    // Group by day
    const dailyData: Record<string, { income: number; expense: number }> = {}

    transactions.forEach((transaction) => {
      const dayKey = transaction.date
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = { income: 0, expense: 0 }
      }

      if (transaction.type === 'income') {
        dailyData[dayKey].income += Number(transaction.amount)
      } else {
        dailyData[dayKey].expense += Number(transaction.amount)
      }
    })

    const result = Object.entries(dailyData).map(([day, data]) => ({
      day,
      income: data.income,
      expense: data.expense,
    }))

    return { data: result, error: null }
  } catch (error) {
    return { error: 'Failed to fetch weekly summary', data: null }
  }
}

