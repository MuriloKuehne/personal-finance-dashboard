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
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
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

