<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
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
            <router-link to="/" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Home
            </router-link>
            <router-link to="/login" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Sign In
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p class="text-xl text-gray-600">Everything you need to know about using TicketApp</p>
        </div>

        <!-- Quick Start -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Start</h2>
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="grid md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">1. Sign Up</h3>
                <p class="text-gray-600 text-sm">Create your free account to get started</p>
              </div>
              
              <div class="text-center">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">2. Create Tickets</h3>
                <p class="text-gray-600 text-sm">Add your first support ticket</p>
              </div>
              
              <div class="text-center">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">3. Track Progress</h3>
                <p class="text-gray-600 text-sm">Monitor and manage your tickets</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Features -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Features</h2>
          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Ticket Management</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Create, edit, and delete tickets
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Status tracking (Open, In Progress, Closed)
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Real-time updates and notifications
                </li>
              </ul>
            </div>

            <div class="bg-white rounded-lg shadow-sm border p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Dashboard & Analytics</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Overview of ticket statistics
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Visual progress tracking
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Performance metrics
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- API Reference -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Test Credentials</h3>
            <p class="text-gray-600 mb-4">Use these credentials to test the application:</p>
            <div class="bg-gray-50 rounded-md p-4">
              <p class="font-mono text-sm">
                <strong>Email:</strong> demo@ticketapp.com<br>
                <strong>Password:</strong> demo123
              </p>
            </div>
          </div>
        </section>

        <!-- Support -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
          <div class="bg-blue-50 rounded-lg p-6 text-center">
            <h3 class="text-lg font-semibold text-blue-900 mb-2">Contact Support</h3>
            <p class="text-blue-700 mb-4">Have questions? We're here to help!</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button @click="openHelpCenter" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                Help Center
              </button>
              <button @click="openContactUs" class="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-6 py-2 rounded-md">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const openHelpCenter = () => {
  toast.info('Help Center would open here in a real application')
}

const openContactUs = () => {
  toast.info('Contact form would open here in a real application')
}
</script>