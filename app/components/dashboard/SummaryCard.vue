<script setup lang="ts">
interface Props {
  icon: string
  title: string
  value: string
  sub?: string
  linkLabel?: string
  linkTo?: string
  isLinkActive?: boolean
  iconBg?: string
  iconColor?: string
}

withDefaults(defineProps<Props>(), {
  iconBg: "bg-neutral-800/5 border-neutral-800/20",
  iconColor: "text-muted-foreground",
  isLinkActive: true,
})
</script>

<template>
  <UiCard>
    <UiCardHeader>
      <div
        class="flex size-12 items-center justify-center rounded-xl border"
        :class="iconBg"
      >
        <Icon :name="icon" size="24" :class="iconColor" />
      </div>
      <UiCardAction>
        <NuxtLink
          v-if="isLinkActive && linkTo && linkLabel"
          :to="linkTo"
          class="font-heading text-primary/80 flex items-center gap-1 text-xs font-semibold transition-colors"
        >
          {{ linkLabel }}
          <Icon name="ph:arrow-right" size="12" />
        </NuxtLink>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent>
      <div>
        <UiCardTitle
          class="font-heading text-muted-foreground mb-1 text-xs font-semibold tracking-widest uppercase"
        >
          {{ title }}
        </UiCardTitle>
        <p class="font-heading text-2xl font-bold">
          <slot name="value">{{ value }}</slot>
        </p>
      </div>
    </UiCardContent>
    <UiCardFooter>
      <p class="text-muted-foreground mt-1 h-full text-sm">
        {{ sub }}
      </p>
    </UiCardFooter>
  </UiCard>
</template>
