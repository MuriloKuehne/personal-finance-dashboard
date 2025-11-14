import { getUserProfile } from './actions'
import { SettingsPageClient } from './SettingsPageClient'

export default async function SettingsPage() {
  const result = await getUserProfile()

  if (result.error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Settings</h2>
        </div>
        <div className="rounded-md bg-[var(--color-error-bg)] p-4 text-[var(--color-error-text)]">
          {result.error}
        </div>
      </div>
    )
  }

  return <SettingsPageClient initialProfile={result.data} />
}

