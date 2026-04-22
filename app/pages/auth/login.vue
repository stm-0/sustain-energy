<script setup lang="ts">
useHead({ title: "Log In – Sustain Energy" })

const form = reactive({ email: "", password: "" })
const errors = reactive<Record<string, string>>({})
const loginError = ref("")
const loading = ref(false)

const validate = () => {
  Object.keys(errors).forEach(
    (k) => delete (errors as Record<string, string>)[k],
  )
  if (!form.email.trim()) errors.email = "Email address is required."
  if (!form.password) errors.password = "Password is required."
  return Object.keys(errors).length === 0
}

const handleSubmit = async () => {
  loginError.value = ""
  if (!validate()) return
  loading.value = true
  await new Promise((r) => setTimeout(r, 1000))
  loading.value = false
  // Demo: simulate wrong credentials
  loginError.value = "Incorrect email or password. Please try again."
}
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

    <h1 class="font-heading mb-1 text-center text-3xl font-bold">
      Welcome Back
    </h1>
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
      <UiAlertDescription>
        {{ loginError }}
      </UiAlertDescription>
    </UiAlert>

    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <UiLabel for="emailField" class="font-heading font-medium">
            Email
          </UiLabel>
          <UiInputGroup id="emailField">
            <UiInputGroupInput
              type="email"
              placeholder="info@yourcompany.com"
              name="email"
              required
              autocomplete="email"
            />
            <UiInputGroupAddon align="inline-start">
              <Icon name="ph:envelope-simple-open-bold" />
            </UiInputGroupAddon>
          </UiInputGroup>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <UiLabel for="passwordField" class="font-heading font-medium">
              Password
            </UiLabel>
            <NuxtLink
              to="/forgot-password"
              class="font-heading text-muted-foreground text-xs font-semibold"
            >
              Forgot Password?
            </NuxtLink>
          </div>

          <UiInputGroup id="passwordField">
            <UiInputGroupInput
              type="password"
              placeholder="••••••••"
              name="password"
              required
              autocomplete="current-password"
            />
            <UiInputGroupAddon align="inline-start">
              <Icon name="ph:password-bold" />
            </UiInputGroupAddon>
          </UiInputGroup>
        </div>

        <UiButton
          type="submit"
          full
          size="lg"
          :loading="loading"
          :disabled="loading"
        >
          Log In
        </UiButton>
      </div>
    </form>

    <p class="font-body text-muted-foreground mt-6 text-center text-sm">
      Don't have an account?
      <NuxtLink to="/register" class="text-primary font-semibold">
        Register here
      </NuxtLink>
    </p>
  </div>
</template>
