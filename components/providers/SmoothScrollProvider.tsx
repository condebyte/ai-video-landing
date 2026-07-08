'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing:   (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function onScrollUpdate() {
      ScrollTrigger.update()
    }

    function rafUpdate(time: number) {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', onScrollUpdate)
    gsap.ticker.add(rafUpdate)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onScrollUpdate)
      gsap.ticker.remove(rafUpdate)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
