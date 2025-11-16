'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format, parseISO } from 'date-fns'

interface WeeklyChartProps {
  data: Array<{
    day: string
    income: number
    expense: number
  }>
}

export const WeeklyChart = ({ data }: WeeklyChartProps) => {
  const chartData = data.map((item) => ({
    day: format(parseISO(item.day), 'EEE'),
    Income: item.income,
    Expense: item.expense,
  }))

  return (
    <div className="w-full h-[250px] min-h-[250px] md:h-[300px] md:min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-divider)" />
          <XAxis 
            dataKey="day" 
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
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
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#10b981"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Expense"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

