<template>
    <div class="admin-translations">
        <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
        <div class="admin-translations__body">
            <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
            <main class="admin-translations__main">
                <div class="admin-translations__container">
                    <!-- Header -->
                    <div class="admin-translations__header">
                        <h1 class="admin-translations__title">Translations</h1>
                        <p class="admin-translations__subtitle">Manage all translated texts for your website</p>
                    </div>

                    <!-- Language Switch Toggle -->
                    <div class="admin-translations__card admin-translations__card--toggle">
                        <div class="admin-translations__toggle-row">
                            <div>
                                <h3 class="admin-translations__toggle-title">Language Switcher</h3>
                                <p class="admin-translations__toggle-desc">Show or hide the language switcher in the storefront
                                </p>
                            </div>
                            <label class="admin-translations__switch">
                                <input type="checkbox" v-model="showLanguageSwitch" @change="saveLanguageSwitchSetting"
                                    class="admin-translations__switch-input" />
                                <span class="admin-translations__switch-track" aria-hidden="true"></span>
                            </label>
                        </div>
                    </div>

                    <!-- Search Bar -->
                    <div class="admin-translations__search">
                        <div class="admin-translations__search-wrap">
                            <Search class="icon admin-translations__search-icon" />
                            <input v-model="searchQuery" type="text" placeholder="Search by key or translation..."
                                class="admin-translations__search-input" />
                            <button v-if="searchQuery" @click="searchQuery = ''"
                                class="admin-translations__search-clear" type="button">
                                <X class="icon" />
                            </button>
                        </div>
                        <div v-if="searchQuery" class="admin-translations__search-count">
                            Found {{ filteredTranslationsCount }} translation(s)
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="admin-translations__actions">
                        <button @click="importFromFiles" :disabled="importing || saving"
                            class="admin-translations__btn admin-translations__btn--secondary" type="button">
                            <div v-if="importing" class="admin-translations__spinner admin-translations__spinner--muted"></div>
                            {{ importing ? 'Importing...' : 'Import from JSON files' }}
                        </button>
                        <button @click="saveTranslations" :disabled="saving || importing"
                            class="admin-translations__btn admin-translations__btn--primary" type="button">
                            <Save v-if="!saving" class="icon" />
                            <div v-else class="admin-translations__spinner"></div>
                            {{ saving ? 'Saving...' : 'Save Changes' }}
                        </button>
                    </div>

                    <!-- Success/Error Messages -->
                    <div
                        v-if="message"
                        class="admin-translations__alert"
                        :class="messageType === 'success' ? 'admin-translations__alert--success' : 'admin-translations__alert--error'"
                    >
                        {{ message }}
                    </div>

                    <!-- Translations Table -->
                    <div class="admin-translations__table-card">
                        <div class="admin-translations__table-scroll">
                            <table class="admin-translations__table">
                                <thead class="admin-translations__thead">
                                    <tr>
                                        <th class="admin-translations__th">Key</th>
                                        <th class="admin-translations__th">
                                            <div class="admin-translations__lang">
                                                <span class="admin-translations__dot admin-translations__dot--en"></span>
                                                <span class="admin-translations__lang-full">English (EN)</span>
                                                <span class="admin-translations__lang-short">EN</span>
                                            </div>
                                        </th>
                                        <th class="admin-translations__th">
                                            <div class="admin-translations__lang">
                                                <span class="admin-translations__dot admin-translations__dot--ro"></span>
                                                <span class="admin-translations__lang-full">Română (RO)</span>
                                                <span class="admin-translations__lang-short">RO</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="admin-translations__tbody">
                                    <tr v-for="(translation, key) in filteredTranslations" :key="key"
                                        class="admin-translations__row">
                                        <td class="admin-translations__td admin-translations__td--key">
                                            <span v-html="highlightMatch(key, searchQuery)"></span>
                                        </td>
                                        <td class="admin-translations__td">
                                            <input v-model="translation.en" type="text"
                                                class="admin-translations__cell-input"
                                                placeholder="Enter English translation" />
                                        </td>
                                        <td class="admin-translations__td">
                                            <input v-model="translation.ro" type="text"
                                                class="admin-translations__cell-input"
                                                placeholder="Introdu traducerea în română" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="Object.keys(flattenedTranslations).length === 0" class="admin-translations__empty">
                        <p class="admin-translations__empty-text">No translations found</p>
                    </div>
                    <div v-else-if="Object.keys(filteredTranslations).length === 0 && searchQuery"
                        class="admin-translations__empty">
                        <p class="admin-translations__empty-text">No translations match your search query</p>
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

const sidebarOpen = ref(false)

// Auth is handled by middleware

const translationsEn = ref<Record<string, any>>({})
const translationsRo = ref<Record<string, any>>({})
const showLanguageSwitch = ref(true)
const saving = ref(false)
const importing = ref(false)
const savingLanguageSwitch = ref(false)
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
    return text.replace(regex, '<mark class="admin-translations__highlight">$1</mark>')
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

const importFromFiles = async () => {
    importing.value = true
    message.value = ''

    try {
        const response = await $fetch('/api/admin/translations/sync', {
            method: 'POST',
            body: { force: true }
        }) as { message?: string; synced?: string[]; errors?: Array<{ lang: string; error: string }> }

        await loadTranslations()
        message.value = response.message || 'Translations imported successfully'
        messageType.value = 'success'

        if (response.errors?.length) {
            message.value += ` (${response.errors.map(e => e.lang).join(', ')} failed)`
            messageType.value = 'error'
        }
    } catch (error: any) {
        message.value = error.data?.message || 'Failed to import translations'
        messageType.value = 'error'
    } finally {
        importing.value = false
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

// Load language switch setting
const loadLanguageSwitchSetting = async () => {
    try {
        const response = await $fetch('/api/admin/settings') as { success: boolean; settings: any }
        if (response.settings && typeof response.settings.showLanguageSwitch !== 'undefined') {
            showLanguageSwitch.value = response.settings.showLanguageSwitch
        }
    } catch (error: any) {
        console.error('Failed to load language switch setting:', error)
    }
}

// Save language switch setting
const saveLanguageSwitchSetting = async () => {
    savingLanguageSwitch.value = true
    try {
        await $fetch('/api/admin/settings', {
            method: 'PUT',
            body: {
                settings: {
                    showLanguageSwitch: showLanguageSwitch.value
                }
            }
        })
        message.value = 'Language switch setting saved successfully!'
        messageType.value = 'success'
        setTimeout(() => {
            message.value = ''
        }, 3000)
    } catch (error: any) {
        message.value = error.data?.message || 'Failed to save language switch setting'
        messageType.value = 'error'
    } finally {
        savingLanguageSwitch.value = false
    }
}

// Load translations on mount
onMounted(async () => {
    await Promise.all([loadTranslations(), loadLanguageSwitchSetting()])
})

useHead({
    title: 'Translations - Admin - VanTrans82'
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-translations {
  min-height: 100vh;
  background: var(--color-muted);

  &__body {
    display: flex;
  }

  &__main {
    flex: 1;
    padding: 1rem;
    overflow-x: hidden;

    @include respond-to(sm) {
      padding: 1.5rem;
    }

    @include respond-to(lg) {
      padding: 2rem;
      margin-left: 0;
    }
  }

  &__container {
    max-width: $container-max;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  &__header {
    margin-bottom: 1.5rem;

    @include respond-to(sm) {
      margin-bottom: 2rem;
    }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 0.5rem;

    @include respond-to(sm) {
      font-size: 1.875rem;
    }
  }

  &__subtitle {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin: 0;

    @include respond-to(sm) {
      font-size: 1rem;
    }
  }

  &__card {
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-border);

    &--toggle {
      margin-bottom: 1.5rem;
      padding: 1rem;

      @include respond-to(sm) {
        padding: 1.5rem;
      }
    }
  }

  &__toggle-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @include respond-to(sm) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__toggle-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 0.25rem;

    @include respond-to(sm) {
      font-size: 1.125rem;
    }
  }

  &__toggle-desc {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin: 0;

    @include respond-to(sm) {
      font-size: 0.875rem;
    }
  }

  &__switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  &__switch-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;

    &:focus-visible + .admin-translations__switch-track {
      box-shadow: 0 0 0 4px rgba($color-brand-mid, 0.35);
    }

    &:checked + .admin-translations__switch-track {
      background: var(--color-brand);

      &::after {
        transform: translateX(1.25rem);
        border-color: $color-text-inverse;
      }
    }
  }

  &__switch-track {
    width: 2.75rem;
    height: 1.5rem;
    background: #e5e7eb;
    border-radius: $radius-full;
    position: relative;
    transition: background-color 0.2s;

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 1.25rem;
      height: 1.25rem;
      background: $color-text-inverse;
      border: 1px solid $color-border-strong;
      border-radius: $radius-full;
      transition: transform 0.2s, border-color 0.2s;
    }
  }

  &__search {
    margin-bottom: 1.5rem;
  }

  &__search-wrap {
    position: relative;
  }

  &__search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-faint);
  }

  &__search-input {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 2.5rem;
    border: 1px solid $color-border-strong;
    border-radius: var(--radius-md);
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    box-sizing: border-box;
    transition: box-shadow 0.15s, border-color 0.15s;

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px var(--color-brand);
    }
  }

  &__search-clear {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--color-text-faint);
    display: flex;
    align-items: center;

    &:hover {
      color: var(--color-text-muted);
    }
  }

  &__search-count {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  &__actions {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.75rem;

    @include respond-to(sm) {
      flex-direction: row;
    }
  }

  &__btn {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1.5rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;

    @include respond-to(sm) {
      width: auto;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--primary {
      background: var(--color-brand);
      color: $color-text-inverse;
      border: none;

      &:hover:not(:disabled) {
        background: var(--color-brand-dark);
      }
    }

    &--secondary {
      background: transparent;
      color: var(--color-text-secondary);
      border: 1px solid $color-border-strong;

      &:hover:not(:disabled) {
        background: var(--color-muted);
      }
    }
  }

  &__spinner {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: $radius-full;
    border: 2px solid transparent;
    border-bottom-color: currentColor;
    animation: admin-translations-spin 0.75s linear infinite;

    &--muted {
      border-bottom-color: var(--color-text-muted);
    }
  }

  &__alert {
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: var(--radius-md);

    &--success {
      background: var(--color-success-light);
      color: #166534;
      border: 1px solid #bbf7d0;
    }

    &--error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
  }

  &__table-card {
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-border);
    overflow: hidden;
  }

  &__table-scroll {
    overflow-x: auto;
  }

  &__table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
  }

  &__thead {
    background: var(--color-muted);
    border-bottom: 1px solid var(--color-border);
  }

  &__th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text);

    @include respond-to(sm) {
      padding: 1rem 1.5rem;
      font-size: 0.875rem;
    }
  }

  &__lang {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__dot {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: $radius-full;

    &--en {
      background: $color-brand-mid;
    }

    &--ro {
      background: var(--color-danger);
    }
  }

  &__lang-full {
    display: none;

    @include respond-to(sm) {
      display: inline;
    }
  }

  &__lang-short {
    display: inline;

    @include respond-to(sm) {
      display: none;
    }
  }

  &__tbody {
    tr + tr {
      border-top: 1px solid var(--color-border);
    }
  }

  &__row {
    &:hover {
      background: var(--color-muted);
    }
  }

  &__td {
    padding: 0.75rem 1rem;
    vertical-align: top;

    @include respond-to(sm) {
      padding: 0.75rem 1.5rem;
    }

    &--key {
      font-size: 0.75rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      color: var(--color-text-muted);
      word-break: break-all;

      @include respond-to(sm) {
        font-size: 0.875rem;
      }
    }
  }

  &__cell-input {
    width: 100%;
    padding: 0.5rem;
    font-size: 0.75rem;
    border: 1px solid $color-border-strong;
    border-radius: var(--radius-md);
    outline: none;
    font-family: inherit;
    box-sizing: border-box;
    transition: box-shadow 0.15s, border-color 0.15s;

    @include respond-to(sm) {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    }

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px var(--color-brand);
    }
  }

  &__empty {
    text-align: center;
    padding: 3rem 0;
  }

  &__empty-text {
    color: var(--color-text-faint);
    margin: 0;
  }

  :deep(.admin-translations__highlight) {
    background: #fef08a;
  }
}

@keyframes admin-translations-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
