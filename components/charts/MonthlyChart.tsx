'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface MonthlyChartProps {
  data: Array<{
    month: string
    income: number
    expense: number
  }>
}

export const MonthlyChart = ({ data }: MonthlyChartProps) => {
  const chartData = data.map((item) => ({
    month: new Date(item.month + '-01').toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }),
    Income: item.income,
    Expense: item.expense,
  }))

  return (
    <div className="w-full h-[300px] min-h-[300px] md:h-[400px] md:min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-divider)" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
            width={60}
          />
          <Tooltip
            formatter={(value: number) =>
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(value)
            }
            contentStyle={{
              backgroundColor: 'var(--color-background-card)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '6px',
              color: 'var(--color-text-primary)',
            }}
            labelStyle={{
              color: 'var(--color-text-primary)',
              fontWeight: 600,
            }}
            itemStyle={{
              color: 'var(--color-text-primary)',
            }}
          />
          <Legend 
            wrapperStyle={{ color: 'var(--color-text-primary)' }}
          />
          <Bar dataKey="Income" fill="#10b981" />
          <Bar dataKey="Expense" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

