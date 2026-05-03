<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"

import { Toaster as Sonner } from "vue-sonner"
import { cn } from "@/lib/utils"

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    :toast-options="{
      classes: {
        toast: 'rounded-2xl',
      },
    }"
    v-bind="props"
  >
    <template #success-icon>
      <Icon name="ph:check-circle" :size="16" />
    </template>
    <template #info-icon>
      <Icon name="ph:info" :size="16" />
    </template>
    <template #warning-icon>
      <Icon name="ph:circle-wavy-warning" :size="16" />
    </template>
    <template #error-icon>
      <Icon name="ph:warning-octagon-bold" :size="16" />
    </template>
    <template #loading-icon>
      <div>
        <Icon name="ph:circle-notch" :size="16" class="animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <Icon name="ph:x-circle" :size="16" />
    </template>
  </Sonner>
</template>
