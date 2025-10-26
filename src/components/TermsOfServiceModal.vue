<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">Terms of Service</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 p-1 rounded">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="prose max-w-none">
          <p class="text-sm text-gray-500 mb-6">Last updated: {{ new Date().toLocaleDateString() }}</p>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h4>
            <p class="text-gray-600">
              By accessing and using TicketApp, you accept and agree to be bound by the terms and provision of this agreement. This is a demonstration application created for educational and portfolio purposes.
            </p>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">2. Use License</h4>
            <p class="text-gray-600 mb-3">
              Permission is granted to temporarily use TicketApp for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained in the application</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">3. Demo Application Disclaimer</h4>
            <p class="text-gray-600">
              TicketApp is a demonstration application. It is not intended for production use or for managing real support tickets. All data is stored locally in your browser and may be lost when clearing browser data.
            </p>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">4. User Accounts</h4>
            <p class="text-gray-600 mb-3">
              User accounts in this demo application are simulated using localStorage. By creating an account, you agree to:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-1">
              <li>Provide accurate information during registration</li>
              <li>Use the application responsibly and for its intended purpose</li>
              <li>Not attempt to access other users' data (though this is technically not possible in this demo)</li>
            </ul>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">5. Prohibited Uses</h4>
            <p class="text-gray-600 mb-3">
              You may not use TicketApp:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-1">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            </ul>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">6. Disclaimer</h4>
            <p class="text-gray-600">
              The materials in TicketApp are provided on an 'as is' basis. TicketApp makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">7. Limitations</h4>
            <p class="text-gray-600">
              In no event shall TicketApp or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use TicketApp, even if TicketApp or its authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">8. Revisions</h4>
            <p class="text-gray-600">
              TicketApp may revise these terms of service at any time without notice. By using this application, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">9. Contact Information</h4>
            <p class="text-gray-600">
              If you have any questions about these Terms of Service, please contact us through the Contact Us form in the application.
            </p>
          </section>
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
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>