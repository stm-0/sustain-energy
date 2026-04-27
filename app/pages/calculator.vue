<script setup lang="ts">
import { measurements } from "~/types/app.types"

useHead({ title: "Green Calculator – Sustain Energy" })

const store = useMeasurementsStore()

const submitted = ref(false)

const handleSubmit = () => {
  if (!store.isAllComplete) return
  submitted.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
}
</script>

<template>
  <section>
    <div class="container flex max-w-150 flex-col">
      <!-- Page header -->
      <div class="mb-6">
        <h1>Green Calculator</h1>
        <p class="font-body text-muted-foreground mt-1">
          Score your company across 10 sustainability measurements to receive
          your certificate.
        </p>
      </div>

      <!-- Instructions banner -->
      <UiAlert class="mb-6 max-w-150">
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

      <!-- Sticky progress bar -->
      <div
        class="border-border sticky top-16 z-30 -mx-4 mb-6 border-b bg-white/80 px-4 py-3 backdrop-blur-sm"
      >
        <div class="mx-auto flex max-w-7xl items-center gap-4">
          <span
            class="font-heading text-primary text-xs font-semibold whitespace-nowrap"
          >
            {{ store.completed }} / {{ store.selections.length }} measurements
            completed
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

      <div class="grid grid-cols-1 items-start gap-20">
        <!-- measurements list -->
        <div class="grid max-w-150 grid-cols-1">
          <CalculatorCriterionRow
            v-for="(m, i) in measurements"
            :key="i"
            :measurement="m"
          />

          <p
            v-if="!store.isAllComplete"
            class="font-heading text-muted-foreground mt-6 text-right text-xs"
          >
            Complete all {{ measurements.length - store.completed }} remaining
            measurements to submit.
          </p>
          <!-- Action buttons row -->
          <div class="flex flex-wrap justify-end gap-3 pt-2">
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
              :disabled="!store.isAllComplete"
              @click="handleSubmit"
            >
              <Icon name="ph:calculator-bold" size="18" />
              {{ submitted ? "Update My Score" : "Calculate My Score" }}
            </UiButton>
          </div>
        </div>

        <!-- Side score panel -->
        <div class="lg:col-span-1">
          <CalculatorScorePanel
            :score="store.score"
            :completed="store.completed"
            :total="measurements.length"
          />
        </div>
      </div>

      <!-- Results section -->
      <CalculatorResultsSection
        v-if="submitted"
        :score="store.score"
        company-name="Edinburgh College"
        @buy-vouchers="navigateTo('/vouchers')"
        @download="console.log('download')"
      />
    </div>
  </section>
</template>
