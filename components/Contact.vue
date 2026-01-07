<template>
  <section id="contact" class="py-20 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ $t('contact.title') }}
        </h2>
        <p class="text-lg text-gray-600">
          {{ $t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-gray-700 mb-2">
                  {{ $t('contact.yourName') }}
                </label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  :placeholder="$t('contact.yourName')"
                />
              </div>
              <div>
                <label for="email" class="block text-gray-700 mb-2">
                  {{ $t('contact.emailAddress') }}
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  :placeholder="$t('contact.emailAddress')"
                />
              </div>
            </div>

            <div>
              <label for="message" class="block text-gray-700 mb-2">
                {{ $t('contact.message') }}
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none"
                :placeholder="$t('contact.message')"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full sm:w-auto px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              {{ $t('contact.sendMessage') }}
              <Send class="w-5 h-5" />
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-6">
              {{ $t('contact.contactInformation') }}
            </h3>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                  <Phone class="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900 mb-1">{{ $t('contact.phone') }}</div>
                  <a href="tel:+40123456789" class="text-gray-600 hover:text-orange-600 transition-colors">
                    +40 123 456 789
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                  <Mail class="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900 mb-1">{{ $t('contact.email') }}</div>
                  <a href="mailto:contact@vantrans82.ro" class="text-gray-600 hover:text-orange-600 transition-colors">
                    contact@vantrans82.ro
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-3 bg-green-100 rounded-lg flex-shrink-0">
                  <MessageCircle class="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900 mb-1">{{ $t('contact.whatsapp') }}</div>
                  <a 
                    href="https://wa.me/40123456789" 
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-600 hover:text-green-600 transition-colors inline-flex items-center gap-1"
                  >
                    +40 123 456 789
                  </a>
                  <p class="text-xs text-gray-500 mt-1">{{ $t('contact.chatInstantly') }}</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                  <MapPin class="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900 mb-1">{{ $t('contact.address') }}</div>
                  <p class="text-gray-600">
                    Str. Logistica nr. 123<br />
                    Bucharest, Romania<br />
                    010101
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- WhatsApp Quick Action -->
          <a
            href="https://wa.me/40123456789?text=Hello! I'm interested in your transport services."
            target="_blank"
            rel="noopener noreferrer"
            class="block w-full p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors text-center font-semibold flex items-center justify-center gap-2"
          >
            <MessageCircle class="w-5 h-5" />
            {{ $t('contact.chatOnWhatsApp') }}
          </a>

          <div class="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 class="font-semibold text-gray-900 mb-2">{{ $t('contact.businessHours') }}</h4>
            <div class="text-sm text-gray-600 space-y-1">
              <p>{{ $t('contact.mondayFriday') }}</p>
              <p>{{ $t('contact.saturday') }}</p>
              <p>{{ $t('contact.sunday') }}</p>
              <p class="text-orange-600 font-medium mt-2">{{ $t('contact.emergencySupport') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-vue-next'

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

