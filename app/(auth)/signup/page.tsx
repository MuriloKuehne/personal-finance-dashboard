import type { Metadata } from 'next'
import Link from 'next/link'
import { SignupForm } from '@/components/auth/SignupForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account for Personal Finance Dashboard and start managing your finances today.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background-primary)] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-allan)' }}>
            Personal Finance <span className="text-blue-600">Dashboard</span>
          </h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">Create your account to get started</p>
        </div>
        <SignupForm />
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[var(--color-text-link)] hover:opacity-80 transition-opacity">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

