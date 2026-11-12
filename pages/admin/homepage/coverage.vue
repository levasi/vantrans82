<template>
  <div class="admin-coverage">
    <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="admin-coverage__body">
      <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
      <main class="admin-coverage__main">
        <div class="admin-coverage__container">
          <div class="admin-coverage__header">
            <div>
              <h1 class="admin-coverage__title">Coverage</h1>
              <p class="admin-coverage__subtitle">Manage the Acoperire section on the landing page</p>
            </div>
          </div>

          <div
            v-if="message"
            class="admin-coverage__alert"
            :class="messageType === 'success' ? 'admin-coverage__alert--success' : 'admin-coverage__alert--error'"
          >
            {{ message }}
          </div>

          <div v-if="loading" class="admin-coverage__loading">Loading coverage…</div>

          <template v-else>
            <div class="admin-coverage__card">
              <h2 class="admin-coverage__card-title">Section content</h2>
              <div class="admin-coverage__fields">
                <div class="admin-coverage__grid">
                  <div class="admin-coverage__field">
                    <label class="admin-coverage__label">Title (RO)</label>
                    <input v-model="content.title_ro" type="text" class="admin-coverage__input" />
                  </div>
                  <div class="admin-coverage__field">
                    <label class="admin-coverage__label">Title (EN)</label>
                    <input v-model="content.title_en" type="text" class="admin-coverage__input" />
                  </div>
                </div>

                <div class="admin-coverage__field">
                  <label class="admin-coverage__label">Subtitle (RO)</label>
                  <textarea v-model="content.subtitle_ro" rows="3" class="admin-coverage__input" />
                </div>
                <div class="admin-coverage__field">
                  <label class="admin-coverage__label">Subtitle (EN)</label>
                  <textarea v-model="content.subtitle_en" rows="3" class="admin-coverage__input" />
                </div>

                <div class="admin-coverage__grid">
                  <div class="admin-coverage__field">
                    <label class="admin-coverage__label">Callout title (RO)</label>
                    <input v-model="content.callout_title_ro" type="text" class="admin-coverage__input" />
                  </div>
                  <div class="admin-coverage__field">
                    <label class="admin-coverage__label">Callout title (EN)</label>
                    <input v-model="content.callout_title_en" type="text" class="admin-coverage__input" />
                  </div>
                </div>

                <div class="admin-coverage__field">
                  <label class="admin-coverage__label">Callout description (RO)</label>
                  <textarea v-model="content.callout_desc_ro" rows="3" class="admin-coverage__input" />
                </div>
                <div class="admin-coverage__field">
                  <label class="admin-coverage__label">Callout description (EN)</label>
                  <textarea v-model="content.callout_desc_en" rows="3" class="admin-coverage__input" />
                </div>

                <AdminImageField v-model="content.map_image_url" label="Map image" />
              </div>
            </div>

            <div class="admin-coverage__card">
              <div class="admin-coverage__card-top">
                <h2 class="admin-coverage__card-title">Regions</h2>
                <button class="admin-coverage__btn admin-coverage__btn--secondary" type="button" @click="addRegion">
                  <Plus class="icon" />
                  Add region
                </button>
              </div>

              <div class="admin-coverage__regions">
                <div v-for="(region, index) in regions" :key="region._key" class="admin-coverage__region">
                  <div class="admin-coverage__region-top">
                    <span class="admin-coverage__region-label">Region {{ index + 1 }}</span>
                    <div class="admin-coverage__card-actions">
                      <button
                        class="admin-coverage__icon-btn"
                        type="button"
                        :disabled="index === 0"
                        title="Move up"
                        @click="moveRegion(index, -1)"
                      >
                        <ArrowUp class="icon" />
                      </button>
                      <button
                        class="admin-coverage__icon-btn"
                        type="button"
                        :disabled="index === regions.length - 1"
                        title="Move down"
                        @click="moveRegion(index, 1)"
                      >
                        <ArrowDown class="icon" />
                      </button>
                      <button
                        class="admin-coverage__icon-btn admin-coverage__icon-btn--danger"
                        type="button"
                        title="Remove"
                        @click="removeRegion(index)"
                      >
                        <Trash2 class="icon" />
                      </button>
                    </div>
                  </div>

                  <div class="admin-coverage__grid">
                    <div class="admin-coverage__field">
                      <label class="admin-coverage__label">Name (RO)</label>
                      <input v-model="region.name_ro" type="text" class="admin-coverage__input" />
                    </div>
                    <div class="admin-coverage__field">
                      <label class="admin-coverage__label">Name (EN)</label>
                      <input v-model="region.name_en" type="text" class="admin-coverage__input" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="admin-coverage__actions">
              <button class="admin-coverage__btn admin-coverage__btn--secondary" type="button" :disabled="saving" @click="loadCoverage">
                Reset
              </button>
              <button
                class="admin-coverage__btn admin-coverage__btn--primary"
                type="button"
                :disabled="saving || loading"
                @click="saveCoverage"
              >
                <Save v-if="!saving" class="icon" />
                <div v-else class="admin-coverage__spinner"></div>
                {{ saving ? 'Saving…' : 'Save Coverage' }}
              </button>
            </div>
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Save, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-vue-next'

definePageMeta({
  middleware: 'admin',
  layout: false
})

type EditableRegion = {
  _key: string
  id?: number
  name_ro: string
  name_en: string
}

type CoverageContent = {
  title_ro: string
  title_en: string
  subtitle_ro: string
  subtitle_en: string
  callout_title_ro: string
  callout_title_en: string
  callout_desc_ro: string
  callout_desc_en: string
  map_image_url: string
}

const sidebarOpen = ref(false)
const loading = ref(true)
const saving = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const content = ref<CoverageContent>({
  title_ro: '',
  title_en: '',
  subtitle_ro: '',
  subtitle_en: '',
  callout_title_ro: '',
  callout_title_en: '',
  callout_desc_ro: '',
  callout_desc_en: '',
  map_image_url: ''
})

const regions = ref<EditableRegion[]>([])

let keyCounter = 0
const nextKey = () => `coverage-${Date.now()}-${keyCounter++}`

const emptyRegion = (): EditableRegion => ({
  _key: nextKey(),
  name_ro: '',
  name_en: ''
})

const loadCoverage = async () => {
  loading.value = true
  message.value = ''
  try {
    const response = await $fetch<{ content: CoverageContent; regions: any[] }>('/api/admin/coverage')
    content.value = { ...content.value, ...response.content }
    regions.value = (response.regions || []).map((region) => ({
      _key: nextKey(),
      id: region.id,
      name_ro: region.name_ro || '',
      name_en: region.name_en || ''
    }))
  } catch (error: any) {
    message.value = error.data?.message || 'Failed to load coverage'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

const saveCoverage = async () => {
  saving.value = true
  message.value = ''
  try {
    const response = await $fetch<{ content: CoverageContent; regions: any[] }>('/api/admin/coverage', {
      method: 'PUT',
      body: {
        content: content.value,
        regions: regions.value.map((region, index) => ({
          name_ro: region.name_ro,
          name_en: region.name_en,
          sort_order: index
        }))
      }
    })

    content.value = { ...content.value, ...response.content }
    regions.value = (response.regions || []).map((region) => ({
      _key: nextKey(),
      id: region.id,
      name_ro: region.name_ro || '',
      name_en: region.name_en || ''
    }))

    message.value = 'Coverage saved successfully!'
    messageType.value = 'success'
    setTimeout(() => {
      message.value = ''
    }, 3000)
  } catch (error: any) {
    message.value = error.data?.message || 'Failed to save coverage'
    messageType.value = 'error'
  } finally {
    saving.value = false
  }
}

const addRegion = () => {
  regions.value.push(emptyRegion())
}

const removeRegion = (index: number) => {
  if (!confirm('Remove this region?')) return
  regions.value.splice(index, 1)
}

const moveRegion = (index: number, direction: number) => {
  const target = index + direction
  if (target < 0 || target >= regions.value.length) return
  const copy = [...regions.value]
  const [item] = copy.splice(index, 1)
  copy.splice(target, 0, item)
  regions.value = copy
}

onMounted(loadCoverage)

useHead({
  title: 'Coverage - Admin - VanTrans82'
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-coverage {
  min-height: 100vh;
  background: var(--color-muted);

  &__body {
    display: flex;
  }

  &__main {
    flex: 1;
    padding: 1rem;

    @include respond-to(sm) {
      padding: 1.5rem;
    }

    @include respond-to(lg) {
      padding: 2rem;
    }
  }

  &__container {
    max-width: $container-max;
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

  &__loading {
    padding: 2rem;
    text-align: center;
    color: var(--color-text-muted);
  }

  &__card {
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-border);
    padding: 1rem;
    margin-bottom: 1.5rem;

    @include respond-to(sm) {
      padding: 1.5rem;
    }
  }

  &__card-top {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;

    @include respond-to(sm) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__card-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 1rem;
  }

  &__card-top &__card-title {
    margin: 0;
  }

  &__fields,
  &__regions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__region {
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-muted);
  }

  &__region-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  &__region-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  &__card-actions {
    display: flex;
    gap: 0.5rem;
  }

  &__icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    cursor: pointer;
    color: var(--color-text-secondary);

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: #f3f4f6;
    }

    &--danger {
      color: var(--color-danger);

      &:hover:not(:disabled) {
        background: #fef2f2;
      }
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    margin-bottom: 0.5rem;
  }

  &__input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid $color-border-strong;
    border-radius: var(--radius-md);
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    box-sizing: border-box;
    resize: vertical;
    background: var(--color-surface);

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px var(--color-brand);
    }
  }

  &__preview {
    border-radius: var(--radius-lg);
    overflow: hidden;
    height: 12rem;
    background: var(--color-muted);
  }

  &__preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1rem;

    @include respond-to(sm) {
      flex-direction: row;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--primary {
      background: var(--color-brand);
      color: $color-text-inverse;

      &:hover:not(:disabled) {
        background: var(--color-brand-dark);
      }
    }

    &--secondary {
      background: #e5e7eb;
      color: var(--color-text-secondary);

      &:hover:not(:disabled) {
        background: $color-border-strong;
      }
    }
  }

  &__spinner {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: $radius-full;
    border: 2px solid transparent;
    border-bottom-color: currentColor;
    animation: admin-coverage-spin 0.75s linear infinite;
  }
}

@keyframes admin-coverage-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
