import { useState } from '#app/composables/state'
import { readonly } from 'vue'

type PublicSettings = {
  showLanguageSwitch: boolean
  companyName: string
  phoneNumber: string
  contactEmail: string
  address: string
}

export const useSettings = () => {
  const settings = useState<PublicSettings>('publicSettings', () => ({
    showLanguageSwitch: true,
    companyName: 'VanTrans82',
    phoneNumber: '0743981279',
    contactEmail: 'office@vantrans82.ro',
    address: 'Str Doamna Stanca nr 39\nSelimbar jud Sibiu'
  }))

  const isLoading = useState('settingsLoading', () => false)
  const isLoaded = useState('settingsLoaded', () => false)

  const loadSettings = async () => {
    // If already loaded, don't reload
    if (isLoaded.value) {
      return
    }

    // If already loading, wait
    if (isLoading.value) {
      return
    }

    isLoading.value = true

    try {
      const response = await $fetch<PublicSettings>('/api/settings/public')
      if (response) {
        settings.value = {
          showLanguageSwitch: response.showLanguageSwitch ?? settings.value.showLanguageSwitch,
          companyName: response.companyName ?? settings.value.companyName,
          phoneNumber: response.phoneNumber || '',
          contactEmail: response.contactEmail || '',
          address: response.address || ''
        }
        isLoaded.value = true
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
      // Keep default values on error
    } finally {
      isLoading.value = false
    }
  }

  // Helper function to format phone number for tel: links (remove spaces and special chars)
  const formatPhoneForTel = (phone: string) => {
    return phone.replace(/\s+/g, '').replace(/[^\d+]/g, '')
  }

  // Helper function to format phone number for WhatsApp links
  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/\s+/g, '').replace(/[^\d]/g, '')
  }

  const telHref = (phone: string) => {
    const formatted = formatPhoneForTel(phone)
    return /^\+?[0-9]{6,15}$/.test(formatted) ? `tel:${formatted}` : ''
  }

  const mailHref = (email: string) => {
    const value = email.trim()
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? `mailto:${value}` : ''
  }

  const whatsAppHref = (phone: string, text?: string) => {
    const digits = formatPhoneForWhatsApp(phone)
    if (!/^[0-9]{6,15}$/.test(digits)) return ''
    const base = `https://wa.me/${digits}`
    return text ? `${base}?text=${encodeURIComponent(text)}` : base
  }

  return {
    settings: readonly(settings),
    isLoading: readonly(isLoading),
    loadSettings,
    formatPhoneForTel,
    formatPhoneForWhatsApp,
    telHref,
    mailHref,
    whatsAppHref
  }
}
