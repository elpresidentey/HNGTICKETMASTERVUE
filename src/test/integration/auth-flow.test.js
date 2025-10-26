import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import { useAuthStore } from '@/stores/auth'
import { storageService } from '@/services/storage'

// Mock storage service
vi.mock('@/services/storage', () => ({
  storageService: {
    setSession: vi.fn(),
    getSession: vi.fn(),
    clearSession: vi.fn(),
    isAuthenticated: vi.fn()
  }
}))

// Mock vue-toastification
vi.mock('vue-toastification', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn()
  })
}))

describe('Authentication Flow Integration', () => {
  let router
  let authStore

  beforeEach(async () => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
    
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/login', component: LoginForm },
        { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
        { path: '/signup', component: { template: '<div>Signup</div>' } }
      ]
    })
    
    await router.isReady()
    vi.clearAllMocks()
  })

  describe('Login Flow', () => {
    it('should complete full login flow successfully', async () => {
      storageService.setSession.mockReturnValue(true)
      storageService.isAuthenticated.mockReturnValue(true)
      
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router]
        }
      })

      // Fill in login form
      const emailField = wrapper.find('#email')
      const passwordField = wrapper.find('#password')
      
      await emailField.setValue('test@example.com')
      await passwordField.setValue('password123')

      // Submit form
      const form = wrapper.find('form')
      await form.trigger('submit')

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 600))

      // Verify login was successful
      expect(authStore.user).toBeTruthy()
      expect(authStore.user.email).toBe('test@example.com')
      expect(authStore.error).toBeNull()
      expect(storageService.setSession).toHaveBeenCalled()
    })

    it('should handle login failure correctly', async () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router]
        }
      })

      // Fill in invalid credentials
      const emailField = wrapper.find('#email')
      const passwordField = wrapper.find('#password')
      
      await emailField.setValue('invalid-email')
      await passwordField.setValue('123')

      // Submit form
      const form = wrapper.find('form')
      await form.trigger('submit')

      // Wait for validation
      await wrapper.vm.$nextTick()

      // Verify validation errors are shown
      expect(wrapper.text()).toContain('Please enter a valid email address')
      expect(wrapper.text()).toContain('Password must be at least 6 characters')
      expect(authStore.user).toBeNull()
    })

    it('should clear errors when user corrects input', async () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router]
        }
      })

      // Set an error in the store
      authStore.error = 'Invalid credentials'
      await wrapper.vm.$nextTick()

      // Verify error is displayed
      expect(wrapper.text()).toContain('Invalid credentials')

      // Start typing in email field
      const emailField = wrapper.find('#email')
      await emailField.setValue('test@example.com')

      // Verify error is cleared
      expect(authStore.error).toBeNull()
    })
  })

  describe('Session Management', () => {
    it('should check authentication on store initialization', () => {
      storageService.getSession.mockReturnValue('valid-token')
      
      authStore.checkAuth()

      expect(authStore.user).toBeTruthy()
      expect(authStore.user.sessionToken).toBe('valid-token')
    })

    it('should handle session expiration', () => {
      // Set up authenticated user
      authStore.user = { id: '1', email: 'test@example.com' }
      
      // Simulate session expiration
      authStore.handleSessionExpired()

      expect(authStore.user).toBeNull()
      expect(authStore.error).toBeNull()
      expect(storageService.clearSession).toHaveBeenCalled()
    })

    it('should logout user correctly', () => {
      // Set up authenticated user
      authStore.user = { id: '1', email: 'test@example.com' }
      authStore.error = 'Some error'
      
      authStore.logout()

      expect(authStore.user).toBeNull()
      expect(authStore.error).toBeNull()
      expect(storageService.clearSession).toHaveBeenCalled()
    })
  })

  describe('Authentication State', () => {
    it('should correctly determine authentication status', () => {
      // Not authenticated - no user
      authStore.user = null
      storageService.isAuthenticated.mockReturnValue(false)
      expect(authStore.isAuthenticated).toBe(false)

      // Not authenticated - user but no valid session
      authStore.user = { id: '1' }
      storageService.isAuthenticated.mockReturnValue(false)
      expect(authStore.isAuthenticated).toBe(false)

      // Authenticated - user and valid session
      authStore.user = { id: '1' }
      storageService.isAuthenticated.mockReturnValue(true)
      expect(authStore.isAuthenticated).toBe(true)
    })

    it('should handle storage errors gracefully during auth check', () => {
      storageService.getSession.mockImplementation(() => {
        throw new Error('Storage error')
      })
      
      // Should not throw error
      expect(() => authStore.checkAuth()).not.toThrow()
      
      // Should clear user and set appropriate error
      expect(authStore.user).toBeNull()
      expect(authStore.error).toBe('Failed to verify session. Please log in again.')
    })
  })

  describe('Form Validation Integration', () => {
    it('should validate email format in real-time', async () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router]
        }
      })

      const emailField = wrapper.find('#email')
      
      // Test invalid email
      await emailField.setValue('invalid')
      await emailField.trigger('blur')
      await wrapper.vm.$nextTick()
      
      expect(wrapper.text()).toContain('Please enter a valid email address')

      // Test valid email
      await emailField.setValue('test@example.com')
      await emailField.trigger('blur')
      await wrapper.vm.$nextTick()
      
      // Error should be cleared
      const errorMessages = wrapper.findAll('.text-red-600')
      const emailError = errorMessages.find(el => el.text().includes('Please enter a valid email'))
      expect(emailError).toBeFalsy()
    })

    it('should validate password requirements', async () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router]
        }
      })

      const passwordField = wrapper.find('#password')
      
      // Test short password
      await passwordField.setValue('123')
      await passwordField.trigger('blur')
      await wrapper.vm.$nextTick()
      
      expect(wrapper.text()).toContain('Password must be at least 6 characters')

      // Test valid password
      await passwordField.setValue('password123')
      await passwordField.trigger('blur')
      await wrapper.vm.$nextTick()
      
      // Error should be cleared
      const errorMessages = wrapper.findAll('.text-red-600')
      const passwordError = errorMessages.find(el => el.text().includes('Password must be at least 6 characters'))
      expect(passwordError).toBeFalsy()
    })
  })
})