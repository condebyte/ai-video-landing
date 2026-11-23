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
    title: 'Manuel Morales, vídeos hechos con IA',
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
    menu: 'Menú',
    close: 'Cerrar',
    main: 'Principal',
    switchShort: 'EN',
    switchLabel: 'Ver la web en inglés',
  },
  cat: { Cine: 'Cine', Avatares: 'Avatares', Espacios: 'Espacios', Producto: 'Producto' } as Record<Category, string>,
  hero: {
    h1: ['Vídeos con IA', 'que parecen rodados'],
    sub: 'Anuncios, espacios, avatares y cine. Sin cámara ni plató.',
    seeWork: 'Ver los trabajos',
    pause: 'Pausar los vídeos',
    play: 'Reproducir los vídeos',
  },
  work: {
    title: 'Trabajos',
    lead: 'Once piezas, todas de 2026.',
    hintHover: 'Pasa el ratón por encima para verlas moverse; haz clic para verlas con sonido.',
    hintTouch: 'Toca una pieza para verla con sonido.',
    all: 'Todo',
    filter: 'Filtrar por categoría',
    see: 'Ver',
    frame: 'Fotograma de',
  },
  lightbox: { close: 'Cerrar', prev: 'Anterior', next: 'Siguiente', page: 'Abrir su página', soundOn: 'Activar sonido', soundOff: 'Silenciar' },
  case: {
    title: 'Ático, estudio de interiorismo',
    lead: 'Una vivienda en planta ático recorrida plano a plano: espacios abiertos, materiales nobles y luz natural.',
    rows: [
      ['Encargo', 'Interiorismo'],
      ['Formato', 'Horizontal 16:9'],
      ['Duración', '0:33'],
      ['Sonido', 'Sí'],
    ],
    open: 'Abrir su página',
    videoLabel: 'Recorrido del ático',
  },
  statement: ['Cuatro géneros,', 'un mismo director.'],
  about: {
    title: 'Sobre mí',
    p1: 'Soy Manuel Morales. Hago vídeo con IA para marcas, inmobiliarias, hoteles y creadores.',
    p2: 'Idea, guion, planos y montaje, como en un rodaje.',
    servicesLabel: 'Lo que hago',
    services: [['Anuncios de producto', 'Tu producto en cualquier escena'], ['Inmobiliaria e interiorismo', 'Del plano al recorrido'], ['Hoteles y turismo', 'Estancias, piscinas y vistas'], ['Avatares para redes', 'Presentadores y personajes'], ['Piezas de cine', 'Cortos con guion propio']],
  },
  how: {
    title: 'Del guion al MP4',
    steps: [
      ['Me cuentas la idea', 'Qué quieres contar y dónde se va a ver.'],
      ['Pruebas y guion', 'Te enseño las primeras escenas antes de producir la pieza.'],
      ['Entrega', 'Recibes el MP4 en vertical, horizontal o los dos.'],
    ],
  },
  faq: {
    title: 'Preguntas',
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
    title: 'Encarga tu vídeo',
    p: 'Cuéntame qué quieres contar y dónde se va a ver. Te respondo con una propuesta y un plazo.',
    name: 'Nombre',
    email: 'Tu email',
    idea: 'Qué quieres crear',
    submit: 'Enviar el encargo',
    errName: 'Escribe tu nombre.',
    errEmail: 'Ese email parece incompleto. Escríbelo como nombre@dominio.com.',
    errIdea: 'Cuéntame un poco más sobre la idea.',
    errForm: 'No se ha enviado nada: el email de contacto aún no está configurado.',
    subject: 'Vídeo con IA',
  },
  footer: { label: 'Pie', top: 'Volver arriba', legal: '© 2026 Manuel Morales, iacinema.es' },
  video: { back: 'Todos los trabajos', next: 'Siguiente pieza', category: 'Categoría', duration: 'Duración', format: 'Formato', vertical: 'Vertical 9:16', horizontal: 'Horizontal 16:9' },
}

type Dict = typeof es

const en: Dict = {
  ids: { work: 'work', about: 'about', faq: 'faq', contact: 'contact' },
  meta: {
    title: 'Manuel Morales, AI made videos',
    description: 'Portfolio of Manuel Morales: product ads, spaces, avatars and short films created with artificial intelligence.',
    og: 'Ads, spaces, avatars and film created with artificial intelligence.',
  },
  skip: 'Skip to content',
  nav: {
    work: 'Work',
    about: 'About',
    faq: 'FAQ',
    contact: 'Contact',
    cta: 'Order a video',
    menu: 'Menu',
    close: 'Close',
    main: 'Main',
    switchShort: 'ES',
    switchLabel: 'Ver la web en español',
  },
  cat: { Cine: 'Film', Avatares: 'Avatars', Espacios: 'Spaces', Producto: 'Product' },
  hero: {
    h1: ['AI video', 'that looks filmed'],
    sub: 'Ads, spaces, avatars and film. No camera, no set.',
    seeWork: 'See the work',
    pause: 'Pause the videos',
    play: 'Play the videos',
  },
  work: {
    title: 'Work',
    lead: 'Eleven pieces, all from 2026.',
    hintHover: 'Hover a piece to see it move; click to watch it with sound.',
    hintTouch: 'Tap a piece to watch it with sound.',
    all: 'All',
    filter: 'Filter by category',
    see: 'Watch',
    frame: 'Still from',
  },
  lightbox: { close: 'Close', prev: 'Previous', next: 'Next', page: 'Open its page', soundOn: 'Sound on', soundOff: 'Mute' },
  case: {
    title: 'Penthouse, interior study',
    lead: 'A penthouse home walked through shot by shot: open spaces, fine materials and daylight.',
    rows: [
      ['Brief', 'Interiors'],
      ['Format', 'Horizontal 16:9'],
      ['Length', '0:33'],
      ['Sound', 'Yes'],
    ],
    open: 'Open its page',
    videoLabel: 'Penthouse walkthrough',
  },
  statement: ['Four genres,', 'one director.'],
  about: {
    title: 'About',
    p1: 'Manuel Morales. AI video for brands, real estate, hotels and creators.',
    p2: 'Idea, script, shots and editing, as on a shoot.',
    servicesLabel: 'What I make',
    services: [['Product ads', 'Your product in any scene'], ['Real estate and interiors', 'Floor plan to walkthrough'], ['Hotels and tourism', 'Rooms, pools and views'], ['Avatars for social media', 'Presenters and characters'], ['Short films', 'Scripted shorts']],
  },
  how: {
    title: 'From script to MP4',
    steps: [
      ['You tell me the idea', 'What you want to say and where it will run.'],
      ['Tests and script', 'I show you the first scenes before making the piece.'],
      ['Delivery', 'You get the MP4 vertical, horizontal or both.'],
    ],
  },
  faq: {
    title: 'Questions',
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
    title: 'Order your video',
    p: 'Tell me what you want to say and where it will be seen. I will reply with a proposal and a deadline.',
    name: 'Name',
    email: 'Your email',
    idea: 'What you want to create',
    submit: 'Send the brief',
    errName: 'Please enter your name.',
    errEmail: 'That email looks incomplete. Write it as name@domain.com.',
    errIdea: 'Tell me a bit more about the idea.',
    errForm: 'Nothing was sent: the contact email is not set up yet.',
    subject: 'AI video',
  },
  footer: { label: 'Footer', top: 'Back to top', legal: '© 2026 Manuel Morales, iacinema.es' },
  video: { back: 'All work', next: 'Next piece', category: 'Category', duration: 'Length', format: 'Format', vertical: 'Vertical 9:16', horizontal: 'Horizontal 16:9' },
}

export const dict: Record<Lang, Dict> = { es, en }
export type { Dict }
