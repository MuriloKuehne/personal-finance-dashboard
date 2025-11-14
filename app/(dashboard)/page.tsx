import { getDashboardStats, getMonthlySummary, getWeeklySummary } from './actions'
import { getTransactions } from './transactions/actions'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { MonthlyChart } from '@/components/charts/MonthlyChart'
import { WeeklyChart } from '@/components/charts/WeeklyChart'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react'

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
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Overview of your financial activity
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Income"
          value={stats.totalIncome}
          change={stats.monthlyIncome}
          icon={<TrendingUp className="h-5 w-5 text-green-600" />}
          variant="income"
        />
        <StatsCard
          title="Total Expenses"
          value={stats.totalExpenses}
          change={stats.monthlyExpenses}
          icon={<TrendingDown className="h-5 w-5 text-red-600" />}
          variant="expense"
        />
        <StatsCard
          title="Net Balance"
          value={stats.netBalance}
          icon={<Wallet className="h-5 w-5 text-blue-600" />}
          variant="balance"
        />
        <StatsCard
          title="This Month"
          value={stats.monthlyIncome - stats.monthlyExpenses}
          icon={<Calendar className="h-5 w-5 text-gray-600" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyChart data={monthlyData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyChart data={weeklyData} />
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

