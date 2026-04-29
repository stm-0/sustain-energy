<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

// Props
interface Props {
  from?: number
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  decimalPlaces?: number
  // Native
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  from: 0,
  prefix: "",
  suffix: "",
  duration: 2,
  decimalPlaces: 0,
})

// Animations
const counter = useTemplateRef("counter")
const [_, animate] = useAnimate()
const isInView = useInView(counter, { once: true })

watch(isInView, (inView) => {
  if (inView) {
    animate(props.from, props.to, {
      duration: props.duration,
      ease: "easeInOut",
      onUpdate: (value) => {
        if (!counter.value) return

        counter.value.textContent =
          props.prefix + value.toFixed(props.decimalPlaces) + props.suffix
      },
    })
  }
})
</script>

<template>
  <span ref="counter" :class="cn(props.class)">
    {{ props.from }}
  </span>
</template>
