<template>
  <section id="contact" class="contact">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2>
          {{ $t('contact.title') }}
        </h2>
        <p>
          {{ $t('contact.subtitle') }}
        </p>
      </div>

      <div class="contact__grid">
        <!-- Contact Form -->
        <div class="contact__form-wrap">
          <form @submit.prevent="handleSubmit" class="contact__form">
            <div class="contact__form-row">
              <div class="contact__field">
                <label for="name" class="form-label">
                  {{ $t('contact.yourName') }}
                </label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  required
                  class="form-input"
                  :placeholder="$t('contact.yourName')"
                />
              </div>
              <div class="contact__field">
                <label for="email" class="form-label">
                  {{ $t('contact.emailAddress') }}
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  required
                  class="form-input"
                  :placeholder="$t('contact.emailAddress')"
                />
              </div>
            </div>

            <div class="contact__field">
              <label for="message" class="form-label">
                {{ $t('contact.message') }}
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="6"
                class="form-textarea"
                :placeholder="$t('contact.message')"
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn--accent-lg contact__submit"
            >
              {{ $t('contact.sendMessage') }}
              <Send class="icon" />
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="contact__info">
          <div>
            <h3 class="contact__info-title">
              {{ $t('contact.contactInformation') }}
            </h3>

            <div class="contact__info-list">
              <div class="contact__info-item">
                <div class="contact__info-icon">
                  <Phone class="icon--md" />
                </div>
                <div>
                  <div class="contact__info-label">{{ $t('contact.phone') }}</div>
                  <a :href="`tel:${formatPhoneForTel(settings.phoneNumber)}`" class="contact__info-link">
                    {{ settings.phoneNumber }}
                  </a>
                </div>
              </div>

              <div class="contact__info-item">
                <div class="contact__info-icon">
                  <Mail class="icon--md" />
                </div>
                <div>
                  <div class="contact__info-label">{{ $t('contact.email') }}</div>
                  <a :href="`mailto:${settings.contactEmail}`" class="contact__info-link">
                    {{ settings.contactEmail }}
                  </a>
                </div>
              </div>

              <div class="contact__info-item">
                <div class="contact__info-icon contact__info-icon--whatsapp">
                  <MessageCircle class="icon--md" />
                </div>
                <div>
                  <div class="contact__info-label">{{ $t('contact.whatsapp') }}</div>
                  <a
                    :href="`https://wa.me/${formatPhoneForWhatsApp(settings.phoneNumber)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="contact__info-link contact__info-link--whatsapp"
                  >
                    {{ settings.phoneNumber }}
                  </a>
                  <p class="contact__info-hint">{{ $t('contact.chatInstantly') }}</p>
                </div>
              </div>

              <div class="contact__info-item">
                <div class="contact__info-icon">
                  <MapPin class="icon--md" />
                </div>
                <div>
                  <div class="contact__info-label">{{ $t('contact.address') }}</div>
                  <p class="contact__info-text" v-html="settings.address.replace(/\n/g, '<br />')">
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- WhatsApp Quick Action -->
          <a
            :href="`https://wa.me/${formatPhoneForWhatsApp(settings.phoneNumber)}?text=Hello! I'm interested in your transport services.`"
            target="_blank"
            rel="noopener noreferrer"
            class="contact__whatsapp-btn"
          >
            <MessageCircle class="icon" />
            {{ $t('contact.chatOnWhatsApp') }}
          </a>

          <div class="contact__hours">
            <h4 class="contact__hours-title">{{ $t('contact.businessHours') }}</h4>
            <div class="contact__hours-list">
              <p>{{ $t('contact.mondayFriday') }}</p>
              <p>{{ $t('contact.saturday') }}</p>
              <p>{{ $t('contact.sunday') }}</p>
              <p class="contact__hours-emergency">{{ $t('contact.emergencySupport') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-vue-next'

const { settings, loadSettings, formatPhoneForTel, formatPhoneForWhatsApp } = useSettings()

onMounted(() => {
  loadSettings()
})

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const handleSubmit = () => {
  // Handle form submission
  alert('Thank you! We will contact you soon.')
  formData.value = { name: '', email: '', message: '' }
}
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.contact {
  @include section-pad;
  background: $color-surface;
}

.contact__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @include respond-to(lg) {
    grid-template-columns: 2fr 1fr;
  }
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact__form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @include respond-to(sm) {
    grid-template-columns: 1fr 1fr;
  }
}

.contact__submit {
  width: 100%;

  @include respond-to(sm) {
    width: auto;
  }
}

.contact__info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact__info-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: $color-text;
  margin: 0 0 1.5rem;
}

.contact__info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact__info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact__info-icon {
  padding: 0.75rem;
  background: $color-brand-light;
  border-radius: $radius-md;
  flex-shrink: 0;
  color: $color-brand;

  &--whatsapp {
    background: $color-success-light;
    color: $color-success;
  }
}

.contact__info-label {
  font-weight: 600;
  color: $color-text;
  margin-bottom: 0.25rem;
}

.contact__info-link {
  color: $color-text-muted;
  transition: color 0.2s;

  &:hover {
    color: $color-accent;
  }

  &--whatsapp {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;

    &:hover {
      color: $color-success;
    }
  }
}

.contact__info-hint {
  font-size: 0.75rem;
  color: $color-text-faint;
  margin: 0.25rem 0 0;
}

.contact__info-text {
  color: $color-text-muted;
  margin: 0;
}

.contact__whatsapp-btn {
  display: flex;
  width: 100%;
  padding: 1rem;
  background: $color-success;
  color: $color-text-inverse;
  border-radius: $radius-xl;
  transition: background-color 0.2s;
  text-align: center;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: $color-success-hover;
  }
}

.contact__hours {
  background: $color-brand-tint;
  padding: 1.5rem;
  border-radius: $radius-xl;
  border: 1px solid $color-brand-light;
}

.contact__hours-title {
  font-weight: 600;
  color: $color-text;
  margin: 0 0 0.5rem;
}

.contact__hours-list {
  font-size: 0.875rem;
  color: $color-text-muted;

  p {
    margin: 0 0 0.25rem;
  }
}

.contact__hours-emergency {
  color: $color-accent;
  font-weight: 500;
  margin-top: 0.5rem !important;
}
</style>
