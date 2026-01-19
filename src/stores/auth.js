import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storageService } from '@/services/storage'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => {
    return user.value !== null && storageService.isAuthenticated()
  })

  // Actions
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Simple validation for demo purposes
      const { email, password } = credentials
      
      if (!email || !password) {
        throw new Error('Email and password are required')
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      // For demo purposes, accept any valid email/password combination
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address')
      }

      // Generate a simple session token
      const sessionToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Store session
      if (!storageService.setSession(sessionToken)) {
        throw new Error('Failed to save session')
      }

      // Set user data
      user.value = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0], // Use email prefix as name for demo
        email: email,
        sessionToken: sessionToken
      }

      return { success: true, user: user.value }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const signup = async (userData) => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const { name, email, password, confirmPassword } = userData

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        throw new Error('All fields are required')
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address')
      }

      // Generate session token
      const sessionToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Store session
      if (!storageService.setSession(sessionToken)) {
        throw new Error('Failed to save session')
      }

      // Set user data
      user.value = {
        id: `user_${Date.now()}`,
        name: name,
        email: email,
        sessionToken: sessionToken
      }

      return { success: true, user: user.value }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      // Clear the session
      storageService.clearSession()
      
      // Reset user data
      user.value = null
      
      return true
    } catch (error) {
      console.error('Error during logout:', error)
      throw new Error('Failed to log out. Please try again.')
    }
  }

  const checkAuth = () => {
    try {
      const token = storageService.getSession()
      if (token) {
        // In a real app, you would validate the token with the server
        // For demo purposes, we'll just check if token exists
        user.value = {
          id: 'demo_user',
          name: 'Demo User',
          email: 'demo@example.com',
          sessionToken: token
        }
      } else {
        // Clear user if no valid session
        user.value = null
      }
    } catch (err) {
      // Handle storage errors gracefully
      console.error('Error checking authentication:', err)
      user.value = null
      error.value = 'Failed to verify session. Please log in again.'
    }
  }

  const handleSessionExpired = () => {
    user.value = null
    error.value = null
    storageService.clearSession()
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    // Actions
    login,
    signup,
    logout,
    checkAuth,
    handleSessionExpired,
    clearError
  }
})