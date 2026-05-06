<script setup lang="ts">
import { certificateStyles } from "~/types/app.types"

useHead({ title: "Dashboard – Sustain Energy" })

// Fetch user details from database
const userStore = useUserStore()
const { userCompany } = storeToRefs(userStore)

const measurementsStore = useMeasurementsStore()
const { savedScore, savedResultsDate } = storeToRefs(measurementsStore)

// Demo data
const company = {
  name: userCompany.value?.company_name ?? "None",
  status: "active" as const,
  subscriptionUntil: "31 January 2027",
  lastCalculator: "12 March 2026",
}
const level = computed(() =>
  savedScore.value ? calcCertificateLevel(savedScore.value) : null,
)
const shortfall = computed(() =>
  Math.max(0, 70 - (savedScore.value! + (purchaseVouchers.value ?? 0))),
)

const { data: purchaseVouchers } = await useFetch<number>("/api/vouchers/last")
const { data: subscriptionEndDate } =
  await useFetch<string>("/api/subscriptions")

onMounted(async () => await userStore.init())
</script>

<template>
  <section>
    <div class="container flex flex-col gap-8">
      <!-- Welcome bar -->
      <DashboardWelcomeBar
        :company-name="userCompany?.company_name ?? 'None'"
        :status="subscriptionEndDate ? 'active' : 'inactive'"
        :subscription-until="dateString(subscriptionEndDate)"
        :last-calculator="savedResultsDate"
      />

      <!-- Summary cards -->
      <UiSection title="Summary" class="px-0 py-5 [&_.container]:gap-4">
        <!-- Shortfall notice -->
        <UiAlert v-if="shortfall > 0">
          <UiAlertTitle class="font-heading text-lg font-bold">
            Below the Green target
          </UiAlertTitle>
          <UiAlertDescription class="text-sm">
            <p>
              Your company is
              <strong>{{ shortfall }} points</strong> below the Green target
              <br />
              Purchase green vouchers to close the gap.
            </p>
          </UiAlertDescription>
        </UiAlert>

        <!-- Cards -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <DashboardSummaryCard
            icon="ph:chart-bar-bold"
            title="Your saved Green Score"
            :value="`${savedScore} / 100 pts`"
            :sub="
              savedScore
                ? `Last updated ${savedResultsDate}`
                : 'Make a calculation'
            "
            link-label="View Full Results"
            link-to="/calculator"
            :is-link-active="!!savedScore"
          >
            <template #value>
              <span>
                {{ savedScore ?? "-" }}
                <span
                  class="font-body text-muted-foreground ml-1 text-base font-normal"
                >
                  / 100 pts
                </span>
              </span>
            </template>
          </DashboardSummaryCard>

          <DashboardSummaryCard
            icon="ph:certificate-bold"
            title="Certificate Level"
            value=""
            :is-link-active="!!level"
            :sub="
              shortfall
                ? shortfall > 0
                  ? 'Purchase vouchers to close shortfall'
                  : 'Excellent job!'
                : 'Make a calculation'
            "
            :icon-bg="level ? certificateStyles[level].cardClass : undefined"
            :icon-color="level ? certificateStyles[level].textClass : undefined"
          >
            <template #value>
              <CertificateBadge v-if="level" :level="level" compact />
              <p v-else class="text-muted-foreground font-normal">None</p>
            </template>
          </DashboardSummaryCard>

          <DashboardSummaryCard
            icon="ph:ticket-bold"
            title="Green Vouchers"
            :value="`${purchaseVouchers} purchased`"
            :sub="
              savedScore
                ? `Points boosted: +${purchaseVouchers}`
                : 'Make a calculation'
            "
            link-label="Buy Vouchers"
            :link-to="`/checkout?item=vouchers&quantity=${70 - savedScore!}`"
            :is-link-active="!!savedScore && savedScore < 100"
            icon-bg="bg-primary/20 border-primary/20"
            icon-color="text-primary"
          />
        </div>
      </UiSection>
    </div>
  </section>
</template>
