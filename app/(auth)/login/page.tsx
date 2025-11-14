import type { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Personal Finance Dashboard account to manage your finances.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background-primary)] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-allan)' }}>
            Personal Finance <span className="text-blue-600">Dashboard</span>
          </h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">Manage your finances with ease</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-[var(--color-text-link)] hover:opacity-80 transition-opacity">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

