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
      const ticketsData = localStorage.getItem(TICKETS_KEY)
      if (!ticketsData) {
        // Initialize with some sample tickets for demo
        const sampleTickets = [
          {
            id: 'ticket_1',
            title: 'Login Issue',
            description: 'Users unable to login with correct credentials',
            status: 'open',
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            updatedAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 'ticket_2',
            title: 'Performance Problem',
            description: 'Dashboard loading slowly for some users',
            status: 'in_progress',
            createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            updatedAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
          },
          {
            id: 'ticket_3',
            title: 'Feature Request',
            description: 'Add export functionality for ticket data',
            status: 'closed',
            createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            updatedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
          }
        ]
        this.saveTickets(sampleTickets)
        return sampleTickets
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
      if (!Array.isArray(tickets)) {
        throw new Error('Tickets must be an array')
      }
      
      localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
      return true
    } catch (error) {
      console.error('Failed to save tickets:', error)
      // Provide specific error messages for different storage issues
      if (error.name === 'QuotaExceededError') {
        throw new Error('Storage quota exceeded. Please clear some data and try again.')
      }
      if (error.name === 'SecurityError') {
        throw new Error('Storage access denied. Please check your browser settings.')
      }
      throw new Error('Failed to save tickets. Please try again.')
    }
  },

  createTicket(ticketData) {
    try {
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
        id: `ticket_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        title: ticketData.title.trim(),
        description: description,
        status: status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      tickets.push(newTicket)
      this.saveTickets(tickets)
      return newTicket
    } catch (error) {
      console.error('Failed to create ticket:', error)
      throw error
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