export const useSettings = () => {
  const settings = useState('publicSettings', () => ({
    showLanguageSwitch: true,
    companyName: 'VanTrans82',
    phoneNumber: '+40 123 456 789',
    contactEmail: 'contact@vantrans82.ro',
    address: 'Str. Logistica nr. 123\nBucharest, Romania'
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
      const response = await $fetch('/api/settings/public')
      if (response) {
        settings.value = {
          showLanguageSwitch: response.showLanguageSwitch ?? settings.value.showLanguageSwitch,
          companyName: response.companyName ?? settings.value.companyName,
          phoneNumber: response.phoneNumber ?? settings.value.phoneNumber,
          contactEmail: response.contactEmail ?? settings.value.contactEmail,
          address: response.address ?? settings.value.address
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

  return {
    settings: readonly(settings),
    isLoading: readonly(isLoading),
    loadSettings,
    formatPhoneForTel,
    formatPhoneForWhatsApp
  }
}
