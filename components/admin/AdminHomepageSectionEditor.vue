<template>
  <div class="admin-section">
    <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="admin-section__body">
      <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
      <main class="admin-section__main">
        <div class="admin-section__container">
          <div class="admin-section__header">
            <div>
              <button class="admin-section__back" type="button" @click="navigateTo('/admin/homepage')">
                ← Homepage
              </button>
              <h1 class="admin-section__title">{{ meta?.title || sectionKey }}</h1>
              <p class="admin-section__subtitle">{{ meta?.description }}</p>
            </div>
            <button
              v-if="schema?.items"
              class="admin-section__btn admin-section__btn--secondary"
              type="button"
              @click="addItem"
            >
              <Plus class="icon" />
              {{ schema.items.addLabel }}
            </button>
          </div>

          <div
            v-if="message"
            class="admin-section__alert"
            :class="messageType === 'success' ? 'admin-section__alert--success' : 'admin-section__alert--error'"
          >
            {{ message }}
          </div>

          <div v-if="!isValidSection" class="admin-section__loading">
            Unknown section.
          </div>
          <div v-else-if="loading" class="admin-section__loading">Loading section…</div>

          <template v-else>
            <div v-if="schema?.fields?.length" class="admin-section__card">
              <h2 class="admin-section__card-title">Section content</h2>
              <div class="admin-section__fields">
                <div
                  v-for="field in schema.fields"
                  :key="field.key"
                  class="admin-section__field"
                >
                  <AdminImageField
                    v-if="field.type === 'image'"
                    v-model="content[field.key]"
                    :label="field.label"
                  />
                  <template v-else>
                    <label class="admin-section__label">{{ field.label }}</label>
                    <textarea
                      v-if="field.type === 'textarea'"
                      v-model="content[field.key]"
                      rows="3"
                      class="admin-section__input"
                    />
                    <input
                      v-else
                      v-model="content[field.key]"
                      :type="field.type === 'url' ? 'url' : 'text'"
                      class="admin-section__input"
                    />
                  </template>
                </div>
              </div>
            </div>

            <div v-if="schema?.items" class="admin-section__list">
              <h2 class="admin-section__card-title">{{ schema.items.label }}</h2>

              <div
                v-for="(item, index) in items"
                :key="item._key"
                class="admin-section__card"
              >
                <div class="admin-section__card-top">
                  <h3 class="admin-section__item-title">Item {{ index + 1 }}</h3>
                  <div class="admin-section__card-actions">
                    <button
                      class="admin-section__icon-btn"
                      type="button"
                      :disabled="index === 0"
                      title="Move up"
                      @click="moveItem(index, -1)"
                    >
                      <ArrowUp class="icon" />
                    </button>
                    <button
                      class="admin-section__icon-btn"
                      type="button"
                      :disabled="index === items.length - 1"
                      title="Move down"
                      @click="moveItem(index, 1)"
                    >
                      <ArrowDown class="icon" />
                    </button>
                    <button
                      class="admin-section__icon-btn admin-section__icon-btn--danger"
                      type="button"
                      title="Remove"
                      @click="removeItem(index)"
                    >
                      <Trash2 class="icon" />
                    </button>
                  </div>
                </div>

                <div
                  class="admin-section__fields"
                  :class="{ 'admin-section__fields--media-left': schema.items.layout === 'media-left' }"
                >
                  <div
                    v-if="schema.items.layout === 'media-left'"
                    class="admin-section__media"
                  >
                    <div
                      v-for="field in schema.items.fields.filter((f) => f.type === 'image')"
                      :key="`media-${field.key}`"
                      class="admin-section__field"
                    >
                      <AdminImageField
                        v-model="item[field.key]"
                        :label="field.label"
                      />
                    </div>
                  </div>

                  <div class="admin-section__fields-main">
                    <div
                      v-for="field in itemFields(schema.items)"
                      :key="field.key"
                      class="admin-section__field"
                    >
                      <AdminImageField
                        v-if="field.type === 'image'"
                        v-model="item[field.key]"
                        :label="field.label"
                      />
                      <template v-else>
                        <label class="admin-section__label">{{ field.label }}</label>
                        <textarea
                          v-if="field.type === 'textarea'"
                          v-model="item[field.key]"
                          rows="3"
                          class="admin-section__input"
                        />
                        <input
                          v-else
                          v-model="item[field.key]"
                          :type="field.type === 'url' ? 'url' : 'text'"
                          class="admin-section__input"
                        />
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="admin-section__actions">
              <button
                class="admin-section__btn admin-section__btn--primary"
                type="button"
                :disabled="saving"
                @click="saveSection"
              >
                <span v-if="saving" class="admin-section__spinner" />
                Save changes
              </button>
            </div>
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-vue-next'
import {
  HOMEPAGE_SECTION_META,
  SECTION_FORM_SCHEMAS,
  type HomepageSectionKey,
  type ItemSchema
} from '~/utils/homepage-section-forms'

const props = defineProps<{
  section: HomepageSectionKey
}>()

const sidebarOpen = ref(false)
const loading = ref(true)
const saving = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const content = ref<Record<string, any>>({})
const items = ref<Array<Record<string, any>>>([])

let keyCounter = 0
const nextKey = () => `item-${Date.now()}-${keyCounter++}`

const sectionKey = computed(() => props.section)
const isValidSection = computed(() => sectionKey.value in SECTION_FORM_SCHEMAS)
const schema = computed(() =>
  isValidSection.value ? SECTION_FORM_SCHEMAS[sectionKey.value] : null
)
const meta = computed(() =>
  HOMEPAGE_SECTION_META.find((item) => item.key === sectionKey.value)
)

const itemFields = (itemsSchema: ItemSchema) => {
  if (itemsSchema.layout === 'media-left') {
    return itemsSchema.fields.filter((field) => field.type !== 'image')
  }
  return itemsSchema.fields
}

const hydrate = (payload: Record<string, any>) => {
  const next = { ...payload }
  if (schema.value?.items) {
    const list = Array.isArray(payload[schema.value.items.key])
      ? payload[schema.value.items.key]
      : []
    items.value = list.map((item: Record<string, any>) => ({
      _key: nextKey(),
      ...item
    }))
    delete next[schema.value.items.key]
  } else {
    items.value = []
  }
  content.value = next
}

const loadSection = async () => {
  if (!isValidSection.value) {
    loading.value = false
    return
  }

  loading.value = true
  message.value = ''
  try {
    const response = await $fetch<{ content: Record<string, any> }>(
      `/api/admin/homepage/${sectionKey.value}`
    )
    hydrate(response.content || {})
  } catch (error: any) {
    message.value = error.data?.message || 'Failed to load section'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

const saveSection = async () => {
  if (!schema.value) return

  saving.value = true
  message.value = ''
  try {
    const payload: Record<string, any> = { ...content.value }
    if (schema.value.items) {
      payload[schema.value.items.key] = items.value.map(({ _key, ...rest }) => rest)
    }

    const response = await $fetch<{ content: Record<string, any> }>(
      `/api/admin/homepage/${sectionKey.value}`,
      {
        method: 'PUT',
        body: { content: payload }
      }
    )

    hydrate(response.content || payload)
    message.value = 'Section saved successfully!'
    messageType.value = 'success'
    setTimeout(() => {
      message.value = ''
    }, 3000)
  } catch (error: any) {
    message.value = error.data?.message || 'Failed to save section'
    messageType.value = 'error'
  } finally {
    saving.value = false
  }
}

const addItem = () => {
  if (!schema.value?.items || !schema.value.emptyItem) return
  items.value.push({
    _key: nextKey(),
    ...schema.value.emptyItem
  })
}

const removeItem = (index: number) => {
  if (!confirm('Remove this item?')) return
  items.value.splice(index, 1)
}

const moveItem = (index: number, direction: number) => {
  const target = index + direction
  if (target < 0 || target >= items.value.length) return
  const copy = [...items.value]
  const [item] = copy.splice(index, 1)
  copy.splice(target, 0, item)
  items.value = copy
}

watch(sectionKey, () => {
  loadSection()
})

onMounted(loadSection)

useHead({
  title: computed(() => `${meta.value?.title || 'Section'} - Admin - VanTrans82`)
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-section {
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;

    @include respond-to(sm) {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }
  }

  &__back {
    display: inline-block;
    margin-bottom: 0.5rem;
    border: none;
    background: none;
    color: var(--color-brand);
    font: inherit;
    cursor: pointer;
    padding: 0;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 0.35rem;

    @include respond-to(sm) {
      font-size: 1.875rem;
    }
  }

  &__subtitle {
    margin: 0;
    color: var(--color-text-muted);
  }

  &__alert {
    margin-bottom: 1rem;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);

    &--success {
      background: #ecfdf5;
      color: #047857;
    }

    &--error {
      background: #fef2f2;
      color: #b91c1c;
    }
  }

  &__loading {
    padding: 2rem;
    color: var(--color-text-muted);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  &__card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 1.25rem;
    margin-bottom: 1rem;
  }

  &__card-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 1rem;
    color: var(--color-text);
  }

  &__card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  &__item-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  &__card-actions {
    display: flex;
    gap: 0.5rem;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &--media-left {
      @include respond-to(md) {
        display: grid;
        grid-template-columns: minmax(14rem, 18rem) minmax(0, 1fr);
        gap: 1.25rem;
        align-items: start;
      }
    }
  }

  &__media {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__fields-main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 0;
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

    &--danger {
      color: var(--color-danger);
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
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

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--primary {
      background: var(--color-brand);
      color: $color-text-inverse;
    }

    &--secondary {
      background: #e5e7eb;
      color: var(--color-text-secondary);
    }
  }

  &__spinner {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: $radius-full;
    border: 2px solid transparent;
    border-bottom-color: currentColor;
    animation: admin-section-spin 0.75s linear infinite;
  }
}

@keyframes admin-section-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
