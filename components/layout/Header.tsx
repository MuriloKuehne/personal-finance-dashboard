import { createClient } from '@/lib/supabase/server'
import { HeaderClient } from './HeaderClient'

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

  return <HeaderClient userName={profile?.name || null} />
}

