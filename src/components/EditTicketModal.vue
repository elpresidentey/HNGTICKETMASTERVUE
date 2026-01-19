<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    style="background-color: rgba(0, 0, 0, 0.5);"
    @click="handleBackdropClick"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-screen overflow-y-auto relative">
        <!-- Loading overlay -->
        <div v-if="isSubmitting" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
          <div class="flex flex-col items-center">
            <svg class="animate-spin h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm text-gray-600">Updating ticket...</span>
          </div>
        </div>
        
        <form @submit="onSubmit" role="form" aria-labelledby="modal-title" :class="{ 'form-loading': isSubmitting }">
          <!-- Modal header -->
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Edit Ticket
              </h3>
              <button
                type="button"
                @click="closeModal"
                aria-label="Close edit ticket modal"
                class="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Form fields -->
            <div class="space-y-4">
              <!-- Title field -->
              <div>
                <label for="edit-title" class="block text-sm font-medium text-gray-700 mb-1">
                  Title <span class="text-red-500">*</span>
                </label>
                <input
                  id="edit-title"
                  name="title"
                  type="text"
                  v-model="title"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.title }"
                  placeholder="Enter ticket title"
                  :aria-describedby="errors.title ? 'edit-title-error' : undefined"
                  :aria-invalid="errors.title ? 'true' : 'false'"
                  required
                />
                <p v-if="errors.title" id="edit-title-error" class="mt-1 text-sm text-red-600" role="alert" aria-live="polite">{{ errors.title }}</p>
              </div>

              <!-- Status field -->
              <div>
                <label for="edit-status" class="block text-sm font-medium text-gray-700 mb-1">
                  Status <span class="text-red-500">*</span>
                </label>
                <select
                  id="edit-status"
                  name="status"
                  v-model="status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.status }"
                  :aria-describedby="errors.status ? 'edit-status-error' : undefined"
                  :aria-invalid="errors.status ? 'true' : 'false'"
                  required
                >
                  <option value="">Select status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <p v-if="errors.status" id="edit-status-error" class="mt-1 text-sm text-red-600" role="alert" aria-live="polite">{{ errors.status }}</p>
              </div>

              <!-- Description field -->
              <div>
                <label for="edit-description" class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  v-model="description"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.description }"
                  placeholder="Enter ticket description (optional)"
                  :aria-describedby="errors.description ? 'edit-description-error' : 'edit-description-help'"
                  :aria-invalid="errors.description ? 'true' : 'false'"
                ></textarea>
                <p v-if="errors.description" id="edit-description-error" class="mt-1 text-sm text-red-600" role="alert" aria-live="polite">{{ errors.description }}</p>
                <p id="edit-description-help" class="mt-1 text-sm text-gray-500">{{ (description || '').length }}/2000 characters</p>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              :disabled="isSubmitting"
              :aria-label="isSubmitting ? 'Saving changes, please wait' : 'Save ticket changes'"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              :disabled="isSubmitting"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import { useTicketStore } from '@/stores/tickets'
import { useToast } from 'vue-toastification'

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

const emit = defineEmits(['close', 'updated'])

const ticketStore = useTicketStore()
const toast = useToast()

// Validation rules with error clearing
const validateTitle = (value) => {
  // Clear ticket store errors when user starts correcting input
  if (ticketStore.error) {
    ticketStore.clearError()
  }
  
  if (!value || !value.trim()) {
    return 'Title is required'
  }
  if (value.length > 200) {
    return 'Title must be less than 200 characters'
  }
  return true
}

const validateStatus = (value) => {
  // Clear ticket store errors when user starts correcting input
  if (ticketStore.error) {
    ticketStore.clearError()
  }
  
  if (!value) {
    return 'Status is required'
  }
  if (!['open', 'in_progress', 'closed'].includes(value)) {
    return 'Status must be one of: open, in_progress, or closed'
  }
  return true
}

const validateDescription = (value) => {
  // Clear ticket store errors when user starts correcting input
  if (ticketStore.error) {
    ticketStore.clearError()
  }
  
  if (value && value.length > 2000) {
    return 'Description must be less than 2000 characters'
  }
  return true
}

// Form setup with VeeValidate
const { handleSubmit, errors, resetForm } = useForm()

// Form fields with validation
const { value: title, errorMessage: titleError } = useField('title', validateTitle)
const { value: status, errorMessage: statusError } = useField('status', validateStatus)
const { value: description, errorMessage: descriptionError } = useField('description', validateDescription)

const isSubmitting = ref(false)

// Form submission handler
const onSubmit = handleSubmit(async (values) => {
  if (!props.ticket) return
  
  isSubmitting.value = true
  
  try {
    const ticketData = {
      title: values.title.trim(),
      status: values.status,
      description: values.description?.trim() || ''
    }

    const updatedTicket = await ticketStore.updateTicket(props.ticket.id, ticketData)
    
    // Emit the updated event with the ticket data - parent will handle the success notification
    emit('updated', updatedTicket)
    closeModal()
  } catch (error) {
    console.error('Update ticket error:', error)
    const errorMessage = error.message || 'Failed to update ticket. Please try again.'
    toast.error(errorMessage)
  } finally {
    isSubmitting.value = false
  }
})

const handleBackdropClick = (event) => {
  // Only close if clicking the backdrop, not the modal content
  if (event.target === event.currentTarget && !isSubmitting.value) {
    closeModal()
  }
}

const closeModal = () => {
  if (!isSubmitting.value) {
    emit('close')
  }
}

// Populate form when modal opens with ticket data
watch(() => props.isOpen, (newValue) => {
  if (newValue && props.ticket) {
    resetForm()
    title.value = props.ticket.title || ''
    status.value = props.ticket.status || ''
    description.value = props.ticket.description || ''
  }
})

// Keyboard event handler
const handleKeydown = (event) => {
  if (event.key === 'Escape' && !isSubmitting.value) {
    closeModal()
  }
}

// Also watch for ticket changes while modal is open
watch(() => props.ticket, (newTicket) => {
  if (props.isOpen && newTicket) {
    resetForm()
    title.value = newTicket.title || ''
    status.value = newTicket.status || ''
    description.value = newTicket.description || ''
  }
})

// Add keyboard event listeners
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleKeydown)
    // Focus the first input field after a short delay
    setTimeout(() => {
      const titleInput = document.getElementById('edit-title')
      if (titleInput) {
        titleInput.focus()
      }
    }, 100)
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

/* Loading state animations */
.form-loading {
  pointer-events: none;
  opacity: 0.7;
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

/* Input focus animations */
input:focus,
select:focus,
textarea:focus {
  transition: all 0.2s ease;
  transform: scale(1.01);
}
</style>