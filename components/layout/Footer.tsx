export default function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-8 gap-4"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
        AI<span style={{ color: 'var(--accent)', margin: '0 2px' }}>·</span>CINEMA — 2026
      </span>
      <span className="text-[11px] font-mono" style={{ color: 'var(--muted)' }}>
        Vídeos generados con inteligencia artificial
      </span>
    </footer>
  )
}
