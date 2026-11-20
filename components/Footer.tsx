import { base, dict, type Lang } from '@/lib/i18n'

export default function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const b = base(lang)
  return (
    <footer className="px-4 pb-12 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-line pt-8 text-sm text-mute md:flex-row md:items-center md:justify-between">
        <p>© 2026 Manuel Morales · iacinema.es</p>
        <nav aria-label={t.footer.label} className="flex gap-6">
          <a href={`${b}/#${t.ids.work}`} className="hover:text-ink">{t.nav.work}</a>
          <a href={`${b}/#${t.ids.contact}`} className="hover:text-ink">{t.nav.contact}</a>
          <a href="#top" className="hover:text-ink">{t.footer.top}</a>
        </nav>
      </div>
    </footer>
  )
}
