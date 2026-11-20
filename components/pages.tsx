import type { Metadata } from 'next'
import { Barlow, Sofia_Sans_Extra_Condensed } from 'next/font/google'
import { notFound } from 'next/navigation'
import { videos, videoSrc, thumbSrc } from '@/data/videos'
import { base, dict, vt, type Lang } from '@/lib/i18n'
import Nav from './Nav'
import Hero from './Hero'
import Work from './Work'
import Case from './Case'
import Statement from './Statement'
import About from './About'
import How from './How'
import Faq from './Faq'
import Contact from './Contact'
import Footer from './Footer'
import '../app/site.css'

const display = Sofia_Sans_Extra_Condensed({ subsets: ['latin'], weight: ['200', '400'], variable: '--ff-display', display: 'swap' })
const body = Barlow({ subsets: ['latin'], weight: ['300', '400'], variable: '--ff-body', display: 'swap' })

const SITE = 'https://iacinema.es'

/** Alternativas de idioma para Google (hreflang). `path` sin prefijo de idioma. */
const alternates = (lang: Lang, path: string) => ({
  canonical: `${base(lang)}${path}` || '/',
  languages: { es: path || '/', en: `/en${path}`, 'x-default': path || '/' },
})

export function homeMetadata(lang: Lang): Metadata {
  const t = dict[lang].meta
  return {
    metadataBase: new URL(SITE),
    title: t.title,
    description: t.description,
    alternates: alternates(lang, ''),
    openGraph: {
      title: t.title,
      description: t.og,
      url: `${SITE}${base(lang)}`,
      siteName: 'iacinema.es',
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [{ url: '/thumbnails/video-casa-atico.jpg', width: 1920, height: 1072 }],
    },
    twitter: { card: 'summary_large_image' },
  }
}

/** Firma de Hallmark visible en la página: Next.js borra los comentarios del CSS al compilar. */
const STAMP = `/* Hallmark · shape: Portfolio Grid · genre: atmospheric · theme: Darkroom · job: hire · draw: 92de07
 * hero: Poster · nav: edge-aligned bar that retracts on scroll · footer: mast · imagery: the user's own videos · darkroom: amber
 * axes: dark/display-condensed/chromatic-amber · posture: restrained · contrast: pass · fold: pass · v2.0.0 */
html, body { overflow-x: clip; }`

const RESTORE = `try{var s=sessionStorage.getItem('lang-scroll');if(s){sessionStorage.removeItem('lang-scroll');history.scrollRestoration='manual';var d=JSON.parse(s),h=document.documentElement;h.style.scrollBehavior='auto';var go=function(){var secs=document.querySelectorAll('main > section, main > div'),e=secs[d.i];window.scrollTo(0,e?e.offsetTop+d.off*e.offsetHeight:(d.y||0));};go();requestAnimationFrame(go);addEventListener('load',function(){go();h.style.scrollBehavior='';});}}catch(e){}`

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${display.variable} ${body.variable} overflow-x-clip`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: STAMP }} />
      </head>
      <body className="overflow-x-clip">
        <a href="#contenido" className="skip">
          {dict[lang].skip}
        </a>
        {children}
        {/* tras cambiar de idioma, vuelve al mismo punto antes de pintar */}
        <script dangerouslySetInnerHTML={{ __html: RESTORE }} />
      </body>
    </html>
  )
}

export function HomePage({ lang }: { lang: Lang }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: dict[lang].faq.items.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
  return (
    <>
      <div id="top" />
      <Nav lang={lang} />
      <main id="contenido">
        <Hero lang={lang} />
        <Work lang={lang} />
        <Case lang={lang} />
        <Statement lang={lang} />
        <About lang={lang} />
        <How lang={lang} />
        <Faq lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

export const videoParams = () => videos.map(v => ({ slug: v.slug }))

export function videoMetadata(lang: Lang, slug: string): Metadata {
  const v = videos.find(x => x.slug === slug)
  if (!v) return {}
  const { title, description } = vt(v, lang)
  return {
    metadataBase: new URL(SITE),
    title: `${title} · Manuel Morales`,
    description,
    alternates: alternates(lang, `/video/${slug}`),
    openGraph: { title, description, images: [thumbSrc(v)], locale: lang === 'es' ? 'es_ES' : 'en_US' },
  }
}

export function VideoPage({ lang, slug }: { lang: Lang; slug: string }) {
  const i = videos.findIndex(x => x.slug === slug)
  if (i < 0) notFound()
  const t = dict[lang]
  const b = base(lang)
  const v = videos[i]
  const { title, description } = vt(v, lang)
  const next = videos[(i + 1) % videos.length]
  const vertical = v.h > v.w

  return (
    <>
      <div id="top" />
      <Nav lang={lang} />
      <main id="contenido" className="film">
        <div className={`container film__grid${vertical ? ' is-tall' : ' is-wide'}`}>
          <div className="film__text">
            <a href={`${b}/#${t.ids.work}`} className="link film__back">
              {t.video.back}
            </a>
            <h1>{title}</h1>
            <p className="lead">{description}</p>
            <dl className="sheet">
              <div className="sheet__row">
                <dt>{t.video.category}</dt>
                <dd>{t.cat[v.category]}</dd>
              </div>
              <div className="sheet__row">
                <dt>{t.video.duration}</dt>
                <dd className="num">{v.duration}</dd>
              </div>
              <div className="sheet__row">
                <dt>{t.video.format}</dt>
                <dd>{vertical ? t.video.vertical : t.video.horizontal}</dd>
              </div>
            </dl>
            <div className="film__actions">
              <a href={`${b}/#${t.ids.contact}`} className="btn btn--primary">
                {t.nav.cta}
              </a>
              <a href={`${b}/video/${next.slug}`} className="link" aria-label={`${t.video.next}: ${vt(next, lang).title}`}>
                {t.video.next}
              </a>
            </div>
          </div>
          <video
            className="film__video"
            src={videoSrc(v)}
            poster={thumbSrc(v)}
            controls
            playsInline
            preload="metadata"
            style={{ aspectRatio: `${v.w} / ${v.h}` }}
          />
        </div>
      </main>
      <Footer lang={lang} />
    </>
  )
}

const NF = {
  es: { code: 'Error 404', h: 'Esta escena no existe.', p: 'Puede que el enlace esté mal o que el vídeo ya no esté publicado.', back: 'Volver al inicio' },
  en: { code: 'Error 404', h: 'This scene does not exist.', p: 'The link may be wrong or the video is no longer published.', back: 'Back to home' },
}

export function NotFoundPage({ lang }: { lang: Lang }) {
  const t = NF[lang]
  return (
    <main id="contenido" className="nf">
      <div className="container">
        <p className="nf__code">{t.code}</p>
        <h1>{t.h}</h1>
        <p className="lead">{t.p}</p>
        <a href={base(lang) || '/'} className="btn btn--primary">
          {t.back}
        </a>
      </div>
    </main>
  )
}
