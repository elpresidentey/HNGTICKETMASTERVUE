import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import { useAuthStore } from '@/stores/auth'

// Mock vue-toastification
vi.mock('vue-toastification', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn()
  })
}))

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
    { path: '/signup', component: { template: '<div>Signup</div>' } }
  ]
})

describe('LoginForm', () => {
  let wrapper
  let authStore

  beforeEach(async () => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
    
    wrapper = mount(LoginForm, {
      global: {
        plugins: [router]
      }
    })
    
    await router.isReady()
  })

  it('should render login form with all required fields', () => {
    expect(wrapper.find('h2').text()).toBe('Sign in to your account')
    expect(wrapper.find('#email').exists()).toBe(true)
    expect(wrapper.find('#password').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('should have proper accessibility attributes', () => {
    const form = wrapper.find('form')
    const emailField = wrapper.find('#email')
    const passwordField = wrapper.find('#password')
    const submitButton = wrapper.find('button[type="submit"]')

    expect(form.attributes('role')).toBe('form')
    expect(emailField.attributes('autocomplete')).toBe('email')
    expect(passwordField.attributes('autocomplete')).toBe('current-password')
    expect(submitButton.attributes('aria-label')).toContain('Sign in')
  })

  it('should show validation errors for empty fields', async () => {
    const submitButton = wrapper.find('button[type="submit"]')
    await submitButton.trigger('click')

    // Wait for validation to process
    await wrapper.vm.$nextTick()
    
    // Check if validation errors appear
    const errorMessages = wrapper.findAll('[role="alert"]')
    expect(errorMessages.length).toBeGreaterThan(0)
  })

  it('should validate email format', async () => {
    const emailField = wrapper.find('#email')
    
    await emailField.setValue('invalid-email')
    await emailField.trigger('blur')
    await wrapper.vm.$nextTick()

    const errorMessage = wrapper.find('[name="email"] + [role="alert"]')
    expect(errorMessage.exists()).toBe(true)
  })

  it('should validate password length', async () => {
    const passwordField = wrapper.find('#password')
    
    await passwordField.setValue('123')
    await passwordField.trigger('blur')
    await wrapper.vm.$nextTick()

    const errorMessage = wrapper.find('[name="password"] + [role="alert"]')
    expect(errorMessage.exists()).toBe(true)
  })

  it('should show loading state during login', async () => {
    authStore.isLoading = true
    await wrapper.vm.$nextTick()

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
    expect(submitButton.text()).toContain('Signing in...')
  })

  it('should display auth store errors', async () => {
    authStore.error = 'Invalid credentials'
    await wrapper.vm.$nextTick()

    const errorDiv = wrapper.find('[role="alert"]')
    expect(errorDiv.text()).toBe('Invalid credentials')
  })

  it('should clear errors when user starts typing', async () => {
    authStore.error = 'Some error'
    const emailField = wrapper.find('#email')
    
    await emailField.setValue('test@example.com')
    
    expect(authStore.error).toBeNull()
  })

  it('should have link to signup page', () => {
    const signupLink = wrapper.find('a[href="/signup"]')
    expect(signupLink.exists()).toBe(true)
    expect(signupLink.text()).toBe('create a new account')
  })

  it('should call login action on form submission with valid data', async () => {
    const loginSpy = vi.spyOn(authStore, 'login').mockResolvedValue({ success: true })
    
    const emailField = wrapper.find('#email')
    const passwordField = wrapper.find('#password')
    
    await emailField.setValue('test@example.com')
    await passwordField.setValue('password123')
    
    const form = wrapper.find('form')
    await form.trigger('submit')
    
    expect(loginSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })
})