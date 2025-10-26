<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <router-link to="/" class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">TicketApp</span>
          </router-link>
          
          <div class="flex items-center gap-4">
            <router-link to="/" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-medium">
              Home
            </router-link>
            <router-link to="/signup" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Login Form -->
    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link 
            to="/signup" 
            class="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            create a new account
          </router-link>
        </p>
      </div>
      
      <Form @submit="handleSubmit" class="mt-8 space-y-6" v-slot="{ errors }" role="form" aria-labelledby="login-heading">
        <h2 id="login-heading" class="sr-only">Sign in form</h2>
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              :rules="validateEmail"
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" class="mt-1 text-sm text-red-600" role="alert" aria-live="polite" />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              :rules="validatePassword"
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" class="mt-1 text-sm text-red-600" role="alert" aria-live="polite" />
          </div>
        </div>

        <!-- Display auth error if exists -->
        <div v-if="authStore.error" class="text-red-600 text-sm text-center" role="alert" aria-live="polite">
          {{ authStore.error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.isLoading"
            :aria-label="authStore.isLoading ? 'Signing in, please wait' : 'Sign in to your account'"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="authStore.isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

// Clear any existing errors when component mounts
authStore.clearError()

// Validation rules with error clearing
const validateEmail = (value) => {
  // Clear auth errors when user starts correcting input
  if (authStore.error) {
    authStore.clearError()
  }
  
  if (!value) {
    return 'Email is required'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address'
  }
  return true
}

const validatePassword = (value) => {
  // Clear auth errors when user starts correcting input
  if (authStore.error) {
    authStore.clearError()
  }
  
  if (!value) {
    return 'Password is required'
  }
  if (value.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return true
}

const handleSubmit = async (values) => {
  try {
    await authStore.login(values)
    toast.success('Successfully signed in!')
    router.push('/dashboard')
  } catch (error) {
    // Error is already handled in the store and displayed in the template
    console.error('Login failed:', error)
  }
}
</script>