import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Space_Mono } from 'next/font/google'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets:  ['latin'],
  weight:   ['400', '500', '700'],
  variable: '--font-display',
  display:  'swap',
})

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['300', '400', '500'],
  variable: '--font-body',
  display:  'swap',
})

const spaceMono = Space_Mono({
  subsets:  ['latin'],
  weight:   ['400', '700'],
  variable: '--font-mono',
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'AI Cinema — Vídeos generados con IA',
  description: 'Portfolio de producciones audiovisuales generadas con inteligencia artificial. Higgsfield, Runway, Kling, Pika.',
  keywords:    ['AI cinema', 'vídeos IA', 'Higgsfield', 'Runway', 'inteligencia artificial'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body style={{ fontFamily: 'var(--font-body, Inter, sans-serif)' }}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
