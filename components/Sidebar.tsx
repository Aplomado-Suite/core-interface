'use client'

import { useState } from 'react'

interface SidebarProps {
  onAppSelect: (appId: string) => void
  onLogout: () => void
  isAuthenticated: boolean
}

interface AppItem {
  id: string
  name: string
  icon: string
  description: string
}

const appItems: AppItem[] = [
  { id: 'docs', name: 'Documents', icon: '📄', description: 'Document editor' },
  { id: 'audio', name: 'Audio', icon: '🎵', description: 'Audio workstation' },
  { id: 'academy', name: 'Academy', icon: '🎓', description: 'Learning platform' },
  { id: 'flashcards', name: 'Flashcards', icon: '📚', description: 'Revision tool' },
  { id: 'settings', name: 'Settings', icon: '⚙️', description: 'System configuration' },
]

export default function Sidebar({ onAppSelect, onLogout, isAuthenticated }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)

  return (
    <aside
      className={`
        flex flex-col transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'}
        bg-[var(--falcon-secondary)]
        border-r border-[var(--falcon-border)]
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--falcon-border)]">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦅</span>
            <h1 className="text-xl font-bold text-[var(--falcon-accent)]">
              Aplomado
            </h1>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-[var(--falcon-border)] transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* App Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {appItems.map((app) => (
            <li key={app.id}>
              <button
                onClick={() => onAppSelect(app.id)}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg
                  transition-all duration-200
                  ${hoveredApp === app.id ? 'bg-[var(--falcon-border)] glow-subtle' : 'hover:bg-[var(--falcon-border)]'}
                `}
                title={collapsed ? `${app.name} - ${app.description}` : app.description}
              >
                <span className="text-2xl">{app.icon}</span>
                {!collapsed && (
                  <div className="text-left">
                    <div className="font-medium text-[var(--falcon-text-primary)]">
                      {app.name}
                    </div>
                    <div className="text-xs text-[var(--falcon-text-secondary)]">
                      {app.description}
                    </div>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {isAuthenticated && (
        <div className="p-4 border-t border-[var(--falcon-border)]">
          {!collapsed && (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 p-2 rounded-lg
                bg-[var(--falcon-border)] hover:bg-[var(--falcon-error)]
                transition-colors text-sm"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          )}
          {collapsed && (
            <button
              onClick={onLogout}
              className="w-full p-2 rounded-lg hover:bg-[var(--falcon-error)] transition-colors"
              title="Logout"
            >
              🚪
            </button>
          )}
        </div>
      )}
    </aside>
  )
}
