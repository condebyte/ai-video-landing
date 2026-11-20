import type { Category, Video } from '@/data/videos'

export type Lang = 'es' | 'en'
export const LANGS: Lang[] = ['es', 'en']

/** Prefijo de ruta de cada idioma: '' para español, '/en' para inglés. */
export const base = (lang: Lang) => (lang === 'en' ? '/en' : '')

/** Título y descripción de un vídeo en el idioma pedido. */
export const vt = (v: Video, lang: Lang) => (lang === 'en' ? v.en : { title: v.title, description: v.description })

const es = {
  ids: { work: 'trabajos', about: 'sobre-mi', faq: 'preguntas', contact: 'contacto' },
  meta: {
    title: 'Manuel Morales · Vídeos hechos con IA',
    description:
      'Portfolio de Manuel Morales: anuncios de producto, espacios, avatares y piezas de cine creadas con inteligencia artificial.',
    og: 'Anuncios, espacios, avatares y cine creados con inteligencia artificial.',
  },
  skip: 'Saltar al contenido',
  nav: {
    work: 'Trabajos',
    about: 'Sobre mí',
    faq: 'Preguntas',
    contact: 'Contacto',
    cta: 'Encargar un vídeo',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    main: 'Principal',
    switchTo: 'English',
    switchLabel: 'Ver la web en inglés',
  },
  cat: { Cine: 'Cine', Avatares: 'Avatares', Espacios: 'Espacios', Producto: 'Producto' } as Record<Category, string>,
  hero: {
    eyebrow: 'Manuel Morales · Vídeo con IA',
    h1: ['Vídeos con IA', 'que parecen rodados.'],
    sub: 'Anuncios de producto, recorridos de espacios, avatares y piezas de cine. Sin cámara ni plató, listos para tu web y tus redes.',
    seeWork: 'Ver trabajos',
    proof: (n: number) => `${n} piezas · Formatos vertical 9:16 y horizontal 16:9`,
  },
  work: {
    title: 'Trabajos',
    hintHover: 'Pasa el ratón por encima para verlos en movimiento. Haz clic para verlos en grande y con sonido.',
    hintTouch: 'Toca cualquier vídeo para verlo en grande y con sonido.',
    all: 'Todos',
    filter: 'Filtrar por categoría',
    see: 'Ver',
    frame: 'Fotograma de',
  },
  lightbox: { close: 'Cerrar', prev: 'Anterior', next: 'Siguiente', page: 'Página' },
  tagline: { label: 'Lema', text: 'Sin cámara, sin plató y sin actores. Tu idea convertida en imagen que se ve como cine.' },
  about: {
    title: 'Sobre mí',
    p1: 'Soy Manuel Morales y hago vídeo con inteligencia artificial. Trabajo con marcas, inmobiliarias, hoteles y creadores que necesitan imagen de calidad sin montar un rodaje.',
    p2: 'Cada pieza pasa por lo mismo que un rodaje de verdad: idea, guion, planos y montaje. La diferencia es que todo lo genero con IA.',
    services: ['Anuncios de producto', 'Inmobiliaria e interiorismo', 'Hoteles y turismo', 'Avatares para redes', 'Piezas de cine'],
    howTitle: 'Cómo trabajo',
    steps: [
      ['Me cuentas la idea', 'Qué quieres contar, para qué marca o espacio y dónde se va a publicar.'],
      ['Pruebas y guion', 'Te enseño las primeras escenas y el tono antes de producir la pieza completa.'],
      ['Entrega', 'Recibes el vídeo en MP4: vertical para redes, horizontal para web o los dos.'],
    ],
  },
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      ['¿Qué tipo de vídeos haces?', 'Anuncios de producto, recorridos de casas y hoteles, avatares para redes y piezas cortas de cine. Si tienes otra idea, cuéntamela.'],
      ['¿Puedo usar mi producto o mi espacio real?', 'Sí. Con buenas fotos de tu producto o de tu espacio los llevo a la escena que quieras.'],
      ['¿En qué formatos entregas?', 'En MP4, en vertical 9:16 para redes, en horizontal 16:9 para web o en los dos.'],
      ['¿Cuánto tarda un vídeo?', 'Depende de la duración y del número de escenas. Antes de empezar te doy un plazo cerrado.'],
      ['¿Cuánto cuesta?', 'Cada pieza se presupuesta según su duración y complejidad. Escríbeme y te respondo con una propuesta.'],
      ['¿Puedo pedir cambios?', 'Sí. Revisamos juntos las primeras pruebas y ajustamos antes de la versión final.'],
    ],
  },
  contact: {
    h2: ['¿Tienes una idea?', 'Hagamos el vídeo.'],
    p: 'Cuéntame qué quieres contar y dónde se va a ver. Te respondo con una propuesta y un plazo.',
    name: 'Nombre',
    email: 'Tu email',
    idea: '¿Qué quieres crear?',
    errName: 'Escribe tu nombre.',
    errEmail: 'Revisa el email, parece incompleto.',
    errIdea: 'Cuéntame un poco más sobre la idea.',
    errForm: 'El email de contacto aún no está configurado.',
    sent: 'Se ha abierto tu correo con el mensaje listo para enviar.',
    subject: 'Vídeo con IA',
  },
  footer: { label: 'Pie', top: 'Volver arriba' },
  video: { back: 'Todos los trabajos', next: 'Siguiente' },
}

type Dict = typeof es

const en: Dict = {
  ids: { work: 'work', about: 'about', faq: 'faq', contact: 'contact' },
  meta: {
    title: 'Manuel Morales · AI made videos',
    description:
      'Portfolio of Manuel Morales: product ads, spaces, avatars and short films created with artificial intelligence.',
    og: 'Ads, spaces, avatars and film created with artificial intelligence.',
  },
  skip: 'Skip to content',
  nav: {
    work: 'Work',
    about: 'About',
    faq: 'FAQ',
    contact: 'Contact',
    cta: 'Order a video',
    open: 'Open menu',
    close: 'Close menu',
    main: 'Main',
    switchTo: 'Español',
    switchLabel: 'Ver la web en español',
  },
  cat: { Cine: 'Film', Avatares: 'Avatars', Espacios: 'Spaces', Producto: 'Product' },
  hero: {
    eyebrow: 'Manuel Morales · AI video',
    h1: ['AI videos that look', 'like they were shot.'],
    sub: 'Product ads, walkthroughs of spaces, avatars and short films. No camera, no set, ready for your website and your socials.',
    seeWork: 'See work',
    proof: (n: number) => `${n} pieces · Vertical 9:16 and horizontal 16:9 formats`,
  },
  work: {
    title: 'Work',
    hintHover: 'Hover over a video to see it move. Click to watch it full size with sound.',
    hintTouch: 'Tap any video to watch it full size with sound.',
    all: 'All',
    filter: 'Filter by category',
    see: 'Watch',
    frame: 'Still from',
  },
  lightbox: { close: 'Close', prev: 'Previous', next: 'Next', page: 'Page' },
  tagline: { label: 'Tagline', text: 'No camera, no set and no actors. Your idea turned into images that look like cinema.' },
  about: {
    title: 'About',
    p1: 'I am Manuel Morales and I make video with artificial intelligence. I work with brands, real estate agencies, hotels and creators who need quality images without organising a shoot.',
    p2: 'Every piece goes through the same steps as a real shoot: idea, script, shots and editing. The difference is that I generate all of it with AI.',
    services: ['Product ads', 'Real estate and interiors', 'Hotels and tourism', 'Avatars for social media', 'Short films'],
    howTitle: 'How I work',
    steps: [
      ['You tell me the idea', 'What you want to say, for which brand or space and where it will be published.'],
      ['Tests and script', 'I show you the first scenes and the tone before producing the full piece.'],
      ['Delivery', 'You get the video as an MP4: vertical for social media, horizontal for the web or both.'],
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      ['What kind of videos do you make?', 'Product ads, walkthroughs of homes and hotels, avatars for social media and short films. If you have another idea, tell me about it.'],
      ['Can you use my real product or space?', 'Yes. With good photos of your product or your space I can place them in any scene you want.'],
      ['Which formats do you deliver?', 'MP4, vertical 9:16 for social media, horizontal 16:9 for the web or both.'],
      ['How long does a video take?', 'It depends on the length and the number of scenes. Before we start I give you a fixed deadline.'],
      ['How much does it cost?', 'Each piece is quoted on its length and complexity. Write to me and I will reply with a proposal.'],
      ['Can I ask for changes?', 'Yes. We review the first tests together and adjust before the final version.'],
    ],
  },
  contact: {
    h2: ['Got an idea?', 'Let’s make the video.'],
    p: 'Tell me what you want to say and where it will be seen. I will reply with a proposal and a deadline.',
    name: 'Name',
    email: 'Your email',
    idea: 'What do you want to create?',
    errName: 'Please enter your name.',
    errEmail: 'Check the email, it looks incomplete.',
    errIdea: 'Tell me a bit more about the idea.',
    errForm: 'The contact email is not set up yet.',
    sent: 'Your email app has opened with the message ready to send.',
    subject: 'AI video',
  },
  footer: { label: 'Footer', top: 'Back to top' },
  video: { back: 'All work', next: 'Next' },
}

export const dict: Record<Lang, Dict> = { es, en }
export type { Dict }
