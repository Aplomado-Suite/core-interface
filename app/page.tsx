'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import AuthModal from '@/components/AuthModal'

const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#030308]" />,
})

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#030308] text-white overflow-x-hidden">
      <Scene3D />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-[#030308]/80 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-5 sm:py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)]">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight block font-display">
                Aplomado
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 tracking-[0.3em] uppercase font-mono">
                Sovereign Workspace
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 sm:gap-8"
          >
            <a href="#features" className="hidden lg:block text-sm text-slate-400 hover:text-white transition-colors duration-300">Features</a>
            <a href="#about" className="hidden lg:block text-sm text-slate-400 hover:text-white transition-colors duration-300">About</a>
            <a href="https://github.com/aplomado-suite" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Enter Suite
            </button>
          </motion.div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-20">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-sky-500/30 bg-sky-500/5 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-xs font-medium text-sky-300 tracking-wider uppercase">
                  Zero Telemetry • Local-First • Open Source
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,12vw,9rem)] font-bold tracking-[-0.04em] leading-[0.85] mb-8 font-display"
            >
              <span className="block">Work Without</span>
              <span className="block bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                Surveillance
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              The Aplomado Suite gives you absolute sovereignty over your digital workspace.
              Your data stays on your machine. No cloud. No tracking. No compromise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => setShowAuthModal(true)}
                className="group relative px-8 sm:px-10 py-4 rounded-full bg-white text-black font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <a
                href="https://github.com/aplomado-suite"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 sm:px-10 py-4 rounded-full border border-white/10 text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:scale-105 flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="relative py-32 sm:py-40 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 sm:mb-28"
          >
            <span className="text-sm font-mono text-sky-400 tracking-[0.2em] uppercase mb-4 block">01 — Core Principles</span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.03em] leading-[0.9] font-display">
              Built for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Sovereignty</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { num: '01', title: 'Local-First', desc: 'Every byte of your data lives on your machine. No cloud servers. No third-party access. Complete privacy by design.', accent: 'sky' },
              { num: '02', title: 'Zero-Telemetry', desc: 'No analytics. No tracking. No data collection. We built this so we never know how you use it.', accent: 'blue' },
              { num: '03', title: 'Micro-Frontend', desc: 'Modular architecture where each app runs independently. Lightweight, fast, infinitely extensible.', accent: 'indigo' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 sm:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl hover:border-white/10 transition-all duration-500"
              >
                <div className="absolute top-6 right-8 text-[8rem] font-bold text-white/[0.03] font-display leading-none select-none">
                  {feature.num}
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/20 flex items-center justify-center mb-8">
                    <span className="text-sky-400 font-mono text-sm font-bold">{feature.num}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-display">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative py-32 sm:py-40 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-sm font-mono text-sky-400 tracking-[0.2em] uppercase mb-4 block">02 — Philosophy</span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.03em] leading-[0.9] mb-8 font-display">
                The Falcon<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Standard</span>
              </h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed font-light">
                Named after the Aplomado Falcon — a bird of prey known for surgical precision and aerodynamic efficiency.
                We built this suite to cut through the bloat of modern workspace tools.
              </p>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed font-light">
                Mainstream tools like Google Drive and Microsoft 365 are heavy, bloated, and constantly tracking your data.
                Aplomado cuts through that with zero telemetry and feather-light layouts.
              </p>

              <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                {[
                  { value: '0ms', label: 'Cloud Latency' },
                  { value: '100%', label: 'Data Ownership' },
                  { value: '∞', label: 'Privacy' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-sky-400 mb-1 font-display">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-[0.15em]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/20 to-indigo-500/20 blur-3xl" />
                <div className="relative flex items-center justify-center h-full">
                  <span className="text-[12rem] sm:text-[16rem] select-none">🦅</span>
                </div>
              </div>
              <div className="text-center mt-6">
                <div className="text-2xl font-semibold text-sky-400 font-display">Aplomado Falcon</div>
                <div className="text-slate-500 font-mono text-sm">Falco femoralis</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-32 sm:py-40 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.9] mb-8 font-display"
          >
            Ready to Take<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Back Control?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light"
          >
            Join the sovereign workspace movement. Your data belongs to you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-10 py-5 rounded-full bg-white text-black font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
            >
              Enter the Suite
            </button>
            <a
              href="https://github.com/aplomado-suite"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-full border border-white/10 text-white font-semibold text-lg transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:scale-105 flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Source
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="relative py-16 sm:py-20 px-6 sm:px-8 lg:px-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm text-slate-500">© 2026 Aplomado Suite</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="https://github.com/aplomado-suite" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Open Source
              </a>
              <span className="text-slate-700">•</span>
              <a href="https://tekpet-digital.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">TekPet Digital</a>
            </div>
          </div>
        </div>
      </footer>

      {showAuthModal && (
        <AuthModal
          onLogin={() => setShowAuthModal(false)}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  )
}
