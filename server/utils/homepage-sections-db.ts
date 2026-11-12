import { getDb } from '~/server/utils/db'

export const HOMEPAGE_SECTIONS = [
  'hero',
  'features',
  'services',
  'cta',
  'testimonials',
  'about',
  'faq',
  'contact'
] as const

export type HomepageSectionKey = (typeof HOMEPAGE_SECTIONS)[number]

const DEFAULTS: Record<HomepageSectionKey, Record<string, unknown>> = {
  hero: {
    title_ro: 'Transport Rapid și Sigur de Mărfuri în România și UE',
    title_en: 'Fast & Reliable Freight Transport Across Romania & EU',
    subtitle_ro:
      'Soluții logistice profesionale cu livrare garantată la timp. Partenerul tău de încredere pentru transport rutier, livrare expres și transport internațional.',
    subtitle_en:
      'Professional logistics solutions with guaranteed on-time delivery. Your trusted partner for road transport, express delivery, and international freight.',
    request_quote_ro: 'Solicită Ofertă',
    request_quote_en: 'Request a Quote',
    our_services_ro: 'Servicii',
    our_services_en: 'Our Services',
    background_image_url: '/2.png'
  },
  features: {
    items: [
      {
        icon: 'Clock',
        color: 'accent',
        title_ro: 'Livrare Rapidă',
        title_en: 'Fast Delivery',
        description_ro: 'Opțiuni de expediere expres disponibile',
        description_en: 'Express shipping options available'
      },
      {
        icon: 'Shield',
        color: 'brand',
        title_ro: 'Transport Sigur',
        title_en: 'Secure Transport',
        description_ro: 'Acoperire completă de asigurare',
        description_en: 'Full insurance coverage'
      },
      {
        icon: 'TrendingUp',
        color: 'green',
        title_ro: 'Urmărire în Timp Real',
        title_en: 'Live Tracking',
        description_ro: 'Monitorizare GPS în timp real',
        description_en: 'Real-time GPS monitoring'
      },
      {
        icon: 'Headphones',
        color: 'purple',
        title_ro: 'Suport 24/7',
        title_en: '24/7 Support',
        description_ro: 'Mereu aici pentru a te ajuta',
        description_en: 'Always here to help'
      }
    ]
  },
  services: {
    title_ro: 'Serviciile Noastre',
    title_en: 'Our Services',
    subtitle_ro: 'Soluții logistice complete adaptate nevoilor afacerii tale cu fiabilitate și eficiență.',
    subtitle_en:
      'Comprehensive logistics solutions tailored to meet your business needs with reliability and efficiency.',
    items: [
      {
        icon: 'Truck',
        image_url:
          'https://images.unsplash.com/photo-1643119270753-9f506b137e38?auto=format&fit=crop&w=1080&q=80',
        title_ro: 'Transport rutier național și internațional',
        title_en: 'National and international road transport',
        description_ro:
          'Servicii complete de transport terestru în România și Europa cu capabilități complete de urmărire și programare flexibilă.',
        description_en:
          'Comprehensive ground transportation services across Romania and Europe with full tracking capabilities and flexible scheduling.'
      },
      {
        icon: 'Zap',
        image_url:
          'https://images.unsplash.com/photo-1761454200783-ca533f7928e3?auto=format&fit=crop&w=1080&q=80',
        title_ro: 'Livrare Expres',
        title_en: 'Express Delivery',
        description_ro:
          'Opțiuni de livrare în aceeași zi și a doua zi pentru expedieri urgente. Transport rapid, fiabil și sigur când timpul contează cel mai mult.',
        description_en:
          'Same-day and next-day delivery options for urgent shipments. Fast, reliable, and secure transport when time matters most.'
      },
      {
        icon: 'Settings',
        image_url:
          'https://images.unsplash.com/photo-1663103746090-2e4274c6c7ac?auto=format&fit=crop&w=1080&q=80',
        title_ro: 'Logistică personalizată',
        title_en: 'Custom logistics',
        description_ro:
          'Soluții de aprovizionare personalizate, proiectate pentru nevoile specifice ale afacerii tale.',
        description_en: 'Tailored supply chain solutions designed for the specific needs of your business.'
      },
      {
        icon: 'Warehouse',
        image_url:
          'https://images.unsplash.com/photo-1726866672851-5b99c837603c?auto=format&fit=crop&w=1080&q=80',
        title_ro: 'Manipulare și depozitare',
        title_en: 'Handling and warehousing',
        description_ro:
          'Servicii de manipulare, depozitare și gestiune a mărfii, adaptate nevoilor afacerii tale.',
        description_en:
          'Cargo handling, warehousing, and inventory management services tailored to your business needs.'
      }
    ]
  },
  cta: {
    title_ro: 'Ai Nevoie de Ofertă Rapidă de Transport?',
    title_en: 'Need a Fast Transport Quote?',
    subtitle_ro:
      'Obține prețuri competitive și soluții flexibile adaptate nevoilor tale logistice. Echipa noastră este gata să te ajute să găsești soluția perfectă de transport.',
    subtitle_en:
      'Get competitive pricing and flexible solutions tailored to your logistics needs. Our team is ready to help you find the perfect transport solution.',
    get_quote_ro: 'Solicită Ofertă',
    get_quote_en: 'Get a Quote',
    available_ro: 'Disponibil 24/7 pentru expedieri urgente și întrebări',
    available_en: 'Available 24/7 for urgent shipments and inquiries',
    background_image_url:
      'https://images.unsplash.com/photo-1763736809655-9337caf643cc?auto=format&fit=crop&w=1080&q=80'
  },
  testimonials: {
    title_ro: 'Ce Spun Clienții Noștri',
    title_en: 'What Our Clients Say',
    subtitle_ro: 'Nu ne crede pe cuvânt. Iată ce au de spus partenerii noștri despre colaborarea cu noi.',
    subtitle_en: "Don't just take our word for it. Here's what our partners have to say about working with us.",
    items: [
      {
        quote_ro:
          'VanTrans82 este partenerul nostru logistic de încredere de 5 ani. Fiabilitatea și profesionalismul lor sunt de neegalat. Fiecare livrare ajunge la timp, de fiecare dată.',
        quote_en:
          'VanTrans82 has been our go-to logistics partner for 5 years. Their reliability and professionalism are unmatched. Every delivery arrives on time, every time.',
        name: 'Maria Ionescu',
        company: 'TechCom Solutions SRL',
        image_url:
          'https://images.unsplash.com/photo-1522199899308-2eef382e2158?auto=format&fit=crop&w=1080&q=80'
      },
      {
        quote_ro:
          'Serviciul de livrare expres ne-a salvat afacerea în timpul unei lansări critice de produs. Serviciu excepțional și urmărire în timp real ne-au oferit liniște deplină.',
        quote_en:
          'The express delivery service saved our business during a critical product launch. Exceptional service and real-time tracking gave us complete peace of mind.',
        name: 'Alexandru Popescu',
        company: 'Industrial Equipment Ltd',
        image_url:
          'https://images.unsplash.com/photo-1589458223095-03eee50f0054?auto=format&fit=crop&w=1080&q=80'
      },
      {
        quote_ro:
          'Profesioniști, eficienți și mereu disponibili. Serviciul lor de transport internațional a făcut extinderea pe piețele UE fără probleme. Recomand cu căldură!',
        quote_en:
          'Professional, efficient, and always available. Their international freight service made expanding into EU markets seamless. Highly recommended!',
        name: 'Elena Dumitrescu',
        company: 'Fashion Export Group',
        image_url:
          'https://images.unsplash.com/photo-1629507208649-70919ca33793?auto=format&fit=crop&w=1080&q=80'
      }
    ]
  },
  about: {
    title_ro: 'Despre noi',
    title_en: 'About VanTrans82',
    description1_ro:
      'Fondată în 2017, VanTrans82 a devenit un partener logistic de încredere în România. Cu peste 15 ani de experiență, ne-am construit reputația pe livrarea excelenței în fiecare expediere.',
    description1_en:
      "Founded in 2017, VanTrans82 has grown to become a trusted logistics partner in Romania. With over 15 years of experience, we've built our reputation on delivering excellence in every shipment.",
    description2_ro:
      'Misiunea noastră este simplă: să oferim soluții de transport fiabile, eficiente și rentabile care ajută afacerile să crească. Combinăm tehnologia modernă cu serviciul personalizat pentru a ne asigura că marfa ta ajunge în siguranță și la timp.',
    description2_en:
      'Our mission is simple: to provide reliable, efficient, and cost-effective transport solutions that help businesses grow. We combine modern technology with personalized service to ensure your cargo arrives safely and on time.',
    core_values_ro: 'Valorile noastre de bază',
    core_values_en: 'Our Core Values',
    image_url:
      'https://images.unsplash.com/photo-1657819547860-ea03df0eafa8?auto=format&fit=crop&w=1080&q=80',
    values: [
      {
        icon: 'Shield',
        title_ro: 'Siguranță',
        title_en: 'Safety',
        description_ro: 'Fiecare expediere este tratată cu cele mai înalte standarde de siguranță și grijă.',
        description_en: 'Every shipment is handled with the highest safety standards and care.'
      },
      {
        icon: 'Zap',
        title_ro: 'Viteză',
        title_en: 'Speed',
        description_ro: 'Livrare rapidă și eficientă fără a compromite calitatea sau securitatea.',
        description_en: 'Fast, efficient delivery without compromising on quality or security.'
      },
      {
        icon: 'Users',
        title_ro: 'Încredere',
        title_en: 'Trust',
        description_ro: 'Construirea de parteneriate durabile prin transparență și fiabilitate.',
        description_en: 'Building lasting partnerships through transparency and reliability.'
      }
    ]
  },
  faq: {
    title_ro: 'Întrebări frecvente',
    title_en: 'Frequently Asked Questions',
    subtitle_ro: 'Ai întrebări? Avem răspunsuri. Găsește soluții rapide la întrebările comune de mai jos.',
    subtitle_en: "Have questions? We've got answers. Find quick solutions to common inquiries below.",
    still_have_questions_ro: 'Mai ai întrebări? Suntem aici pentru a te ajuta.',
    still_have_questions_en: "Still have questions? We're here to help.",
    contact_us_ro: 'Contactează-ne →',
    contact_us_en: 'Contact Us →',
    items: [
      {
        question_ro: 'Ce zone acoperiți?',
        question_en: 'What areas do you cover?',
        answer_ro:
          'Oferim acoperire completă în toată România și pe rutele majore europene, inclusiv Europa de Vest și Centrală. Rețeaua noastră se întinde de la livrări urbane locale la transport internațional de marfă.',
        answer_en:
          'We provide comprehensive coverage across all of Romania and major European routes, including Western and Central Europe. Our network spans from local urban deliveries to international freight transport.'
      },
      {
        question_ro: 'Cum obțin o ofertă de transport?',
        question_en: 'How do I get a transport quote?',
        answer_ro:
          'Poți solicita o ofertă completând formularul nostru de contact sau trimitându-ne un email la {email}. Răspundem de obicei în 2 ore în timpul orelor de lucru și oferim prețuri detaliate bazate pe nevoile tale specifice.',
        answer_en:
          'You can request a quote by filling out our contact form or sending us an email at {email}. We typically respond within 2 hours during business hours and provide detailed pricing based on your specific needs.'
      },
      {
        question_ro: 'Oferiți urmărire pentru expedieri?',
        question_en: 'Do you offer tracking for shipments?',
        answer_ro:
          'Da! Toate vehiculele noastre sunt echipate cu sisteme de urmărire GPS. Vei primi actualizări în timp real despre locația expedierii tale și timpul estimat de livrare prin portalul nostru online sau aplicația mobilă.',
        answer_en:
          "Yes! All our vehicles are equipped with GPS tracking systems. You'll receive real-time updates on your shipment's location and estimated delivery time through our online portal or mobile app."
      },
      {
        question_ro: 'Ce tipuri de marfă transportați?',
        question_en: 'What types of cargo do you transport?',
        answer_ro:
          'Prelucrăm o gamă largă de marfă, inclusiv marfă generală, mărfuri pe palete, produse ambalate și echipamente industriale. Pentru marfă specializată (materiale periculoase, bunuri sensibile la temperatură), te rugăm să ne contactezi pentru a discuta cerințele tale specifice.',
        answer_en:
          'We handle a wide range of cargo including general freight, palletized goods, packaged products, and industrial equipment. For specialized cargo (hazardous materials, temperature-sensitive goods), please contact us to discuss your specific requirements.'
      },
      {
        question_ro: 'Care sunt termenii voștri de livrare?',
        question_en: 'What are your delivery timeframes?',
        answer_ro:
          'Termenii de livrare variază în funcție de distanță și tipul de serviciu. Livrările locale ajung de obicei în 24 de ore, transportul național durează 1-3 zile, iar transporturile internaționale variază de la 3-7 zile. Oferim și servicii expres în aceeași zi și a doua zi pentru expedieri urgente.',
        answer_en:
          'Delivery times vary based on distance and service type. Local deliveries typically arrive within 24 hours, national transport takes 1-3 days, and international shipments range from 3-7 days. We also offer express same-day and next-day services for urgent shipments.'
      },
      {
        question_ro: 'Cum asigurați siguranța mărfii?',
        question_en: 'How do you ensure cargo safety?',
        answer_ro:
          'Siguranța este prioritatea noastră principală. Toate vehiculele noastre sunt supuse întreținerii regulate, șoferii noștri sunt instruiți extensiv și avem acoperire completă de asigurare. Folosim echipamente profesionale de încărcare și sisteme de fixare sigure pentru a proteja marfa ta pe tot parcursul transportului.',
        answer_en:
          'Safety is our top priority. All our vehicles undergo regular maintenance, our drivers are extensively trained, and we have comprehensive insurance coverage. We use professional loading equipment and secure fastening systems to protect your cargo throughout transport.'
      }
    ]
  },
  contact: {
    title_ro: 'Ia legătura cu noi',
    title_en: 'Get In Touch',
    subtitle_ro:
      'Gata să-ți simplifici logistica? Contactează-ne astăzi pentru o ofertă personalizată sau pentru a discuta nevoile tale de transport.',
    subtitle_en:
      'Ready to streamline your logistics? Contact us today for a custom quote or to discuss your transport needs.',
    your_name_ro: 'Numele tău',
    your_name_en: 'Your Name',
    email_address_ro: 'Adresa de email',
    email_address_en: 'Email Address',
    message_ro: 'Mesaj',
    message_en: 'Message',
    send_message_ro: 'Trimite mesaj',
    send_message_en: 'Send Message',
    contact_information_ro: 'Informații de contact',
    contact_information_en: 'Contact Information',
    phone_label_ro: 'Telefon',
    phone_label_en: 'Phone',
    email_label_ro: 'Email',
    email_label_en: 'Email',
    whatsapp_label_ro: 'WhatsApp',
    whatsapp_label_en: 'WhatsApp',
    chat_instantly_ro: 'Chat cu noi',
    chat_instantly_en: 'Chat with us instantly',
    address_label_ro: 'Adresă',
    address_label_en: 'Address',
    chat_on_whatsapp_ro: 'Chat pe WhatsApp',
    chat_on_whatsapp_en: 'Chat on WhatsApp',
    business_hours_ro: 'Program de Lucru',
    business_hours_en: 'Business Hours',
    monday_friday_ro: 'Luni - Vineri: 8:00 - 18:00',
    monday_friday_en: 'Monday - Friday: 8:00 - 18:00',
    saturday_ro: 'Sâmbătă: 9:00 - 14:00',
    saturday_en: 'Saturday: 9:00 - 14:00',
    sunday_ro: 'Duminică: Închis',
    sunday_en: 'Sunday: Closed',
    emergency_support_ro: 'Suport de Urgență Disponibil 24/7',
    emergency_support_en: '24/7 Emergency Support Available'
  }
}

export function isHomepageSectionKey(value: string): value is HomepageSectionKey {
  return (HOMEPAGE_SECTIONS as readonly string[]).includes(value)
}

export function getDefaultHomepageSection(section: HomepageSectionKey) {
  return structuredClone(DEFAULTS[section])
}

export async function ensureHomepageSectionsTable() {
  const db = getDb()
  if (!db) return null

  await db.query(`
    CREATE TABLE IF NOT EXISTS homepage_sections (
      section_key VARCHAR(50) PRIMARY KEY,
      content JSONB NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  return db
}

export async function seedHomepageSectionsIfEmpty() {
  const db = await ensureHomepageSectionsTable()
  if (!db) return

  for (const key of HOMEPAGE_SECTIONS) {
    await db.query(
      `INSERT INTO homepage_sections (section_key, content)
       VALUES ($1, $2::jsonb)
       ON CONFLICT (section_key) DO NOTHING`,
      [key, JSON.stringify(DEFAULTS[key])]
    )
  }
}

export async function getHomepageSection(section: HomepageSectionKey) {
  const db = await ensureHomepageSectionsTable()
  if (!db) {
    return getDefaultHomepageSection(section)
  }

  const result = await db.query(
    'SELECT content FROM homepage_sections WHERE section_key = $1',
    [section]
  )

  if (!result.rows[0]) {
    const content = getDefaultHomepageSection(section)
    await db.query(
      `INSERT INTO homepage_sections (section_key, content)
       VALUES ($1, $2::jsonb)
       ON CONFLICT (section_key) DO NOTHING`,
      [section, JSON.stringify(content)]
    )
    return content
  }

  return result.rows[0].content as Record<string, unknown>
}

export async function saveHomepageSection(
  section: HomepageSectionKey,
  content: Record<string, unknown>
) {
  const db = await ensureHomepageSectionsTable()
  if (!db) {
    throw new Error('Database is not available')
  }

  await db.query(
    `INSERT INTO homepage_sections (section_key, content, updated_at)
     VALUES ($1, $2::jsonb, CURRENT_TIMESTAMP)
     ON CONFLICT (section_key)
     DO UPDATE SET content = EXCLUDED.content, updated_at = CURRENT_TIMESTAMP`,
    [section, JSON.stringify(content)]
  )

  return content
}
