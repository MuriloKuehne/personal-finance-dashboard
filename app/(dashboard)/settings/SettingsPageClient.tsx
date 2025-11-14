'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { updateUserProfile } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Moon, Sun } from 'lucide-react'
import type { Database } from '@/lib/types/database'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']

interface SettingsPageClientProps {
  initialProfile: UserProfile | null
}

export function SettingsPageClient({ initialProfile }: SettingsPageClientProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const [formData, setFormData] = useState({
    name: initialProfile?.name || '',
    email: initialProfile?.email || '',
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
    setIsLoading(true)

    try {
      const result = await updateUserProfile({
        name: formData.name || null,
        email: formData.email || null,
      })

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      // Redirect to dashboard immediately after successful save
      router.push('/')
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

