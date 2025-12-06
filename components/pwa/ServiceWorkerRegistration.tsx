'use client'

import { useEffect, useState } from 'react'

export function ServiceWorkerRegistration() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      let isMounted = true

      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          })

          if (isMounted) {
            setRegistration(registration)
          }

          // Check for updates immediately
          registration.update()

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller &&
                  isMounted
                ) {
                  // New service worker available
                  setUpdateAvailable(true)
                }
              })
            }
          })

          // Listen for controller change (service worker activated)
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (isMounted) {
              window.location.reload()
            }
          })
        } catch (error) {
          console.error('Service Worker registration failed:', error)
        }
      }

      // Register service worker
      registerServiceWorker()

      // Check for updates periodically (every hour)
      const updateInterval = setInterval(() => {
        if (registration) {
          registration.update()
        }
      }, 60 * 60 * 1000)

      return () => {
        isMounted = false
        clearInterval(updateInterval)
      }
    }
  }, [registration])

  const handleUpdate = () => {
    if (registration?.waiting) {
      // Tell the service worker to skip waiting and activate
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  if (!updateAvailable) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-background-card)] p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Update Available
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              A new version of the app is available. Update now to get the latest features.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="rounded-md bg-[var(--color-button-primary-bg)] px-3 py-1.5 text-sm font-medium text-[var(--color-button-primary-text)] hover:bg-[var(--color-button-primary-hover)] transition-colors min-h-[44px]"
            >
              Update
            </button>
            <button
              onClick={() => setUpdateAvailable(false)}
              className="rounded-md bg-[var(--color-button-ghost-bg)] px-3 py-1.5 text-sm font-medium text-[var(--color-button-ghost-text)] hover:bg-[var(--color-button-ghost-hover)] transition-colors min-h-[44px]"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

