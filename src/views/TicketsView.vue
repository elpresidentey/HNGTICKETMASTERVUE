<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center gap-4">
            <router-link 
              to="/" 
              class="flex items-center gap-3 group"
              aria-label="Go to home page"
            >
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <span class="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">TicketApp</span>
            </router-link>
            <div class="hidden sm:block h-6 w-px bg-gray-300"></div>
            <button
              @click="$router.push('/dashboard')"
              class="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-1"
              aria-label="Go back to dashboard"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-xl font-semibold text-gray-900">Tickets</h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors px-3 py-2 rounded-lg font-medium"
              aria-label="Go to home page"
            >
              Home
            </router-link>
            <router-link 
              to="/dashboard" 
              class="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors px-3 py-2 rounded-lg font-medium"
              aria-label="Go to dashboard"
            >
              Dashboard
            </router-link>
            <button
              @click="createNewTicket"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Create a new support ticket"
            >
              Create Ticket
            </button>
            <span class="text-sm text-gray-700">{{ authStore.user?.name }}</span>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Sign out of your account"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main id="main-content" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Header Section -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Your Tickets</h2>
          <p class="text-gray-600">Manage and track all your support tickets.</p>
        </div>

        <!-- Loading State -->
        <div v-if="ticketStore.isLoading" class="flex flex-col justify-center items-center py-12" role="status" aria-live="polite">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" aria-hidden="true"></div>
          <span class="text-gray-600 animate-pulse-slow">Loading tickets...</span>
          
          <!-- Loading skeleton cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
            <div v-for="n in 6" :key="n" class="loading-skeleton rounded-lg h-48 animate-pulse"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="ticketStore.error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6" role="alert" aria-live="assertive">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm text-red-800">{{ ticketStore.error }}</p>
              <div class="mt-2 flex space-x-3">
                <button
                  @click="retryLoadTickets"
                  class="text-sm text-red-600 hover:text-red-500 underline font-medium"
                >
                  Retry
                </button>
                <button
                  @click="ticketStore.clearError"
                  class="text-sm text-red-600 hover:text-red-500 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="ticketStore.tickets.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No tickets</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new ticket.</p>
          <div class="mt-6">
            <button
              @click="createNewTicket"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Create your first support ticket"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Create New Ticket
            </button>
          </div>
        </div>

        <!-- Tickets Grid -->
        <section v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-labelledby="tickets-heading">
          <h2 id="tickets-heading" class="sr-only">Your Support Tickets</h2>
          <TransitionGroup
            name="ticket-list"
            tag="div"
            class="contents"
            appear
          >
            <TicketCard
              v-for="(ticket, index) in sortedTickets"
              :key="ticket.id"
              :ticket="ticket"
              :style="{ '--delay': index * 0.1 + 's' }"
              @edit="handleEditTicket"
              @delete="handleDeleteTicket"
            />
          </TransitionGroup>
        </section>
      </div>
    </main>

    <!-- Create Ticket Modal -->
    <CreateTicketModal
      :is-open="isCreateModalOpen"
      @close="isCreateModalOpen = false"
      @created="handleTicketCreated"
    />

    <!-- Edit Ticket Modal -->
    <EditTicketModal
      :is-open="isEditModalOpen"
      :ticket="selectedTicket"
      @close="isEditModalOpen = false"
      @updated="handleTicketUpdated"
    />

    <!-- Delete Ticket Modal -->
    <DeleteTicketModal
      :is-open="isDeleteModalOpen"
      :ticket="selectedTicket"
      @close="isDeleteModalOpen = false"
      @delete="handleTicketDeleted"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTicketStore } from '@/stores/tickets'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import TicketCard from '@/components/TicketCard.vue'
import CreateTicketModal from '@/components/CreateTicketModal.vue'
import EditTicketModal from '@/components/EditTicketModal.vue'
import DeleteTicketModal from '@/components/DeleteTicketModal.vue'

const authStore = useAuthStore()
const ticketStore = useTicketStore()
const router = useRouter()
const toast = useToast()

// Sort tickets by status: open > in_progress > closed
const sortedTickets = computed(() => {
  const statusOrder = { 'open': 1, 'in_progress': 2, 'closed': 3 }
  return [...ticketStore.tickets].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status] || a.title.localeCompare(b.title)
  })
})

// Modal state
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedTicket = ref(null)

// Load tickets when component mounts
onMounted(async () => {
  await loadTicketsWithErrorHandling()
})

const loadTicketsWithErrorHandling = async () => {
  try {
    await ticketStore.loadTickets()
  } catch (error) {
    // Error is already handled in the store with proper message
    console.error('Failed to load tickets:', error)
  }
}

const retryLoadTickets = async () => {
  // Clear error first to show loading state
  ticketStore.clearError()
  await loadTicketsWithErrorHandling()
}

const handleLogout = () => {
  authStore.logout()
  toast.success('Successfully logged out')
  router.push('/login')
}

const createNewTicket = () => {
  isCreateModalOpen.value = true
}

const handleTicketCreated = (newTicket) => {
  isCreateModalOpen.value = false
  toast.success(`Ticket "${newTicket.title}" created successfully!`)
  loadTicketsWithErrorHandling()
}

const handleEditTicket = (ticket) => {
  selectedTicket.value = ticket
  isEditModalOpen.value = true
}

const handleTicketUpdated = (updatedTicket) => {
  isEditModalOpen.value = false
  selectedTicket.value = null
  toast.success(`Ticket "${updatedTicket.title}" updated successfully!`)
  loadTicketsWithErrorHandling()
}

const handleDeleteTicket = (ticket) => {
  selectedTicket.value = ticket
  isDeleteModalOpen.value = true
}

const handleTicketDeleted = async (ticket) => {
  try {
    await ticketStore.deleteTicket(ticket.id)
    isDeleteModalOpen.value = false
    selectedTicket.value = null
    toast.success(`Ticket "${ticket.title}" deleted successfully`)
  } catch (error) {
    console.error('Delete ticket error:', error)
    const errorMessage = error.message || 'Failed to delete ticket. Please try again.'
    toast.error(errorMessage)
  }
}
</script>

<style scoped>
/* Ticket List Animations */
.ticket-list-enter-active {
  transition: all 0.6s ease;
  transition-delay: var(--delay);
}

.ticket-list-leave-active {
  transition: all 0.4s ease;
}

.ticket-list-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.ticket-list-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.9);
}

.ticket-list-move {
  transition: transform 0.4s ease;
}

/* Enhanced button animations */
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

/* Loading spinner enhancement */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Staggered animation for initial load */
.grid > * {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(20px);
}

.grid > *:nth-child(1) { animation-delay: 0.1s; }
.grid > *:nth-child(2) { animation-delay: 0.2s; }
.grid > *:nth-child(3) { animation-delay: 0.3s; }
.grid > *:nth-child(4) { animation-delay: 0.4s; }
.grid > *:nth-child(5) { animation-delay: 0.5s; }
.grid > *:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>