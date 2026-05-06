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

  // Create new payment and get its ID
  const paymentId = await event.$fetch("/api/payments", {
    method: "post",
    body: {
      amount: 99.99,
    },
  })

  if (!paymentId) {
    throw createError({
      statusCode: 400,
      message: "Cannot create payment",
    })
  }

  // Create new subscription
  const endDate = new Date(Date.now())
  endDate.setFullYear(endDate.getFullYear() + 1)

  const { data, error } = await serviceClient
    .from("subscriptions")
    .insert({
      company_id: companyId.id,
      end_date: endDate.toDateString(),
      payment_id: paymentId,
      type: "Base Plan",
    })
    .select("id")
    .single()

  if (error || !data) {
    throw createError({
      statusCode: 400,
      message: "Cannot purchase subscription",
    })
  }

  return data.id
})
