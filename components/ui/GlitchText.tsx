interface Props {
  children:   string
  className?: string
}

export default function GlitchText({ children, className = '' }: Props) {
  return (
    <span
      className={`glitch ${className}`}
      data-text={children}
      aria-label={children}
    >
      {children}
    </span>
  )
}
