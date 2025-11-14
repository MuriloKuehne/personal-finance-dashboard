import { getCategories } from './actions'
import { CategoriesPageClient } from './CategoriesPageClient'

export default async function CategoriesPage() {
  const result = await getCategories()

  if (result.error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Categories</h2>
        </div>
        <div className="rounded-md bg-[var(--color-error-bg)] p-4 text-[var(--color-error-text)]">
          {result.error}
        </div>
      </div>
    )
  }

  return <CategoriesPageClient initialCategories={result.data || []} />
}

