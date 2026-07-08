'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react'
import type { Video } from '@/data/videos'

interface Props {
  video:    Video
  onClose:  () => void
}

function formatTime(s: number) {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function VideoModal({ video, onClose }: Props) {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying]       = useState(false)
  // Empieza muted para evitar bloqueos de autoplay del navegador;
  // el usuario activa el sonido explícitamente con el botón.
  const [muted, setMuted]           = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration]     = useState(0)
  const [showControls, setShowControls] = useState(true)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play().catch(() => null); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === ' ') { e.preventDefault(); togglePlay() }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, togglePlay])

  const resetHideTimer = useCallback(() => {
    setShowControls(true)
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setShowControls(false), 2500)
  }, [])

  useEffect(() => {
    resetHideTimer()
    return () => clearTimeout(hideTimer.current)
  }, [resetHideTimer])

  const onTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime)
  }
  const onLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration)
  }
  const onEnded = () => setPlaying(false)

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    const next = !muted
    v.muted = next
    if (!next) v.volume = 1
    setMuted(next)
  }

  const requestFS = () => {
    videoRef.current?.requestFullscreen?.()
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{ background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(12px)' }}
      >
        {/* Modal container */}
        <motion.div
          className="relative w-full max-w-5xl mx-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1,    opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          onMouseMove={resetHideTimer}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors duration-200"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            aria-label="Cerrar"
          >
            <X size={14} /> cerrar
          </button>

          {/* Video */}
          <div
            className="relative aspect-video overflow-hidden rounded-lg"
            style={{ background: video.placeholder, border: '1px solid var(--border)' }}
          >
            {video.src ? (
              <video
                ref={videoRef}
                src={video.src}
                poster={video.thumbnail || undefined}
                preload="metadata"
                className="absolute inset-0 w-full h-full object-contain"
                playsInline
                muted={muted}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={onEnded}
                onClick={togglePlay}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                  Vídeo no disponible
                </p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  Coloca el archivo en /public/videos/{video.slug}.mp4
                </p>
              </div>
            )}

            {/* Play/Pause central */}
            {video.src && (
              <motion.button
                className="absolute inset-0 flex items-center justify-center"
                onClick={togglePlay}
                aria-label={playing ? 'Pausar' : 'Reproducir'}
                animate={{ opacity: showControls ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 64, height: 64,
                    background: 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  {playing
                    ? <Pause size={22} fill="white" color="white" />
                    : <Play  size={22} fill="white" color="white" />
                  }
                </div>
              </motion.button>
            )}

            {/* Controls bar */}
            {video.src && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10"
                animate={{ opacity: showControls ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                }}
              >
                {/* Progress */}
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={seek}
                  className="w-full h-0.5 appearance-none rounded cursor-pointer mb-3"
                  style={{
                    background: `linear-gradient(to right, var(--accent) ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
                    accentColor: 'var(--accent)',
                  }}
                  aria-label="Progreso"
                />

                {/* Bottom row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} aria-label={playing ? 'Pausar' : 'Reproducir'}
                      style={{ color: 'var(--text)' }}>
                      {playing ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button
                      onClick={toggleMute}
                      aria-label={muted ? 'Activar sonido' : 'Silenciar'}
                      className="flex items-center gap-1.5"
                      style={{ color: 'var(--text)' }}
                    >
                      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest">
                        {muted ? 'Activar sonido' : 'Silenciar'}
                      </span>
                    </button>
                    <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <button onClick={requestFS} aria-label="Pantalla completa"
                    style={{ color: 'var(--text)' }}>
                    <Maximize2 size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Info */}
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                {video.year} · {video.tool}
              </p>
              <h2 className="mt-1 text-lg font-medium tracking-wide" style={{ color: 'var(--text)' }}>
                {video.title}
              </h2>
              <p className="mt-1 text-sm font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
                {video.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm"
                  style={{ background: 'var(--card)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
