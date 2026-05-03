<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import * as z from "zod"

useHead({ title: "Log In – Sustain Energy" })

const client = useSupabaseClient()

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "Email address is required." })
      .email("Please enter a valid email address."),
    password: z.string({ required_error: "Password is required." }).min(8),
  }),
)
const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  const { data, error } = await client.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })

  if (error) {
    loginError.value = error.message
    loading.value = false
    return
  }
  if (data.user) {
    loading.value = false
    navigateTo("/dashboard")
  }
})

const loading = ref(false)
const loginError = ref("")
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

    <h1 class="mb-1 text-center">Welcome Back</h1>
    <p class="font-body text-muted-foreground mb-8 text-center">
      Log in to your Sustain Energy account.
    </p>

    <UiAlert
      v-if="loginError.length > 0"
      variant="destructive"
      class="mb-5"
      @click="loginError = ''"
    >
      <UiAlertTitle>Login error</UiAlertTitle>
      <UiAlertDescription class="text-sm">
        {{ loginError }}
      </UiAlertDescription>
    </UiAlert>

    <form @submit="onSubmit">
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
              <NuxtLink
                to="/forgot-password"
                class="font-heading text-primary text-xs font-semibold transition-colors"
              >
                Forgot password?
              </NuxtLink>
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

        <UiButton type="submit" size="lg" :disabled="loading">
          Log In
        </UiButton>
      </div>
    </form>

    <p class="font-body text-muted-foreground mt-6 text-center text-sm">
      Don't have an account?
      <NuxtLink to="/auth/register" class="text-primary font-semibold">
        Register here
      </NuxtLink>
    </p>
  </div>
</template>
