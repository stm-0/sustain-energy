<script setup lang="ts">
const circlesContainer = useTemplateRef("circles-container")

const createCirclesGrid = () => {
  const canvas = circlesContainer.value
  if (!canvas) return

  canvas.width = 500
  canvas.height = 500

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const gap = 8
  const radius = 4
  const diameter = radius * 2

  // Loop through rows and columns
  for (let y = radius; y < canvas.height; y += diameter + gap) {
    for (let x = radius; x < canvas.width; x += diameter + gap) {
      // random offset within a fraction of the gap
      const offsetX = (Math.random() - 0.5) * gap * 0.8
      const offsetY = (Math.random() - 0.5) * gap * 0.8

      const randomX = x + offsetX
      const randomY = y + offsetY

      ctx.beginPath()
      ctx.arc(randomX, randomY, radius, 0, Math.PI * 2)
      ctx.fillStyle = "#00823633"
      ctx.fill()
    }
  }
}

onMounted(() => {
  createCirclesGrid()
  window.addEventListener("resize", createCirclesGrid)
})

onUnmounted(() => {
  window.removeEventListener("resize", createCirclesGrid)
})
</script>

<template>
  <section class="relative py-32">
    <!-- Background artifact -->
    <div
      class="from-primary/20 via-primary/0 absolute top-1/12 left-1/12 -z-10 size-48 bg-radial via-70% to-transparent"
    ></div>
    <div v-fade-up class="container flex items-center justify-between">
      <!-- Left side -->
      <div class="flex flex-col gap-6">
        <UiBadge variant="outline" class="text-muted-foreground gap-2">
          <Icon name="ph:circle-wavy-check-fill" :size="16" />
          Official Platform Certification
        </UiBadge>
        <h1>
          Is Your Business <br />
          <span class="text-accent">Truly</span> Sustainable?
        </h1>
        <p class="text-muted-foreground text-lg font-medium">
          Join Sustain Energy and calculate your green impact in minutes. <br />
          Register, score, certify.
        </p>
        <div class="inline-flex gap-6">
          <UiButton variant="secondary" as-child>
            <NuxtLink class="font-heading" to="#how-it-works">
              How It Works
            </NuxtLink>
          </UiButton>
          <UiButton as-child>
            <NuxtLink to="/login" class="font-heading">
              Get Started
              <Icon name="ph:arrow-right" :size="20" class="text-white" />
            </NuxtLink>
          </UiButton>
        </div>
      </div>
      <!-- Right side -->
      <div class="relative xl:mr-40">
        <canvas
          ref="circles-container"
          :class="[
            'circles-container',
            'pointer-events-none size-full max-h-125 max-w-125',
            'mask-[radial-gradient(circle,black_40%,transparent_60%)] mask-no-repeat',
            'transition-all transition-discrete duration-500',
          ]"
        >
        </canvas>
        <div
          :class="[
            'absolute top-1/2 left-1/2 -translate-1/2',
            'flex size-30 shrink-0 items-center justify-center',
            'bg-primary/40 border-primary/20 rounded-full border backdrop-blur-[3px]',
          ]"
        >
          <Icon
            name="ph:leaf-bold"
            size="64"
            class="animate-pulse text-white"
          />
        </div>
      </div>
    </div>
  </section>
</template>
