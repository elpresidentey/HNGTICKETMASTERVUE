import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTicketStore } from '@/stores/tickets'
import { storageService } from '@/services/storage'

// Mock storage service
vi.mock('@/services/storage', () => ({
  storageService: {
    getTickets: vi.fn(),
    createTicket: vi.fn(),
    updateTicket: vi.fn(),
    deleteTicket: vi.fn()
  }
}))

describe('Ticket CRUD Integration', () => {
  let ticketStore

  const mockTickets = [
    {
      id: 'ticket_1',
      title: 'Login Issue',
      description: 'Users unable to login',
      status: 'open',
      createdAt: '2023-01-01T10:00:00.000Z',
      updatedAt: '2023-01-01T10:00:00.000Z'
    },
    {
      id: 'ticket_2',
      title: 'Performance Problem',
      description: 'Dashboard loading slowly',
      status: 'in_progress',
      createdAt: '2023-01-02T10:00:00.000Z',
      updatedAt: '2023-01-02T15:00:00.000Z'
    }
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
    ticketStore = useTicketStore()
    vi.clearAllMocks()
  })

  describe('Complete CRUD Flow', () => {
    it('should perform full CRUD lifecycle successfully', async () => {
      // 1. Load existing tickets
      storageService.getTickets.mockReturnValue(mockTickets)
      await ticketStore.loadTickets()
      
      expect(ticketStore.tickets).toEqual(mockTickets)
      expect(ticketStore.ticketStats.total).toBe(2)
      expect(ticketStore.ticketStats.open).toBe(1)
      expect(ticketStore.ticketStats.in_progress).toBe(1)

      // 2. Create new ticket
      const newTicketData = {
        title: 'New Feature Request',
        description: 'Add export functionality',
        status: 'open'
      }
      
      const createdTicket = {
        id: 'ticket_3',
        ...newTicketData,
        createdAt: '2023-01-03T10:00:00.000Z',
        updatedAt: '2023-01-03T10:00:00.000Z'
      }
      
      storageService.createTicket.mockReturnValue(createdTicket)
      const result = await ticketStore.createTicket(newTicketData)
      
      expect(result).toEqual(createdTicket)
      expect(ticketStore.tickets).toContain(createdTicket)
      expect(ticketStore.ticketStats.total).toBe(3)
      expect(ticketStore.ticketStats.open).toBe(2)

      // 3. Update ticket
      const updatedTicket = {
        ...createdTicket,
        status: 'in_progress',
        updatedAt: '2023-01-03T15:00:00.000Z'
      }
      
      storageService.updateTicket.mockReturnValue(updatedTicket)
      await ticketStore.updateTicket('ticket_3', { status: 'in_progress' })
      
      const ticketInStore = ticketStore.tickets.find(t => t.id === 'ticket_3')
      expect(ticketInStore.status).toBe('in_progress')
      expect(ticketStore.ticketStats.open).toBe(1)
      expect(ticketStore.ticketStats.in_progress).toBe(2)

      // 4. Delete ticket
      storageService.deleteTicket.mockReturnValue(true)
      await ticketStore.deleteTicket('ticket_3')
      
      expect(ticketStore.tickets.find(t => t.id === 'ticket_3')).toBeUndefined()
      expect(ticketStore.ticketStats.total).toBe(2)
      expect(ticketStore.ticketStats.in_progress).toBe(1)
    })

    it('should handle concurrent operations correctly', async () => {
      storageService.getTickets.mockReturnValue([])
      await ticketStore.loadTickets()

      // Simulate concurrent create operations
      const ticket1 = { id: 'ticket_1', title: 'Ticket 1', status: 'open' }
      const ticket2 = { id: 'ticket_2', title: 'Ticket 2', status: 'open' }
      
      storageService.createTicket
        .mockReturnValueOnce(ticket1)
        .mockReturnValueOnce(ticket2)

      // Create tickets concurrently
      const [result1, result2] = await Promise.all([
        ticketStore.createTicket({ title: 'Ticket 1', status: 'open' }),
        ticketStore.createTicket({ title: 'Ticket 2', status: 'open' })
      ])

      expect(ticketStore.tickets).toContain(ticket1)
      expect(ticketStore.tickets).toContain(ticket2)
      expect(ticketStore.ticketStats.total).toBe(2)
    })
  })

  describe('Error Handling in CRUD Operations', () => {
    it('should handle load tickets error and maintain state', async () => {
      storageService.getTickets.mockImplementation(() => {
        throw new Error('Storage unavailable')
      })

      await expect(ticketStore.loadTickets()).rejects.toThrow('Storage unavailable')
      
      expect(ticketStore.error).toBe('Failed to load tickets. Please retry.')
      expect(ticketStore.isLoading).toBe(false)
      expect(ticketStore.tickets).toEqual([])
    })

    it('should handle create ticket error and rollback state', async () => {
      const initialTickets = [...mockTickets]
      ticketStore.tickets = initialTickets
      
      storageService.createTicket.mockImplementation(() => {
        throw new Error('Create failed')
      })

      await expect(ticketStore.createTicket({ title: 'Test' })).rejects.toThrow('Create failed')
      
      expect(ticketStore.error).toBe('Failed to create ticket. Please try again.')
      expect(ticketStore.tickets).toEqual(initialTickets) // State unchanged
    })

    it('should handle update ticket error and maintain original state', async () => {
      ticketStore.tickets = [...mockTickets]
      const originalTicket = { ...mockTickets[0] }
      
      storageService.updateTicket.mockImplementation(() => {
        throw new Error('Update failed')
      })

      await expect(ticketStore.updateTicket('ticket_1', { title: 'New Title' })).rejects.toThrow('Update failed')
      
      expect(ticketStore.error).toBe('Failed to update ticket. Please try again.')
      expect(ticketStore.tickets[0]).toEqual(originalTicket) // State unchanged
    })

    it('should handle delete ticket error and maintain state', async () => {
      ticketStore.tickets = [...mockTickets]
      const originalCount = ticketStore.tickets.length
      
      storageService.deleteTicket.mockImplementation(() => {
        throw new Error('Delete failed')
      })

      await expect(ticketStore.deleteTicket('ticket_1')).rejects.toThrow('Delete failed')
      
      expect(ticketStore.error).toBe('Failed to delete ticket. Please try again.')
      expect(ticketStore.tickets.length).toBe(originalCount) // State unchanged
    })
  })

  describe('Ticket Statistics Integration', () => {
    it('should update statistics correctly after each operation', async () => {
      // Start with empty store
      storageService.getTickets.mockReturnValue([])
      await ticketStore.loadTickets()
      
      expect(ticketStore.ticketStats).toEqual({
        total: 0,
        open: 0,
        in_progress: 0,
        closed: 0
      })

      // Add tickets with different statuses
      const tickets = [
        { id: '1', status: 'open' },
        { id: '2', status: 'open' },
        { id: '3', status: 'in_progress' },
        { id: '4', status: 'closed' }
      ]

      for (const ticket of tickets) {
        storageService.createTicket.mockReturnValue(ticket)
        await ticketStore.createTicket(ticket)
      }

      expect(ticketStore.ticketStats).toEqual({
        total: 4,
        open: 2,
        in_progress: 1,
        closed: 1
      })

      // Update ticket status
      const updatedTicket = { ...tickets[0], status: 'closed' }
      storageService.updateTicket.mockReturnValue(updatedTicket)
      await ticketStore.updateTicket('1', { status: 'closed' })

      expect(ticketStore.ticketStats).toEqual({
        total: 4,
        open: 1,
        in_progress: 1,
        closed: 2
      })

      // Delete ticket
      storageService.deleteTicket.mockReturnValue(true)
      await ticketStore.deleteTicket('2')

      expect(ticketStore.ticketStats).toEqual({
        total: 3,
        open: 0,
        in_progress: 1,
        closed: 2
      })
    })
  })

  describe('Ticket Retrieval', () => {
    it('should find tickets by ID correctly', () => {
      ticketStore.tickets = mockTickets
      
      const foundTicket = ticketStore.getTicketById('ticket_1')
      expect(foundTicket).toEqual(mockTickets[0])
      
      const notFound = ticketStore.getTicketById('non-existent')
      expect(notFound).toBeNull()
    })

    it('should handle empty ticket list', () => {
      ticketStore.tickets = []
      
      const result = ticketStore.getTicketById('any-id')
      expect(result).toBeNull()
    })
  })

  describe('Error State Management', () => {
    it('should clear errors when requested', () => {
      ticketStore.error = 'Some error occurred'
      
      ticketStore.clearError()
      
      expect(ticketStore.error).toBeNull()
    })

    it('should clear errors on successful operations', async () => {
      ticketStore.error = 'Previous error'
      
      storageService.getTickets.mockReturnValue(mockTickets)
      await ticketStore.loadTickets()
      
      expect(ticketStore.error).toBeNull()
    })
  })
})