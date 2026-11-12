export const HOMEPAGE_VISIBILITY_KEYS = [
  'hero',
  'features',
  'services',
  'fleet',
  'coverage',
  'cta',
  'testimonials',
  'about',
  'faq',
  'contact'
] as const

export type HomepageVisibilityKey = (typeof HOMEPAGE_VISIBILITY_KEYS)[number]

export type HomepageSectionVisibility = Record<HomepageVisibilityKey, boolean>

export const DEFAULT_HOMEPAGE_SECTION_VISIBILITY: HomepageSectionVisibility =
  Object.fromEntries(HOMEPAGE_VISIBILITY_KEYS.map((key) => [key, true])) as HomepageSectionVisibility

export function normalizeHomepageSectionVisibility(
  value: unknown
): HomepageSectionVisibility {
  const source =
    value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {}

  return HOMEPAGE_VISIBILITY_KEYS.reduce((acc, key) => {
    acc[key] = source[key] === false ? false : true
    return acc
  }, {} as HomepageSectionVisibility)
}
