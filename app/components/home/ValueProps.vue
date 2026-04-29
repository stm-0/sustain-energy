<script setup lang="ts">
const props = [
  {
    icon: "ph:chart-line-up-bold",
    title: "Measure Your Impact",
    body: "Use our 10-point Green Calculator to score your business across waste, energy, transport, and more — with instant, clear results.",
  },
  {
    icon: "ph:certificate-bold",
    title: "Earn Your Certificate",
    body: "Receive a Green, Amber, or Red certificate showing your sustainability level — ready to share with clients and stakeholders.",
  },
  {
    icon: "ph:leaf-bold",
    title: "Buy Green Vouchers",
    body: "Falling short of your target? Purchase green vouchers and fund real environmental projects to close the gap.",
  },
]
</script>

<template>
  <UiSection
    title="Why Sustain Energy?"
    subtitle="A simple, accredited platform helping businesses of any size understand and improve their environmental footprint."
  >
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <UiCard
        v-for="(prop, idx) in props"
        :key="prop.title"
        class="flex flex-col gap-4 transition-transform ease-out hover:scale-102"
        v-fade-up
        :transition="{ delay: idx * 0.1 }"
      >
        <UiCardHeader
          class="bg-primary/50 mx-4 flex size-16 items-center justify-center rounded-xl"
        >
          <Icon :name="prop.icon" size="32" class="text-primary" />
        </UiCardHeader>
        <UiCardContent>
          <UiCardTitle>{{ prop.title }}</UiCardTitle>
          <UiCardDescription>{{ prop.body }}</UiCardDescription>
        </UiCardContent>
      </UiCard>
    </div>
  </UiSection>
</template>
