'use client'

import { useState, useCallback } from 'react'

interface Window {
  id: string
  appId: string
  title: string
  isMinimised: boolean
  isMaximised: boolean
}

interface WindowManagerState {
  windows: Window[]
  activeWindow: string | null
  openWindow: (appId: string) => void
  closeWindow: (windowId: string) => void
  setActiveWindow: (windowId: string | null) => void
  minimiseWindow: (windowId: string) => void
  maximiseWindow: (windowId: string) => void
}

const appTitles: Record<string, string> = {
  docs: 'Documents',
  audio: 'Audio Workstation',
  academy: 'Academy',
  flashcards: 'Flashcards',
  settings: 'Settings',
}

export function useWindowManager(): WindowManagerState {
  const [windows, setWindows] = useState<Window[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)

  const openWindow = useCallback((appId: string) => {
    const windowId = `${appId}-${Date.now()}`
    const newWindow: Window = {
      id: windowId,
      appId,
      title: appTitles[appId] || appId,
      isMinimised: false,
      isMaximised: false,
    }

    setWindows((prev) => [...prev, newWindow])
    setActiveWindow(windowId)
  }, [])

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => {
      const filtered = prev.filter((w) => w.id !== windowId)
      // If the closed window was active, set the last window as active
      if (activeWindow === windowId && filtered.length > 0) {
        setActiveWindow(filtered[filtered.length - 1].id)
      } else if (filtered.length === 0) {
        setActiveWindow(null)
      }
      return filtered
    })
  }, [activeWindow])

  const minimiseWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMinimised: true } : w
      )
    )
  }, [])

  const maximiseWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMaximised: !w.isMaximised } : w
      )
    )
  }, [])

  return {
    windows,
    activeWindow,
    openWindow,
    closeWindow,
    setActiveWindow,
    minimiseWindow,
    maximiseWindow,
  }
}
