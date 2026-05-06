<script setup lang="ts">
interface Props {
  companyName?: string
  status?: "active" | "inactive" | "deactivated"
  subscriptionUntil?: string
  lastCalculator?: string
}

const props = withDefaults(defineProps<Props>(), {
  companyName: "Your Company",
  status: "active",
  lastCalculator: undefined,
})

const client = useSupabaseClient()

const statusConfig = computed(
  () =>
    ({
      active: { label: "Active" },
      inactive: { label: "Inactive" },
      deactivated: { label: "Deactivated" },
    })[props.status],
)

const measurementsStore = useMeasurementsStore()
const { savedScore } = storeToRefs(measurementsStore)
const level = computed(() =>
  savedScore.value ? calcCertificateLevel(savedScore.value!) : null,
)

const { downloadCertificate } = useCertificateDownload()
</script>

<template>
  <div
    class="bg-primary/10 border-primary/10 flex flex-col justify-between gap-4 rounded-xl border px-6 py-5 sm:flex-row sm:items-center"
  >
    <div class="flex items-center gap-4">
      <div
        class="bg-primary flex size-12 shrink-0 items-center justify-center rounded-xl"
      >
        <Icon name="ph:building-office-bold" size="24" class="text-white" />
      </div>
      <div>
        <h2 class="font-heading text-xl font-bold">
          Welcome back, {{ companyName }}
        </h2>
        <div class="mt-1 flex flex-wrap items-center gap-3">
          <UiBadge class="items-center">
            <Icon name="ph:circle-fill" size="8" />
            {{ statusConfig.label }}
          </UiBadge>
          <slot name="details">
            <span
              v-if="subscriptionUntil"
              class="font-body text-muted-foreground text-sm"
            >
              Subscription valid until: {{ subscriptionUntil }}
            </span>
            <span class="font-body text-muted-foreground text-sm">
              Last run: {{ lastCalculator ?? "Not yet completed" }}
            </span>
          </slot>
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <slot name="actions">
        <UiButton as-child variant="outline" size="sm">
          <NuxtLink to="/profile">
            <Icon name="ph:user-bold" size="15" />
            Company Profile
          </NuxtLink>
        </UiButton>
        <UiButton
          v-if="savedScore && level"
          size="sm"
          variant="outline"
          @click="
            () =>
              downloadCertificate({
                companyName: companyName,
                score: savedScore!,
                level: level!,
              })
          "
        >
          <Icon name="ph:download-simple-bold" size="16" />
          Download Certificate
        </UiButton>
        <UiButton
          size="sm"
          variant="destructive"
          @click="
            async () => {
              await client.auth.signOut()
            }
          "
        >
          <Icon name="ph:sign-out" size="15" />
          Log Out
        </UiButton>
      </slot>
    </div>
  </div>
</template>
