<!-- TODO -->

<script setup lang="ts">
definePageMeta({ layout: "default" })
useHead({ title: "Admin – Sustain Energy" })

// ── Auth gate ──────────────────────────────────────────────────
const ADMIN_PASSWORD = "admin123" // replace with env variable in production

const isAuthorised = ref(false)

onMounted(() => {
  const input = window.prompt("Enter admin password:")
  if (input === ADMIN_PASSWORD) {
    isAuthorised.value = true
  } else {
    window.alert("Incorrect password.")
    navigateTo("/")
  }
})

// ── Types ──────────────────────────────────────────────────────
interface CompanyRow {
  id: number
  company_name: string
  contact_person: string
  join_date: string
}

// ── Data ───────────────────────────────────────────────────────
const client = useSupabaseClient()
const loading = ref(true)
const fetchError = ref("")
const companies = ref<CompanyRow[]>([])

async function fetchCompanies() {
  loading.value = true
  fetchError.value = ""

  const { data, error } = await client
    .from("companies")
    .select("id, company_name, contact_person, join_date")
    .order("join_date", { ascending: false })

  if (error) {
    fetchError.value = "Failed to load companies. Please refresh."
  } else {
    companies.value = data ?? []
  }

  loading.value = false
}

onMounted(fetchCompanies)

// ── Delete ─────────────────────────────────────────────────────
const deletingId = ref<number | null>(null)
const showDeleteModal = ref(false)
const pendingDeleteId = ref<number | null>(null)

function confirmDelete(id: number) {
  pendingDeleteId.value = id
  showDeleteModal.value = true
}

async function handleDelete() {
  if (!pendingDeleteId.value) return

  deletingId.value = pendingDeleteId.value
  showDeleteModal.value = false

  const { error } = await client
    .from("companies")
    .delete()
    .eq("id", pendingDeleteId.value)

  if (error) {
    window.alert("Failed to delete company. Please try again.")
  } else {
    companies.value = companies.value.filter(
      (c) => c.id !== pendingDeleteId.value,
    )
  }

  deletingId.value = null
  pendingDeleteId.value = null
}

// ── Helpers ────────────────────────────────────────────────────
const pendingCompany = computed(() =>
  companies.value.find((c) => c.id === pendingDeleteId.value),
)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
</script>

<template>
  <section v-if="isAuthorised">
    <div class="container">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 class="font-heading text-foreground text-3xl font-bold">
            Admin Panel
          </h1>
          <p class="text-muted-foreground font-body mt-1 text-sm">
            Manage registered companies.
            <span class="font-heading font-semibold">
              {{ companies.length }} total.
            </span>
          </p>
        </div>

        <UiButton
          variant="outline"
          size="sm"
          :disabled="loading"
          @click="fetchCompanies"
        >
          <Icon
            name="ph:arrows-clockwise-bold"
            size="14"
            :class="loading ? 'animate-spin' : ''"
          />
          Refresh
        </UiButton>
      </div>

      <!-- Error -->
      <UiAlert v-if="fetchError" variant="destructive" class="mb-6">
        <Icon name="ph:warning-circle-bold" size="16" />
        <UiAlertDescription>{{ fetchError }}</UiAlertDescription>
      </UiAlert>

      <!-- Table card -->
      <div class="border-border bg-card overflow-hidden rounded-sm border">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <!-- Head -->
            <thead>
              <tr class="border-border bg-muted/40 border-b">
                <th
                  v-for="col in [
                    'Company Name',
                    'Contact Person',
                    // 'Email',
                    'Joined',
                    'Actions',
                  ]"
                  :key="col"
                  :class="[
                    'font-heading text-muted-foreground px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase',
                    col === 'Actions' ? 'text-right' : '',
                  ]"
                >
                  {{ col }}
                </th>
              </tr>
            </thead>

            <!-- Body -->
            <tbody>
              <!-- Loading skeleton -->
              <template v-if="loading">
                <tr
                  v-for="i in 6"
                  :key="i"
                  class="border-border border-b last:border-0"
                >
                  <td v-for="j in 5" :key="j" class="px-4 py-3.5">
                    <div
                      class="bg-muted h-4 animate-pulse rounded-sm"
                      :style="`width: ${[60, 50, 40, 30][j - 1]}%`"
                    />
                  </td>
                </tr>
              </template>

              <!-- Empty -->
              <tr v-else-if="companies.length === 0">
                <td colspan="5" class="py-16 text-center">
                  <Icon
                    name="ph:buildings-bold"
                    size="36"
                    class="text-muted-foreground/40 mx-auto mb-3"
                  />
                  <p
                    class="font-heading text-muted-foreground text-sm font-semibold"
                  >
                    No companies registered yet.
                  </p>
                </td>
              </tr>

              <!-- Rows -->
              <tr
                v-else
                v-for="company in companies"
                :key="company.id"
                class="border-border hover:bg-muted/30 border-b transition-colors last:border-0"
              >
                <td class="px-4 py-3.5">
                  <p class="font-heading text-foreground font-semibold">
                    {{ company.company_name }}
                  </p>
                </td>

                <td class="px-4 py-3.5">
                  <p class="font-body text-foreground">
                    {{ company.contact_person }}
                  </p>
                </td>

                <!-- <td class="px-4 py-3.5">
                  <a
                    :href="`mailto:${company.email}`"
                    class="text-primary font-body hover:underline"
                  >
                    {{ company.email }}
                  </a>
                </td> -->

                <td class="px-4 py-3.5">
                  <p class="text-muted-foreground font-body">
                    {{ formatDate(company.join_date) }}
                  </p>
                </td>

                <td class="px-4 py-3.5 text-right">
                  <!-- Delete confirmation modal -->
                  <!-- <UiDialog>
      <UiDialogContent class="max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle class="font-heading font-bold">
            Delete Company
          </UiDialogTitle>
          <UiDialogDescription class="font-body">
            Are you sure you want to delete
            <span class="text-foreground font-semibold">
              {{ pendingCompany?.company_name }} </span
            >? This action cannot be undone.
          </UiDialogDescription>
        </UiDialogHeader>

        <UiAlert variant="destructive" class="mt-1">
          <Icon name="ph:warning-bold" size="14" />
          <UiAlertDescription class="text-xs">
            The company record will be permanently removed from the database.
            The linked auth account requires a separate server-side process.
          </UiAlertDescription>
        </UiAlert>

        <UiDialogFooter class="mt-4 gap-2">
          <UiButton
            variant="outline"
            size="sm"
          >
            Cancel
          </UiButton>
          <UiButton variant="destructive" size="sm" @click="handleDelete">
            <Icon name="ph:trash-bold" size="14" />
            Yes, Delete
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog> -->
                  <UiButton
                    variant="ghost"
                    size="sm"
                    class="text-destructive hover:text-destructive hover:bg-destructive/10"
                    :disabled="deletingId === company.id"
                    @click="confirmDelete(company.id)"
                  >
                    <Icon
                      :name="
                        deletingId === company.id
                          ? 'ph:circle-notch'
                          : 'ph:trash-bold'
                      "
                      size="14"
                      :class="deletingId === company.id ? 'animate-spin' : ''"
                    />
                    {{ deletingId === company.id ? "Deleting…" : "Delete" }}
                  </UiButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
