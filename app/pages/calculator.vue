<script setup lang="ts">
import { toast } from "vue-sonner"

import { measurements } from "~/types/app.types"

useHead({ title: "Green Calculator – Sustain Energy" })

const userStore = useUserStore()
onMounted(() => callOnce("user", async () => await userStore.init()))
const store = useMeasurementsStore()
const { userCompany } = storeToRefs(userStore)

const isLoading = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  if (!store.isAllComplete) return
  await userStore.init()

  isLoading.value = true

  // add calculations and measurements to db
  submitted.value = await $fetch("/api/measurements", {
    method: "post",
    body: await userStore.createSaveMeasurementsPayload(),
  })

  if (!submitted.value) {
    isLoading.value = false
    toast.error("Your score was not saved. Contact support.")
    return
  }

  submitted.value = true
  toast.success("Your score was saved!")
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
}
</script>

<template>
  <section>
    <div class="container flex flex-col">
      <!-- Page header -->
      <div class="mb-6">
        <h1>Green Calculator</h1>
        <p class="font-body text-muted-foreground mt-2">
          Score your company across 10 sustainability measurements to receive
          your certificate.
        </p>
      </div>

      <!-- Instructions banner -->
      <UiAlert class="mb-6">
        <Icon name="ph:info-bold" size="24" />
        <UiAlertTitle class="font-heading font-bold">Instructions</UiAlertTitle>
        <UiAlertDescription>
          <p class="text-muted-foreground">
            For each of the 10 measurements, select
            <strong>Red (0 pts)</strong>, <strong>Amber (5 pts)</strong>, or
            <strong>Green (10 pts)</strong> based on your company's current
            performance. Complete all fields before submitting.
          </p>
        </UiAlertDescription>
      </UiAlert>

      <div
        class="grid grid-cols-1 items-start justify-items-center gap-10 lg:grid-cols-4"
      >
        <!-- Side score panel -->
        <div class="sticky top-16 flex w-full flex-col gap-4">
          <CalculatorScorePanel
            :score="store.score"
            :completed="store.completed"
            :total="measurements.length"
          />

          <p
            v-if="!store.isAllComplete"
            class="font-heading text-muted-foreground mt-6 text-xs"
          >
            Complete all {{ measurements.length - store.completed }} remaining
            measurements to submit.
          </p>
          <!-- Action buttons row -->
          <div class="flex flex-wrap gap-3 pt-2">
            <UiButton
              v-if="submitted"
              variant="destructive"
              @click="
                () => {
                  submitted = false
                  store.resetSelections()
                }
              "
            >
              <Icon name="ph:trash-bold" size="18" />
              Delete Results
            </UiButton>
            <!-- Clear all answers btn -->
            <UiAlertDialog>
              <UiAlertDialogTrigger as-child>
                <UiButton variant="secondary" :disabled="store.completed === 0">
                  <Icon name="ph:broom-bold" size="18" />
                  Clear All
                </UiButton>
              </UiAlertDialogTrigger>
              <UiAlertDialogContent>
                <UiAlertDialogHeader>
                  <UiAlertDialogTitle>Clear All Answers?</UiAlertDialogTitle>
                  <UiAlertDialogDescription>
                    This will reset {{ store.completed }} measurements
                    selections. Are you sure?
                  </UiAlertDialogDescription>
                </UiAlertDialogHeader>
                <UiAlertDialogFooter>
                  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                  <UiAlertDialogAction
                    variant="destructive"
                    @click="store.resetSelections()"
                  >
                    Continue
                  </UiAlertDialogAction>
                </UiAlertDialogFooter>
              </UiAlertDialogContent>
            </UiAlertDialog>

            <UiButton
              type="button"
              :disabled="!store.isAllComplete || isLoading"
              @click="handleSubmit"
            >
              <Icon name="ph:calculator-bold" size="18" />
              {{ submitted ? "Update My Score" : "Calculate My Score" }}
            </UiButton>
          </div>
        </div>

        <!-- Measurements list -->
        <div class="col-span-2 grid max-w-150 grid-cols-1">
          <!-- Sticky progress bar -->
          <div
            class="sticky top-16 z-30 -mx-4 mb-6 border-b bg-white/80 px-4 py-3 backdrop-blur-sm"
          >
            <div class="mx-auto flex max-w-7xl items-center gap-4">
              <span
                class="font-heading text-primary text-xs font-semibold whitespace-nowrap"
              >
                {{ store.completed }} /
                {{ store.selections.length }} measurements completed
              </span>
              <UiProgress
                :model-value="(store.completed / store.selections.length) * 100"
              />
              <span
                class="font-heading text-primary text-xs font-bold whitespace-nowrap"
              >
                {{ store.score }} pts
              </span>
            </div>
          </div>

          <!-- Measurements -->
          <div class="grid grid-cols-1">
            <CalculatorCriterionRow
              v-for="(m, i) in measurements"
              :key="i"
              :measurement="m"
            />
          </div>
        </div>

        <!-- Certificate side panel -->
        <div class="sticky top-16">
          <!-- Results section -->
          <CalculatorResultsSection
            v-if="submitted"
            :score="store.score"
            :company-name="userCompany?.company_name"
          />
        </div>
      </div>
    </div>
  </section>
</template>
