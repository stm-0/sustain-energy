<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "light" | "dark"
  }>(),
  {
    variant: "light",
  },
)
</script>

<template>
  <!-- Logo -->
  <NuxtLink to="/" class="flex shrink-0 items-center gap-2.5 select-none">
    <div
      class="bg-primary flex size-8 items-center justify-center rounded-full"
    >
      <Icon name="ph:leaf-bold" size="18" class="text-white" />
    </div>
    <span
      class="font-heading hidden text-xl font-bold tracking-tight sm:block"
      :class="variant === 'light' ? 'text-foreground' : 'text-white'"
    >
      Sustain<span class="text-primary">Energy</span>
    </span>
  </NuxtLink>
</template>
