import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { storageService } from '@/services/storage'

// Mock the storage service
vi.mock('@/services/storage', () => ({
  storageService: {
    setSession: vi.fn(),
    getSession: vi.fn(),
    clearSession: vi.fn(),
    isAuthenticated: vi.fn()
  }
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const authStore = useAuthStore()
      storageService.setSession.mockReturnValue(true)

      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      }

      const result = await authStore.login(credentials)

      expect(result.success).toBe(true)
      expect(result.user.email).toBe('test@example.com')
      expect(result.user.name).toBe('test')
      expect(storageService.setSession).toHaveBeenCalled()
      expect(authStore.user).toBeTruthy()
      expect(authStore.error).toBeNull()
    })

    it('should fail login with invalid email', async () => {
      const authStore = useAuthStore()

      const credentials = {
        email: 'invalid-email',
        password: 'password123'
      }

      await expect(authStore.login(credentials)).rejects.toThrow('Please enter a valid email address')
      expect(authStore.user).toBeNull()
      expect(authStore.error).toBe('Please enter a valid email address')
    })

    it('should fail login with short password', async () => {
      const authStore = useAuthStore()

      const credentials = {
        email: 'test@example.com',
        password: '123'
      }

      await expect(authStore.login(credentials)).rejects.toThrow('Password must be at least 6 characters')
      expect(authStore.user).toBeNull()
      expect(authStore.error).toBe('Password must be at least 6 characters')
    })

    it('should fail login with missing credentials', async () => {
      const authStore = useAuthStore()

      const credentials = {
        email: '',
        password: ''
      }

      await expect(authStore.login(credentials)).rejects.toThrow('Email and password are required')
      expect(authStore.user).toBeNull()
      expect(authStore.error).toBe('Email and password are required')
    })
  })

  describe('signup', () => {
    it('should signup successfully with valid data', async () => {
      const authStore = useAuthStore()
      storageService.setSession.mockReturnValue(true)

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      }

      const result = await authStore.signup(userData)

      expect(result.success).toBe(true)
      expect(result.user.email).toBe('test@example.com')
      expect(result.user.name).toBe('Test User')
      expect(storageService.setSession).toHaveBeenCalled()
      expect(authStore.user).toBeTruthy()
      expect(authStore.error).toBeNull()
    })

    it('should fail signup when passwords do not match', async () => {
      const authStore = useAuthStore()

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different'
      }

      await expect(authStore.signup(userData)).rejects.toThrow('Passwords do not match')
      expect(authStore.user).toBeNull()
      expect(authStore.error).toBe('Passwords do not match')
    })

    it('should fail signup with missing fields', async () => {
      const authStore = useAuthStore()

      const userData = {
        name: '',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      }

      await expect(authStore.signup(userData)).rejects.toThrow('All fields are required')
      expect(authStore.user).toBeNull()
      expect(authStore.error).toBe('All fields are required')
    })
  })

  describe('logout', () => {
    it('should clear user data and session on logout', () => {
      const authStore = useAuthStore()
      authStore.user = { id: '1', name: 'Test', email: 'test@example.com' }

      authStore.logout()

      expect(authStore.user).toBeNull()
      expect(authStore.error).toBeNull()
      expect(storageService.clearSession).toHaveBeenCalled()
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when user exists and storage service confirms authentication', () => {
      const authStore = useAuthStore()
      authStore.user = { id: '1', name: 'Test', email: 'test@example.com' }
      storageService.isAuthenticated.mockReturnValue(true)

      expect(authStore.isAuthenticated).toBe(true)
    })

    it('should return false when user is null', () => {
      const authStore = useAuthStore()
      authStore.user = null
      storageService.isAuthenticated.mockReturnValue(true)

      expect(authStore.isAuthenticated).toBe(false)
    })

    it('should return false when storage service returns false', () => {
      const authStore = useAuthStore()
      authStore.user = { id: '1', name: 'Test', email: 'test@example.com' }
      storageService.isAuthenticated.mockReturnValue(false)

      expect(authStore.isAuthenticated).toBe(false)
    })
  })

  describe('checkAuth', () => {
    it('should set user when valid session exists', () => {
      const authStore = useAuthStore()
      storageService.getSession.mockReturnValue('valid-token')

      authStore.checkAuth()

      expect(authStore.user).toBeTruthy()
      expect(authStore.user.sessionToken).toBe('valid-token')
    })

    it('should clear user when no session exists', () => {
      const authStore = useAuthStore()
      storageService.getSession.mockReturnValue(null)

      authStore.checkAuth()

      expect(authStore.user).toBeNull()
    })
  })

  describe('clearError', () => {
    it('should clear error state', () => {
      const authStore = useAuthStore()
      authStore.error = 'Some error'

      authStore.clearError()

      expect(authStore.error).toBeNull()
    })
  })
})