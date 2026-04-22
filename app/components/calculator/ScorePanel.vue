<script setup lang="ts">
interface Props {
  score: number
  completed: number
  total: number
}

const props = withDefaults(defineProps<Props>(), {
  total: 10,
})

const level = computed<"green" | "amber" | "red">(() => {
  if (props.score >= 70) return "green"
  if (props.score >= 40) return "amber"
  return "red"
})

const levelConfig = computed(
  () =>
    ({
      green: {
        label: "Green Level",
        color: "text-primary",
        bg: "bg-primary/20",
      },
      amber: {
        label: "Amber Level",
        color: "text-score-amber",
        bg: "bg-score-amber/20",
      },
      red: {
        label: "Red Level",
        color: "text-score-red",
        bg: "bg-score-red/20",
      },
    })[level.value],
)

const progressPct = computed(() => (props.completed / props.total) * 100)
const maxScore = computed(() => props.total * 10)
const shortfall = computed(() => Math.max(0, 70 - props.score))
</script>

<template>
  <div class="card sticky top-20 flex flex-col gap-5">
    <!-- Progress header -->
    <div>
      <div class="mb-2 flex items-center justify-between">
        <span
          class="font-heading text-muted-foreground text-xs font-semibold tracking-widest uppercase"
        >
          Progress
        </span>
        <span
          class="font-heading text-sm font-bold"
          style="color: var(--color-forest)"
        >
          {{ completed }} / {{ total }}
        </span>
      </div>
      <UiProgress :model-value="progressPct" />
    </div>

    <!-- Live score -->
    <div
      class="rounded-xl p-4 text-center transition-all duration-300"
      :class="levelConfig.bg"
    >
      <p
        class="font-heading text-6xl leading-none font-bold"
        :class="levelConfig.color"
      >
        {{ score }}
      </p>
      <p class="font-heading text-muted-foreground mt-1 text-sm font-semibold">
        / {{ maxScore }} points
      </p>
      <div class="mt-3">
        <UiBadge variant="ghost">
          <Icon
            :name="
              level === 'green'
                ? 'ph:leaf-bold'
                : level === 'amber'
                  ? 'ph:warning-circle-bold'
                  : 'ph:x-circle-bold'
            "
            size="11"
          />
          {{ levelConfig.label }}
        </UiBadge>
      </div>
    </div>

    <!-- Shortfall notice -->
    <div
      v-if="shortfall > 0 && completed > 0"
      class="alert alert-warning text-sm"
    >
      <Icon name="ph:warning-circle" size="16" class="shrink-0" />
      <p>
        <strong>{{ shortfall }} pts</strong> below Green target. Buy vouchers to
        close the gap.
      </p>
    </div>

    <!-- Green threshold indicator -->
    <div class="text-center">
      <p class="font-heading text-muted-foreground text-xs font-semibold">
        Green target: <span class="text-primary">70+ points</span>
      </p>
    </div>
  </div>
</template>
