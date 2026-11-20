'use client'
import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { dict, type Lang } from '@/lib/i18n'

// El email se define en .env.local → NEXT_PUBLIC_CONTACT_EMAIL=...
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''

type Errors = Partial<Record<'nombre' | 'email' | 'idea' | 'form', string>>

export default function Contact({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const c = t.contact
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const nombre = String(d.get('nombre') ?? '').trim()
    const email = String(d.get('email') ?? '').trim()
    const idea = String(d.get('idea') ?? '').trim()
    const err: Errors = {}
    if (!nombre) err.nombre = c.errName
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = c.errEmail
    if (idea.length < 10) err.idea = c.errIdea
    if (!EMAIL) err.form = c.errForm
    setErrors(err)
    if (Object.keys(err).length) return
    const body = `${idea}\n\n${nombre}\n${email}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${c.subject} · ${nombre}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field =
    'mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors duration-500 ease-fluid focus:border-white aria-[invalid=true]:border-red-400'

  return (
    <section id={t.ids.contact} className="px-4 py-24 md:px-8">
      <div className="reveal mx-auto grid max-w-6xl gap-12 rounded-3xl bg-ink p-8 text-paper md:p-16 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {c.h2[0]}
            <br />
            {c.h2[1]}
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/60">
            {c.p}
          </p>
          {EMAIL && (
            <a href={`mailto:${EMAIL}`} className="mt-8 inline-block text-lg font-medium text-white underline underline-offset-4">
              {EMAIL}
            </a>
          )}
        </div>

        <form onSubmit={submit} noValidate className="grid gap-6">
          <label className="block">
            <span className="text-sm font-medium text-white/80">{c.name}</span>
            <input name="nombre" autoComplete="name" aria-invalid={!!errors.nombre} className={field} />
            {errors.nombre && <span className="mt-2 block text-sm text-red-300">{errors.nombre}</span>}
          </label>
          <label className="block">
            <span className="text-sm font-medium text-white/80">{c.email}</span>
            <input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={field} />
            {errors.email && <span className="mt-2 block text-sm text-red-300">{errors.email}</span>}
          </label>
          <label className="block">
            <span className="text-sm font-medium text-white/80">{c.idea}</span>
            <textarea name="idea" rows={4} aria-invalid={!!errors.idea} className={`${field} resize-none`} />
            {errors.idea && <span className="mt-2 block text-sm text-red-300">{errors.idea}</span>}
          </label>
          {errors.form && <p className="text-sm text-red-300">{errors.form}</p>}
          {sent && <p className="text-sm text-white/70">{c.sent}</p>}
          <button
            type="submit"
            className="group inline-flex w-max items-center gap-3 rounded-full bg-paper py-2 pl-6 pr-2 text-base font-semibold text-ink transition-transform duration-500 ease-fluid hover:-translate-y-0.5 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t.nav.cta}
            <span className="grid size-8 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-fluid group-hover:translate-x-1">
              <ArrowRight size={16} weight="bold" />
            </span>
          </button>
        </form>
      </div>
    </section>
  )
}
