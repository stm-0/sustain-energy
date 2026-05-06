import type { UserCompany } from "~/types/app.types"

export const useUserStore = defineStore("userStore", () => {
  const userId = ref<string | null>(null)
  const userCompany = ref<UserCompany | null>(null)

  async function init() {
    const measurementsStore = useMeasurementsStore()

    await getAuthUserId()
    if (!userCompany.value) {
      getUserCompany().then(
        async () =>
          await measurementsStore.fetchSavedResults(userCompany.value?.id),
      )
    }
  }

  async function getAuthUserId() {
    const client = useSupabaseClient()
    // Fetch user id
    const {
      data: { user },
      error,
    } = await client.auth.getUser()

    if (error) {
      console.error("Error getting the user: ", error.message)
      return
    }
    if (!user) {
      console.log("Cannot get user data")
      return
    }

    userId.value = user.id
  }

  async function getUserCompany() {
    const client = useSupabaseClient()
    const { data, error } = await client.from("companies").select("*").single()
    if (error) {
      console.log("Error fetching company: ", error.message)
      return
    }

    userCompany.value = data
  }

  async function createSaveMeasurementsPayload() {
    const measurementsStore = useMeasurementsStore()

    return {
      companyId: userCompany.value?.id,
      measurements: measurementsStore.getMeasurements(),
    }
  }

  async function signOut() {
    const client = useSupabaseClient()
    const { error } = await client.auth.signOut()
    if (error) console.log(error)
  }

  return {
    userId,
    userCompany,
    getUserCompany,
    init,
    createSaveMeasurementsPayload,
    signOut,
  }
})
