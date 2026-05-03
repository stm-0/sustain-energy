import { serverSupabaseClient } from "#supabase/server"
import { type Measurement, MeasurementLevelScore } from "@/types/app.types"

export default defineEventHandler(async (event) => {
  // Parse measurements and company_id from stores
  const {
    companyId,
    measurements,
  }: { companyId: number | undefined; measurements: Measurement[] } =
    await readBody(event)

  if (!companyId || !measurements || measurements.length === 0) return false

  // Call database client
  const client = await serverSupabaseClient(event)

  // Create calculation record
  const { data: newCalculation, error: calculationCreationError } = await client
    .from("calculations")
    .insert({ company_id: companyId })
    .select()
    .single()

  if (calculationCreationError || !newCalculation) {
    console.log(calculationCreationError)

    throw createError({
      status: 400,
      statusMessage: "New calculation was not created.",
      message: calculationCreationError.message,
    })
  }

  console.log(newCalculation.id)

  // Prepare data to save to db
  const selections = measurements.map((m) => {
    return {
      measure_name: String(m.id),
      score: MeasurementLevelScore[m.level],
      calculation_id: newCalculation.id,
    }
  })

  console.log(selections)

  const { data, error } = await client
    .from("measure_results")
    .insert(selections)
    .select("id")

  if (error) {
    console.log("Error:", error.message)
    throw createError({
      status: 400,
      statusMessage: "New calculation was not created.",
      message: error.message,
    })
  }

  console.log("Inserted: ", data.length, "/", measurements.length)
  if (data.length === measurements.length) return true

  return false
})
