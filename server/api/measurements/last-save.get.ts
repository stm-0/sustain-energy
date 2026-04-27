//! Leave it, no need to complicate things this much
import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler((event) => {
  const client = serverSupabaseClient(event)

  // Get user -> company -> calculation -> company

  return {
    hello: "world",
  }
})
