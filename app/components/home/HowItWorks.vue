<script setup lang="ts">
import { motion } from "motion-v"

const steps = [
  {
    num: "01",
    icon: "ph:user-plus-bold",
    title: "Register Your Company",
    body: "Create your free account with your company email and set your password. Takes under 2 minutes.",
    link: "/auth/register",
    linkLabel: "Register now",
  },
  {
    num: "02",
    icon: "ph:credit-card-bold",
    title: "Purchase a Subscription",
    body: "Activate your account with our £99.99/year basic subscription to unlock the full Green Calculator and certificate features.",
    link: "/subscription",
    linkLabel: "View plans",
  },
  {
    num: "03",
    icon: "ph:calculator-bold",
    title: "Complete the Calculator",
    body: "Work through 10 sustainability criteria — from renewable energy use to waste management — and receive your overall green score instantly.",
    link: "/calculator",
    linkLabel: "See the calculator",
  },
  {
    num: "04",
    icon: "ph:download-simple-bold",
    title: "Download Your Certificate",
    body: "Share your green certificate with customers, in tenders, and on your website to demonstrate your environmental commitment.",
    link: "/dashboard",
    linkLabel: "Go to dashboard",
  },
]

const stepsContainer = useTemplateRef("stepsContainer")
const connector = useTemplateRef("connector")
const isInView = useInView(stepsContainer, { once: true })

const drawConnectors = () => {
  const canvas = connector.value
  if (!canvas) return

  const container = stepsContainer.value
  if (!container) return

  const rect = container.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const badges = container.querySelectorAll<HTMLElement>(".step-number")
  if (badges.length < 2) return

  const first = badges[0]?.getBoundingClientRect()
  const last = badges[badges.length - 1]?.getBoundingClientRect()

  if (!first || !last) return

  const x = first.left - rect.left + first.width / 2
  const y1 = first.bottom - rect.top - 20 // "-20" because badge coords are taken before badge inimation is finished
  const y2 = last.top - rect.top

  ctx.strokeStyle = "#008236"
  ctx.lineWidth = 1
  ctx.lineCap = "round"
  ctx.setLineDash([4, 4])

  const DELAY = 1000
  const DURATION = 1000

  let startTime: number | null = null
  let animId: number

  const animate = (timestamp: number) => {
    if (startTime === null) startTime = timestamp

    const elapsed = timestamp - startTime - DELAY

    if (elapsed < 0) {
      animId = requestAnimationFrame(animate)
      return
    }

    const progress = Math.min(elapsed / DURATION, 1)
    const currentY = y1 + (y2 - y1) * progress

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.moveTo(x, y1)
    ctx.lineTo(x, currentY)
    ctx.stroke()

    if (progress < 1) {
      animId = requestAnimationFrame(animate)
    }
  }

  animId = requestAnimationFrame(animate)

  onUnmounted(() => cancelAnimationFrame(animId))
}

watch(
  isInView,
  (inView) => {
    if (inView) drawConnectors()
  },
  { once: true },
)

onMounted(() => {
  window.addEventListener("resize", drawConnectors)
})

onUnmounted(() => {
  window.removeEventListener("resize", drawConnectors)
})
</script>

<template>
  <UiSection
    id="how-it-works"
    title="How It Works"
    subtitle="From registration to certification in four straightforward steps."
  >
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div ref="stepsContainer" class="relative flex max-w-3xl flex-col gap-6">
        <!-- Connector line -->
        <canvas
          ref="connector"
          class="pointer-events-none absolute inset-0 z-0"
        ></canvas>
        <!-- Steps -->
        <div
          v-for="(step, i) in steps"
          :key="step.num"
          class="flex items-start gap-5"
          v-fade-up
          :transition="{ delay: i * 0.1 }"
        >
          <!-- Step badge -->
          <div
            class="step-number bg-primary font-heading inline-flex size-11 shrink-0 items-center justify-center rounded-xl font-bold text-white"
          >
            {{ step.num }}
          </div>

          <!-- Content -->
          <div class="min-w-0 flex-1">
            <div class="mb-1 flex items-center gap-2">
              <Icon :name="step.icon" size="18" class="text-primary/50" />
              <h3 class="font-heading font-bold">{{ step.title }}</h3>
            </div>
            <p
              class="font-body text-muted-foreground mb-2 text-sm leading-relaxed"
            >
              {{ step.body }}
            </p>
            <NuxtLink
              :to="step.link"
              class="font-heading text-primary hover:text-primary/60 inline-flex items-center gap-1 text-xs font-semibold transition-colors"
            >
              {{ step.linkLabel }}
              <Icon name="ph:arrow-right" size="12" />
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="">
        <!-- TODO: Images of subscriptions, vouchers, certificates... -->
      </div>
    </div>
  </UiSection>
</template>
