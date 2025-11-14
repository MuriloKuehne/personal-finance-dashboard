'use client'

import { useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Get theme from localStorage or default to dark
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const theme = storedTheme || 'dark'
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Prevent flash of wrong theme by not rendering until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}

