import { createClient } from '@/lib/supabase/client'

export type SSOProvider = 'google' | 'github'

export interface SSOError {
  message: string
  provider?: SSOProvider
}

export const signInWithSSO = async (
  provider: SSOProvider,
  redirectTo?: string
): Promise<{ error: SSOError | null }> => {
  try {
    const supabase = createClient()
    const redirectUrl = new URL(
      '/api/auth/callback',
      window.location.origin
    ).toString()

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl + (redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : ''),
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      return {
        error: {
          message: error.message || `Failed to sign in with ${provider}`,
          provider,
        },
      }
    }

    return { error: null }
  } catch (err) {
    return {
      error: {
        message: err instanceof Error ? err.message : `An unexpected error occurred with ${provider}`,
        provider,
      },
    }
  }
}

