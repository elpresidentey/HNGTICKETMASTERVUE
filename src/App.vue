<script setup>
// Main App component with router view
</script>

<template>
  <div id="app">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <RouterView v-slot="{ Component, route }">
      <Transition
        :name="getTransitionName(route)"
        mode="out-in"
        appear
      >
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<script>
// Transition logic
const getTransitionName = (route) => {
  // Different transitions based on route patterns
  if (route.path === '/') return 'fade'
  if (route.path === '/login' || route.path === '/signup') return 'slide-up'
  if (route.path === '/dashboard' || route.path === '/tickets') return 'slide-right'
  return 'fade'
}
</script>

<style scoped>
#app {
  min-height: 100vh;
}

/* Vue Router Transitions */
/* Fade transition for home page */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide up transition for auth pages */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Slide right transition for dashboard/tickets */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
