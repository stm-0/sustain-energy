import { MeasurementLevelScore, type MeasurementLevel } from "~/types/app.types"

export default function (score: number): MeasurementLevel {
  return score
    ? ({
        0: "red",
        5: "amber",
        10: "green",
      }[score] as MeasurementLevel)
    : "none"
}
