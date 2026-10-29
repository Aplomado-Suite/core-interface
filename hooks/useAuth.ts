'use client'

import { useState, useEffect } from 'react'

interface AuthState {
  isAuthenticated: boolean
  user: string | null
  login: (credentials: { username: string; password: string }) => void
  logout: () => void
}

const SESSION_KEY = process.env.NEXT_PUBLIC_AUTH_SESSION_KEY || 'aplomado_session'
const SESSION_DURATION = parseInt(process.env.NEXT_PUBLIC_AUTH_SESSION_DURATION || '86400000', 10)

export function useAuth(): AuthState {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    // Check for existing session on mount
    const session = localStorage.getItem(SESSION_KEY)
    if (session) {
      try {
        const sessionData = JSON.parse(session)
        const now = Date.now()

        // Check if session is still valid
        if (sessionData.timestamp && now - sessionData.timestamp < SESSION_DURATION) {
          setIsAuthenticated(true)
          setUser(sessionData.username)
        } else {
          // Session expired
          localStorage.removeItem(SESSION_KEY)
        }
      } catch (error) {
        console.error('Failed to parse session:', error)
        localStorage.removeItem(SESSION_KEY)
      }
    }
  }, [])

  const login = (credentials: { username: string; password: string }) => {
    // In production, this would verify credentials against encrypted local storage
    // For now, we'll create a session
    const sessionData = {
      username: credentials.username,
      timestamp: Date.now(),
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
    setIsAuthenticated(true)
    setUser(credentials.username)
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
    setUser(null)
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
  }
}
