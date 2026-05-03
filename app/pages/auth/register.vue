<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import * as z from "zod"

useHead({ title: "Register – Sustain Energy" })

const client = useSupabaseClient()

const formSchema = toTypedSchema(
  z
    .object({
      companyName: z
        .string({ required_error: "Company name is required." })
        .min(1),
      email: z
        .string({ required_error: "Email address is required." })
        .email("Please enter a valid email address."),
      password: z
        .string({ required_error: "Password is required." })
        .min(8, "Password must be at least 8 characters.")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
        .regex(/[0-9]/, "Must contain at least one number."),
      confirmPassword: z.string({
        required_error: "Confirm password is required.",
      }),
      agreedToTerms: z.coerce.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"], // attach the error to the confirmPassword field
    }),
)
const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  const { data, error } = await client.auth.signUp({
    email: values.email,
    password: values.password,
  })

  if (error) {
    registerError.value = error.message
    loading.value = false
    return
  }
  if (!data.user) {
    loading.value = false
    return
  }

  const { error: companyCreationError } = await client
    .from("companies")
    .insert({
      company_name: values.companyName,
    })

  if (companyCreationError) {
    registerError.value = companyCreationError.message
    loading.value = false
    return
  }

  navigateTo("/dashboard")
})

const loading = ref(false)
const registerError = ref("")
</script>

<template>
  <div class="mx-auto w-full max-w-md">
    <!-- Logo on auth-only mobile -->
    <div class="mb-8 flex justify-center">
      <div
        class="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-2xl"
      >
        <Icon name="ph:leaf-bold" size="32" class="text-primary" />
      </div>
    </div>

    <h1 class="mb-1 text-center">Join Sustain Energy</h1>
    <p class="font-body text-muted-foreground mb-8 text-center">
      Start measuring your environmental impact today.
    </p>

    <UiAlert
      v-if="registerError.length > 0"
      variant="destructive"
      class="mb-5"
      @click="registerError = ''"
    >
      <UiAlertTitle>Register error</UiAlertTitle>
      <UiAlertDescription class="text-sm">
        {{ registerError }}
      </UiAlertDescription>
    </UiAlert>

    <form @submit="onSubmit">
      <div class="flex flex-col gap-5">
        <!-- Company Name -->
        <UiFormField v-slot="{ componentField }" name="companyName">
          <UiFormItem>
            <UiFormLabel class="font-heading text-sm font-semibold">
              Company Name <span class="text-red-400">*</span>
            </UiFormLabel>
            <UiFormControl>
              <UiInputGroup>
                <UiInputGroupInput
                  type="text"
                  placeholder="Sustain Energy"
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
        <!-- END Company Name -->
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
                  placeholder="info@yourcompany.com"
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
        <UiFormField v-slot="{ componentField }" name="password">
          <UiFormItem>
            <div class="flex items-center justify-between">
              <UiFormLabel class="font-heading text-sm font-semibold">
                Password <span class="text-red-400">*</span>
              </UiFormLabel>
            </div>
            <UiFormControl>
              <UiInputGroup>
                <UiInputGroupInput
                  type="password"
                  placeholder="••••••••"
                  required
                  autocomplete="current-password"
                  v-bind="componentField"
                />
                <UiInputGroupAddon align="inline-start">
                  <Icon name="ph:password-bold" />
                </UiInputGroupAddon>
              </UiInputGroup>
            </UiFormControl>
            <UiFormMessage class="font-heading text-xs font-semibold" />
          </UiFormItem>
        </UiFormField>
        <!-- END Password -->
        <!-- Confirm Password -->
        <UiFormField v-slot="{ componentField }" name="confirmPassword">
          <UiFormItem>
            <div class="flex items-center justify-between">
              <UiFormLabel class="font-heading text-sm font-semibold">
                Confirm Password <span class="text-red-400">*</span>
              </UiFormLabel>
            </div>
            <UiFormControl>
              <UiInputGroup>
                <UiInputGroupInput
                  type="password"
                  placeholder="••••••••"
                  required
                  autocomplete="current-password"
                  v-bind="componentField"
                />
                <UiInputGroupAddon align="inline-start">
                  <Icon name="ph:password-bold" />
                </UiInputGroupAddon>
              </UiInputGroup>
            </UiFormControl>
            <UiFormMessage class="font-heading text-xs font-semibold" />
          </UiFormItem>
        </UiFormField>
        <!-- END Confirm Password -->
        <!-- Terms -->
        <UiFormField v-slot="{ componentField }" name="agreedToTerms">
          <UiFormItem>
            <div class="flex cursor-pointer items-center gap-3">
              <UiCheckbox id="terms" v-bind="componentField" />
              <UiLabel for="terms" class="cursor-pointer">
                Accept terms and conditions
              </UiLabel>
            </div>
            <UiFormMessage class="font-heading text-xs font-semibold" />
          </UiFormItem>
        </UiFormField>
        <!-- END Terms -->

        <UiButton type="submit" size="lg" :disabled="loading">
          Register
        </UiButton>
      </div>
    </form>

    <p class="font-body text-muted-foreground mt-6 text-center text-sm">
      Have an account?
      <NuxtLink to="/auth/login" class="text-primary font-semibold">
        Login here
      </NuxtLink>
    </p>
  </div>
</template>
