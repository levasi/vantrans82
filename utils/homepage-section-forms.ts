export type HomepageSectionKey =
  | 'hero'
  | 'features'
  | 'services'
  | 'cta'
  | 'testimonials'
  | 'about'
  | 'faq'
  | 'contact'

export type HomepageSectionMeta = {
  key: HomepageSectionKey
  title: string
  description: string
  icon: string
}

export const HOMEPAGE_SECTION_META: HomepageSectionMeta[] = [
  { key: 'hero', title: 'Hero', description: 'Main banner title, subtitle, CTAs, and background', icon: 'Sparkles' },
  { key: 'features', title: 'Features', description: 'Highlight cards under the hero', icon: 'LayoutGrid' },
  { key: 'services', title: 'Services', description: 'Service cards and section copy', icon: 'Briefcase' },
  { key: 'cta', title: 'Call to action', description: 'Quote banner copy and background', icon: 'Megaphone' },
  { key: 'testimonials', title: 'Testimonials', description: 'Client quotes and avatars', icon: 'Quote' },
  { key: 'about', title: 'About', description: 'Company story, values, and image', icon: 'Info' },
  { key: 'faq', title: 'FAQ', description: 'Questions, answers, and help text', icon: 'CircleHelp' },
  { key: 'contact', title: 'Contact', description: 'Contact section labels and business hours', icon: 'Mail' }
]

export type FormField = {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'url' | 'image'
}

export type ItemSchema = {
  key: string
  label: string
  addLabel: string
  fields: FormField[]
  /** Put image fields on the left, other fields on the right */
  layout?: 'stack' | 'media-left'
}

export type SectionFormSchema = {
  fields?: FormField[]
  items?: ItemSchema
  emptyItem?: Record<string, string>
}

const bilingual = (base: string, label: string, type: FormField['type'] = 'text'): FormField[] => [
  { key: `${base}_ro`, label: `${label} (RO)`, type },
  { key: `${base}_en`, label: `${label} (EN)`, type }
]

export const SECTION_FORM_SCHEMAS: Record<HomepageSectionKey, SectionFormSchema> = {
  hero: {
    fields: [
      ...bilingual('title', 'Title', 'textarea'),
      ...bilingual('subtitle', 'Subtitle', 'textarea'),
      ...bilingual('request_quote', 'Primary CTA'),
      ...bilingual('our_services', 'Secondary CTA'),
      { key: 'background_image_url', label: 'Background image', type: 'image' }
    ]
  },
  features: {
    items: {
      key: 'items',
      label: 'Feature cards',
      addLabel: 'Add feature',
      fields: [
        { key: 'icon', label: 'Icon (Lucide name)' },
        { key: 'color', label: 'Color (accent | brand | green | purple)' },
        ...bilingual('title', 'Title'),
        ...bilingual('description', 'Description', 'textarea')
      ]
    },
    emptyItem: {
      icon: 'Clock',
      color: 'brand',
      title_ro: '',
      title_en: '',
      description_ro: '',
      description_en: ''
    }
  },
  services: {
    fields: [
      ...bilingual('title', 'Section title'),
      ...bilingual('subtitle', 'Section subtitle', 'textarea')
    ],
    items: {
      key: 'items',
      label: 'Services',
      addLabel: 'Add service',
      layout: 'media-left',
      fields: [
        { key: 'image_url', label: 'Image', type: 'image' },
        { key: 'icon', label: 'Icon (Lucide name)' },
        ...bilingual('title', 'Title'),
        ...bilingual('description', 'Description', 'textarea')
      ]
    },
    emptyItem: {
      icon: 'Truck',
      image_url: '',
      title_ro: '',
      title_en: '',
      description_ro: '',
      description_en: ''
    }
  },
  cta: {
    fields: [
      ...bilingual('title', 'Title', 'textarea'),
      ...bilingual('subtitle', 'Subtitle', 'textarea'),
      ...bilingual('get_quote', 'CTA label'),
      ...bilingual('available', 'Availability note', 'textarea'),
      { key: 'background_image_url', label: 'Background image', type: 'image' }
    ]
  },
  testimonials: {
    fields: [
      ...bilingual('title', 'Section title'),
      ...bilingual('subtitle', 'Section subtitle', 'textarea')
    ],
    items: {
      key: 'items',
      label: 'Testimonials',
      addLabel: 'Add testimonial',
      fields: [
        ...bilingual('quote', 'Quote', 'textarea'),
        { key: 'name', label: 'Name' },
        { key: 'company', label: 'Company' },
        { key: 'image_url', label: 'Avatar image', type: 'image' }
      ]
    },
    emptyItem: {
      quote_ro: '',
      quote_en: '',
      name: '',
      company: '',
      image_url: ''
    }
  },
  about: {
    fields: [
      ...bilingual('title', 'Title'),
      ...bilingual('description1', 'Description 1', 'textarea'),
      ...bilingual('description2', 'Description 2', 'textarea'),
      ...bilingual('core_values', 'Core values heading'),
      { key: 'image_url', label: 'Image', type: 'image' }
    ],
    items: {
      key: 'values',
      label: 'Core values',
      addLabel: 'Add value',
      fields: [
        { key: 'icon', label: 'Icon (Lucide name)' },
        ...bilingual('title', 'Title'),
        ...bilingual('description', 'Description', 'textarea')
      ]
    },
    emptyItem: {
      icon: 'Shield',
      title_ro: '',
      title_en: '',
      description_ro: '',
      description_en: ''
    }
  },
  faq: {
    fields: [
      ...bilingual('title', 'Section title'),
      ...bilingual('subtitle', 'Section subtitle', 'textarea'),
      ...bilingual('still_have_questions', 'Help text'),
      ...bilingual('contact_us', 'Contact link label')
    ],
    items: {
      key: 'items',
      label: 'Questions',
      addLabel: 'Add question',
      fields: [
        ...bilingual('question', 'Question', 'textarea'),
        ...bilingual('answer', 'Answer', 'textarea')
      ]
    },
    emptyItem: {
      question_ro: '',
      question_en: '',
      answer_ro: '',
      answer_en: ''
    }
  },
  contact: {
    fields: [
      ...bilingual('title', 'Section title'),
      ...bilingual('subtitle', 'Section subtitle', 'textarea'),
      ...bilingual('your_name', 'Name field label'),
      ...bilingual('email_address', 'Email field label'),
      ...bilingual('message', 'Message field label'),
      ...bilingual('send_message', 'Submit button'),
      ...bilingual('contact_information', 'Info heading'),
      ...bilingual('phone_label', 'Phone label'),
      ...bilingual('email_label', 'Email label'),
      ...bilingual('whatsapp_label', 'WhatsApp label'),
      ...bilingual('chat_instantly', 'WhatsApp hint'),
      ...bilingual('address_label', 'Address label'),
      ...bilingual('chat_on_whatsapp', 'WhatsApp button'),
      ...bilingual('business_hours', 'Business hours heading'),
      ...bilingual('monday_friday', 'Monday–Friday'),
      ...bilingual('saturday', 'Saturday'),
      ...bilingual('sunday', 'Sunday'),
      ...bilingual('emergency_support', 'Emergency note', 'textarea')
    ]
  }
}
