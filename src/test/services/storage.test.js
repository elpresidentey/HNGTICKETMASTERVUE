import { describe, it, expect, beforeEach, vi } from 'vitest'
import { storageService } from '@/services/storage'

describe('Storage Service', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('Session Management', () => {
    describe('setSession', () => {
      it('should set session token successfully', () => {
        const token = 'test-token'
        
        const result = storageService.setSession(token)
        
        expect(result).toBe(true)
        expect(localStorage.setItem).toHaveBeenCalledWith('ticketapp_session', token)
      })

      it('should handle localStorage errors gracefully', () => {
        localStorage.setItem.mockImplementation(() => {
          throw new Error('Storage error')
        })
        
        const result = storageService.setSession('token')
        
        expect(result).toBe(false)
      })
    })

    describe('getSession', () => {
      it('should get session token successfully', () => {
        localStorage.getItem.mockReturnValue('test-token')
        
        const result = storageService.getSession()
        
        expect(result).toBe('test-token')
        expect(localStorage.getItem).toHaveBeenCalledWith('ticketapp_session')
      })

      it('should handle localStorage errors gracefully', () => {
        localStorage.getItem.mockImplementation(() => {
          throw new Error('Storage error')
        })
        
        const result = storageService.getSession()
        
        expect(result).toBeNull()
      })
    })

    describe('clearSession', () => {
      it('should clear session successfully', () => {
        const result = storageService.clearSession()
        
        expect(result).toBe(true)
        expect(localStorage.removeItem).toHaveBeenCalledWith('ticketapp_session')
      })

      it('should handle localStorage errors gracefully', () => {
        localStorage.removeItem.mockImplementation(() => {
          throw new Error('Storage error')
        })
        
        const result = storageService.clearSession()
        
        expect(result).toBe(false)
      })
    })

    describe('isAuthenticated', () => {
      it('should return true when session token exists', () => {
        localStorage.getItem.mockReturnValue('test-token')
        
        const result = storageService.isAuthenticated()
        
        expect(result).toBe(true)
      })

      it('should return false when session token is null', () => {
        localStorage.getItem.mockReturnValue(null)
        
        const result = storageService.isAuthenticated()
        
        expect(result).toBe(false)
      })

      it('should return false when session token is empty string', () => {
        localStorage.getItem.mockReturnValue('')
        
        const result = storageService.isAuthenticated()
        
        expect(result).toBe(false)
      })
    })
  })

  describe('Ticket Management', () => {
    describe('createTicket', () => {
      it('should create ticket with valid data', () => {
        localStorage.getItem.mockReturnValue('[]')
        
        const ticketData = {
          title: 'Test Ticket',
          description: 'Test Description',
          status: 'open'
        }
        
        const result = storageService.createTicket(ticketData)
        
        expect(result.title).toBe('Test Ticket')
        expect(result.description).toBe('Test Description')
        expect(result.status).toBe('open')
        expect(result.id).toBeDefined()
        expect(result.createdAt).toBeDefined()
        expect(result.updatedAt).toBeDefined()
      })

      it('should validate required title field', () => {
        expect(() => {
          storageService.createTicket({ title: '' })
        }).toThrow('Title is required and must be a non-empty string')
      })

      it('should validate status field', () => {
        expect(() => {
          storageService.createTicket({ title: 'Test', status: 'invalid' })
        }).toThrow('Status must be one of: open, in_progress, or closed')
      })

      it('should validate description length', () => {
        const longDescription = 'a'.repeat(2001)
        
        expect(() => {
          storageService.createTicket({ title: 'Test', description: longDescription })
        }).toThrow('Description must be less than 2000 characters')
      })

      it('should use default status when not provided', () => {
        localStorage.getItem.mockReturnValue('[]')
        
        const result = storageService.createTicket({ title: 'Test' })
        
        expect(result.status).toBe('open')
      })
    })

    describe('updateTicket', () => {
      const mockTickets = [
        {
          id: 'ticket_1',
          title: 'Original Title',
          description: 'Original Description',
          status: 'open',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z'
        }
      ]

      it('should update ticket successfully', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify(mockTickets))
        
        const updates = { title: 'Updated Title' }
        const result = storageService.updateTicket('ticket_1', updates)
        
        expect(result.title).toBe('Updated Title')
        expect(result.description).toBe('Original Description')
        expect(result.updatedAt).not.toBe('2023-01-01T00:00:00.000Z')
      })

      it('should throw error for non-existent ticket', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify(mockTickets))
        
        expect(() => {
          storageService.updateTicket('non-existent', { title: 'Test' })
        }).toThrow('Ticket not found')
      })

      it('should validate title updates', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify(mockTickets))
        
        expect(() => {
          storageService.updateTicket('ticket_1', { title: '' })
        }).toThrow('Title is required and must be a non-empty string')
      })

      it('should validate status updates', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify(mockTickets))
        
        expect(() => {
          storageService.updateTicket('ticket_1', { status: 'invalid' })
        }).toThrow('Status must be one of: open, in_progress, or closed')
      })

      it('should validate description length updates', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify(mockTickets))
        const longDescription = 'a'.repeat(2001)
        
        expect(() => {
          storageService.updateTicket('ticket_1', { description: longDescription })
        }).toThrow('Description must be less than 2000 characters')
      })
    })

    describe('deleteTicket', () => {
      const mockTickets = [
        { id: 'ticket_1', title: 'Ticket 1' },
        { id: 'ticket_2', title: 'Ticket 2' }
      ]

      it('should delete ticket successfully', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify(mockTickets))
        
        const result = storageService.deleteTicket('ticket_1')
        
        expect(result).toBe(true)
      })

      it('should throw error for non-existent ticket', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify(mockTickets))
        
        expect(() => {
          storageService.deleteTicket('non-existent')
        }).toThrow('Ticket not found')
      })

      it('should require ticket ID', () => {
        expect(() => {
          storageService.deleteTicket('')
        }).toThrow('Ticket ID is required')
      })
    })

    describe('getTickets', () => {
      it('should return parsed tickets from localStorage', () => {
        const mockTickets = [{ id: '1', title: 'Test' }]
        localStorage.getItem.mockReturnValue(JSON.stringify(mockTickets))
        
        const result = storageService.getTickets()
        
        expect(result).toEqual(mockTickets)
      })

      it('should return sample tickets when localStorage is empty', () => {
        localStorage.getItem.mockReturnValue(null)
        
        const result = storageService.getTickets()
        
        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBe(3)
        expect(result[0].title).toBe('Login Issue')
      })

      it('should handle corrupted data gracefully', () => {
        localStorage.getItem.mockReturnValue('invalid json')
        
        expect(() => {
          storageService.getTickets()
        }).toThrow('Corrupted ticket data detected. Please contact support.')
      })

      it('should handle invalid data format', () => {
        localStorage.getItem.mockReturnValue('"not an array"')
        
        expect(() => {
          storageService.getTickets()
        }).toThrow('Failed to load tickets. Please retry.')
      })
    })

    describe('getTicketById', () => {
      const mockTickets = [
        { id: 'ticket_1', title: 'Ticket 1' },
        { id: 'ticket_2', title: 'Ticket 2' }
      ]

      it('should return ticket when found', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify(mockTickets))
        
        const result = storageService.getTicketById('ticket_1')
        
        expect(result).toEqual(mockTickets[0])
      })

      it('should throw error when ticket not found', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify(mockTickets))
        
        expect(() => {
          storageService.getTicketById('non-existent')
        }).toThrow('Ticket not found')
      })

      it('should require ticket ID', () => {
        expect(() => {
          storageService.getTicketById('')
        }).toThrow('Ticket ID is required')
      })
    })
  })
})