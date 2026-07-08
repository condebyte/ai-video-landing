'use client'
import { useEffect, useRef, useState } from 'react'

export function useVideoObserver() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  // Fase 1 — observa el elemento placeholder (sr-only) hasta que entre en viewport.
  // Una vez que `ready` pasa a true, este observer se desconecta.
  useEffect(() => {
    if (ready) return
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setReady(true) },
      { threshold: 0.1 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [ready])

  // Fase 2 — observa el elemento real (con src) para pausarlo cuando salga del viewport.
  // Solo activo cuando ready=true y el videoRef apunta al elemento real.
  useEffect(() => {
    if (!ready) return
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) video.pause() },
      { threshold: 0.1 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [ready])

  return { videoRef, ready }
}
