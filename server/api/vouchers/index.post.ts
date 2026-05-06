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

  // Get payment amount
  const { points } = await readBody<{ points: number | undefined }>(event)
  if (!points || points <= 0) {
    throw createError({
      statusCode: 400,
      message: "Invalid data.",
    })
  }

  // Create new payment and get its ID
  const paymentId = await event.$fetch("/api/payments", {
    method: "post",
    body: {
      amount: points * 10,
    },
  })

  if (!paymentId) {
    throw createError({
      statusCode: 400,
      message: "Cannot create payment",
    })
  }

  // Buy new bunch of vouchers
  const { data, error } = await serviceClient
    .from("voucher_purchases")
    .insert({
      company_id: companyId.id,
      payment_id: paymentId,
      points: points,
    })
    .select("id")
    .single()

  if (error || !data) {
    throw createError({
      statusCode: 400,
      message: "Cannot purchase vouchers",
    })
  }

  return data.id
})
