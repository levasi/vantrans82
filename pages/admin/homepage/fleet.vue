<template>
  <div class="admin-fleet">
    <div class="admin-fleet__header">
      <div>
        <h1 class="admin-fleet__title">Fleet</h1>
        <p class="admin-fleet__subtitle">Manage fleet cards shown on the landing page</p>
      </div>
      <div class="admin-fleet__header-actions">
        <button class="admin-fleet__btn admin-fleet__btn--primary" type="button" :disabled="saving || loading" @click="saveFleet">
          <Save v-if="!saving" class="icon" />
          <div v-else class="admin-fleet__spinner"></div>
          {{ saving ? 'Saving…' : 'Save Fleet' }}
        </button>
        <button class="admin-fleet__btn admin-fleet__btn--secondary" type="button" @click="addVehicle">
          <Plus class="icon" />
          Add vehicle
        </button>
      </div>
    </div>

    <div
      v-if="message"
      class="admin-fleet__alert"
      :class="messageType === 'success' ? 'admin-fleet__alert--success' : 'admin-fleet__alert--error'"
    >
      {{ message }}
    </div>

    <div v-if="loading" class="admin-fleet__loading">Loading fleet…</div>

    <div v-else class="admin-fleet__list">
      <div v-for="(vehicle, index) in vehicles" :key="vehicle._key" class="admin-fleet__card">
        <div class="admin-fleet__card-top">
          <h2 class="admin-fleet__card-title">Vehicle {{ index + 1 }}</h2>
          <div class="admin-fleet__card-actions">
            <button
              class="admin-fleet__icon-btn"
              type="button"
              :disabled="index === 0"
              title="Move up"
              @click="moveVehicle(index, -1)"
            >
              <ArrowUp class="icon" />
            </button>
            <button
              class="admin-fleet__icon-btn"
              type="button"
              :disabled="index === vehicles.length - 1"
              title="Move down"
              @click="moveVehicle(index, 1)"
            >
              <ArrowDown class="icon" />
            </button>
            <button
              class="admin-fleet__icon-btn admin-fleet__icon-btn--danger"
              type="button"
              title="Remove"
              @click="removeVehicle(index)"
            >
              <Trash2 class="icon" />
            </button>
          </div>
        </div>

        <div class="admin-fleet__fields admin-fleet__fields--media-left">
          <div class="admin-fleet__media">
            <AdminImageField v-model="vehicle.image_url" label="Image" />
          </div>

          <div class="admin-fleet__fields-main">
            <div class="admin-fleet__grid">
              <div class="admin-fleet__field">
                <label class="admin-fleet__label">Name (RO)</label>
                <input v-model="vehicle.name_ro" type="text" class="admin-fleet__input" placeholder="Remorci" />
              </div>
              <div class="admin-fleet__field">
                <label class="admin-fleet__label">Name (EN)</label>
                <input v-model="vehicle.name_en" type="text" class="admin-fleet__input" placeholder="Trailers" />
              </div>
            </div>

            <div class="admin-fleet__grid">
              <div class="admin-fleet__field">
                <label class="admin-fleet__label">Capacity (RO)</label>
                <input v-model="vehicle.capacity_ro" type="text" class="admin-fleet__input" placeholder="Până la 24 tone" />
              </div>
              <div class="admin-fleet__field">
                <label class="admin-fleet__label">Capacity (EN)</label>
                <input v-model="vehicle.capacity_en" type="text" class="admin-fleet__input" placeholder="Up to 24 tons" />
              </div>
            </div>

            <div class="admin-fleet__field">
              <label class="admin-fleet__label">Description (RO)</label>
              <textarea v-model="vehicle.description_ro" rows="3" class="admin-fleet__input" />
            </div>

            <div class="admin-fleet__field">
              <label class="admin-fleet__label">Description (EN)</label>
              <textarea v-model="vehicle.description_en" rows="3" class="admin-fleet__input" />
            </div>

            <div class="admin-fleet__field">
              <label class="admin-fleet__label">Icon</label>
              <select v-model="vehicle.icon" class="admin-fleet__input">
                <option v-for="icon in iconOptions" :key="icon" :value="icon">{{ icon }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="admin-fleet__actions">
      <button class="admin-fleet__btn admin-fleet__btn--secondary" type="button" :disabled="saving" @click="loadFleet">
        Reset
      </button>
      <button class="admin-fleet__btn admin-fleet__btn--primary" type="button" :disabled="saving || loading" @click="saveFleet">
        <Save v-if="!saving" class="icon" />
        <div v-else class="admin-fleet__spinner"></div>
        {{ saving ? 'Saving…' : 'Save Fleet' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Save, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-vue-next'

definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

type EditableVehicle = {
  _key: string
  id?: number
  slug?: string
  icon: string
  image_url: string
  name_ro: string
  name_en: string
  capacity_ro: string
  capacity_en: string
  description_ro: string
  description_en: string
}

const iconOptions = ['Package', 'Truck', 'Container', 'Warehouse', 'Bus', 'Car', 'Ship']

const vehicles = ref<EditableVehicle[]>([])
const loading = ref(true)
const saving = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

let keyCounter = 0
const nextKey = () => `fleet-${Date.now()}-${keyCounter++}`

const emptyVehicle = (): EditableVehicle => ({
  _key: nextKey(),
  icon: 'Truck',
  image_url: '',
  name_ro: '',
  name_en: '',
  capacity_ro: '',
  capacity_en: '',
  description_ro: '',
  description_en: ''
})

const loadFleet = async () => {
  loading.value = true
  message.value = ''
  try {
    const response = await $fetch<{ vehicles: any[] }>('/api/admin/fleet')
    vehicles.value = (response.vehicles || []).map((vehicle) => ({
      _key: nextKey(),
      id: vehicle.id,
      slug: vehicle.slug,
      icon: vehicle.icon || 'Truck',
      image_url: vehicle.image_url || '',
      name_ro: vehicle.name_ro || '',
      name_en: vehicle.name_en || '',
      capacity_ro: vehicle.capacity_ro || '',
      capacity_en: vehicle.capacity_en || '',
      description_ro: vehicle.description_ro || '',
      description_en: vehicle.description_en || ''
    }))
  } catch (error: any) {
    message.value = error.data?.message || 'Failed to load fleet'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

const saveFleet = async () => {
  saving.value = true
  message.value = ''
  try {
    const payload = vehicles.value.map((vehicle, index) => ({
      slug: vehicle.slug,
      icon: vehicle.icon,
      image_url: vehicle.image_url,
      sort_order: index,
      name_ro: vehicle.name_ro,
      name_en: vehicle.name_en,
      capacity_ro: vehicle.capacity_ro,
      capacity_en: vehicle.capacity_en,
      description_ro: vehicle.description_ro,
      description_en: vehicle.description_en
    }))

    const response = await $fetch<{ vehicles: any[] }>('/api/admin/fleet', {
      method: 'PUT',
      body: { vehicles: payload }
    })

    vehicles.value = (response.vehicles || []).map((vehicle) => ({
      _key: nextKey(),
      id: vehicle.id,
      slug: vehicle.slug,
      icon: vehicle.icon || 'Truck',
      image_url: vehicle.image_url || '',
      name_ro: vehicle.name_ro || '',
      name_en: vehicle.name_en || '',
      capacity_ro: vehicle.capacity_ro || '',
      capacity_en: vehicle.capacity_en || '',
      description_ro: vehicle.description_ro || '',
      description_en: vehicle.description_en || ''
    }))

    message.value = 'Fleet saved successfully!'
    messageType.value = 'success'
    setTimeout(() => {
      message.value = ''
    }, 3000)
  } catch (error: any) {
    message.value = error.data?.message || 'Failed to save fleet'
    messageType.value = 'error'
  } finally {
    saving.value = false
  }
}

const addVehicle = () => {
  vehicles.value.push(emptyVehicle())
}

const removeVehicle = (index: number) => {
  if (!confirm('Remove this vehicle from the fleet?')) return
  vehicles.value.splice(index, 1)
}

const moveVehicle = (index: number, direction: number) => {
  const target = index + direction
  if (target < 0 || target >= vehicles.value.length) return
  const copy = [...vehicles.value]
  const [item] = copy.splice(index, 1)
  copy.splice(target, 0, item)
  vehicles.value = copy
}

onMounted(loadFleet)

useHead({
  title: 'Fleet - Admin - VanTrans82'
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-fleet {
  &__header-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;

    @include respond-to(sm) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
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

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__card {
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-border);
    padding: 1rem;

    @include respond-to(sm) {
      padding: 1.5rem;
    }
  }

  &__card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  &__card-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0;
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
      background: var(--color-muted);
    }

    &--danger {
      color: var(--color-danger);

      &:hover:not(:disabled) {
        background: #fef2f2;
      }
    }
  }

  &__preview {
    margin-bottom: 1rem;
    border-radius: var(--radius-lg);
    overflow: hidden;
    height: 10rem;
    background: var(--color-muted);
  }

  &__preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;

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
    animation: admin-fleet-spin 0.75s linear infinite;
  }
}

@keyframes admin-fleet-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
