<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    style="background-color: rgba(0, 0, 0, 0.5);"
    @click="handleBackdropClick"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-5">
      <!-- Modal Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">
          Delete Ticket
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          aria-label="Close delete confirmation modal"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Warning Icon and Message -->
      <div class="mb-6">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="ml-3">
            <h4 class="text-lg font-medium text-gray-900">
              Are you sure?
            </h4>
          </div>
        </div>
        
        <p class="text-sm text-gray-600 mb-4">
          You are about to permanently delete this ticket. This action cannot be undone.
        </p>

        <!-- Ticket Details -->
        <div v-if="ticket" class="bg-gray-50 rounded-md p-3 border">
          <div class="flex items-center mb-2">
            <div
              class="flex-shrink-0 h-3 w-3 rounded-full mr-2"
              :class="statusColorClass"
            ></div>
            <span class="text-sm font-medium text-gray-900">{{ ticket.title }}</span>
          </div>
          <p class="text-xs text-gray-600">
            ID: {{ ticket.id.slice(0, 8) }}...
          </p>
          <p class="text-xs text-gray-600">
            Created: {{ formatDate(ticket.createdAt) }}
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          :disabled="isDeleting"
        >
          Cancel
        </button>
        <button
          @click="handleDelete"
          :disabled="isDeleting"
          :aria-label="isDeleting ? 'Deleting ticket, please wait' : 'Confirm delete ticket'"
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="isDeleting" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Deleting...
          </span>
          <span v-else>Delete Ticket</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  ticket: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'delete'])

const isDeleting = ref(false)

// Status color classes based on requirements (green/amber/gray)
const statusColorClass = computed(() => {
  if (!props.ticket) return 'bg-gray-400'
  
  switch (props.ticket.status) {
    case 'open':
      return 'bg-green-500'
    case 'in_progress':
      return 'bg-amber-500'
    case 'closed':
      return 'bg-gray-500'
    default:
      return 'bg-gray-400'
  }
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Invalid date'
  }
}

const handleBackdropClick = (event) => {
  // Only close if clicking the backdrop, not the modal content
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

const handleDelete = async () => {
  if (!props.ticket || isDeleting.value) return
  
  isDeleting.value = true
  
  try {
    emit('delete', props.ticket)
  } finally {
    isDeleting.value = false
  }
}

// Keyboard event handler
const handleKeydown = (event) => {
  if (event.key === 'Escape' && !isDeleting.value) {
    emit('close')
  }
}

// Add keyboard event listeners
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

// Cleanup event listeners on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Modal Animations */
.modal-enter-active {
  transition: all 0.3s ease-out;
}

.modal-leave-active {
  transition: all 0.2s ease-in;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

/* Backdrop animation */
.fixed.inset-0 {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Modal content animation */
.bg-white.rounded-lg {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Enhanced button hover animations */
button {
  transition: all 0.2s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

/* Loading state for delete button */
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>