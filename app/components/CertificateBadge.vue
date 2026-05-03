<script setup lang="ts">
import { certificateStyles } from "~/types/app.types"

const { score } = storeToRefs(useMeasurementsStore())
const userStore = useUserStore()
const { userCompany } = storeToRefs(userStore)
const level = computed(() => calcCertificateLevel(score.value))

const props = withDefaults(
  defineProps<{
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

onMounted(async () => await userStore.getUserCompany())

const options = {
  gold: {
    label: "GOLD LEVEL",
    sub: "Sustainability Target Achieved",
    topBarClass: "bg-certificate-gold",
    ...certificateStyles["gold"],
  },
  silver: {
    label: "SILVER LEVEL",
    sub: "Approaching Sustainability Target",
    topBarClass: "bg-certificate-silver",
    ...certificateStyles["silver"],
  },
  bronze: {
    label: "BRONZE LEVEL",
    sub: "Below Sustainability Target",
    topBarClass: "bg-certificate-bronze",
    ...certificateStyles["bronze"],
  },
}

const config = computed(() => options[level.value])
</script>

<template>
  <!-- Compact inline badge -->
  <UiBadge v-if="compact">
    <Icon :name="config.icon" size="12" />
    {{ config.label }}
  </UiBadge>

  <!-- Full certificate card -->
  <div
    v-else
    :class="[
      config.cardClass,
      'relative flex w-70 flex-col items-center gap-4 overflow-hidden rounded-sm p-8 text-center shadow-[0_8px_32px] shadow-black/10',
    ]"
  >
    <!-- Top accent bar -->
    <div
      class="absolute top-0 right-0 left-0 h-1.5 rounded-t-sm"
      :class="config.topBarClass"
    />

    <Icon :name="config.icon" size="48" :class="config.textClass" />

    <!-- Score -->
    <div>
      <p
        class="font-heading text-5xl leading-none font-bold"
        :class="config.textClass"
      >
        {{ score }}
      </p>
      <p class="font-heading text-muted-foreground mt-1 text-sm font-semibold">
        / 100 points
      </p>
    </div>

    <!-- Level label -->
    <div>
      <p
        class="font-heading text-sm font-bold tracking-widest uppercase"
        :class="config.textClass"
      >
        {{ config.label }}
      </p>
      <p class="font-body text-muted-foreground mt-0.5 text-xs">
        {{ config.sub }}
      </p>
    </div>

    <!-- Company & year -->
    <div class="w-full border-t border-black/10 pt-4">
      <p class="font-heading text-sm font-semibold">
        {{ userCompany?.company_name ?? "Your company" }}
      </p>
      <p class="font-body text-muted-foreground mt-0.5 text-xs">
        Annual Assessment {{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>
