<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">Privacy Policy</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 p-1 rounded">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="prose max-w-none">
          <p class="text-sm text-gray-500 mb-6">Last updated: {{ new Date().toLocaleDateString() }}</p>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Information We Collect</h4>
            <p class="text-gray-600 mb-3">
              TicketApp is a demo application that stores data locally in your browser. We collect and process the following information:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-1">
              <li>Account information (name, email) for authentication</li>
              <li>Ticket data (titles, descriptions, status) for functionality</li>
              <li>Session information stored in localStorage</li>
            </ul>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">How We Use Your Information</h4>
            <p class="text-gray-600 mb-3">
              Since this is a demo application, your information is used solely for:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-1">
              <li>Providing the ticket management functionality</li>
              <li>Maintaining your session and preferences</li>
              <li>Demonstrating the application's features</li>
            </ul>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Data Storage</h4>
            <p class="text-gray-600 mb-3">
              All data in this demo application is stored locally in your browser using localStorage. This means:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-1">
              <li>No data is sent to external servers</li>
              <li>Your data remains on your device</li>
              <li>Clearing browser data will remove all information</li>
              <li>Data is not shared with third parties</li>
            </ul>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Your Rights</h4>
            <p class="text-gray-600 mb-3">
              You have the right to:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-1">
              <li>Access your data through the application interface</li>
              <li>Modify or delete your tickets at any time</li>
              <li>Clear all data by clearing your browser's localStorage</li>
              <li>Stop using the application at any time</li>
            </ul>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Security</h4>
            <p class="text-gray-600">
              While this is a demo application, we implement basic security measures including input validation and XSS protection. However, please note that this is not intended for production use with sensitive data.
            </p>
          </section>

          <section class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Contact Us</h4>
            <p class="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us through the Contact Us form in the application.
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