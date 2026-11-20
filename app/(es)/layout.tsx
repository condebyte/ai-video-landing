import type { Viewport } from 'next'
import { RootShell, homeMetadata } from '@/components/pages'

export const metadata = homeMetadata('es')
export const viewport: Viewport = { themeColor: '#FAFAF9' }

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>
}
