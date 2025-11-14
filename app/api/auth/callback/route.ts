import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/'
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  if (error) {
    const errorUrl = new URL('/login', requestUrl.origin)
    errorUrl.searchParams.set('error', errorDescription || error)
    return NextResponse.redirect(errorUrl)
  }

  if (code) {
    try {
      const supabase = await createClient()
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        const errorUrl = new URL('/login', requestUrl.origin)
        errorUrl.searchParams.set('error', exchangeError.message)
        return NextResponse.redirect(errorUrl)
      }
    } catch (err) {
      const errorUrl = new URL('/login', requestUrl.origin)
      errorUrl.searchParams.set(
        'error',
        err instanceof Error ? err.message : 'An unexpected error occurred during authentication'
      )
      return NextResponse.redirect(errorUrl)
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin))
}

