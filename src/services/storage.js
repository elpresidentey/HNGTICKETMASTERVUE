/**
 * LocalStorage service for session and data management
 */

const SESSION_KEY = 'ticketapp_session'
const TICKETS_KEY = 'ticketapp_tickets'

export const storageService = {
  // Session Management
  setSession(token) {
    try {
      localStorage.setItem(SESSION_KEY, token)
      return true
    } catch (error) {
      console.error('Failed to set session:', error)
      return false
    }
  },

  getSession() {
    try {
      return localStorage.getItem(SESSION_KEY)
    } catch (error) {
      console.error('Failed to get session:', error)
      return null
    }
  },

  clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY)
      return true
    } catch (error) {
      console.error('Failed to clear session:', error)
      return false
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getSession()
    return token !== null && token !== ''
  },

  // Ticket Management
  getTickets() {
    try {
      const session = this.getSession()
      if (!session) {
        throw new Error('No active session')
      }
      
      const ticketsData = localStorage.getItem(`${TICKETS_KEY}_${session}`)
      if (!ticketsData) {
        // Return empty array for new users
        return []
      }
      
      const parsedTickets = JSON.parse(ticketsData)
      
      // Validate ticket data structure
      if (!Array.isArray(parsedTickets)) {
        throw new Error('Invalid ticket data format')
      }
      
      return parsedTickets
    } catch (error) {
      console.error('Failed to get tickets:', error)
      // Provide specific error message as required
      if (error.name === 'QuotaExceededError') {
        throw new Error('Storage quota exceeded. Please clear some data and retry.')
      }
      if (error instanceof SyntaxError) {
        throw new Error('Corrupted ticket data detected. Please contact support.')
      }
      throw new Error('Failed to load tickets. Please retry.')
    }
  },

  saveTickets(tickets) {
    try {
      const session = this.getSession()
      if (!session) {
        throw new Error('No active session')
      }
      
      if (!Array.isArray(tickets)) {
        throw new Error('Tickets must be an array')
      }
      
      localStorage.setItem(`${TICKETS_KEY}_${session}`, JSON.stringify(tickets))
      return true
    } catch (error) {
      console.error('Failed to save tickets:', error)
      if (error.name === 'QuotaExceededError') {
        throw new Error('Storage quota exceeded. Please clear some data and try again.')
      }
      throw new Error('Failed to save tickets. Please try again.')
    }
  },

  createTicket(ticketData) {
    try {
      const session = this.getSession()
      if (!session) {
        throw new Error('No active session')
      }
      
      // Validate required fields
      if (!ticketData.title || typeof ticketData.title !== 'string' || ticketData.title.trim() === '') {
        throw new Error('Title is required and must be a non-empty string')
      }
      
      // Validate status
      const validStatuses = ['open', 'in_progress', 'closed']
      const status = ticketData.status || 'open'
      if (!validStatuses.includes(status)) {
        throw new Error('Status must be one of: open, in_progress, or closed')
      }
      
      // Validate description length
      const description = ticketData.description || ''
      if (description.length > 2000) {
        throw new Error('Description must be less than 2000 characters')
      }
      
      const tickets = this.getTickets()
      
      const newTicket = {
        id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...ticketData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: session // Track which user created the ticket
      }
      
      tickets.push(newTicket)
      this.saveTickets(tickets)
      
      return newTicket
    } catch (error) {
      console.error('Failed to create ticket:', error)
      throw new Error('Failed to create ticket. Please try again.')
    }
  },

  updateTicket(id, updates) {
    try {
      if (!id) {
        throw new Error('Ticket ID is required')
      }
      
      const tickets = this.getTickets()
      const ticketIndex = tickets.findIndex(ticket => ticket.id === id)
      
      if (ticketIndex === -1) {
        throw new Error('Ticket not found')
      }

      // Validate updates if provided
      if (updates.title !== undefined) {
        if (!updates.title || typeof updates.title !== 'string' || updates.title.trim() === '') {
          throw new Error('Title is required and must be a non-empty string')
        }
        updates.title = updates.title.trim()
      }
      
      if (updates.status !== undefined) {
        const validStatuses = ['open', 'in_progress', 'closed']
        if (!validStatuses.includes(updates.status)) {
          throw new Error('Status must be one of: open, in_progress, or closed')
        }
      }
      
      if (updates.description !== undefined) {
        if (updates.description.length > 2000) {
          throw new Error('Description must be less than 2000 characters')
        }
      }

      const updatedTicket = {
        ...tickets[ticketIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      }

      tickets[ticketIndex] = updatedTicket
      this.saveTickets(tickets)
      return updatedTicket
    } catch (error) {
      console.error('Failed to update ticket:', error)
      throw error
    }
  },

  deleteTicket(id) {
    try {
      if (!id) {
        throw new Error('Ticket ID is required')
      }
      
      const tickets = this.getTickets()
      const filteredTickets = tickets.filter(ticket => ticket.id !== id)
      
      if (filteredTickets.length === tickets.length) {
        throw new Error('Ticket not found')
      }

      this.saveTickets(filteredTickets)
      return true
    } catch (error) {
      console.error('Failed to delete ticket:', error)
      throw error
    }
  },

  // Get a single ticket by ID
  getTicketById(id) {
    try {
      if (!id) {
        throw new Error('Ticket ID is required')
      }
      
      const tickets = this.getTickets()
      const ticket = tickets.find(ticket => ticket.id === id)
      
      if (!ticket) {
        throw new Error('Ticket not found')
      }
      
      return ticket
    } catch (error) {
      console.error('Failed to get ticket:', error)
      throw error
    }
  }
}