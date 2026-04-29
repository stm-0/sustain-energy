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
      <div class="relative xl:pr-40">
        <NuxtImg src="/images/home/calculator_example.webp" />
        <!-- Background artifact -->
        <div
          class="from-primary/40 via-primary/0 absolute top-1/2 left-1/3 -z-10 size-200 -translate-1/2 bg-radial via-70% to-transparent"
        ></div>
      </div>
    </div>
  </section>
</template>
