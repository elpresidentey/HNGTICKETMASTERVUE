<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
    <!-- Modern geometric background -->
    <div class="absolute inset-0 z-0">
      <!-- Gradient orbs -->
      <div class="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Floating elements -->
    <div class="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-lg opacity-30 animate-float" aria-hidden="true"></div>
    <div class="absolute bottom-32 right-16 w-12 h-12 bg-purple-200 rounded-full opacity-40 animate-float animation-delay-1000" aria-hidden="true"></div>
    <div class="absolute top-1/3 right-1/4 w-8 h-8 bg-green-200 rounded-lg opacity-35 animate-float animation-delay-2000 hidden lg:block" aria-hidden="true"></div>

    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Enhanced Navigation -->
      <nav class="flex flex-col sm:flex-row justify-between items-center mb-16 sm:mb-20 gap-4 sm:gap-0" role="navigation" aria-label="Main navigation">
        <div class="flex items-center gap-3">
          <router-link 
            to="/" 
            class="flex items-center gap-3 group"
            aria-label="Go to home page"
          >
            <!-- Logo icon -->
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h1 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">TicketApp</h1>
          </router-link>
        </div>
        
        <div class="flex items-center gap-4" v-if="!authStore.isAuthenticated">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors px-3 py-2 rounded-lg font-medium"
            aria-label="Home page"
          >
            Home
          </router-link>
          <router-link 
            to="/login" 
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors px-3 py-2 rounded-lg font-medium"
            aria-label="Sign in to your account"
          >
            Sign In
          </router-link>
          <router-link 
            to="/signup" 
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            aria-label="Sign up for a new account"
          >
            Sign Up
          </router-link>
        </div>
        
        <div class="flex items-center gap-4" v-else>
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors px-3 py-2 rounded-lg font-medium"
            aria-label="Home page"
          >
            Home
          </router-link>
          <router-link 
            to="/dashboard" 
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            aria-label="Go to your dashboard"
          >
            Dashboard
          </router-link>
        </div>
      </nav>

      <!-- Enhanced Hero Section -->
      <main id="main-content" class="text-center max-w-5xl mx-auto" role="main">
        <!-- Hero badge -->
        <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8 animate-fade-in">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          Trusted by teams worldwide
        </div>

        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          <span class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Manage Your Support Tickets
          </span>
          <br>
          <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
            Effortlessly
          </span>
        </h2>
        
        <p class="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Streamline your support workflow with our intuitive ticket management system. 
          <br class="hidden sm:block">
          Create, track, and resolve tickets with unprecedented ease and efficiency.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16" v-if="!authStore.isAuthenticated">
          <router-link 
            to="/signup" 
            class="group inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 w-full sm:w-auto"
            aria-label="Sign up for a free account"
          >
            <svg class="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Get Started Free
          </router-link>
          <router-link 
            to="/login" 
            class="group inline-flex items-center px-8 py-4 border-2 border-gray-300 text-lg font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full sm:w-auto"
            aria-label="Sign in to your account"
          >
            <svg class="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            Sign In
          </router-link>
        </div>
        
        <div v-else class="flex justify-center mb-16">
          <router-link 
            to="/dashboard" 
            class="group inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 max-w-xs"
            aria-label="Go to your dashboard"
          >
            <svg class="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z"></path>
            </svg>
            Go to Dashboard
          </router-link>
        </div>

        <!-- Stats or social proof -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-3xl font-bold text-gray-900 mb-2">10k+</div>
            <div class="text-gray-600">Tickets Resolved</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
            <div class="text-gray-600">Uptime</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div class="text-gray-600">Support</div>
          </div>
        </div>
      </main>

      <!-- Features Section -->
      <section class="mt-16 sm:mt-24" aria-labelledby="features-heading">
        <h2 id="features-heading" class="sr-only">Key Features</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <!-- Interactive Create Ticket Card -->
          <article class="group text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-blue-200 hover:border-blue-400 cursor-pointer relative overflow-hidden" @click="handleCreateTicket">
            <!-- Animated background effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div class="relative z-10 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200 shadow-lg group-hover:shadow-xl" aria-hidden="true">
              <svg class="w-6 h-6 text-white group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
            <h3 class="relative z-10 text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Create Tickets</h3>
            <p class="relative z-10 text-gray-600 text-sm sm:text-base mb-4">Easily create and categorize support tickets with detailed descriptions.</p>
            <button @click.stop="handleCreateTicket" class="relative z-10 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:scale-105">
              <svg class="w-4 h-4 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              {{ authStore.isAuthenticated ? 'Create Ticket' : 'Try Demo' }}
            </button>
          </article>

          <!-- Interactive Track Progress Card -->
          <article class="group text-center p-6 bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 cursor-pointer relative overflow-hidden" @click="handleTrackProgress">
            <!-- Animated background effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div class="relative z-10 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200 shadow-lg group-hover:shadow-xl" aria-hidden="true">
              <svg class="w-6 h-6 text-white group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="relative z-10 text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">Track Progress</h3>
            <p class="relative z-10 text-gray-600 text-sm sm:text-base mb-4">Monitor ticket status and progress with real-time updates.</p>
            <button @click.stop="handleTrackProgress" class="relative z-10 inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:scale-105">
              <svg class="w-4 h-4 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              {{ authStore.isAuthenticated ? 'View Tickets' : 'See Demo' }}
            </button>
          </article>

          <!-- Interactive Resolve Issues Card -->
          <article class="group text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-green-200 hover:border-green-400 cursor-pointer relative overflow-hidden" @click="handleResolveIssues">
            <!-- Animated background effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div class="relative z-10 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200 shadow-lg group-hover:shadow-xl" aria-hidden="true">
              <svg class="w-6 h-6 text-white group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="relative z-10 text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">Resolve Issues</h3>
            <p class="relative z-10 text-gray-600 text-sm sm:text-base mb-4">Mark tickets as resolved and maintain a complete history.</p>
            <button @click.stop="handleResolveIssues" class="relative z-10 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:scale-105">
              <svg class="w-4 h-4 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {{ authStore.isAuthenticated ? 'Manage Tickets' : 'Try Demo' }}
            </button>
          </article>

          <!-- Interactive Analytics Card -->
          <article class="group text-center p-6 bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-purple-200 hover:border-purple-400 cursor-pointer relative overflow-hidden" @click="handleAnalytics">
            <!-- Animated background effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div class="relative z-10 w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200 shadow-lg group-hover:shadow-xl" aria-hidden="true">
              <svg class="w-6 h-6 text-white group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="relative z-10 text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">Analytics</h3>
            <p class="relative z-10 text-gray-600 text-sm sm:text-base mb-4">Get insights with detailed reports and performance metrics.</p>
            <button @click.stop="handleAnalytics" class="relative z-10 inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:scale-105">
              <svg class="w-4 h-4 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {{ authStore.isAuthenticated ? 'View Reports' : 'See Demo' }}
            </button>
          </article>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="relative z-10 bg-gray-900 text-white py-12 mt-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold">TicketApp</h3>
            </div>
            <p class="text-gray-400 mb-4 max-w-md">
              Streamline your support workflow with our intuitive ticket management system. 
              Built for teams that care about efficiency and customer satisfaction.
            </p>
            <div class="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="Follow us on Twitter">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="View our GitHub repository">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="Connect with us on LinkedIn">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><router-link to="/" class="text-gray-400 hover:text-white transition-colors">Home</router-link></li>
              <li><router-link to="/login" class="text-gray-400 hover:text-white transition-colors">Sign In</router-link></li>
              <li><router-link to="/signup" class="text-gray-400 hover:text-white transition-colors">Sign Up</router-link></li>
              <li><router-link to="/documentation" class="text-gray-400 hover:text-white transition-colors">Documentation</router-link></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h4 class="text-lg font-semibold mb-4">Support</h4>
            <ul class="space-y-2">
              <li><button @click="showHelpCenter = true" class="text-gray-400 hover:text-white transition-colors text-left">Help Center</button></li>
              <li><button @click="showContactUs = true" class="text-gray-400 hover:text-white transition-colors text-left">Contact Us</button></li>
              <li><button @click="showPrivacyPolicy = true" class="text-gray-400 hover:text-white transition-colors text-left">Privacy Policy</button></li>
              <li><button @click="showTermsOfService = true" class="text-gray-400 hover:text-white transition-colors text-left">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © 2024 TicketApp. All rights reserved.
          </p>
          <p class="text-gray-400 text-sm mt-2 sm:mt-0">
            Built with ❤️ using Vue.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>

    <!-- Create Ticket Modal -->
    <CreateTicketModal
      :is-open="showCreateModal"
      :demo-mode="!authStore.isAuthenticated"
      @close="closeCreateModal"
      @ticket-created="handleTicketCreated"
    />

    <!-- Track Progress Demo Modal - Simplified -->
    <div
      v-if="showProgressModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Track Progress Demo</h3>
            <button
              @click="closeProgressModal"
              class="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-6">
            <div class="bg-amber-100 p-4 rounded-lg text-center">
              <div class="text-xs text-amber-800 mb-2">Demo Mode - Sign up to track real tickets</div>
            </div>

            <div class="bg-amber-50 p-4 rounded-lg">
              <h4 class="font-medium text-amber-900 mb-4">Sample Ticket Progress</h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <div class="font-medium text-gray-900">Login Issue #001</div>
                    <div class="text-sm text-gray-600">Users unable to login with correct credentials</div>
                  </div>
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Open
                  </span>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <div class="font-medium text-gray-900">Performance Problem #002</div>
                    <div class="text-sm text-gray-600">Dashboard loading slowly for some users</div>
                  </div>
                  <span class="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                    In Progress
                  </span>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <div class="font-medium text-gray-900">Feature Request #003</div>
                    <div class="text-sm text-gray-600">Add export functionality for ticket data</div>
                  </div>
                  <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                    Closed
                  </span>
                </div>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                @click="router.push('/signup'); closeProgressModal()"
                class="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm"
              >
                Sign Up to Track Real Tickets
              </button>
              <button
                @click="closeProgressModal"
                class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Resolve Issues Demo Modal - Simplified -->
    <div
      v-if="showResolveModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Resolve Issues Demo</h3>
            <button
              @click="closeResolveModal"
              class="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-6">
            <div class="bg-green-100 p-4 rounded-lg text-center">
              <div class="text-xs text-green-800 mb-2">Demo Mode - Sign up to resolve real tickets</div>
            </div>

            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-medium text-green-900 mb-4">Ticket Resolution Process</h4>
              <div class="space-y-3">
                <div class="flex items-center p-3 bg-white rounded border">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span class="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Identify Issue</div>
                    <div class="text-sm text-gray-600">Review ticket details and understand the problem</div>
                  </div>
                </div>
                
                <div class="flex items-center p-3 bg-white rounded border">
                  <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                    <span class="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Work on Solution</div>
                    <div class="text-sm text-gray-600">Update status to "In Progress" and implement fix</div>
                  </div>
                </div>
                
                <div class="flex items-center p-3 bg-white rounded border">
                  <div class="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                    <span class="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Mark as Resolved</div>
                    <div class="text-sm text-gray-600">Close ticket and maintain resolution history</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                @click="router.push('/signup'); closeResolveModal()"
                class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
              >
                Sign Up to Resolve Real Tickets
              </button>
              <button
                @click="closeResolveModal"
                class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics Demo Modal - Simplified -->
    <div
      v-if="showAnalyticsModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Analytics Demo</h3>
            <button
              @click="closeAnalyticsModal"
              class="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-6">
            <div class="bg-purple-100 p-4 rounded-lg text-center">
              <div class="text-xs text-purple-800 mb-2">Demo Mode - Sign up for real analytics</div>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-4 bg-purple-50 rounded-lg">
                <div class="text-2xl font-bold text-purple-900">87%</div>
                <div class="text-sm text-purple-800">Resolution Rate</div>
              </div>
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-2xl font-bold text-blue-900">2.4h</div>
                <div class="text-sm text-blue-800">Response Time</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-900">94%</div>
                <div class="text-sm text-green-800">Satisfaction</div>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium mb-3">Ticket Distribution</h4>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-sm">Resolved (65%)</span>
                  <div class="w-24 bg-gray-200 rounded h-2">
                    <div class="bg-green-500 h-2 rounded" style="width: 65%"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">In Progress (25%)</span>
                  <div class="w-24 bg-gray-200 rounded h-2">
                    <div class="bg-amber-500 h-2 rounded" style="width: 25%"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Open (10%)</span>
                  <div class="w-24 bg-gray-200 rounded h-2">
                    <div class="bg-blue-500 h-2 rounded" style="width: 10%"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                @click="router.push('/signup'); closeAnalyticsModal()"
                class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm"
              >
                Sign Up for Real Analytics
              </button>
              <button
                @click="closeAnalyticsModal"
                class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Modals -->
    <HelpCenterModal :is-open="showHelpCenter" @close="showHelpCenter = false" />
    <ContactUsModal :is-open="showContactUs" @close="showContactUs = false" />
    <PrivacyPolicyModal :is-open="showPrivacyPolicy" @close="showPrivacyPolicy = false" />
    <TermsOfServiceModal :is-open="showTermsOfService" @close="showTermsOfService = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTicketStore } from '@/stores/tickets'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import CreateTicketModal from '@/components/CreateTicketModal.vue'
import HelpCenterModal from '@/components/HelpCenterModal.vue'
import ContactUsModal from '@/components/ContactUsModal.vue'
import PrivacyPolicyModal from '@/components/PrivacyPolicyModal.vue'
import TermsOfServiceModal from '@/components/TermsOfServiceModal.vue'

const authStore = useAuthStore()
const ticketStore = useTicketStore()
const router = useRouter()
const toast = useToast()

// Modal states
const showCreateModal = ref(false)
const showProgressModal = ref(false)
const showResolveModal = ref(false)
const showAnalyticsModal = ref(false)

// Footer modal states
const showHelpCenter = ref(false)
const showContactUs = ref(false)
const showPrivacyPolicy = ref(false)
const showTermsOfService = ref(false)

// Check authentication status on component mount
authStore.checkAuth()

const handleCreateTicket = () => {
  console.log('Handle Create Ticket clicked - authenticated:', authStore.isAuthenticated)
  console.log('showCreateModal before:', showCreateModal.value)
  if (!authStore.isAuthenticated) {
    // Show demo modal for non-authenticated users
    showCreateModal.value = true
    console.log('showCreateModal after (demo):', showCreateModal.value)
    return
  }
  showCreateModal.value = true
  console.log('showCreateModal after (auth):', showCreateModal.value)
}

const handleTicketCreated = (newTicket) => {
  showCreateModal.value = false
  
  if (!authStore.isAuthenticated) {
    // Demo mode - show demo success and redirect to signup
    toast.success('Demo ticket created! Sign up to save your tickets.')
    setTimeout(() => {
      router.push('/signup')
    }, 2000)
    return
  }
  
  toast.success(`Ticket "${newTicket.title}" created successfully!`)
  // Redirect to dashboard to see the new ticket
  router.push('/dashboard')
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const handleTrackProgress = () => {
  console.log('Handle Track Progress clicked - authenticated:', authStore.isAuthenticated)
  if (!authStore.isAuthenticated) {
    showProgressModal.value = true
    return
  }
  router.push('/tickets')
}

const handleResolveIssues = () => {
  console.log('Handle Resolve Issues clicked - authenticated:', authStore.isAuthenticated)
  if (!authStore.isAuthenticated) {
    showResolveModal.value = true
    return
  }
  router.push('/tickets')
}

const handleAnalytics = () => {
  console.log('Handle Analytics clicked - authenticated:', authStore.isAuthenticated)
  if (!authStore.isAuthenticated) {
    showAnalyticsModal.value = true
    return
  }
  router.push('/dashboard')
}

const closeProgressModal = () => {
  showProgressModal.value = false
}

const closeResolveModal = () => {
  showResolveModal.value = false
}

const closeAnalyticsModal = () => {
  showAnalyticsModal.value = false
}
</script>