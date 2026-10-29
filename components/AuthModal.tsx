'use client'

import { useState } from 'react'

interface AuthModalProps {
  onLogin: (credentials: { username: string; password: string }) => void
  onClose: () => void
}

export default function AuthModal({ onLogin, onClose }: AuthModalProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!username || !password || !apiKey) {
        throw new Error('Please enter username, password, and API key')
      }

      // Validate API key against environment
      const validApiKey = process.env.NEXT_PUBLIC_API_KEY || 'demo-api-key-12345' // In production, this would come from server-side validation

      if (apiKey !== validApiKey) {
        throw new Error('Invalid API key')
      }

      // Simulate authentication with API key
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onLogin({ username, password })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-oatmeal-900/50 backdrop-blur-md z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-oatmeal-200 p-8 sm:p-10 w-full max-w-md relative
        shadow-2xl shadow-oatmeal-900/10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 text-oatmeal-400 hover:text-oatmeal-900
            transition-colors text-2xl w-8 h-8 flex items-center justify-center rounded-lg
            hover:bg-oatmeal-100 hover:scale-110 transition-all duration-300"
          aria-label="Close"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100
            flex items-center justify-center shadow-inner">
            <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-oatmeal-900 mb-2 font-display">
            Welcome Back
          </h2>
          <p className="text-oatmeal-500 font-light">
            Sign in to your sovereign workspace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2 sm:mb-3 text-oatmeal-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-oatmeal-50
                border-2 border-oatmeal-200
                text-oatmeal-900 placeholder-oatmeal-400
                focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10
                transition-all duration-300 hover:border-oatmeal-300"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 sm:mb-3 text-oatmeal-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-oatmeal-50
                border-2 border-oatmeal-200
                text-oatmeal-900 placeholder-oatmeal-400
                focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10
                transition-all duration-300 hover:border-oatmeal-300"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-2 sm:mb-3 text-oatmeal-600">
              API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-oatmeal-50
                border-2 border-oatmeal-200
                text-oatmeal-900 placeholder-oatmeal-400
                focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10
                transition-all duration-300 hover:border-oatmeal-300"
              placeholder="Enter your API key"
              autoComplete="off"
            />
            <p className="text-xs text-oatmeal-400 mt-2">
              Contact TekPet Digital for your API key
            </p>
          </div>

          {error && (
            <div className="p-3 sm:p-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 sm:py-4 px-4 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500
              hover:from-accent-500 hover:to-accent-400
              text-white font-semibold text-base sm:text-lg
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg hover:shadow-xl hover:shadow-accent-500/30
              hover:-translate-y-0.5 hover:scale-[1.02]
              disabled:hover:translate-y-0 disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Authenticating...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 pt-6 border-t border-oatmeal-200 text-center">
          <p className="text-sm text-oatmeal-400 flex items-center justify-center gap-2 font-light">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your data stays local. No cloud storage.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
