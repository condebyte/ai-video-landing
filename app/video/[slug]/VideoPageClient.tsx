'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Pause, ArrowLeft, Maximize2, Volume2, VolumeX } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations'
import VideoCard from '@/components/ui/VideoCard'
import type { Video } from '@/data/videos'
import VideoModal from '@/components/ui/VideoModal'

interface Props {
  video:     Video
  allVideos: Video[]
}

function formatTime(s: number) {
  if (!isFinite(s)) return '0:00'
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
}

export default function VideoPageClient({ video, allVideos }: Props) {
  const videoRef        = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying]     = useState(false)
  const [muted, setMuted]         = useState(false)
  const [currentTime, setCurrent] = useState(0)
  const [duration, setDuration]   = useState(0)
  const [modal, setModal]         = useState<Video | null>(null)

  const related = allVideos.filter(v => v.slug !== video.slug).slice(0, 3)
  const progress = duration ? (currentTime / duration) * 100 : 0

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play().catch(() => null); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }

  return (
    <div style={{ minHeight: '100svh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Back */}
      <div className="px-6 md:px-10 pt-8 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest transition-colors duration-200"
          style={{ color: 'var(--muted)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
        >
          <ArrowLeft size={13} /> Colección
        </Link>
      </div>

      {/* Player */}
      <motion.div
        className="px-6 md:px-10 mb-10"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <div
          className="relative aspect-video overflow-hidden rounded-lg"
          style={{ background: video.placeholder, border: '1px solid var(--border)' }}
        >
          {video.src ? (
            <video
              ref={videoRef}
              src={video.src}
              className="absolute inset-0 w-full h-full object-contain"
              playsInline
              onTimeUpdate={() => videoRef.current && setCurrent(videoRef.current.currentTime)}
              onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
              onEnded={() => setPlaying(false)}
              onClick={togglePlay}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                Vídeo no disponible
              </p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                Añade el archivo en /public/videos/{video.slug}.mp4
              </p>
            </div>
          )}

          {/* Play overlay */}
          {video.src && !playing && (
            <button
              className="absolute inset-0 flex items-center justify-center"
              onClick={togglePlay}
              aria-label="Reproducir"
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 72, height: 72,
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <Play size={26} fill="white" color="white" />
              </div>
            </button>
          )}

          {/* Controls */}
          {video.src && (
            <div
              className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-12"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
            >
              <input
                type="range" min={0} max={duration || 100} step={0.1} value={currentTime}
                onChange={(e) => { if (videoRef.current) { videoRef.current.currentTime = Number(e.target.value); setCurrent(Number(e.target.value)) } }}
                className="w-full h-0.5 appearance-none rounded cursor-pointer mb-3"
                style={{ background: `linear-gradient(to right, var(--accent) ${progress}%, rgba(255,255,255,0.2) ${progress}%)`, accentColor: 'var(--accent)' }}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} style={{ color: 'var(--text)' }}>
                    {playing ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button onClick={() => { if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted) } }} style={{ color: 'var(--text)' }}>
                    {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <button onClick={() => videoRef.current?.requestFullscreen?.()} style={{ color: 'var(--text)' }}>
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Info */}
      <motion.div
        className="px-6 md:px-10 mb-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
          {video.year} · {video.tool} · {video.duration}
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-display font-bold uppercase mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.01em' }}>
          {video.title}
        </motion.h1>
        <motion.p variants={fadeUp} className="max-w-xl text-sm font-light leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          {video.description}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm" style={{ background: 'var(--card)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Related */}
      {related.length > 0 && (
        <div className="px-6 md:px-10 pb-24" style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem' }}>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] mb-10" style={{ color: 'var(--muted)' }}>
            Más trabajos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((v) => (
              <VideoCard key={v.slug} video={v} onOpenModal={setModal} />
            ))}
          </div>
        </div>
      )}

      {modal && <VideoModal video={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
