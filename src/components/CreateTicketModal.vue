<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
    style="background-color: rgba(0, 0, 0, 0.5);"
    @click="handleBackdropClick"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-screen overflow-y-auto relative modal-content">
        <!-- Loading overlay -->
        <div v-if="isSubmitting" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
          <div class="flex flex-col items-center">
            <svg class="animate-spin h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm text-gray-600">{{ props.demoMode ? 'Creating demo ticket...' : 'Creating ticket...' }}</span>
          </div>
        </div>
        
        <form @submit="onSubmit" role="form" aria-labelledby="modal-title" :class="{ 'form-loading': isSubmitting }">
          <!-- Modal header -->
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Create New Ticket
                </h3>
                <div v-if="demoMode" class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mt-1">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                  </svg>
                  Demo Mode - Sign up to save tickets
                </div>
              </div>
              <button
                type="button"
                @click="closeModal"
                aria-label="Close create ticket modal"
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
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
                  Title <span class="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  v-model="title"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.title }"
                  placeholder="Enter ticket title"
                  :aria-describedby="errors.title ? 'title-error' : undefined"
                  :aria-invalid="errors.title ? 'true' : 'false'"
                  required
                />
                <p v-if="errors.title" id="title-error" class="mt-1 text-sm text-red-600" role="alert" aria-live="polite">{{ errors.title }}</p>
              </div>

              <!-- Status field -->
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
                  Status <span class="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  v-model="status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.status }"
                  :aria-describedby="errors.status ? 'status-error' : undefined"
                  :aria-invalid="errors.status ? 'true' : 'false'"
                  required
                >
                  <option value="">Select status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <p v-if="errors.status" id="status-error" class="mt-1 text-sm text-red-600" role="alert" aria-live="polite">{{ errors.status }}</p>
              </div>

              <!-- Description field -->
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  v-model="description"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.description }"
                  placeholder="Enter ticket description (optional)"
                  :aria-describedby="errors.description ? 'description-error' : 'description-help'"
                  :aria-invalid="errors.description ? 'true' : 'false'"
                ></textarea>
                <p v-if="errors.description" id="description-error" class="mt-1 text-sm text-red-600" role="alert" aria-live="polite">{{ errors.description }}</p>
                <p id="description-help" class="mt-1 text-sm text-gray-500">{{ (description || '').length }}/2000 characters</p>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              :disabled="isSubmitting"
              :aria-label="isSubmitting ? 'Creating ticket, please wait' : 'Create ticket'"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSubmitting ? 'Creating...' : (demoMode ? 'Try Demo' : 'Create Ticket') }}
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
  demoMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'created', 'ticket-created'])

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
  isSubmitting.value = true
  
  try {
    const ticketData = {
      title: values.title.trim(),
      status: values.status,
      description: values.description?.trim() || ''
    }

    if (props.demoMode) {
      // Demo mode - simulate ticket creation without saving
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
      
      // Create a demo ticket object
      const demoTicket = {
        id: `demo_${Date.now()}`,
        ...ticketData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      emit('ticket-created', demoTicket)
      closeModal()
      return // Exit early for demo mode
    }
    
    // Real mode - actually create the ticket
    const newTicket = await ticketStore.createTicket(ticketData)
    
    // Emit the created event without showing a toast here
    // The parent component will handle showing the success message
    emit('created', newTicket)
    closeModal()
  } catch (error) {
    console.error('Create ticket error:', error)
    const errorMessage = error.message || 'Failed to create ticket. Please try again.'
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
    resetForm()
    title.value = ''
    status.value = ''
    description.value = ''
    emit('close')
  }
}

// Keyboard event handler
const handleKeydown = (event) => {
  if (event.key === 'Escape' && !isSubmitting.value) {
    closeModal()
  }
}

// Reset form when modal opens
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    resetForm()
    title.value = ''
    status.value = 'open' // Set default status
    description.value = ''
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeydown)
    // Focus the first input field after a short delay
    setTimeout(() => {
      const titleInput = document.getElementById('title')
      if (titleInput) {
        titleInput.focus()
      }
    }, 100)
  } else {
    // Remove keyboard event listener
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
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

/* Backdrop animation */
.modal-backdrop {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Modal content animation */
.modal-content {
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

/* Loading state */
.form-loading {
  pointer-events: none;
  opacity: 0.7;
}

/* Button styles */
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

/* Input focus styles */
input:focus,
select:focus,
textarea:focus {
  transition: all 0.2s ease;
  transform: scale(1.01);
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>