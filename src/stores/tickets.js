import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storageService } from '@/services/storage'

export const useTicketStore = defineStore('tickets', () => {
  // State
  const tickets = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const ticketStats = computed(() => {
    const total = tickets.value.length
    const open = tickets.value.filter(ticket => ticket.status === 'open').length
    const inProgress = tickets.value.filter(ticket => ticket.status === 'in_progress').length
    const closed = tickets.value.filter(ticket => ticket.status === 'closed').length

    return {
      total,
      open,
      in_progress: inProgress,
      closed
    }
  })

  // Actions
  const loadTickets = async () => {
    isLoading.value = true
    error.value = null

    try {
      const loadedTickets = storageService.getTickets()
      tickets.value = loadedTickets
    } catch (err) {
      error.value = 'Failed to load tickets. Please retry.'
      console.error('Error loading tickets:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const createTicket = async (ticketData) => {
    isLoading.value = true
    error.value = null

    try {
      const newTicket = storageService.createTicket(ticketData)
      tickets.value.push(newTicket)
      return newTicket
    } catch (err) {
      error.value = 'Failed to create ticket. Please try again.'
      console.error('Error creating ticket:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateTicket = async (id, updates) => {
    isLoading.value = true
    error.value = null

    try {
      const updatedTicket = storageService.updateTicket(id, updates)
      const index = tickets.value.findIndex(ticket => ticket.id === id)
      if (index !== -1) {
        tickets.value[index] = updatedTicket
      }
      return updatedTicket
    } catch (err) {
      error.value = 'Failed to update ticket. Please try again.'
      console.error('Error updating ticket:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteTicket = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const success = storageService.deleteTicket(id)
      if (success) {
        tickets.value = tickets.value.filter(ticket => ticket.id !== id)
      }
      return success
    } catch (err) {
      error.value = 'Failed to delete ticket. Please try again.'
      console.error('Error deleting ticket:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const getTicketById = (id) => {
    return tickets.value.find(ticket => ticket.id === id) || null
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    tickets,
    isLoading,
    error,
    // Getters
    ticketStats,
    getTicketById,
    // Actions
    loadTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    clearError
  }
})