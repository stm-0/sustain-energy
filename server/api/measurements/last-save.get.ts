import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { companyId } = await readBody(event)

  const { data, error } = await client
    .from("calculations")
    .select(
      `measure_results (
          id, score
        )
      `,
    )
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .maybeSingle()

  if (error) {
    console.log(
      "Error fetching last calculation for company #",
      companyId,
      ": ",
      error,
    )
    return
  }
  if (!data || !data.measure_results) {
    console.log("No calculation for company #", companyId)
    return
  }

  return data.measure_results
})
