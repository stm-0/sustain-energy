<script setup lang="ts">
type ScoreLevel = "red" | "amber" | "green" | null

interface Props {
  index: number
  icon: string
  title: string
  description: string
  level: ScoreLevel
}

const props = defineProps<Props>()

const emit = defineEmits<{
  "update:level": [value: ScoreLevel]
}>()

const options: {
  level: ScoreLevel
  label: string
  pts: number
  icon: string
  classes: string
  activeClasses: string
}[] = [
  {
    level: "red",
    label: "Red",
    pts: 0,
    icon: "ph:x-circle-bold",
    classes: "border-score-red text-score-red hover:bg-score-red",
    activeClasses:
      "aria-pressed:border-score-red aria-pressed:bg-score-red aria-pressed:text-white",
  },
  {
    level: "amber",
    label: "Amber",
    pts: 5,
    icon: "ph:warning-circle-bold",
    classes: "border-score-amber text-score-amber hover:bg-score-amber",
    activeClasses:
      "aria-pressed:border-score-amber aria-pressed:bg-score-amber aria-pressed:text-white",
  },
  {
    level: "green",
    label: "Green",
    pts: 10,
    icon: "ph:check-circle-bold",
    classes: "border-primary text-primary hover:bg-primary",
    activeClasses:
      "aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-white",
  },
]

const selectedPts = computed(() => {
  if (!props.level) return 0
  return options.find((o) => o.level === props.level)?.pts ?? 0
})

const updateScoreLevel = (level: ScoreLevel) => {
  emit("update:level", level)
}
</script>

<template>
  <div class="flex gap-2.5 py-4">
    <div class="flex gap-4">
      <div
        class="bg-muted flex size-11 items-center justify-center rounded-full p-2"
        :class="[
          level === 'red' ? 'bg-score-red text-white' : '',
          level === 'amber' ? 'bg-score-amber text-white' : '',
          level === 'green' ? 'bg-primary text-white' : '',
        ]"
      >
        <Icon :name="icon" :size="30" />
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="text-base font-bold">{{ title }}</h3>
        <p class="text-foreground/80 text-xs text-wrap">{{ description }}</p>
      </div>
    </div>

    <div class="flex flex-col items-end gap-2">
      <p
        class="font-heading text-sm font-semibold"
        :class="!level ? 'text-muted-foreground' : 'text-foreground/80'"
      >
        +{{ selectedPts }} pts
      </p>
      <div class="grid w-max grid-cols-3 gap-2">
        <button
          type="button"
          v-for="opt in options"
          :key="opt.level!"
          :class="[
            'border-2 bg-transparent px-2 py-1',
            'font-heading text-sm font-extrabold opacity-60 hover:text-white hover:opacity-100',
            'transition aria-pressed:opacity-100',
            level === opt.level ? opt.activeClasses : opt.classes,
          ]"
          :aria-pressed="level === opt.level"
          @click="updateScoreLevel(opt.level)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>
  </div>
</template>
