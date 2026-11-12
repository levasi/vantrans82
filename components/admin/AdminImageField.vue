<template>
  <div class="admin-image-field">
    <label v-if="label" class="admin-image-field__label">{{ label }}</label>

    <div v-if="modelValue" class="admin-image-field__preview">
      <img :src="modelValue" :alt="label || 'Preview'" class="admin-image-field__preview-img" />
    </div>

    <div class="admin-image-field__row">
      <input
        :value="modelValue"
        type="url"
        class="admin-image-field__input"
        :placeholder="placeholder"
        @input="onUrlInput"
      />
      <button
        class="admin-image-field__btn"
        type="button"
        :disabled="uploading"
        @click="pickFile"
      >
        {{ uploading ? 'Uploading…' : 'Upload' }}
      </button>
      <button
        v-if="modelValue"
        class="admin-image-field__btn admin-image-field__btn--ghost"
        type="button"
        :disabled="uploading"
        @click="clear"
      >
        Clear
      </button>
    </div>

    <input
      ref="fileInput"
      type="file"
      class="admin-image-field__file"
      accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
      @change="onFileChange"
    />

    <p v-if="error" class="admin-image-field__error">{{ error }}</p>
    <p v-else class="admin-image-field__hint">Upload an image or paste an image URL</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    placeholder?: string
  }>(),
  {
    modelValue: '',
    label: '',
    placeholder: 'https://... or /uploads/...'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false)
const error = ref('')

const onUrlInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const pickFile = () => {
  error.value = ''
  fileInput.value?.click()
}

const clear = () => {
  error.value = ''
  emit('update:modelValue', '')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploading.value = true
  error.value = ''

  try {
    const body = new FormData()
    body.append('file', file)

    const response = await $fetch<{ success: boolean; url: string }>('/api/admin/upload', {
      method: 'POST',
      body
    })

    if (!response?.url) {
      throw new Error('Upload did not return a URL')
    }

    emit('update:modelValue', response.url)
  } catch (err: any) {
    error.value = err.data?.message || err.message || 'Failed to upload image'
  } finally {
    uploading.value = false
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.admin-image-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
  }

  &__preview {
    border-radius: var(--radius-lg);
    overflow: hidden;
    height: 10rem;
    background: var(--color-muted);
    border: 1px solid var(--color-border);
  }

  &__preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__input {
    flex: 1 1 12rem;
    min-width: 0;
    padding: 0.5rem 1rem;
    border: 1px solid $color-border-strong;
    border-radius: var(--radius-md);
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    background: var(--color-surface);

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px var(--color-brand);
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--radius-md);
    background: var(--color-brand);
    color: $color-text-inverse;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    &--ghost {
      background: #e5e7eb;
      color: var(--color-text-secondary);
    }
  }

  &__file {
    display: none;
  }

  &__hint {
    margin: 0;
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  &__error {
    margin: 0;
    font-size: 0.75rem;
    color: #b91c1c;
  }
}
</style>
