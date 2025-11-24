import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/'
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  // Use NEXT_PUBLIC_SITE_URL if available, otherwise use request origin
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin
  const baseUrl = new URL(siteUrl).origin

  if (error) {
    const errorUrl = new URL('/login', baseUrl)
    errorUrl.searchParams.set('error', errorDescription || error)
    return NextResponse.redirect(errorUrl)
  }

  if (code) {
    try {
      const supabase = await createClient()
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        const errorUrl = new URL('/login', baseUrl)
        errorUrl.searchParams.set('error', exchangeError.message)
        return NextResponse.redirect(errorUrl)
      }
    } catch (err) {
      const errorUrl = new URL('/login', baseUrl)
      errorUrl.searchParams.set(
        'error',
        err instanceof Error ? err.message : 'An unexpected error occurred during authentication'
      )
      return NextResponse.redirect(errorUrl)
    }
  }

  // Ensure the redirect URL is properly formatted
  const redirectUrl = next.startsWith('/') ? new URL(next, baseUrl) : new URL(next)
  return NextResponse.redirect(redirectUrl)
}

