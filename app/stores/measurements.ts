import {
  type MeasurementLevel,
  MeasurementLevelScore,
  measurements,
  type MeasurementItem,
  type Measurement,
} from "~/types/app.types"

export const useMeasurementsStore = defineStore("measurementsStore", () => {
  //* Fields
  // Base array to save selected level for each measurement
  const selections = ref<Measurement[]>(
    Array.from(measurements, (m) => {
      return { id: m.id, level: "none" }
    }),
  )

  // Last calculation user did
  const savedResults = ref<Measurement[] | null>()
  const savedResultsDate = ref<string | undefined>()
  const savedResultsId = ref<number | undefined>()

  //* Getters
  // Count completed measurements irl
  const completed = computed(
    () => selections.value.filter((s) => s.level !== "none").length,
  )
  const isAllComplete = computed(() => completed.value === measurements.length)
  // Calc total score irl
  const score = computed(() =>
    selections.value.reduce(
      (sum, v) => sum + MeasurementLevelScore[v.level],
      0,
    ),
  )

  // Calculate score for saved selections
  const savedScore = computed(() => {
    if (!savedResults.value) return null

    return savedResults.value.reduce(
      (sum, v) => sum + MeasurementLevelScore[v.level],
      0,
    )
  })

  //* Actions (methods)
  // Clear all selected measurements
  function resetSelections(): void {
    selections.value = Array.from(measurements, (m) => {
      return { id: m.id, level: "none" }
    })
  }

  // Get specific measurement selection
  function getMeasurement(id: number): Measurement {
    if (selections.value[id - 1]?.["id"] === id) {
      return selections.value[id - 1]!
    }
    return selections.value.find((s) => s.id === id)!
  }

  // Get all selections
  function getMeasurements(): Measurement[] {
    return selections.value
  }

  // Updates level for measurement
  function updateMeasurementLevel(id: number, level: MeasurementLevel): void {
    selections.value[id - 1]!.level = level
  }

  // Fetch saved results from database
  async function fetchSavedResults(companyId: number | undefined) {
    if (!companyId) return

    // Select last calculation for company with all its measurements on server side
    const measure_results = await $fetch<
      | {
          calculationId: number
          createdAt: string
          measurements: {
            id: number
            score: number
          }[]
        }
      | undefined
    >("/api/measurements/last-save", {
      method: "GET",
      query: {
        companyId: companyId,
      },
    })

    if (!measure_results) return

    // Map parsed data to field
    savedResults.value = measure_results.measurements.map((r) => {
      return {
        id: r.id,
        level: r.score === 0 ? "red" : measurementScoreToLevel(r.score),
      }
    })
    savedResultsId.value = measure_results.calculationId
    savedResultsDate.value = dateString(measure_results.createdAt)
  }

  // Sets saved results as current
  function setSavedSelections() {
    if (!savedResults.value) return

    selections.value = savedResults.value
  }

  return {
    selections,
    savedResults,
    savedResultsDate,
    completed,
    isAllComplete,
    score,
    savedScore,
    resetSelections,
    getMeasurement,
    getMeasurements,
    updateMeasurementLevel,
    fetchSavedResults,
    setSavedSelections,
  }
})
