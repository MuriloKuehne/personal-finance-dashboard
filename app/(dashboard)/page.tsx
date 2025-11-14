import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getDashboardStats, getMonthlySummary, getWeeklySummary } from './actions'
import { getTransactions } from './transactions/actions'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react'
import { MonthlyChartWrapper, WeeklyChartWrapper } from '@/components/dashboard/ChartsWrapper'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your financial overview, track income and expenses, and monitor your financial health.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DashboardPage() {
  const [statsResult, monthlyResult, weeklyResult, transactionsResult] =
    await Promise.all([
      getDashboardStats(),
      getMonthlySummary(),
      getWeeklySummary(),
      getTransactions({ startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }),
    ])

  const stats = statsResult.data || {
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
  }

  const monthlyData = monthlyResult.data || []
  const weeklyData = weeklyResult.data || []
  const recentTransactions = transactionsResult.data?.slice(0, 10) || []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Dashboard</h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Overview of your financial activity
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Income"
          value={stats.totalIncome}
          change={stats.monthlyIncome}
          icon={<TrendingUp className="h-5 w-5" style={{ color: 'var(--color-success-text-light)' }} />}
          variant="income"
        />
        <StatsCard
          title="Total Expenses"
          value={stats.totalExpenses}
          change={stats.monthlyExpenses}
          icon={<TrendingDown className="h-5 w-5 text-[var(--color-error-text-light)]" />}
          variant="expense"
        />
        <StatsCard
          title="Net Balance"
          value={stats.netBalance}
          icon={<Wallet className="h-5 w-5 text-[var(--color-info-text-light)]" />}
          variant="balance"
        />
        <StatsCard
          title="This Month"
          value={stats.monthlyIncome - stats.monthlyExpenses}
          icon={<Calendar className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={
              <div className="h-[400px] flex items-center justify-center text-[var(--color-text-secondary)]">
                Loading...
              </div>
            }>
              <MonthlyChartWrapper data={monthlyData} />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={
              <div className="h-[300px] flex items-center justify-center text-[var(--color-text-secondary)]">
                Loading...
              </div>
            }>
              <WeeklyChartWrapper data={weeklyData} />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList transactions={recentTransactions} />
        </CardContent>
      </Card>
    </div>
  )
}

