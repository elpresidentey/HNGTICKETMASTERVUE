<template>
  <article class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1" :aria-labelledby="`ticket-title-${ticket.id}`">
    <!-- Status Header -->
    <div class="px-4 py-3 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div
            class="flex-shrink-0 h-3 w-3 rounded-full mr-2"
            :class="statusColorClass"
            :aria-label="`Status: ${formatStatus(ticket.status)}`"
            role="img"
          ></div>
          <span
            class="text-sm font-medium capitalize"
            :class="statusTextClass"
          >
            {{ formatStatus(ticket.status) }}
          </span>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click.stop="$emit('edit', ticket)"
            class="text-gray-400 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-1 hover:scale-110 hover:bg-blue-50"
            :aria-label="`Edit ticket: ${ticket.title}`"
            type="button"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            @click.stop="$emit('delete', ticket)"
            class="text-gray-400 hover:text-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded p-1 hover:scale-110 hover:bg-red-50"
            :aria-label="`Delete ticket: ${ticket.title}`"
            type="button"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Card Content -->
    <div class="px-4 py-5">
      <!-- Title -->
      <h3 class="text-lg font-medium text-gray-900 mb-2 line-clamp-2" :id="`ticket-title-${ticket.id}`">
        {{ ticket.title }}
      </h3>

      <!-- Description -->
      <p
        v-if="ticket.description"
        class="text-sm text-gray-600 mb-4 line-clamp-3"
      >
        {{ ticket.description }}
      </p>
      <p
        v-else
        class="text-sm text-gray-400 italic mb-4"
      >
        No description provided
      </p>

      <!-- Timestamps -->
      <div class="space-y-1">
        <div class="flex items-center text-xs text-gray-500">
          <svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Created: {{ formatDate(ticket.createdAt) }}</span>
        </div>
        <div
          v-if="ticket.updatedAt && ticket.updatedAt !== ticket.createdAt"
          class="flex items-center text-xs text-gray-500"
        >
          <svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Updated: {{ formatDate(ticket.updatedAt) }}</span>
        </div>
      </div>
    </div>

    <!-- Action Footer -->
    <div class="px-4 py-3 bg-gray-50 border-t border-gray-200">
      <div class="flex justify-between items-center">
        <span class="text-xs text-gray-500">
          ID: {{ ticket.id.slice(0, 8) }}...
        </span>
        <div class="flex space-x-2">
          <button
            @click.stop="$emit('edit', ticket)"
            class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            :aria-label="`Edit ticket: ${ticket.title}`"
            type="button"
          >
            <svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            @click.stop="$emit('delete', ticket)"
            class="inline-flex items-center px-3 py-1 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 hover:border-red-400 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            :aria-label="`Delete ticket: ${ticket.title}`"
            type="button"
          >
            <svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

// Status color classes based on requirements (green/amber/gray)
const statusColorClass = computed(() => {
  switch (props.ticket.status) {
    case 'open':
      return 'bg-green-500'
    case 'in_progress':
      return 'bg-amber-500'
    case 'closed':
      return 'bg-gray-500'
    default:
      return 'bg-gray-400'
  }
})

const statusTextClass = computed(() => {
  switch (props.ticket.status) {
    case 'open':
      return 'text-green-700'
    case 'in_progress':
      return 'text-amber-700'
    case 'closed':
      return 'text-gray-700'
    default:
      return 'text-gray-600'
  }
})

const formatStatus = (status) => {
  return status.replace('_', ' ')
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Invalid date'
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>