<script setup lang="ts">
const stats = [
  {
    num: 500,
    suffix: "+",
    label: "Companies Registered",
    icon: "ph:buildings-bold",
  },
  {
    num: 10,
    label: "Sustainability Criteria",
    icon: "ph:list-checks-bold",
  },
  {
    num: 99.99,
    prefix: "£",
    decimalPlaces: 2,
    label: "Per Year, All-Inclusive",
    icon: "ph:tag-bold",
  },
]
</script>

<template>
  <section class="bg-forest-gradient">
    <div class="container">
      <div class="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="animate-fade-up flex flex-col items-center gap-2"
          :style="`animation-delay: ${i * 100}ms`"
        >
          <Icon :name="stat.icon" size="28" class="mb-1 opacity-70" />
          <HomeStatisticsCounter
            :from="0"
            :to="stat.num"
            :prefix="stat.prefix"
            :suffix="stat.suffix"
            :decimal-places="stat.decimalPlaces"
            class="font-heading text-primary/80 text-4xl font-bold tracking-tight"
          />
          <p
            class="font-heading text-sm font-semibold tracking-widest uppercase opacity-80"
          >
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
