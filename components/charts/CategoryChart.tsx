'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface CategoryChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export const CategoryChart = ({ data }: CategoryChartProps) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-[var(--color-text-muted)]">
        No data available
      </div>
    )
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props) => {
              const { name = '', percent = 0 } = props
              const percentValue = percent ?? 0
              return `${name} ${(percentValue * 100).toFixed(0)}%`
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
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
            }}
            labelStyle={{
              color: 'var(--color-text-primary)',
              fontWeight: 600,
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

