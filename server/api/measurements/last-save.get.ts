import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { companyId } = getQuery<{ companyId: number }>(event)
  if (!companyId) return []

  const { data: calculation, error } = await client
    .from("calculations")
    .select("id, created_at")
    .order("created_at", { ascending: false })
    .eq("company_id", companyId)
    .limit(1)
    .single()

  if (error) {
    console.log(
      "Error fetching last calculation for company #",
      companyId,
      ": ",
      error,
    )
    return
  }

  if (!calculation) {
    console.log("No calculation for company #", companyId)
    return
  }

  const { data: measureResults, error: measureResultsError } = await client
    .from("measure_results")
    .select("measure_name, score")
    .eq("calculation_id", calculation.id)
    .order("measure_name", { ascending: true })

  if (measureResultsError) {
    console.log(
      "Error fetching measurements for calculation #",
      calculation.id,
      ": ",
      error,
    )
    return
  }

  return {
    calculationId: calculation.id,
    createdAt: calculation.created_at,
    measurements: measureResults.map((r) => {
      return {
        id: Number(r.measure_name),
        score: r.score,
      }
    }),
  }
})
