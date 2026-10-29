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
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl z-50 p-4">
      <div className="bg-[#0a0a14] rounded-3xl border border-white/10 p-8 sm:p-10 w-full max-w-md relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5"
          aria-label="Close"
        >
          ×
        </button>

        <div className="text-center mb-8 sm:mb-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-display">
            Welcome Back
          </h2>
          <p className="text-slate-400 font-light">
            Sign in to your sovereign workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2 sm:mb-3 text-slate-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 sm:mb-3 text-slate-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-2 sm:mb-3 text-slate-300">
              API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
              placeholder="Enter your API key"
              autoComplete="off"
            />
            <p className="text-xs text-slate-500 mt-2">
              Contact TekPet Digital for your API key
            </p>
          </div>

          {error && (
            <div className="p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 sm:py-4 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-base sm:text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40"
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

        <div className="mt-6 sm:mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-sm text-slate-500 flex items-center justify-center gap-2 font-light">
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
