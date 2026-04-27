<script setup lang="ts">
import {
  type MeasurementItem,
  type MeasurementLevel,
  MeasurementLevelScore,
} from "~/types/app.types"

interface Props {
  measurement: MeasurementItem
}

const props = defineProps<Props>()

const store = useMeasurementsStore()
const { selections } = storeToRefs(store)

const currentLevel = computed(
  () => selections.value[props.measurement.id - 1]!.level,
)
const selectedOption = computed(() => optionsMap.get(currentLevel.value)!)

type rowOption = Map<
  MeasurementLevel,
  {
    label: string
    icon: string
    iconClasses: string
    classes: string
    activeClasses: string
  }
>
const optionsMap: rowOption = new Map([
  [
    "red",
    {
      label: "Red",
      icon: "ph:x-circle-bold",
      iconClasses: "bg-score-red text-white",
      classes: "border-score-red text-score-red hover:bg-score-red",
      activeClasses:
        "aria-pressed:border-score-red aria-pressed:bg-score-red aria-pressed:text-white",
    },
  ],
  [
    "amber",
    {
      label: "Amber",
      icon: "ph:warning-circle-bold",
      iconClasses: "bg-score-amber text-white",
      classes: "border-score-amber text-score-amber hover:bg-score-amber",
      activeClasses:
        "aria-pressed:border-score-amber aria-pressed:bg-score-amber aria-pressed:text-white",
    },
  ],
  [
    "green",
    {
      label: "Green",
      icon: "ph:check-circle-bold",
      iconClasses: "bg-primary text-white",
      classes: "border-primary text-primary hover:bg-primary",
      activeClasses:
        "aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-white",
    },
  ],
])
</script>

<template>
  <div class="flex gap-2.5 py-4">
    <div class="flex gap-4">
      <div
        class="bg-muted flex size-11 items-center justify-center rounded-full p-2"
        :class="selectedOption?.iconClasses"
      >
        <Icon :name="measurement.icon" :size="30" />
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="text-base font-bold">{{ measurement.title }}</h3>
        <p class="text-foreground/80 text-xs text-wrap">
          {{ measurement.description }}
        </p>
      </div>
    </div>

    <div class="flex flex-col items-end gap-2">
      <p
        class="font-heading text-sm font-semibold"
        :class="
          currentLevel === 'none'
            ? 'text-muted-foreground'
            : 'text-foreground/80'
        "
      >
        +{{ MeasurementLevelScore[currentLevel] }} pts
      </p>
      <div class="grid w-max grid-cols-3 gap-2">
        <button
          type="button"
          v-for="opt in optionsMap.entries()"
          :key="opt[0]"
          :class="[
            'border-2 bg-transparent px-2 py-1',
            'font-heading text-sm font-extrabold opacity-60 hover:text-white hover:opacity-100',
            'transition aria-pressed:opacity-100',
            opt[0] === currentLevel ? opt[1].activeClasses : opt[1].classes,
          ]"
          :aria-pressed="opt[0] === currentLevel"
          @click="store.updateMeasurementLevel(measurement.id, opt[0])"
        >
          {{ opt[1].label }}
        </button>
      </div>
    </div>
  </div>
</template>
