<script setup lang="ts">
interface Props {
  score: number
  companyName?: string
}

const props = withDefaults(defineProps<Props>(), {
  companyName: "Your Company",
})

const emit = defineEmits<{ download: []; buyVouchers: [] }>()

const level = computed<"green" | "amber" | "red">(() => {
  if (props.score >= 70) return "green"
  if (props.score >= 40) return "amber"
  return "red"
})

const shortfall = computed(() => Math.max(0, 70 - props.score))
const vouchersNeeded = computed(() => shortfall.value)
const voucherCost = computed(() => (vouchersNeeded.value * 2.5).toFixed(2))
</script>

<template>
  <div class="card animate-fade-up mt-8">
    <div class="border-border mb-6 flex items-center gap-3 border-b pb-4">
      <Icon name="ph:chart-bar-bold" size="24" class="text-primary" />
      <h2>Your Green Calculator Results</h2>
    </div>

    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
      <!-- Certificate card -->
      <div class="flex justify-center">
        <CertificateBadge
          :level="level"
          :score="score"
          :company-name="companyName"
        />
      </div>

      <!-- Results detail -->
      <div class="flex flex-col gap-5">
        <!-- Score summary -->
        <div class="bg-muted rounded-xl p-5">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <p
                class="font-heading text-3xl font-bold"
                style="color: var(--color-forest)"
              >
                {{ score }}
              </p>
              <p
                class="font-heading text-muted-foreground mt-1 text-xs font-semibold tracking-wide uppercase"
              >
                Your Score
              </p>
            </div>
            <div>
              <p class="font-heading text-primary/80 text-3xl font-bold">70</p>
              <p
                class="font-heading text-muted-foreground mt-1 text-xs font-semibold tracking-wide uppercase"
              >
                Green Target
              </p>
            </div>
            <div>
              <p
                class="font-heading text-3xl font-bold"
                :class="shortfall > 0 ? 'text-score-red' : 'text-primary'"
              >
                {{ shortfall > 0 ? `-${shortfall}` : "+" + (score - 70) }}
              </p>
              <p
                class="font-heading text-muted-foreground mt-1 text-xs font-semibold tracking-wide uppercase"
              >
                Difference
              </p>
            </div>
          </div>
        </div>

        <!-- Shortfall action -->
        <UiAlert v-if="shortfall > 0">
          <p>
            Your score is <strong>{{ shortfall }} points</strong> below the
            Green target. Purchase
            <strong>{{ vouchersNeeded }} green vouchers</strong> (£{{
              voucherCost
            }}) to close the gap and fund real environmental projects.
          </p>
        </UiAlert>

        <UiAlert v-else>
          <UiAlertTitle class="font-heading font-bold">
            Green Target Achieved!
          </UiAlertTitle>
          <UiAlertDescription>
            Congratulations — your company has met the Green sustainability
            standard. Download your official certificate below.
          </UiAlertDescription>
        </UiAlert>

        <!-- Action buttons -->
        <div class="flex flex-col gap-3 sm:flex-row">
          <UiButton v-if="shortfall > 0" @click="emit('buyVouchers')">
            <Icon name="ph:shopping-cart-bold" size="16" />
            Buy {{ vouchersNeeded }} Green Vouchers — £{{ voucherCost }}
          </UiButton>
          <UiButton v-else @click="emit('download')">
            <Icon name="ph:download-simple-bold" size="16" />
            Download Certificate
          </UiButton>
          <UiButton variant="secondary" as-child>
            <NuxtLink to="/dashboard" class="flex items-center gap-2">
              <Icon name="ph:grid-four" size="15" />
              Dashboard
            </NuxtLink>
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>
