'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { updateUserProfile } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Moon, Sun } from 'lucide-react'
import type { Database } from '@/lib/types/database'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']

interface SettingsPageClientProps {
  initialProfile: UserProfile | null
}

const CURRENCIES = [
  { value: 'USD', label: 'US Dollar ($)', symbol: '$' },
  { value: 'BRL', label: 'Brazilian Real (R$)', symbol: 'R$' },
  { value: 'EUR', label: 'Euro (€)', symbol: '€' },
  { value: 'GBP', label: 'British Pound (£)', symbol: '£' },
]

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'pt-BR', label: 'Portuguese (Brazil)' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
]

export function SettingsPageClient({ initialProfile }: SettingsPageClientProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const [formData, setFormData] = useState({
    name: initialProfile?.name || '',
    email: initialProfile?.email || '',
    currency: initialProfile?.currency || 'USD',
    language: initialProfile?.language || 'en',
  })

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const theme = storedTheme || 'dark'
    setTheme(theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      const result = await updateUserProfile({
        name: formData.name || null,
        email: formData.email || null,
        currency: formData.currency,
        language: formData.language,
      })

      if (result.error) {
        setError(result.error)
        return
      }

      setSuccess('Settings saved successfully!')
      router.refresh()
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Settings</h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Manage your profile and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-[var(--color-error-bg)] p-4 text-sm text-[var(--color-error-text)]">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-md bg-[var(--color-success-bg)] p-4 text-sm text-[var(--color-success-text)]">
            {success}
          </div>
        )}

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-[var(--color-text-label)]">
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[var(--color-text-label)]">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                readOnly
                disabled
                className="bg-[var(--color-background-disabled)] cursor-not-allowed"
              />
              <p className="text-xs text-[var(--color-text-muted)]">
                Email cannot be changed here. Contact support to change your email.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preferences Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your application settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="currency" className="text-sm font-medium text-[var(--color-text-label)]">
                Currency
              </label>
              <Select
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium text-[var(--color-text-label)]">
                Language
              </label>
              <Select
                id="language"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                {LANGUAGES.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Theme Section */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Choose your preferred theme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5 text-[var(--color-text-secondary)]" />
                ) : (
                  <Sun className="h-5 w-5 text-[var(--color-text-secondary)]" />
                )}
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {theme === 'dark'
                      ? 'Dark theme is active'
                      : 'Light theme is active'}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleThemeToggle}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Switch to Light
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Switch to Dark
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}

