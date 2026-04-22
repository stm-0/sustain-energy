<script setup lang="ts">
useHead({ title: "Green Calculator – Sustain Energy" })

type ScoreLevel = "red" | "amber" | "green" | null

const criteria: { icon: string; title: string; description: string }[] = [
  {
    icon: "ph:recycle-bold",
    title: "Waste Reduction",
    description:
      "Does the company actively reduce, reuse, and recycle waste materials?",
  },
  {
    icon: "ph:lightning-bold",
    title: "Renewable Energy Usage",
    description:
      "What proportion of the company's energy comes from renewable sources?",
  },
  {
    icon: "ph:drop-bold",
    title: "Water Conservation",
    description:
      "Has the company implemented measures to reduce water consumption?",
  },
  {
    icon: "ph:bus-bold",
    title: "Sustainable Transportation",
    description:
      "Does the company encourage low-emission travel for staff and logistics?",
  },
  {
    icon: "ph:tree-bold",
    title: "Carbon Offsetting",
    description:
      "Does the company offset its carbon emissions through verified programmes?",
  },
  {
    icon: "ph:package-bold",
    title: "Sustainable Procurement",
    description:
      "Does the company source materials and services from sustainable suppliers?",
  },
  {
    icon: "ph:users-bold",
    title: "Community Engagement",
    description:
      "Does the company engage with local environmental initiatives?",
  },
  {
    icon: "ph:building-office-bold",
    title: "Green Facilities",
    description:
      "Is the company's workspace designed or retrofitted for energy efficiency?",
  },
  {
    icon: "ph:graduation-cap-bold",
    title: "Staff Training",
    description:
      "Are employees trained and educated on sustainability practices?",
  },
  {
    icon: "ph:file-text-bold",
    title: "Sustainability Reporting",
    description:
      "Does the company publish or maintain an internal sustainability report?",
  },
]

const pointsMap: Record<string, number> = { red: 0, amber: 5, green: 10 }
const selections = ref<ScoreLevel[]>(Array(criteria.length).fill(null))

const completed = computed(() => selections.value.filter(Boolean).length)
const score = computed(() =>
  selections.value.reduce((sum, v) => sum + (v ? (pointsMap[v] ?? 0) : 0), 0),
)
const allComplete = computed(() => completed.value === criteria.length)

const submitted = ref(false)
const showResetModal = ref(false)
const showClearModal = ref(false)

const handleSubmit = () => {
  if (!allComplete.value) return
  submitted.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
}

const clearAll = () => {
  selections.value = Array(criteria.length).fill(null)
  submitted.value = false
  showClearModal.value = false
}

const resetToLast = () => {
  // TODO: Simulate restoring last saved state
  selections.value = Array(criteria.length).fill(null)
  submitted.value = false
  showResetModal.value = false
}
</script>

<template>
  <section>
    <div class="container flex max-w-150 flex-col">
      <!-- Page header -->
      <div class="mb-6">
        <h1>Green Calculator</h1>
        <p class="font-body text-muted-foreground mt-1">
          Score your company across 10 sustainability criteria to receive your
          certificate.
        </p>
      </div>

      <!-- Instructions banner -->
      <UiAlert class="mb-6 max-w-150">
        <Icon name="ph:info-bold" size="24" />
        <UiAlertTitle class="font-heading font-bold">Instructions</UiAlertTitle>
        <UiAlertDescription>
          <p class="text-muted-foreground">
            For each of the 10 criteria, select <strong>Red (0 pts)</strong>,
            <strong>Amber (5 pts)</strong>, or
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
            {{ completed }} / {{ criteria.length }} criteria completed
          </span>
          <UiProgress :model-value="(completed / criteria.length) * 100" />
          <span
            class="font-heading text-primary text-xs font-bold whitespace-nowrap"
          >
            {{ score }} pts
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 items-start gap-20">
        <!-- Criteria list -->
        <div class="grid max-w-150 grid-cols-1">
          <CalculatorCriterionRow
            v-for="(criterion, i) in criteria"
            :key="i"
            :index="i + 1"
            :icon="criterion.icon"
            :title="criterion.title"
            :description="criterion.description"
            :level="selections[i] ?? null"
            @update:level="selections[i] = $event"
          />

          <p
            v-if="!allComplete"
            class="font-heading text-muted-foreground mt-6 text-right text-xs"
          >
            Complete all {{ criteria.length - completed }} remaining criteria to
            submit.
          </p>
          <!-- Action buttons row -->
          <div class="flex flex-wrap justify-end gap-3 pt-2">
            <UiButton
              v-if="submitted"
              variant="destructive"
              @click="
                () => {
                  submitted = false
                  clearAll()
                }
              "
            >
              <Icon name="ph:trash-bold" size="18" />
              Delete Results
            </UiButton>
            <!-- Clear all answers btn -->
            <UiAlertDialog>
              <UiAlertDialogTrigger as-child>
                <UiButton variant="secondary" :disabled="completed === 0">
                  <Icon name="ph:broom-bold" size="18" />
                  Clear All
                </UiButton>
              </UiAlertDialogTrigger>
              <UiAlertDialogContent>
                <UiAlertDialogHeader>
                  <UiAlertDialogTitle>Clear All Answers?</UiAlertDialogTitle>
                  <UiAlertDialogDescription>
                    This will reset {{ completed }} criteria selections. Are you
                    sure?
                  </UiAlertDialogDescription>
                </UiAlertDialogHeader>
                <UiAlertDialogFooter>
                  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                  <UiAlertDialogAction variant="destructive" @click="clearAll">
                    Continue
                  </UiAlertDialogAction>
                </UiAlertDialogFooter>
              </UiAlertDialogContent>
            </UiAlertDialog>

            <!-- Restore last answers -->
            <UiAlertDialog>
              <UiAlertDialogTrigger as-child>
                <UiButton variant="secondary">
                  <Icon name="ph:arrow-counter-clockwise-bold" size="18" />
                  Reset to Last Saved
                </UiButton>
              </UiAlertDialogTrigger>
              <UiAlertDialogContent>
                <UiAlertDialogHeader>
                  <UiAlertDialogTitle>Reset to Last Saved?</UiAlertDialogTitle>
                  <UiAlertDialogDescription>
                    This will restore your last saved calculator state from the
                    database.
                  </UiAlertDialogDescription>
                </UiAlertDialogHeader>
                <UiAlertDialogFooter>
                  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                  <UiAlertDialogAction @click="resetToLast">
                    <Icon name="ph:arrow-counter-clockwise-bold" size="14" />
                    Reset
                  </UiAlertDialogAction>
                </UiAlertDialogFooter>
              </UiAlertDialogContent>
            </UiAlertDialog>

            <UiButton
              type="button"
              :disabled="!allComplete"
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
            :score="score"
            :completed="completed"
            :total="criteria.length"
          />
        </div>
      </div>

      <!-- Results section -->
      <CalculatorResultsSection
        v-if="submitted"
        :score="score"
        company-name="Edinburgh College"
        @buy-vouchers="navigateTo('/vouchers')"
        @download="console.log('download')"
      />
    </div>

    <!-- Clear modal -->
    <!-- <AppModal v-model="showClearModal" title="Clear All Answers?" size="sm">
      <p class="font-body text-sm" style="color: var(--color-body)">
        This will reset all {{ criteria.length }} criteria selections. Are you
        sure?
      </p>
      <template #footer>
        <UiButton variant="secondary" size="sm" @click="showClearModal = false"
          >Cancel</UiButton
        >
        <UiButton variant="destructive" size="sm" @click="clearAll"
          >Clear All</UiButton
        >
      </template>
    </AppModal> -->

    <!-- Reset modal -->
    <!-- <AppModal v-model="showResetModal" title="Reset to Last Saved?" size="sm">
      <p class="font-body text-sm" style="color: var(--color-body)">
        This will restore your last saved calculator state from the database.
      </p>
      <template #footer>
        <UiButton variant="secondary" size="sm" @click="showResetModal = false"
          >Cancel</UiButton
        >
        <UiButton size="sm" @click="resetToLast">
          <Icon name="ph:arrow-counter-clockwise-bold" size="14" />
          Reset
        </UiButton>
      </template>
    </AppModal> -->
  </section>
</template>
