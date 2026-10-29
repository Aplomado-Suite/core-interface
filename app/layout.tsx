import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Aplomado Suite | Sovereign Workspace — Zero Telemetry, Local-First',
  description: 'The Aplomado Suite gives you absolute sovereignty over your digital workspace. Zero telemetry, local-first storage, open source. Work without surveillance.',
  keywords: ['privacy', 'workspace', 'local-first', 'sovereign', 'zero-telemetry', 'open-source', 'aplomado', 'falcon', 'webgl', 'micro-frontend'],
  authors: [{ name: 'Aplomado Suite' }],
  openGraph: {
    title: 'Aplomado Suite | Sovereign Workspace',
    description: 'Work without surveillance. Zero telemetry. Local-first. Open source.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Aplomado Suite',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aplomado Suite | Sovereign Workspace',
    description: 'Work without surveillance. Zero telemetry. Local-first. Open source.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
