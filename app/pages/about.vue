<script setup lang="ts">
import { measurements } from "~/types/app.types"

useHead({
  title: "About Sustain Energy – Our Mission for a Greener Future",
  meta: [
    {
      name: "description",
      content:
        "Learn about our mission to empower businesses to measure, improve, and celebrate their sustainability.",
    },
  ],
})

const regulatory = [
  {
    icon: "ph:lock-simple-bold",
    title: "Data Protection Act 2018",
    body: "Your data is handled in full compliance with UK GDPR requirements.",
    color: "#008236",
  },
  {
    icon: "ph:shield-check-bold",
    title: "ISO/IEC 27001:2022",
    body: "Our security practices align with international standards.",
    color: "#0369A1",
  },
  {
    icon: "ph:scales-bold",
    title: "CMA Green Claims Code",
    body: "All claims made on this platform are verified and evidence-based.",
    color: "#7C3AED",
  },
]

const credentials = [
  {
    icon: "ph:seal-check-bold",
    label: "Sustain Energy Approved",
    sub: "Official Platform Certification",
    color: "#008236",
  },
  {
    icon: "ph:graduation-cap-bold",
    label: "Edinburgh College",
    sub: "Endorsed & Supported",
    color: "#003865",
  },
  {
    icon: "ph:shield-check-bold",
    label: "ISO/IEC 27001:2022",
    sub: "Aligned Security Practice",
    color: "#374151",
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative flex h-64 items-center overflow-hidden md:h-80">
      <!-- FIXME: create bg image -->
      <div
        class="from-primary/20 via-primary/0 absolute top-1/12 left-1/4 -z-10 size-48 bg-radial via-70% to-transparent"
      ></div>
      <div
        class="from-primary/20 via-primary/0 absolute top-1/3 left-3/4 -z-10 size-48 bg-radial via-70% to-transparent"
      ></div>
      <div class="bg-hero-gradient absolute inset-0" />
      <div class="relative z-10 container text-center">
        <h1 v-fade-up>Our Mission</h1>
        <p
          v-fade-up
          :transition="{ delay: 0.1 }"
          class="text-foreground/90 mx-auto mt-3 max-w-xl text-lg"
        >
          Empowering businesses to measure, improve, and celebrate their
          sustainability.
        </p>
      </div>
    </section>

    <!-- Mission Statement -->
    <UiSection title="What We Do">
      <div class="flex flex-col gap-4">
        <p class="font-body leading-relaxed">
          Sustain Energy provides an online platform where businesses of any
          size can measure their environmental performance against a set of ten
          carefully selected sustainability criteria. Our Green Calculator
          produces a clear, traffic-light score — Green, Amber, or Red — that
          companies can use to drive real improvement and communicate their
          commitment to sustainability.
        </p>
        <p class="font-body leading-relaxed">
          We are aligned with the UNESCO Sustainable Development Goals and are
          endorsed by Edinburgh College. Our approach is rooted in the belief
          that measurement is the first step to meaningful change.
        </p>
      </div>
    </UiSection>

    <!-- 10 Criteria Grid -->
    <UiSection
      title="The 10 Sustainability Criteria"
      subtitle="Each company is scored across ten areas. For each criterion, select Red (0 pts), Amber (5 pts), or Green (10 pts) based on your company's current performance."
    >
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <UiCard
          v-for="c in measurements"
          :key="c.title"
          class="flex flex-row items-center gap-4 p-4"
          size="sm"
          v-fade-up
          :transition="{ delay: c.id * 0.1 }"
        >
          <div
            class="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          >
            <Icon :name="c.icon" size="20" class="text-white" />
          </div>
          <div>
            <h3 class="font-display mb-1 text-base font-bold">
              {{ c.title }}
            </h3>
            <p class="font-body text-muted-foreground text-sm">
              {{ c.description }}
            </p>
          </div>
        </UiCard>
      </div>

      <div class="mt-8 text-center">
        <UiButton as-child>
          <NuxtLink to="/calculator">
            <Icon name="ph:calculator-bold" size="18" />
            Try the Green Calculator
          </NuxtLink>
        </UiButton>
      </div>
    </UiSection>

    <!-- Regulatory Framework -->
    <UiSection
      title="Our Regulatory Framework"
      subtitle="Sustain Energy operates under the highest legal and ethical standards for data protection and environmental claims."
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <UiCard
          v-for="(reg, i) in regulatory"
          :key="reg.title"
          class="flex flex-col gap-3"
          v-fade-up
          :transition="{ delay: i * 0.1 }"
        >
          <UiCardHeader>
            <div
              class="flex size-12 items-center justify-center rounded-xl"
              :style="`background-color: ${reg.color}15;`"
            >
              <Icon
                :name="reg.icon"
                size="24"
                :style="`color: ${reg.color};`"
              />
            </div>
          </UiCardHeader>
          <UiCardContent>
            <UiCardTitle>
              {{ reg.title }}
            </UiCardTitle>
            <UiCardDescription>
              <p class="text-muted-foreground text-sm">
                {{ reg.body }}
              </p>
            </UiCardDescription>
          </UiCardContent>
        </UiCard>
      </div>
    </UiSection>

    <!-- Credentials -->
    <UiSection title="Trusted By">
      <div class="mt-8 flex flex-wrap gap-10">
        <div
          v-for="cred in credentials"
          :key="cred.label"
          class="flex flex-col items-center gap-3"
          v-fade-up
        >
          <div
            class="flex h-20 w-20 items-center justify-center rounded-2xl"
            :style="`background-color: ${cred.color}15; border: 2px solid ${cred.color}30;`"
          >
            <Icon
              :name="cred.icon"
              size="36"
              :style="`color: ${cred.color};`"
            />
          </div>
          <p class="font-heading text-sm font-bold">
            {{ cred.label }}
          </p>
          <p class="text-muted-foreground text-xs">
            {{ cred.sub }}
          </p>
        </div>
      </div>
    </UiSection>
  </div>
</template>
