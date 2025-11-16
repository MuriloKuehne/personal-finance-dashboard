'use client'

import dynamic from 'next/dynamic'

const MonthlyChartDynamic = dynamic(
  () => import('@/components/charts/MonthlyChart').then((mod) => ({ default: mod.MonthlyChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] md:h-[400px] flex items-center justify-center text-[var(--color-text-secondary)]">
        Loading chart...
      </div>
    ),
  }
)

const WeeklyChartDynamic = dynamic(
  () => import('@/components/charts/WeeklyChart').then((mod) => ({ default: mod.WeeklyChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[250px] md:h-[300px] flex items-center justify-center text-[var(--color-text-secondary)]">
        Loading chart...
      </div>
    ),
  }
)

interface MonthlyChartWrapperProps {
  data: Array<{
    month: string
    income: number
    expense: number
  }>
}

export const MonthlyChartWrapper: React.FC<MonthlyChartWrapperProps> = ({ data }) => {
  return <MonthlyChartDynamic data={data} />
}

interface WeeklyChartWrapperProps {
  data: Array<{
    day: string
    income: number
    expense: number
  }>
}

export const WeeklyChartWrapper: React.FC<WeeklyChartWrapperProps> = ({ data }) => {
  return <WeeklyChartDynamic data={data} />
}

