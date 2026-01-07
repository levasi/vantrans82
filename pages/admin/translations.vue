<template>
    <div class="min-h-screen bg-gray-50">
        <AdminHeader />
        <div class="flex">
            <AdminSidebar />
            <main class="flex-1 p-8">
                <div class="max-w-7xl mx-auto">
                    <!-- Header -->
                    <div class="mb-8">
                        <h1 class="text-3xl font-bold text-gray-900 mb-2">Translations</h1>
                        <p class="text-gray-600">Manage all translated texts for your website</p>
                    </div>

                    <!-- Search Bar -->
                    <div class="mb-6">
                        <div class="relative">
                            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input v-model="searchQuery" type="text" placeholder="Search by key or translation..."
                                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" />
                            <button v-if="searchQuery" @click="searchQuery = ''"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <X class="w-5 h-5" />
                            </button>
                        </div>
                        <div v-if="searchQuery" class="mt-2 text-sm text-gray-600">
                            Found {{ filteredTranslationsCount }} translation(s)
                        </div>
                    </div>

                    <!-- Save Button -->
                    <div class="mb-6 flex justify-end">
                        <button @click="saveTranslations" :disabled="saving"
                            class="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                            <Save v-if="!saving" class="w-5 h-5" />
                            <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            {{ saving ? 'Saving...' : 'Save Changes' }}
                        </button>
                    </div>

                    <!-- Success/Error Messages -->
                    <div v-if="message" :class="[
                        'mb-6 p-4 rounded-lg',
                        messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                    ]">
                        {{ message }}
                    </div>

                    <!-- Translations Table -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Key</th>
                                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            <div class="flex items-center gap-2">
                                                <span class="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                                                English (EN)
                                            </div>
                                        </th>
                                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            <div class="flex items-center gap-2">
                                                <span class="inline-block w-2 h-2 rounded-full bg-red-600"></span>
                                                Română (RO)
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    <tr v-for="(translation, key) in filteredTranslations" :key="key"
                                        class="hover:bg-gray-50">
                                        <td class="px-6 py-4 text-sm font-mono text-gray-600 align-top">
                                            <span v-html="highlightMatch(key, searchQuery)"></span>
                                        </td>
                                        <td class="px-6 py-4 align-top">
                                            <input v-model="translation.en" type="text"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                                                placeholder="Enter English translation" />
                                        </td>
                                        <td class="px-6 py-4 align-top">
                                            <input v-model="translation.ro" type="text"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                                                placeholder="Introdu traducerea în română" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="Object.keys(flattenedTranslations).length === 0" class="text-center py-12">
                        <p class="text-gray-500">No translations found</p>
                    </div>
                    <div v-else-if="Object.keys(filteredTranslations).length === 0 && searchQuery"
                        class="text-center py-12">
                        <p class="text-gray-500">No translations match your search query</p>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Save, Search, X } from 'lucide-vue-next'

definePageMeta({
    middleware: 'admin',
    layout: false
})

// Auth is handled by middleware

const translationsEn = ref<Record<string, any>>({})
const translationsRo = ref<Record<string, any>>({})
const saving = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const searchQuery = ref('')

// Flatten nested translation object for display with both languages
const flattenedTranslations = ref<Record<string, { en: string; ro: string }>>({})

// Filter translations based on search query
const filteredTranslations = computed(() => {
    if (!searchQuery.value.trim()) {
        return flattenedTranslations.value
    }

    const query = searchQuery.value.toLowerCase().trim()
    const filtered: Record<string, { en: string; ro: string }> = {}

    for (const [key, translation] of Object.entries(flattenedTranslations.value)) {
        const keyMatch = key.toLowerCase().includes(query)
        const enMatch = translation.en.toLowerCase().includes(query)
        const roMatch = translation.ro.toLowerCase().includes(query)

        if (keyMatch || enMatch || roMatch) {
            filtered[key] = translation
        }
    }

    return filtered
})

// Count of filtered translations
const filteredTranslationsCount = computed(() => {
    return Object.keys(filteredTranslations.value).length
})

// Highlight matching text in search results
const highlightMatch = (text: string, query: string): string => {
    if (!query.trim()) {
        return text
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}

const flattenTranslations = (obj: any, prefix = ''): Record<string, string> => {
    const result: Record<string, string> = {}

    for (const key in obj) {
        const newKey = prefix ? `${prefix}.${key}` : key

        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            Object.assign(result, flattenTranslations(obj[key], newKey))
        } else {
            result[newKey] = String(obj[key] || '')
        }
    }

    return result
}

// Merge flattened translations from both languages
const mergeTranslations = (en: Record<string, string>, ro: Record<string, string>): Record<string, { en: string; ro: string }> => {
    const allKeys = new Set([...Object.keys(en), ...Object.keys(ro)])
    const merged: Record<string, { en: string; ro: string }> = {}

    for (const key of allKeys) {
        merged[key] = {
            en: en[key] || '',
            ro: ro[key] || ''
        }
    }

    return merged
}

// Load translations for both languages
const loadTranslations = async () => {
    try {
        const [enResponse, roResponse] = await Promise.all([
            $fetch('/api/admin/translations/en') as Promise<{ translations: Record<string, any> }>,
            $fetch('/api/admin/translations/ro') as Promise<{ translations: Record<string, any> }>
        ])

        translationsEn.value = enResponse.translations || {}
        translationsRo.value = roResponse.translations || {}

        const flattenedEn = flattenTranslations(translationsEn.value)
        const flattenedRo = flattenTranslations(translationsRo.value)

        flattenedTranslations.value = mergeTranslations(flattenedEn, flattenedRo)
        message.value = ''
    } catch (error: any) {
        message.value = error.data?.message || 'Failed to load translations'
        messageType.value = 'error'
    }
}

// Save translations
const saveTranslations = async () => {
    saving.value = true
    message.value = ''

    try {
        // Reconstruct nested object from flattened structure
        const reconstruct = (flat: Record<string, string>): Record<string, any> => {
            const result: Record<string, any> = {}

            for (const key in flat) {
                const keys = key.split('.')
                let current = result

                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) {
                        current[keys[i]] = {}
                    }
                    current = current[keys[i]]
                }

                current[keys[keys.length - 1]] = flat[key]
            }

            return result
        }

        // Separate EN and RO translations
        const enFlat: Record<string, string> = {}
        const roFlat: Record<string, string> = {}

        for (const [key, translation] of Object.entries(flattenedTranslations.value)) {
            enFlat[key] = translation.en
            roFlat[key] = translation.ro
        }

        const nestedEn = reconstruct(enFlat)
        const nestedRo = reconstruct(roFlat)

        // Save both languages
        await Promise.all([
            $fetch('/api/admin/translations/en', {
                method: 'PUT',
                body: { translations: nestedEn }
            }),
            $fetch('/api/admin/translations/ro', {
                method: 'PUT',
                body: { translations: nestedRo }
            })
        ])

        // Update the translations objects
        translationsEn.value = nestedEn
        translationsRo.value = nestedRo

        message.value = 'Translations saved successfully!'
        messageType.value = 'success'

        // Clear message after 3 seconds
        setTimeout(() => {
            message.value = ''
        }, 3000)
    } catch (error: any) {
        message.value = error.data?.message || 'Failed to save translations'
        messageType.value = 'error'
    } finally {
        saving.value = false
    }
}

// Load translations on mount
onMounted(async () => {
    await loadTranslations()
})

useHead({
    title: 'Translations - Admin - VanTrans82'
})
</script>
