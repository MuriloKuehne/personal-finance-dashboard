'use client'

import { useEffect, useState } from 'react'
import { isOnline, addOnlineListener, addOfflineListener } from '@/lib/utils/offline'

export function useOffline() {
  const [offline, setOffline] = useState(!isOnline())

  useEffect(() => {
    setOffline(!isOnline())

    const removeOnlineListener = addOnlineListener(() => {
      setOffline(false)
    })

    const removeOfflineListener = addOfflineListener(() => {
      setOffline(true)
    })

    return () => {
      removeOnlineListener()
      removeOfflineListener()
    }
  }, [])

  return offline
}

