'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
interface UserProfile {
  name: string | null
}

export const Header = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('name')
        .eq('id', user.id)
        .single()

      if (profileData?.name) {
        // Use profile name if it exists
        setProfile(profileData)
      } else {
        // Fallback to 'User' if no profile name is set
        setProfile({ name: null })
      }
    }

    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className="border-b border-[var(--color-border-divider)] bg-[var(--color-background-primary)]">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
          {profile?.name || 'User'}
        </h1>
      </div>
    </header>
  )
}

