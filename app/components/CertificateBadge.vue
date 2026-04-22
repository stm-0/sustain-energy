<script setup lang="ts">
interface Props {
  level: "green" | "amber" | "red"
  companyName?: string
  score?: number
  year?: number
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  companyName: "Your Company",
  score: 0,
  year: new Date().getFullYear(),
  compact: false,
})

const options = {
  green: {
    icon: "ph:leaf-fill",
    label: "GREEN CERTIFIED",
    sub: "Sustainability Target Achieved",
    cardClass: "bg-primary/20 border-primary",
    iconColor: "var(--color-primary)",
    scoreColor: "var(--color-primary)",
  },
  amber: {
    icon: "ph:warning-circle-bold",
    label: "AMBER LEVEL",
    sub: "Approaching Sustainability Target",
    cardClass: "bg-score-amber/20 border-score-amber",
    iconColor: "var(--color-score-amber)",
    scoreColor: "#92400E",
  },
  red: {
    icon: "ph:x-circle-bold",
    label: "REQUIRES ACTION",
    sub: "Below Sustainability Target",
    cardClass: "bg-score-red/20 border-score-red",
    iconColor: "var(--color-score-red)",
    scoreColor: "#991B1B",
  },
}

const config = computed(() => options[props.level])
</script>

<template>
  <!-- Compact inline badge -->
  <UiBadge v-if="compact">
    <Icon :name="config.icon" size="12" />
    {{ config.label }}
  </UiBadge>

  <!-- Full certificate card -->
  <div
    v-else
    :class="[
      config.cardClass,
      'relative flex w-70 flex-col items-center gap-4 overflow-hidden rounded-sm p-8 text-center shadow-[0_8px_32px] shadow-black/10',
    ]"
  >
    <!-- Top accent bar -->
    <div
      class="absolute top-0 right-0 left-0 h-1.5 rounded-t-sm"
      :style="`background-color: ${config.iconColor};`"
    />

    <Icon
      :name="config.icon"
      size="48"
      :style="`color: ${config.iconColor};`"
    />

    <!-- Score -->
    <div>
      <p
        class="font-heading text-5xl leading-none font-bold"
        :style="`color: ${config.scoreColor};`"
      >
        {{ score }}
      </p>
      <p class="font-heading text-muted-foreground mt-1 text-sm font-semibold">
        / 100 points
      </p>
    </div>

    <!-- Level label -->
    <div>
      <p
        class="font-heading text-sm font-bold tracking-widest uppercase"
        :style="`color: ${config.iconColor};`"
      >
        {{ config.label }}
      </p>
      <p class="font-body text-muted-foreground mt-0.5 text-xs">
        {{ config.sub }}
      </p>
    </div>

    <!-- Company & year -->
    <div class="w-full border-t border-black/10 pt-4">
      <p class="font-heading text-sm font-semibold">
        {{ companyName }}
      </p>
      <p class="font-body text-muted-foreground mt-0.5 text-xs">
        Annual Assessment {{ year }}
      </p>
    </div>

    <!-- Download -->
    <UiButton variant="secondary" size="sm" full>
      <Icon name="ph:download-simple" size="14" />
      Download Certificate
    </UiButton>
  </div>
</template>

<style scoped>
.certificate-card {
  position: relative;
}
</style>
