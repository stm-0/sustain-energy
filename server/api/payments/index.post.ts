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
      statusMessage: "Invalid user company data",
    })
  }

  // Get payment amount
  const { amount } = await readBody<{ amount: number | undefined }>(event)
  if (!amount || amount <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid amount data.",
    })
  }

  // Create new payment
  const { data: payment, error: paymentError } = await serviceClient
    .from("payments")
    .insert({ amount: amount, status: "paid" })
    .select()
    .single()

  if (paymentError || !payment) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cannot create payment: " + (paymentError.message ?? ""),
    })
  }

  return payment.id
})
