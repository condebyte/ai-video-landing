import { dict, type Lang } from '@/lib/i18n'

export default function Statement({ lang }: { lang: Lang }) {
  const s = dict[lang].statement
  return (
    <section className="statement well grained">
      <div className="container">
        <p className="statement__text">
          {s[0]}
          <br />
          {s[1]}
        </p>
      </div>
    </section>
  )
}
