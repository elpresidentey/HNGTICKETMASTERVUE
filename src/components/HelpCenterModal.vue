<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">Help Center</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 p-1 rounded">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- FAQ Section -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h4>
            <div class="space-y-4">
              <div class="border border-gray-200 rounded-lg">
                <button @click="toggleFaq(1)" class="w-full text-left p-4 hover:bg-gray-50 flex justify-between items-center">
                  <span class="font-medium">How do I create a new ticket?</span>
                  <svg class="w-5 h-5 transform transition-transform" :class="{ 'rotate-180': openFaq === 1 }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div v-if="openFaq === 1" class="px-4 pb-4 text-gray-600">
                  <p>To create a new ticket, go to your dashboard and click the "Create Ticket" button. Fill in the title, description, and select the appropriate status.</p>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg">
                <button @click="toggleFaq(2)" class="w-full text-left p-4 hover:bg-gray-50 flex justify-between items-center">
                  <span class="font-medium">How do I change a ticket's status?</span>
                  <svg class="w-5 h-5 transform transition-transform" :class="{ 'rotate-180': openFaq === 2 }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div v-if="openFaq === 2" class="px-4 pb-4 text-gray-600">
                  <p>Click the edit button on any ticket card, then select the new status from the dropdown menu. Available statuses are: Open, In Progress, and Closed.</p>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg">
                <button @click="toggleFaq(3)" class="w-full text-left p-4 hover:bg-gray-50 flex justify-between items-center">
                  <span class="font-medium">Can I delete tickets?</span>
                  <svg class="w-5 h-5 transform transition-transform" :class="{ 'rotate-180': openFaq === 3 }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div v-if="openFaq === 3" class="px-4 pb-4 text-gray-600">
                  <p>Yes, you can delete tickets by clicking the delete button on any ticket card. You'll be asked to confirm the deletion before it's permanently removed.</p>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg">
                <button @click="toggleFaq(4)" class="w-full text-left p-4 hover:bg-gray-50 flex justify-between items-center">
                  <span class="font-medium">How do I reset my password?</span>
                  <svg class="w-5 h-5 transform transition-transform" :class="{ 'rotate-180': openFaq === 4 }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div v-if="openFaq === 4" class="px-4 pb-4 text-gray-600">
                  <p>This is a demo application using localStorage for authentication. In a real application, you would have a "Forgot Password" link on the login page.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
            <div class="grid grid-cols-2 gap-4">
              <button @click="$emit('close'); $router.push('/documentation')" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                <svg class="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                <div class="font-medium">Documentation</div>
              </button>
              
              <button @click="openContactModal" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                <svg class="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <div class="font-medium">Contact Support</div>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button @click="$emit('close')" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])

const router = useRouter()
const toast = useToast()
const openFaq = ref(null)

const toggleFaq = (faqNumber) => {
  openFaq.value = openFaq.value === faqNumber ? null : faqNumber
}

const openContactModal = () => {
  toast.info('Contact form would open here in a real application')
}
</script>