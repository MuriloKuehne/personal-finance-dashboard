'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Plus, Edit, Trash2 } from 'lucide-react'
import type { Database } from '@/lib/types/database'

type Category = Database['public']['Tables']['categories']['Row']

const COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
]

interface CategoriesPageClientProps {
  initialCategories: Category[]
}

export function CategoriesPageClient({
  initialCategories,
}: CategoriesPageClientProps) {
  const router = useRouter()
  const [categories, setCategories] = useState(initialCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    color: COLORS[0],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setFormData({
        name: category.name,
        type: category.type as 'income' | 'expense',
        color: category.color,
      })
    } else {
      setEditingCategory(null)
      setFormData({
        name: '',
        type: 'expense',
        color: COLORS[0],
      })
    }
    setError(null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingCategory(null)
    setFormData({
      name: '',
      type: 'expense',
      color: COLORS[0],
    })
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      let result
      if (editingCategory) {
        result = await updateCategory(editingCategory.id, formData)
      } else {
        result = await createCategory(formData)
      }

      if (result.error) {
        setError(result.error)
        return
      }

      router.refresh()
      handleCloseDialog()
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category)
    setDeleteError(null)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return

    setIsDeleting(true)
    setDeleteError(null)
    const result = await deleteCategory(categoryToDelete.id)
    setIsDeleting(false)

    if (result.error) {
      setDeleteError(result.error)
      return
    }

    setCategories(categories.filter((c) => c.id !== categoryToDelete.id))
    setDeleteDialogOpen(false)
    setCategoryToDelete(null)
    setDeleteError(null)
    router.refresh()
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setCategoryToDelete(null)
    setDeleteError(null)
  }

  const incomeCategories = categories.filter((c) => c.type === 'income')
  const expenseCategories = categories.filter((c) => c.type === 'expense')

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Categories</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Organize your transactions with categories
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="w-full sm:w-auto min-h-[44px]">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Income Categories</h3>
          {incomeCategories.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-[var(--color-text-muted)]">
                No income categories yet
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {incomeCategories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-block h-4 w-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium text-[var(--color-text-primary)]">{category.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(category)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Expense Categories</h3>
          {expenseCategories.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-[var(--color-text-muted)]">
                No expense categories yet
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {expenseCategories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-block h-4 w-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium text-[var(--color-text-primary)]">{category.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(category)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent onClose={handleCloseDialog}>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-[var(--color-error-bg)] p-3 text-sm text-[var(--color-error-text)]">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-[var(--color-text-label)]">
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-[var(--color-text-label)]">
                Type
              </label>
              <Select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as 'income' | 'expense',
                  })
                }
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text-label)]">Color</label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${
                      formData.color === color
                        ? 'border-[var(--color-text-primary)] scale-110'
                        : 'border-[var(--color-border-input)] hover:border-[var(--color-border-hover)]'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading
                  ? editingCategory
                    ? 'Updating...'
                    : 'Creating...'
                  : editingCategory
                    ? 'Update'
                    : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent onClose={handleDeleteCancel}>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
              <span className="block mt-1 text-[var(--color-error-text-light)]">
                Note: You cannot delete a category that has existing transactions.
              </span>
            </DialogDescription>
          </DialogHeader>
          {deleteError && (
            <div className="my-4 rounded-md bg-[var(--color-error-bg)] p-3 text-sm text-[var(--color-error-text)]">
              {deleteError}
            </div>
          )}
          {categoryToDelete && (
            <div className="my-4 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-background-secondary)] p-4">
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-4 w-4 rounded-full"
                  style={{ backgroundColor: categoryToDelete.color }}
                />
                <div className="space-y-1">
                  <p className="font-medium text-[var(--color-text-primary)]">{categoryToDelete.name}</p>
                  <p className="text-sm text-[var(--color-text-secondary)] capitalize">
                    {categoryToDelete.type}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

