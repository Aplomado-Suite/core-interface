'use client'

import { useState, useEffect } from 'react'
import { router } from '@/lib/router'

interface Window {
  id: string
  appId: string
  title: string
  isMinimised: boolean
  isMaximised: boolean
}

interface MainViewportProps {
  windows: Window[]
  activeWindow: string | null
  onCloseWindow: (windowId: string) => void
  onSetActiveWindow: (windowId: string | null) => void
}

export default function MainViewport({
  windows,
  activeWindow,
  onCloseWindow,
  onSetActiveWindow,
}: MainViewportProps) {
  const [showWelcome, setShowWelcome] = useState(windows.length === 0)
  const [appComponents, setAppComponents] = useState<Map<string, React.ComponentType<any>>>(new Map())

  // Load app component when window becomes active
  useEffect(() => {
    if (activeWindow) {
      const windowData = windows.find((w) => w.id === activeWindow)
      if (windowData && !appComponents.has(windowData.appId)) {
        router.loadApp(windowData.appId).then((component) => {
          setAppComponents((prev) => new Map(prev).set(windowData.appId, component))
        })
      }
    }
  }, [activeWindow, windows, appComponents])

  // Effect to show welcome screen when no windows are open
  if (windows.length === 0 && !showWelcome) {
    setShowWelcome(true)
  } else if (windows.length > 0 && showWelcome) {
    setShowWelcome(false)
  }

  const activeWindowData = windows.find((w) => w.id === activeWindow)

  return (
    <main className="flex-1 flex flex-col bg-[var(--falcon-primary)] overflow-hidden">
      {/* Window Tabs Bar */}
      {windows.length > 0 && (
        <div className="flex items-center gap-1 p-2 bg-[var(--falcon-secondary)] border-b border-[var(--falcon-border)]">
          {windows.map((window) => (
            <button
              key={window.id}
              onClick={() => onSetActiveWindow(window.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-t-lg
                transition-all duration-200
                ${activeWindow === window.id
                  ? 'bg-[var(--falcon-primary)] text-[var(--falcon-accent)] border-t-2 border-[var(--falcon-accent)]'
                  : 'bg-[var(--falcon-secondary)] text-[var(--falcon-text-secondary)] hover:bg-[var(--falcon-border)]'
                }
              `}
            >
              <span>{window.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onCloseWindow(window.id)
                }}
                className="ml-2 hover:text-[var(--falcon-error)] transition-colors"
                aria-label={`Close ${window.title}`}
              >
                ×
              </button>
            </button>
          ))}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {showWelcome ? (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="text-8xl mb-6">🦅</div>
            <h2 className="text-4xl font-bold text-[var(--falcon-accent)] mb-4">
              Welcome to Aplomado Suite
            </h2>
            <p className="text-xl text-[var(--falcon-text-secondary)] mb-8 text-center max-w-2xl">
              Zero-drag, sovereignty-first workspace. Your data stays on your machine.
              Select an application from the sidebar to get started.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              <div className="p-6 bg-[var(--falcon-secondary)] rounded-lg border border-[var(--falcon-border)] glow-subtle">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="text-lg font-semibold mb-2">Local-First</h3>
                <p className="text-sm text-[var(--falcon-text-secondary)]">
                  All data stored locally on your machine. No cloud telemetry.
                </p>
              </div>
              <div className="p-6 bg-[var(--falcon-secondary)] rounded-lg border border-[var(--falcon-border)] glow-subtle">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Lightweight</h3>
                <p className="text-sm text-[var(--falcon-text-secondary)]">
                  Minimal dependencies, maximum performance. Zero drag.
                </p>
              </div>
              <div className="p-6 bg-[var(--falcon-secondary)] rounded-lg border border-[var(--falcon-border)] glow-subtle">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold mb-2">Sovereign</h3>
                <p className="text-sm text-[var(--falcon-text-secondary)]">
                  Complete control over your workspace and data.
                </p>
              </div>
            </div>
          </div>
        ) : activeWindowData ? (
          <div className="h-full w-full p-4">
            {(() => {
              const AppComponent = appComponents.get(activeWindowData.appId)
              if (AppComponent) {
                return <AppComponent />
              }
              return (
                <div className="h-full w-full bg-[var(--falcon-secondary)] rounded-lg border border-[var(--falcon-border)] p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4 animate-spin">⏳</div>
                    <p className="text-[var(--falcon-text-secondary)]">
                      Loading {activeWindowData.title}...
                    </p>
                  </div>
                </div>
              )
            })()}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-[var(--falcon-text-secondary)]">No active window</p>
          </div>
        )}
      </div>
    </main>
  )
}
