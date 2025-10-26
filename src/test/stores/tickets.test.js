import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTicketStore } from '@/stores/tickets'
import { storageService } from '@/services/storage'

// Mock the storage service
vi.mock('@/services/storage', () => ({
  storageService: {
    getTickets: vi.fn(),
    createTicket: vi.fn(),
    updateTicket: vi.fn(),
    deleteTicket: vi.fn()
  }
}))

describe('Ticket Store', () => {
  const mockTickets = [
    {
      id: '1',
      title: 'Test Ticket 1',
      description: 'Description 1',
      status: 'open',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    },
    {
      id: '2',
      title: 'Test Ticket 2',
      description: 'Description 2',
      status: 'in_progress',
      createdAt: '2023-01-02T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z'
    },
    {
      id: '3',
      title: 'Test Ticket 3',
      description: 'Description 3',
      status: 'closed',
      createdAt: '2023-01-03T00:00:00.000Z',
      updatedAt: '2023-01-03T00:00:00.000Z'
    }
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('loadTickets', () => {
    it('should load tickets successfully', async () => {
      const ticketStore = useTicketStore()
      storageService.getTickets.mockReturnValue(mockTickets)

      await ticketStore.loadTickets()

      expect(ticketStore.tickets).toEqual(mockTickets)
      expect(ticketStore.error).toBeNull()
      expect(ticketStore.isLoading).toBe(false)
    })

    it('should handle load tickets error', async () => {
      const ticketStore = useTicketStore()
      storageService.getTickets.mockImplementation(() => {
        throw new Error('Storage error')
      })

      await expect(ticketStore.loadTickets()).rejects.toThrow('Storage error')
      expect(ticketStore.error).toBe('Failed to load tickets. Please retry.')
      expect(ticketStore.isLoading).toBe(false)
    })
  })

  describe('createTicket', () => {
    it('should create ticket successfully', async () => {
      const ticketStore = useTicketStore()
      const newTicket = {
        id: '4',
        title: 'New Ticket',
        description: 'New Description',
        status: 'open',
        createdAt: '2023-01-04T00:00:00.000Z',
        updatedAt: '2023-01-04T00:00:00.000Z'
      }
      
      storageService.createTicket.mockReturnValue(newTicket)

      const result = await ticketStore.createTicket({
        title: 'New Ticket',
        description: 'New Description',
        status: 'open'
      })

      expect(result).toEqual(newTicket)
      expect(ticketStore.tickets).toContain(newTicket)
      expect(ticketStore.error).toBeNull()
      expect(ticketStore.isLoading).toBe(false)
    })

    it('should handle create ticket error', async () => {
      const ticketStore = useTicketStore()
      storageService.createTicket.mockImplementation(() => {
        throw new Error('Create error')
      })

      await expect(ticketStore.createTicket({})).rejects.toThrow('Create error')
      expect(ticketStore.error).toBe('Failed to create ticket. Please try again.')
      expect(ticketStore.isLoading).toBe(false)
    })
  })

  describe('updateTicket', () => {
    it('should update ticket successfully', async () => {
      const ticketStore = useTicketStore()
      ticketStore.tickets = [...mockTickets]
      
      const updatedTicket = {
        ...mockTickets[0],
        title: 'Updated Title',
        updatedAt: '2023-01-05T00:00:00.000Z'
      }
      
      storageService.updateTicket.mockReturnValue(updatedTicket)

      const result = await ticketStore.updateTicket('1', { title: 'Updated Title' })

      expect(result).toEqual(updatedTicket)
      expect(ticketStore.tickets[0]).toEqual(updatedTicket)
      expect(ticketStore.error).toBeNull()
      expect(ticketStore.isLoading).toBe(false)
    })

    it('should handle update ticket error', async () => {
      const ticketStore = useTicketStore()
      storageService.updateTicket.mockImplementation(() => {
        throw new Error('Update error')
      })

      await expect(ticketStore.updateTicket('1', {})).rejects.toThrow('Update error')
      expect(ticketStore.error).toBe('Failed to update ticket. Please try again.')
      expect(ticketStore.isLoading).toBe(false)
    })
  })

  describe('deleteTicket', () => {
    it('should delete ticket successfully', async () => {
      const ticketStore = useTicketStore()
      ticketStore.tickets = [...mockTickets]
      
      storageService.deleteTicket.mockReturnValue(true)

      const result = await ticketStore.deleteTicket('1')

      expect(result).toBe(true)
      expect(ticketStore.tickets).not.toContain(mockTickets[0])
      expect(ticketStore.tickets.length).toBe(2)
      expect(ticketStore.error).toBeNull()
      expect(ticketStore.isLoading).toBe(false)
    })

    it('should handle delete ticket error', async () => {
      const ticketStore = useTicketStore()
      storageService.deleteTicket.mockImplementation(() => {
        throw new Error('Delete error')
      })

      await expect(ticketStore.deleteTicket('1')).rejects.toThrow('Delete error')
      expect(ticketStore.error).toBe('Failed to delete ticket. Please try again.')
      expect(ticketStore.isLoading).toBe(false)
    })
  })

  describe('ticketStats', () => {
    it('should calculate ticket statistics correctly', () => {
      const ticketStore = useTicketStore()
      ticketStore.tickets = mockTickets

      const stats = ticketStore.ticketStats

      expect(stats.total).toBe(3)
      expect(stats.open).toBe(1)
      expect(stats.in_progress).toBe(1)
      expect(stats.closed).toBe(1)
    })

    it('should return zero stats for empty tickets', () => {
      const ticketStore = useTicketStore()
      ticketStore.tickets = []

      const stats = ticketStore.ticketStats

      expect(stats.total).toBe(0)
      expect(stats.open).toBe(0)
      expect(stats.in_progress).toBe(0)
      expect(stats.closed).toBe(0)
    })
  })

  describe('getTicketById', () => {
    it('should return ticket when found', () => {
      const ticketStore = useTicketStore()
      ticketStore.tickets = mockTickets

      const ticket = ticketStore.getTicketById('1')

      expect(ticket).toEqual(mockTickets[0])
    })

    it('should return null when ticket not found', () => {
      const ticketStore = useTicketStore()
      ticketStore.tickets = mockTickets

      const ticket = ticketStore.getTicketById('999')

      expect(ticket).toBeNull()
    })
  })

  describe('clearError', () => {
    it('should clear error state', () => {
      const ticketStore = useTicketStore()
      ticketStore.error = 'Some error'

      ticketStore.clearError()

      expect(ticketStore.error).toBeNull()
    })
  })
})