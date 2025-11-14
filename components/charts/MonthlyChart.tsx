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
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value: number) =>
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(value)
            }
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
            }}
            labelStyle={{
              color: '#171717',
              fontWeight: 600,
            }}
          />
          <Legend />
          <Bar dataKey="Income" fill="#10b981" />
          <Bar dataKey="Expense" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

