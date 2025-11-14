'use client'

import { Select } from '@/components/ui/select'

interface Category {
  id: string
  name: string
  type: string
  color: string
}

interface CategorySelectProps {
  categories: Category[]
  value?: string
  onChange: (value: string) => void
  type: 'income' | 'expense'
  disabled?: boolean
}

export const CategorySelect = ({
  categories,
  value,
  onChange,
  type,
  disabled,
}: CategorySelectProps) => {
  const filteredCategories = categories.filter((cat) => cat.type === type)

  return (
    <Select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">Select a category</option>
      {filteredCategories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  )
}

