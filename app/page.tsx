'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import AuthModal from '@/components/AuthModal'

// Dynamically import 3D components to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-oatmeal-100" />,
})

const AboutOrb = dynamic(() => import('@/components/AboutOrb'), {
  ssr: false,
  loading: () => <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 animate-pulse" />,
})

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-oatmeal-50 overflow-hidden">
      {/* 3D Background */}
      <Scene3D />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-oatmeal-50/80 backdrop-blur-xl border-b border-oatmeal-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent-600 to-accent-400 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-oatmeal-900 tracking-tight block font-display">
                Aplomado
              </span>
              <span className="text-[10px] sm:text-xs text-oatmeal-400 tracking-[0.2em] uppercase font-mono">
                Suite
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 sm:gap-6"
          >
            <a href="#features" className="hidden sm:block text-sm font-medium text-oatmeal-500 hover:text-oatmeal-900 transition-colors duration-300">
              Features
            </a>
            <a href="#about" className="hidden sm:block text-sm font-medium text-oatmeal-500 hover:text-oatmeal-900 transition-colors duration-300">
              About
            </a>
            <a 
              href="https://github.com/aplomado-suite" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-oatmeal-500 hover:text-oatmeal-900 transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <div className="hidden sm:block w-px h-6 bg-oatmeal-200" />
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-5 sm:px-6 py-2.5 rounded-lg bg-oatmeal-900 hover:bg-oatmeal-700
                text-oatmeal-50 font-semibold text-sm transition-all duration-300
                shadow-lg hover:shadow-xl hover:shadow-oatmeal-900/20
                hover:-translate-y-0.5 hover:scale-105"
            >
              Sign In
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-6 sm:px-8 lg:px-12 relative">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16 sm:mb-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8 px-4 sm:px-5 py-2.5 rounded-full
                bg-white border border-oatmeal-200 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-oatmeal-600">
                Open Source - Privacy-First - Sovereign
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight text-oatmeal-900 font-display"
            >
              Work Without
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400 animate-gradient-x">
                Surveillance
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-oatmeal-500 max-w-4xl mx-auto mb-10 sm:mb-12 leading-relaxed font-light"
            >
              The Aplomado Suite gives you complete sovereignty over your digital workspace.
              Your data stays on your machine. No cloud storage. No tracking. No compromise.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            >
              <button
                onClick={() => setShowAuthModal(true)}
                className="group w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400
                  text-white font-semibold text-lg transition-all duration-300
                  shadow-lg hover:shadow-xl hover:shadow-accent-500/30
                  hover:-translate-y-1 hover:scale-105
                  flex items-center justify-center gap-3"
              >
                Get Started Free
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            <motion.a
              href="https://github.com/aplomado-suite"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="group w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl border-2 border-oatmeal-200 hover:border-oatmeal-900
                text-oatmeal-900 font-semibold text-lg transition-all duration-300
                hover:bg-white hover:shadow-lg hover:-translate-y-1
                flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </motion.a>
            </motion.div>
          </div>

          {/* Visual Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-oatmeal-50 via-transparent to-transparent z-10" />
            <div className="rounded-2xl sm:rounded-3xl border border-oatmeal-200 bg-white overflow-hidden
              shadow-2xl shadow-oatmeal-900/10 hover:shadow-3xl hover:shadow-oatmeal-900/15 transition-all duration-500">
              {/* Window header */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-oatmeal-100 bg-oatmeal-50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80 hover:bg-green-500 transition-colors cursor-pointer" />
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xs text-oatmeal-400 font-mono">aplomado-suite.app</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 sm:p-10 bg-gradient-to-br from-white via-oatmeal-50 to-oatmeal-100">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    { name: 'Documents', desc: 'Rich text editor', icon: 'document' },
                    { name: 'Audio', desc: 'Professional DAW', icon: 'audio' },
                    { name: 'Academy', desc: 'Learning platform', icon: 'academy' },
                    { name: 'Flashcards', desc: 'Revision tool', icon: 'flashcards' },
                  ].map((app, index) => (
                    <motion.div
                      key={app.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="group p-5 sm:p-6 rounded-xl bg-white border border-oatmeal-200
                        hover:border-accent-400 hover:shadow-lg hover:shadow-accent-500/10
                        transition-all duration-300 cursor-pointer
                        hover:-translate-y-1 hover:scale-105"
                    >
                      <div className="w-10 h-10 mb-3 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="font-semibold text-oatmeal-900 mb-1 font-display">{app.name}</div>
                      <div className="text-xs text-oatmeal-400">{app.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-white border-y border-oatmeal-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {[
              { value: '0', label: 'Cloud Dependencies' },
              { value: '100%', label: 'Local Storage' },
              { value: 'Infinity', label: 'Data Sovereignty' },
              { value: 'Open', label: 'Source Code' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group cursor-default"
              >
                <div className="text-4xl sm:text-5xl font-bold text-accent-600 mb-3 group-hover:scale-110 transition-transform duration-300 font-display">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-oatmeal-400 uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 sm:mb-20"
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-lg bg-accent-50 border border-accent-200">
              <span className="text-xs sm:text-sm font-semibold text-accent-600 tracking-[0.2em] uppercase">
                Core Principles
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-oatmeal-900 font-display">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400">Sovereignty</span>
            </h2>
            <p className="text-lg sm:text-xl text-oatmeal-500 max-w-3xl mx-auto font-light">
              Every feature designed to keep you in complete control of your data
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Local-First Architecture',
                description: 'All your data is stored directly on your machine. No cloud servers. No third-party access. Complete privacy by design.',
                icon: 'lock',
              },
              {
                title: 'Zero-Telemetry',
                description: 'No analytics. No tracking. No data collection. We do not know how you use our software, and that is exactly how it should be.',
                icon: 'zap',
              },
              {
                title: 'Micro-Frontend Matrix',
                description: 'Modular architecture where each app runs independently. Lightweight, fast, and infinitely extensible without bloat.',
                icon: 'target',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group p-8 sm:p-10 rounded-2xl bg-white border border-oatmeal-200
                  hover:border-accent-400 hover:shadow-xl hover:shadow-accent-500/10
                  transition-all duration-500
                  hover:-translate-y-2 hover:scale-[1.02]"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-oatmeal-100 to-oatmeal-200
                  flex items-center justify-center mb-6 sm:mb-8
                  group-hover:from-accent-50 group-hover:to-accent-100
                  group-hover:scale-110 group-hover:rotate-3
                  transition-all duration-300">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon === 'lock' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    )}
                    {feature.icon === 'zap' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    )}
                    {feature.icon === 'target' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-oatmeal-900 font-display">{feature.title}</h3>
                <p className="text-oatmeal-500 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block mb-6 px-4 py-2 rounded-lg bg-accent-50 border border-accent-200">
                <span className="text-xs sm:text-sm font-semibold text-accent-600 tracking-[0.2em] uppercase">
                  Our Philosophy
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-oatmeal-900 font-display">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400">Falcon</span> Standard
              </h2>
              <p className="text-base sm:text-lg text-oatmeal-500 mb-6 sm:mb-8 leading-relaxed font-light">
                Named after the Aplomado Falcon - a bird of prey known for surgical precision and
                aerodynamic efficiency. We built this suite to cut through the bloat of modern
                workspace tools.
              </p>
              <p className="text-base sm:text-lg text-oatmeal-500 mb-8 sm:mb-10 leading-relaxed font-light">
                Mainstream tools like Google Drive and Microsoft 365 are heavy, bloated, and constantly
                tracking your data. Aplomado Suite cuts through that rubbish with zero telemetry and
                lightweight layouts.
              </p>

              {/* Stats Panel */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-oatmeal-50 border border-oatmeal-200">
                {[
                  { value: '0ms', label: 'Cloud Latency' },
                  { value: '100%', label: 'Data Ownership' },
                  { value: 'Infinity', label: 'Privacy' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-accent-600 mb-2 font-display">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-oatmeal-400 uppercase tracking-[0.15em]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative text-center p-8 sm:p-12">
                <AboutOrb />
                <div className="text-2xl sm:text-3xl font-semibold text-accent-600 mb-2 font-display">
                  Aplomado Falcon
                </div>
                <div className="text-oatmeal-400 font-mono text-sm">
                  Falco femoralis
                </div>
                <div className="mt-6 text-sm text-oatmeal-500 max-w-xs mx-auto font-light">
                  A bird of prey known for surgical precision and aerodynamic efficiency
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-50 via-white to-oatmeal-50" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-oatmeal-900 font-display"
          >
            Ready to Take Back Control?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-oatmeal-500 mb-10 sm:mb-12 font-light max-w-2xl mx-auto"
          >
            Join thousands who have switched to a sovereign workspace. Your data belongs to you.
          </motion.p>
          <motion.a
            href="https://github.com/aplomado-suite"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="group px-10 sm:px-12 py-5 rounded-xl border-2 border-oatmeal-300 hover:border-oatmeal-900
              text-oatmeal-900 font-semibold text-lg sm:text-xl transition-all duration-300
              hover:bg-white hover:shadow-lg hover:-translate-y-1 hover:scale-105
              flex items-center gap-3 mx-auto"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Star on GitHub
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 px-6 sm:px-8 lg:px-12 border-t border-oatmeal-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 sm:gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-600 to-accent-400 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-oatmeal-900 block font-display">Aplomado Suite</span>
                <span className="text-[10px] sm:text-xs text-oatmeal-400 uppercase tracking-[0.2em] font-mono">
                  Sovereign Workspace
                </span>
              </div>
            </motion.div>

              <motion.a
                href="https://github.com/aplomado-suite"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-oatmeal-500 hover:text-oatmeal-900 hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm">Open Source</span>
              </motion.a>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-oatmeal-400 text-xs sm:text-sm"
            >
              <div className="mb-2">
                &copy; 2026 Aplomado Suite. All rights reserved.
              </div>
              <a
                href="https://tekpet-digital.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-600 transition-colors duration-300 font-medium"
              >
                Designed by TekPet Digital
              </a>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onLogin={(credentials) => {
            console.log('Login:', credentials)
            setShowAuthModal(false)
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  )
}
