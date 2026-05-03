import { MeasurementLevelScore, type MeasurementLevel } from "~/types/app.types"

export default function (score: number): MeasurementLevel {
  const keys = Object.keys(MeasurementLevelScore) as MeasurementLevel[]

  keys.forEach((k) => {
    if (MeasurementLevelScore[k] === score) {
      return k
    }
  })

  return "none"
}
