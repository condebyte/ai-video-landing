import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { videos, videoSrc, thumbSrc } from '@/data/videos'
import { base, dict, vt, type Lang } from '@/lib/i18n'
import Nav from './Nav'
import Hero from './Hero'
import Work from './Work'
import Tagline from './Tagline'
import About from './About'
import Faq from './Faq'
import Contact from './Contact'
import Footer from './Footer'
import Reveal from './Reveal'

const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-geist', display: 'swap' })

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

const RESTORE = `try{var s=sessionStorage.getItem('lang-scroll');if(s){sessionStorage.removeItem('lang-scroll');history.scrollRestoration='manual';var d=JSON.parse(s),h=document.documentElement;h.style.scrollBehavior='auto';var go=function(){var secs=document.querySelectorAll('main > section, main > div'),e=secs[d.i];window.scrollTo(0,e?e.offsetTop+d.off*e.offsetHeight:(d.y||0));};go();requestAnimationFrame(go);addEventListener('load',function(){go();h.style.scrollBehavior='';});}}catch(e){}`

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={geist.variable}>
      <body>
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
        <Tagline lang={lang} />
        <About lang={lang} />
        <Faq lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <Reveal />
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
      <main id="contenido" className="px-4 pb-24 pt-24 md:px-8">
        <div className="mx-auto max-w-6xl pt-16">
          <a href={`${b}/#${t.ids.work}`} className="inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-ink">
            <ArrowLeft size={14} weight="bold" /> {t.video.back}
          </a>
          <div className={`mt-8 grid gap-12 ${vertical ? 'lg:grid-cols-[2fr_3fr] lg:items-end' : ''}`}>
            <video
              src={videoSrc(v)}
              poster={thumbSrc(v)}
              controls
              playsInline
              preload="metadata"
              className={`w-full rounded-2xl bg-black ${vertical ? 'mx-auto max-h-[80vh] max-w-md' : ''}`}
              style={{ aspectRatio: `${v.w} / ${v.h}` }}
            />
            <div>
              <p className="text-sm text-mute">
                {t.cat[v.category]} · {v.duration}
              </p>
              <h1 className="ink-grad mt-2 max-w-[680px] pb-1 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
              <p className="mt-4 max-w-xl text-lg text-mute">{description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href={`${b}/#${t.ids.contact}`}
                  className="inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-base font-semibold text-paper transition-transform duration-500 ease-fluid hover:-translate-y-0.5"
                >
                  {t.nav.cta}
                  <span className="grid size-8 place-items-center rounded-full bg-paper text-ink">
                    <ArrowRight size={16} weight="bold" />
                  </span>
                </a>
                <a href={`${b}/video/${next.slug}`} className="inline-flex items-center gap-2 text-base font-semibold hover:underline">
                  {t.video.next}: {vt(next, lang).title} <ArrowRight size={16} weight="bold" />
                </a>
              </div>
            </div>
          </div>
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
    <main id="contenido" className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="text-sm font-semibold text-mute">{t.code}</p>
        <h1 className="ink-grad mt-2 pb-1 text-5xl font-semibold tracking-tight">{t.h}</h1>
        <p className="mt-4 text-lg text-mute">{t.p}</p>
        <a href={base(lang) || '/'} className="mt-8 inline-flex rounded-full bg-ink px-6 py-2 text-base font-semibold text-paper">
          {t.back}
        </a>
      </div>
    </main>
  )
}
