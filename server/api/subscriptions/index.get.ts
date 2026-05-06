import {
  serverSupabaseServiceRole,
  serverSupabaseClient,
} from "#supabase/server"

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  // Fetch user and its company id
  const {
    data: { user: user },
  } = await client.auth.getUser()
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "User unauthtorised.",
    })
  }

  const serviceClient = serverSupabaseServiceRole(event)
  const { data: companyId } = await serviceClient
    .from("companies")
    .select("id")
    .eq("contact_person", user.id)
    .single()

  if (!companyId) {
    throw createError({
      statusCode: 400,
      message: "Invalid data.",
    })
  }

  // Get subscription end_date
  const { data, error } = await serviceClient
    .from("subscriptions")
    .select("end_date")
    .eq("company_id", companyId.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    throw createError({
      statusCode: 400,
      message: "Cannot get subscription",
    })
  }

  return data.end_date
})
