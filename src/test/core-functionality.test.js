import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useTicketStore } from '@/stores/tickets'
import { storageService } from '@/services/storage'

// Mock storage service
vi.mock('@/services/storage', () => ({
  storageService: {
    setSession: vi.fn(),
    getSession: vi.fn(),
    clearSession: vi.fn(),
    isAuthenticated: vi.fn(),
    getTickets: vi.fn(),
    createTicket: vi.fn(),
    updateTicket: vi.fn(),
    deleteTicket: vi.fn()
  }
}))

describe('Core Functionality Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('Authentication Core Features', () => {
    it('should authenticate user with valid credentials', async () => {
      const authStore = useAuthStore()
      storageService.setSession.mockReturnValue(true)

      const result = await authStore.login({
        email: 'test@example.com',
        password: 'password123'
      })

      expect(result.success).toBe(true)
      expect(authStore.user).toBeTruthy()
      expect(authStore.user.email).toBe('test@example.com')
    })

    it('should validate email format', async () => {
      const authStore = useAuthStore()

      await expect(authStore.login({
        email: 'invalid-email',
        password: 'password123'
      })).rejects.toThrow('Please enter a valid email address')
    })

    it('should validate password length', async () => {
      const authStore = useAuthStore()

      await expect(authStore.login({
        email: 'test@example.com',
        password: '123'
      })).rejects.toThrow('Password must be at least 6 characters')
    })

    it('should logout user correctly', () => {
      const authStore = useAuthStore()
      authStore.user = { id: '1', email: 'test@example.com' }

      authStore.logout()

      expect(authStore.user).toBeNull()
      expect(storageService.clearSession).toHaveBeenCalled()
    })
  })

  describe('Ticket Management Core Features', () => {
    const mockTickets = [
      {
        id: '1',
        title: 'Test Ticket 1',
        status: 'open',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z'
      },
      {
        id: '2',
        title: 'Test Ticket 2',
        status: 'in_progress',
        createdAt: '2023-01-02T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z'
      }
    ]

    it('should load tickets successfully', async () => {
      const ticketStore = useTicketStore()
      storageService.getTickets.mockReturnValue(mockTickets)

      await ticketStore.loadTickets()

      expect(ticketStore.tickets).toEqual(mockTickets)
      expect(ticketStore.error).toBeNull()
    })

    it('should create new ticket', async () => {
      const ticketStore = useTicketStore()
      ticketStore.tickets = [] // Initialize empty array
      
      const newTicket = {
        id: '3',
        title: 'New Ticket',
        status: 'open',
        createdAt: '2023-01-03T00:00:00.000Z',
        updatedAt: '2023-01-03T00:00:00.000Z'
      }
      
      storageService.createTicket.mockReturnValue(newTicket)

      const result = await ticketStore.createTicket({
        title: 'New Ticket',
        status: 'open'
      })

      expect(result).toEqual(newTicket)
      expect(ticketStore.tickets.length).toBe(1)
      expect(ticketStore.tickets[0]).toEqual(newTicket)
    })

    it('should update existing ticket', async () => {
      const ticketStore = useTicketStore()
      ticketStore.tickets = [...mockTickets]
      
      const updatedTicket = {
        ...mockTickets[0],
        title: 'Updated Title'
      }
      
      storageService.updateTicket.mockReturnValue(updatedTicket)

      await ticketStore.updateTicket('1', { title: 'Updated Title' })

      expect(ticketStore.tickets[0].title).toBe('Updated Title')
    })

    it('should delete ticket', async () => {
      const ticketStore = useTicketStore()
      ticketStore.tickets = [...mockTickets]
      
      storageService.deleteTicket.mockReturnValue(true)

      await ticketStore.deleteTicket('1')

      expect(ticketStore.tickets.find(t => t.id === '1')).toBeUndefined()
    })

    it('should calculate ticket statistics correctly', () => {
      const ticketStore = useTicketStore()
      ticketStore.tickets = mockTickets

      const stats = ticketStore.ticketStats

      expect(stats.total).toBe(2)
      expect(stats.open).toBe(1)
      expect(stats.in_progress).toBe(1)
      expect(stats.closed).toBe(0)
    })
  })

  describe('Error Handling', () => {
    it('should handle authentication errors', async () => {
      const authStore = useAuthStore()

      await expect(authStore.login({
        email: '',
        password: ''
      })).rejects.toThrow('Email and password are required')

      expect(authStore.error).toBe('Email and password are required')
    })

    it('should handle ticket loading errors', async () => {
      const ticketStore = useTicketStore()
      storageService.getTickets.mockImplementation(() => {
        throw new Error('Storage error')
      })

      await expect(ticketStore.loadTickets()).rejects.toThrow('Storage error')
      expect(ticketStore.error).toBe('Failed to load tickets. Please retry.')
    })

    it('should clear errors when requested', () => {
      const authStore = useAuthStore()
      authStore.error = 'Some error'

      authStore.clearError()

      expect(authStore.error).toBeNull()
    })
  })

  describe('Data Validation', () => {
    it('should validate required fields in authentication', async () => {
      const authStore = useAuthStore()

      // Test missing email
      await expect(authStore.login({
        email: '',
        password: 'password123'
      })).rejects.toThrow('Email and password are required')

      // Test missing password
      await expect(authStore.login({
        email: 'test@example.com',
        password: ''
      })).rejects.toThrow('Email and password are required')
    })

    it('should validate signup form fields', async () => {
      const authStore = useAuthStore()

      // Test password mismatch
      await expect(authStore.signup({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different'
      })).rejects.toThrow('Passwords do not match')

      // Test missing fields
      await expect(authStore.signup({
        name: '',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      })).rejects.toThrow('All fields are required')
    })
  })

  describe('Session Management', () => {
    it('should check authentication status correctly', () => {
      const authStore = useAuthStore()

      // Not authenticated
      authStore.user = null
      storageService.isAuthenticated.mockReturnValue(false)
      expect(authStore.isAuthenticated).toBe(false)

      // Authenticated
      authStore.user = { id: '1' }
      storageService.isAuthenticated.mockReturnValue(true)
      expect(authStore.isAuthenticated).toBe(true)
    })

    it('should handle session expiration', () => {
      const authStore = useAuthStore()
      authStore.user = { id: '1', email: 'test@example.com' }

      authStore.handleSessionExpired()

      expect(authStore.user).toBeNull()
      expect(storageService.clearSession).toHaveBeenCalled()
    })
  })
})