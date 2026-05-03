<script setup lang="ts">
import { certificateStyles } from "~/types/app.types"

useHead({ title: "Dashboard – Sustain Energy" })

// Fetch user details from database
const userStore = useUserStore()
// TODO: Create middleware to call userStore.init() there
onMounted(() => callOnce("user", async () => await userStore.init()))

const { userCompany } = storeToRefs(userStore)

const measurementsStore = useMeasurementsStore()
const { savedScore } = storeToRefs(measurementsStore)

// Demo data
const company = {
  name: userCompany.value?.company_name ?? "None",
  status: "active" as const,
  subscriptionUntil: "31 January 2027",
  lastCalculator: "12 March 2026",
}
const level = ref(
  savedScore.value ? calcCertificateLevel(savedScore.value!) : null,
)
const shortfall = ref(savedScore.value ? 70 - savedScore.value : null)

const activityRows = [
  {
    date: "12 Mar 2026",
    action: "Green Calculator submitted",
    result: "Amber Level",
    resultVariant: "amber" as const,
  },
  {
    date: "01 Jan 2026",
    action: "Subscription purchased",
    result: "Active",
    resultVariant: "green" as const,
  },
  {
    date: "01 Jan 2026",
    action: "Account created",
    result: "Registered",
    resultVariant: "neutral" as const,
  },
]

// TODO: Connect to actual data
</script>

<template>
  <section>
    <div class="container flex flex-col gap-8">
      <!-- Welcome bar -->
      <DashboardWelcomeBar
        :company-name="userCompany?.company_name ?? 'None'"
        :status="company.status"
        :subscription-until="company.subscriptionUntil"
        :last-calculator="company.lastCalculator"
      />

      <!-- Summary cards -->
      <UiSection title="Summary" class="px-0 py-5 [&_.container]:gap-4">
        <!-- Shortfall notice -->
        <UiAlert v-if="savedScore && savedScore < 70">
          <UiAlertTitle class="font-heading text-lg font-bold">
            Below the Green target
          </UiAlertTitle>
          <UiAlertDescription class="text-sm">
            <p>
              Your company is
              <strong>{{ 70 - savedScore }} points</strong> below the Green
              target <br />
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
                ? `Last updated ${company.lastCalculator}`
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
            link-label="Download Certificate"
            link-to="#"
            :is-link-active="!!level"
            :sub="
              shortfall
                ? shortfall < 0
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

          <!-- TODO: add actual ammount of points boosted -->
          <DashboardSummaryCard
            icon="ph:ticket-bold"
            title="Green Vouchers"
            value="0 purchased"
            :sub="savedScore ? 'Points boosted: +0' : 'Make a calculation'"
            link-label="Buy Vouchers"
            link-to="/vouchers"
            :is-link-active="!!savedScore && savedScore < 100"
            icon-bg="bg-primary/20 border-primary/20"
            icon-color="text-primary"
          />
        </div>
      </UiSection>

      <!-- Activity table -->
      <DashboardActivityTable :rows="activityRows" />
    </div>

    <!-- Subscription modal -->
    <!-- <AppModal
      v-model="showSubscribeModal"
      title="Manage Subscription"
      size="sm"
    >
      <div class="flex flex-col gap-3">
        <div class="font-display flex justify-between text-sm">
          <span style="color: var(--color-muted)">Status</span>
          <AppBadge variant="green">Active</AppBadge>
        </div>
        <div class="font-display flex justify-between text-sm">
          <span style="color: var(--color-muted)">Plan</span>
          <span class="font-semibold" style="color: var(--color-dark)"
            >Basic — £99.99/year</span
          >
        </div>
        <div class="font-display flex justify-between text-sm">
          <span style="color: var(--color-muted)">Valid until</span>
          <span class="font-semibold" style="color: var(--color-dark)">{{
            company.subscriptionUntil
          }}</span>
        </div>
      </div>
      <template #footer>
        <UiButton
          variant="secondary"
          size="sm"
          @click="showSubscribeModal = false"
          >Close</UiButton
        >
        <UiButton size="sm" to="/subscription">View Plans</UiButton>
      </template>
    </AppModal> -->
  </section>
</template>
