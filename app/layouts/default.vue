<script setup lang="ts">
import "vue-sonner/style.css"
</script>

<template>
  <div class="relative flex min-h-screen flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
    <!-- Sonner component -->
    <div class="h-0! overflow-hidden">
      <UiToaster class="p-0!" />
    </div>
  </div>
</template>
