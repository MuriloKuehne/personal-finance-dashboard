import { createClient } from '@/lib/supabase/server'

interface UserProfile {
  name: string | null
}

export const Header = async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: UserProfile | null = null

  if (user) {
    const { data: profileData } = await supabase
      .from('user_profiles')
      .select('name')
      .eq('id', user.id)
      .single()

    profile = profileData || { name: null }
  }

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

