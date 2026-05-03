<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import * as z from "zod"

import { toast } from "vue-sonner"

useHead({ title: "Company Profile – Sustain Energy" })

const client = useSupabaseClient()

const userStore = useUserStore()
const { userCompany } = storeToRefs(userStore)
const user = (await client.auth.getUser()).data.user
const userEmail = user?.email
const userId = user?.id

onMounted(async () => await userStore.init())

const isEditing = ref(false)
const formSchema = toTypedSchema(
  z.object({
    email: z.optional(z.string().email("Please enter a valid email address.")),
    companyName: z.optional(z.string().min(1)),
  }),
)
const form = useForm({
  validationSchema: formSchema,
})

const saveChanges = form.handleSubmit(async (values) => {
  isEditing.value = false

  toast.promise(
    () =>
      new Promise(async (resolve) => {
        // Update user email
        if (values.email) {
          const { error } = await client.auth.updateUser({
            email: values.email,
          })

          if (error) throw new Error(error.message)
        }

        // Update user company name
        if (values.companyName) {
          const { error } = await client
            .from("companies")
            .update({ company_name: values.companyName })
            .eq("contact_person", userId!)

          if (error) throw new Error(error.message)
        }

        await userStore.getUserCompany()

        resolve("OK")
      }),
    {
      loading: "Loading...",
      success: "Your company details have been updated successfully.",
      error: (error: unknown) => {
        console.log(error)
        return "Error while updating company details occured, contact support."
      },
    },
  )
})

const cancelEdit = () => {
  isEditing.value = false
}

const deleteUserAccount = () => {
  toast.promise<{ name: string }>(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: "Request" }), 2000),
      ),
    {
      loading: "Loading...",
      success: (data: { name: string }) =>
        `${data.name} for your account deletion is sent to our admins. Your account would be deleted withing 24 hours.`,
      error: "Error",
    },
  )
}
</script>

<template>
  <div>
    <!-- Page Content -->
    <section class="relative -top-32 justify-center">
      <div class="container">
        <!-- Header -->
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 class="font-heading text-3xl font-bold">Company Details</h1>
            <p class="font-body text-muted-foreground mt-1">
              Manage your company information and account settings.
            </p>
          </div>
          <UiButton v-if="!isEditing" size="sm" @click="isEditing = true">
            <Icon name="ph:pencil-simple-bold" size="15" />
            Edit Details
          </UiButton>
        </div>

        <!-- Main card -->
        <div class="flex flex-col gap-6">
          <!-- Welcome card -->
          <DashboardWelcomeBar :company-name="userCompany?.company_name">
            <template #details>
              <span class="font-body text-muted-foreground text-sm">
                Member since: {{ dateString(userCompany?.join_date) }}
              </span>
            </template>
            <template #actions>
              <div></div>
            </template>
          </DashboardWelcomeBar>

          <!-- Fields -->
          <template v-if="!isEditing">
            <!-- View mode -->
            <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div
                v-for="field in [
                  { label: 'Company Name', value: userCompany?.company_name },
                  {
                    label: 'Email Address',
                    value: userEmail ?? 'email@example.com',
                  },
                ]"
                :key="field.label"
              >
                <dt class="font-heading mb-1 font-bold">{{ field.label }}</dt>
                <dd class="font-body">
                  {{ field.value }}
                </dd>
              </div>
            </dl>
          </template>

          <template v-else>
            <!-- Edit mode -->
            <form @submit="saveChanges">
              <div class="flex flex-col gap-5">
                <!-- Email -->
                <UiFormField v-slot="{ componentField }" name="email">
                  <UiFormItem>
                    <UiFormLabel class="font-heading text-sm font-semibold">
                      Email Address <span class="text-red-400">*</span>
                    </UiFormLabel>
                    <UiFormControl>
                      <UiInputGroup>
                        <UiInputGroupInput
                          type="email"
                          :placeholder="userEmail ?? 'info@yourcompany.com'"
                          autocomplete="email"
                          class="placeholder:text-sm"
                          required
                          v-bind="componentField"
                        />
                        <UiInputGroupAddon align="inline-start">
                          <Icon name="ph:envelope-simple-open-bold" />
                        </UiInputGroupAddon>
                      </UiInputGroup>
                    </UiFormControl>
                    <UiFormMessage class="font-heading text-xs font-semibold" />
                  </UiFormItem>
                </UiFormField>
                <!-- END Email -->
                <!-- Password -->
                <UiFormField v-slot="{ componentField }" name="companyName">
                  <UiFormItem>
                    <div class="flex items-center justify-between">
                      <UiFormLabel class="font-heading text-sm font-semibold">
                        Company Name <span class="text-red-400">*</span>
                      </UiFormLabel>
                    </div>
                    <UiFormControl>
                      <UiInputGroup>
                        <UiInputGroupInput
                          type="text"
                          :placeholder="
                            userCompany?.company_name ?? 'Sustain Energy'
                          "
                          class="placeholder:text-sm"
                          required
                          v-bind="componentField"
                        />
                        <UiInputGroupAddon align="inline-start">
                          <Icon name="ph:text-a-underline-bold" />
                        </UiInputGroupAddon>
                      </UiInputGroup>
                    </UiFormControl>
                    <UiFormMessage class="font-heading text-xs font-semibold" />
                  </UiFormItem>
                </UiFormField>
                <!-- END Password -->

                <div class="flex gap-3 border-t pt-2">
                  <UiButton @click="saveChanges">
                    <Icon name="ph:check-bold" size="15" />
                    Save Changes
                  </UiButton>
                  <UiButton variant="secondary" @click="cancelEdit">
                    Cancel
                  </UiButton>
                </div>
              </div>
            </form>
          </template>
        </div>

        <!-- Danger zone -->
        <UiCard class="mt-6 gap-2 ring-red-200">
          <UiCardHeader class="mb-3 flex items-center gap-2">
            <Icon name="ph:warning-bold" size="18" class="text-red-600" />
            <UiCardTitle class="font-heading font-bold text-red-600">
              Danger Zone
            </UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <UiCardDescription class="mb-4 text-sm text-red-400">
              These actions are irreversible. Please be certain before
              proceeding.
            </UiCardDescription>
          </UiCardContent>
          <UiCardFooter>
            <!-- Delete account -->
            <UiAlertDialog>
              <UiAlertDialogTrigger as-child>
                <UiButton variant="destructive" size="sm">
                  <Icon name="ph:trash-bold" size="14" />
                  Delete Account
                </UiButton>
              </UiAlertDialogTrigger>
              <UiAlertDialogContent>
                <UiAlertDialogHeader>
                  <UiAlertDialogTitle>Delete Your Account?</UiAlertDialogTitle>
                  <UiAlertDialogDescription>
                    <p>
                      This will permanently delete your account and all data.
                      This cannot be undone.
                    </p>
                    <p>
                      Are you absolutely sure you want to delete your Sustain
                      Energy account?
                    </p>
                  </UiAlertDialogDescription>
                </UiAlertDialogHeader>
                <UiAlertDialogFooter>
                  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                  <UiAlertDialogAction
                    variant="destructive"
                    @click="deleteUserAccount"
                  >
                    Yes, Delete My Account
                  </UiAlertDialogAction>
                </UiAlertDialogFooter>
              </UiAlertDialogContent>
            </UiAlertDialog>
          </UiCardFooter>
        </UiCard>
      </div>
    </section>
  </div>
</template>
