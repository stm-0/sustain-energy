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
  //* Actions (methods)
  // Clear all selected measurements
  function resetSelections() {
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
  function updateMeasurementLevel(id: number, level: MeasurementLevel): void {
    selections.value[id - 1]!.level = level
  }

  return {
    selections,
    completed,
    isAllComplete,
    score,
    resetSelections,
    getMeasurement,
    updateMeasurementLevel,
  }
})
