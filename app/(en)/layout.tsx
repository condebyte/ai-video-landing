import type { Viewport } from 'next'
import { RootShell, homeMetadata } from '@/components/pages'
import '../globals.css'

export const metadata = homeMetadata('en')
export const viewport: Viewport = { themeColor: '#FAFAF9' }

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>
}
