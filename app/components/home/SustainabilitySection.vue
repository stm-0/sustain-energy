<script setup lang="ts">
const sdgItems = [
  {
    label: "No Poverty",
    icon: "ph:hand-heart-bold",
    color: "text-[#E5243B]",
    bg: "bg-[#E5243B20]",
    ring: "border-[#E5243B20]",
    img: "no_poverty.webp",
  },
  {
    label: "Zero Hunger",
    icon: "ph:plant-bold",
    color: "text-[#DDA63A]",
    bg: "bg-[#DDA63A20]",
    ring: "border-[#DDA63A20]",
    img: "zero_hunger.webp",
  },
  {
    label: "Good Health",
    icon: "ph:heart-bold",
    color: "text-[#4C9F38]",
    bg: "bg-[#4C9F3820]",
    ring: "border-[#4C9F3820]",
    img: "good_health.webp",
  },
  {
    label: "Quality Education",
    icon: "ph:graduation-cap-bold",
    color: "text-[#C5192D]",
    bg: "bg-[#C5192D20]",
    ring: "border-[#C5192D20]",
    img: "quality_education.webp",
  },
  {
    label: "Gender Equality",
    icon: "ph:gender-intersex-bold",
    color: "text-[#FF3A21]",
    bg: "bg-[#FF3A2120]",
    ring: "border-[#FF3A2120]",
    img: "gender_equality.webp",
  },
  {
    label: "Clean Water",
    icon: "ph:drop-bold",
    color: "text-[#26BDE2]",
    bg: "bg-[#26BDE220]",
    ring: "border-[#26BDE220]",
    img: "clean_water.webp",
  },
  {
    label: "Clean Energy",
    icon: "ph:lightning-bold",
    color: "text-[#FCC30B]",
    bg: "bg-[#FCC30B20]",
    ring: "border-[#FCC30B20]",
    img: "clean_energy.webp",
  },
  {
    label: "Decent Work",
    icon: "ph:briefcase-bold",
    color: "text-[#A21942]",
    bg: "bg-[#A2194220]",
    ring: "border-[#A2194220]",
    img: "decent_work.webp",
  },
  {
    label: "Industry Innovation",
    icon: "ph:factory-bold",
    color: "text-[#FD6925]",
    bg: "bg-[#FD692520]",
    ring: "border-[#FD692520]",
    img: "industry_innovation.webp",
  },
  {
    label: "Reduced Inequality",
    icon: "ph:scales-bold",
    color: "text-[#DD1367]",
    bg: "bg-[#DD136720]",
    ring: "border-[#DD136720]",
    img: "reduced_inequality.webp",
  },
  {
    label: "Sustainable Cities",
    icon: "ph:city-bold",
    color: "text-[#FD9D24]",
    bg: "bg-[#FD9D2420]",
    ring: "border-[#FD9D2420]",
    img: "sustainable_cities.webp",
  },
  {
    label: "Responsible Use",
    icon: "ph:recycle-bold",
    color: "text-[#BF8B2E]",
    bg: "bg-[#BF8B2E20]",
    ring: "border-[#BF8B2E20]",
    img: "responsible_use.webp",
  },
  {
    label: "Climate Action",
    icon: "ph:thermometer-bold",
    color: "text-[#3F7E44]",
    bg: "bg-[#3F7E4420]",
    ring: "border-[#3F7E4420]",
    img: "climate_change.webp",
  },
  {
    label: "Life Below Water",
    icon: "ph:fish-bold",
    color: "text-[#0A97D9]",
    bg: "bg-[#0A97D920]",
    ring: "border-[#0A97D920]",
    img: "life_below_water.webp",
  },
  {
    label: "Life on Land",
    icon: "ph:tree-bold",
    color: "text-[#56C02B]",
    bg: "bg-[#56C02B20]",
    ring: "border-[#56C02B20]",
    img: "life_on_land.webp",
  },
  {
    label: "Peace & Justice",
    icon: "ph:scales-bold",
    color: "text-[#00689D]",
    bg: "bg-[#00689D20]",
    ring: "border-[#00689D20]",
    img: "peace_and_justice.webp",
  },
]
</script>

<template>
  <section class="bg-white">
    <div class="container">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <!-- Left: text -->
        <div class="flex flex-col gap-5">
          <div class="inline-flex items-center gap-2 self-start">
            <div class="bg-primary h-8 w-1 rounded-full" />
            <span
              class="font-heading bg-secondary text-xs font-semibold tracking-widest uppercase"
            >
              Global Alignment
            </span>
          </div>

          <h2 class="text-3xl leading-tight font-bold">
            Aligned with UNESCO<br />
            <span class="text-primary">Sustainable Development Goals</span>
          </h2>

          <p class="text-muted-foreground leading-relaxed">
            Our platform directly supports the UN Sustainable Development Goals
            — particularly SDG 12 (Responsible Consumption &amp; Production) and
            SDG 13 (Climate Action). Every company that registers and measures
            their impact contributes to a wider global movement.
          </p>

          <p class="text-muted-foreground leading-relaxed">
            UNESCO emphasises that education and awareness are key to building a
            more sustainable future. Sustain Energy puts that principle into
            practice by giving companies the tools to understand, measure, and
            act.
          </p>

          <div class="mt-2 flex items-center gap-3">
            <UiButton as-child>
              <NuxtLink to="/about" class="flex items-center gap-2">
                <Icon name="ph:info-bold" size="16" />
                Learn More About Us
              </NuxtLink>
            </UiButton>
            <UiButton as-child variant="secondary">
              <NuxtLink to="/auth/register">Join Today</NuxtLink>
            </UiButton>
          </div>
        </div>

        <!-- Right: SDG grid visual -->
        <div class="relative">
          <div class="grid grid-cols-4 gap-2 md:gap-3">
            <div
              v-for="(sdg, i) in sdgItems"
              :key="sdg.label"
              class="group relative flex aspect-square cursor-default overflow-hidden rounded-xl border-10"
              :class="[sdg.ring]"
              v-fade-up
              :transition="{ delay: i * 0.05 }"
            >
              <NuxtImg
                :src="`/images/home/${sdg.img}`"
                format="webp"
                :width="200"
                :height="200"
                class="flex shrink rounded-md object-cover transition-all group-hover:opacity-0"
              />

              <div
                class="absolute inset-0 top-0 left-0 flex flex-col items-center justify-center gap-1.5 p-3 opacity-0 transition-all group-hover:opacity-100"
                :class="sdg.bg"
              >
                <Icon :name="sdg.icon" size="22" :class="sdg.color" />
                <span
                  class="font-heading text-center text-[10px] leading-tight font-bold tracking-wide"
                  :class="sdg.color"
                >
                  {{ sdg.label }}
                </span>
              </div>
            </div>
          </div>

          <!-- Floating badge -->
          <div
            class="shadow-card border-border absolute -right-4 -bottom-4 hidden items-center gap-2 rounded-2xl border bg-white px-4 py-3 md:flex"
          >
            <Icon name="ph:shield-check-bold" size="24" class="text-primary" />
            <div>
              <p class="font-heading text-xs font-bold">UN SDG Aligned</p>
              <p class="text-muted-foreground text-xs">
                17 Goals · 2030 Agenda
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
