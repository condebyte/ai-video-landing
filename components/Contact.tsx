'use client'
import { useState } from 'react'
import { dict, type Lang } from '@/lib/i18n'

// El email se define en .env.local: NEXT_PUBLIC_CONTACT_EMAIL=...
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''

type Errors = Partial<Record<'nombre' | 'email' | 'idea' | 'form', string>>

export default function Contact({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const c = t.contact
  const [errors, setErrors] = useState<Errors>({})

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
    if (!EMAIL && !Object.keys(err).length) err.form = c.errForm
    setErrors(err)
    if (Object.keys(err).length) return
    const body = `${idea}\n\n${nombre}\n${email}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${c.subject}, ${nombre}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id={t.ids.contact} className="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__text">
          <h2 id="contact-title">{c.title}</h2>
          <p className="lead">{c.p}</p>
          {EMAIL && (
            <a href={`mailto:${EMAIL}`} className="link contact__mail">
              {EMAIL}
            </a>
          )}
        </div>

        <form onSubmit={submit} noValidate className="form" data-endpoint="">
          <div className="field">
            <label htmlFor="f-nombre">{c.name}</label>
            <input id="f-nombre" name="nombre" autoComplete="name" aria-invalid={!!errors.nombre} aria-describedby="e-nombre" />
            <p id="e-nombre" className="field__err" aria-live="polite">{errors.nombre}</p>
          </div>
          <div className="field">
            <label htmlFor="f-email">{c.email}</label>
            <input id="f-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="e-email" />
            <p id="e-email" className="field__err" aria-live="polite">{errors.email}</p>
          </div>
          <div className="field">
            <label htmlFor="f-idea">{c.idea}</label>
            <textarea id="f-idea" name="idea" rows={4} aria-invalid={!!errors.idea} aria-describedby="e-idea" />
            <p id="e-idea" className="field__err" aria-live="polite">{errors.idea}</p>
          </div>
          <div className="form__end">
            <button type="submit" className="btn">
              {c.submit}
            </button>
            <p className="field__err" aria-live="polite">{errors.form}</p>
          </div>
        </form>
      </div>
    </section>
  )
}
