import en from '../../locales/en.json'
import ro from '../../locales/ro.json'

const localeFiles: Record<string, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  ro: ro as Record<string, unknown>
}

export function getLocaleFromBundle(lang: string): Record<string, unknown> | null {
  return localeFiles[lang] ?? null
}

export function getSupportedLocaleCodes(): string[] {
  return Object.keys(localeFiles)
}
