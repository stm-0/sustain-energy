<script setup lang="ts">
interface ActivityRow {
  date: string
  action: string
  result: string
  resultVariant: "green" | "amber" | "red" | "neutral"
}

interface Props {
  rows?: ActivityRow[]
}

const props = withDefaults(defineProps<Props>(), {
  rows: () => [],
})

// TODO: Create a query in supabase to fetch all recent activity:
//        Purchases, Account Modifications, Certificates Received
</script>

<template>
  <div>
    <h3 class="mb-4 font-bold">Recent Activity</h3>
    <UiTable>
      <UiTableHeader>
        <UiTableRow class="bg-black/5 font-medium">
          <UiTableHead>Date</UiTableHead>
          <UiTableHead>Action</UiTableHead>
          <UiTableHead>Result</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow v-for="row in rows" :key="row.date">
          <UiTableCell>{{ row.date }}</UiTableCell>
          <UiTableCell>{{ row.action }}</UiTableCell>
          <UiTableCell>{{ row.result }}</UiTableCell>
        </UiTableRow>
        <UiTableRow v-if="rows.length === 0">
          <p class="text-muted-foreground">
            No activity yet — complete your first Green Calculator run to get
            started.
          </p>
        </UiTableRow>
      </UiTableBody>

      <!-- <template #cell-result="{ value, row }">
        <UiBadge :variant="(row as ActivityRow).resultVariant">{{ value }}</UiBadge>
      </template> -->
    </UiTable>
  </div>
</template>
