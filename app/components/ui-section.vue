<script setup lang="ts">
const {
  title,
  subtitle,
  id = "",
} = defineProps<{
  title: string
  subtitle?: string
  id?: string
}>()
</script>

<template>
  <section :id="id">
    <div class="container flex flex-col gap-10">
      <div class="flex flex-col gap-2">
        <h2>{{ title }}</h2>
        <p
          v-if="subtitle"
          class="text-muted-foreground max-w-150 text-lg leading-relaxed"
        >
          {{ subtitle }}
        </p>
      </div>
      <slot></slot>
    </div>
  </section>
</template>
