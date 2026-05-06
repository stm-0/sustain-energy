<script setup lang="ts">
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import * as z from "zod"

import { PRICES, type CheckoutItem } from "~/types/app.types"

// definePageMeta({ middleware: "auth" })
useHead({ title: "Checkout – Sustain Energy" })

// Route params
const route = useRoute()

const item = computed<CheckoutItem>(() => {
  const val = route.query.item
  return val === "vouchers" || val === "subscription" ? val : "subscription"
})

const quantity = computed(() => {
  const q = Number(route.query.quantity)
  return isNaN(q) || q < 1 ? 1 : q
})

// Pricing
const orderLine = computed(() => ({
  label: PRICES[item.value].label,
  qty: item.value === "subscription" ? 1 : quantity.value,
  unit: PRICES[item.value].unitPrice,
  subtotal:
    PRICES[item.value].unitPrice *
    (item.value === "subscription" ? 1 : quantity.value),
}))

const total = computed(() => orderLine.value.subtotal)

// Validation schema
const formSchema = toTypedSchema(
  z.object({
    billingName: z
      .string({ required_error: "Billing name is required." })
      .min(2, "Please enter a valid name."),
    billingEmail: z
      .string({ required_error: "Email is required." })
      .email("Please enter a valid email address."),
    cardNumber: z
      .string({ required_error: "Card number is required." })
      .transform((v) => v.replace(/\s/g, ""))
      .pipe(
        z
          .string()
          .length(16, "Card number must be 16 digits.")
          .regex(/^\d+$/, "Card number must contain only digits."),
      ),
    expiry: z
      .string({ required_error: "Expiry date is required." })
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format.")
      .refine((val) => {
        const [month, year] = val.split("/").map(Number)
        const now = new Date()
        const expDate = new Date(2000 + year!, month! - 1)
        return expDate >= new Date(now.getFullYear(), now.getMonth())
      }, "Card has expired."),
    cvc: z
      .string({ required_error: "CVC is required." })
      .regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits."),
  }),
)

const form = useForm({ validationSchema: formSchema })

// Card number formatting
// Inserts a space every 4 digits as the user types
function formatCardNumber(e: Event) {
  const input = e.target as HTMLInputElement
  const raw = input.value.replace(/\D/g, "").slice(0, 16)
  input.value = raw.match(/.{1,4}/g)?.join(" ") ?? raw
  form.setFieldValue("cardNumber", input.value)
}

// Expiry formatting
function formatExpiry(e: Event) {
  const input = e.target as HTMLInputElement
  let raw = input.value.replace(/\D/g, "").slice(0, 4)
  if (raw.length >= 3) raw = raw.slice(0, 2) + "/" + raw.slice(2)
  input.value = raw
  form.setFieldValue("expiry", input.value)
}

// Submit
const loading = ref(false)
const serverError = ref("")

const onSubmit = form.handleSubmit(async (_values) => {
  serverError.value = ""
  loading.value = true

  try {
    if (item.value === "subscription") {
      const newSubscriptionId = await $fetch<number | undefined>(
        "/api/subscriptions",
        { method: "post" },
      )

      if (newSubscriptionId) {
        await navigateTo("/dashboard")
      }
    }
    if (item.value === "vouchers") {
      const newVouchersId = await $fetch<number | undefined>("/api/vouchers", {
        method: "post",
        body: {
          points: quantity.value,
        },
      })

      if (newVouchersId) {
        await navigateTo("/dashboard")
      }
    }
  } catch {
    serverError.value = "Payment could not be processed. Please try again."
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <div class="container">
      <!-- Page header -->
      <div class="mb-10">
        <NuxtLink
          to="/dashboard"
          class="text-muted-foreground hover:text-foreground font-heading mb-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
        >
          <Icon name="ph:arrow-left" size="14" />
          Back to dashboard
        </NuxtLink>
        <h1 class="font-heading text-foreground mt-2 text-3xl font-bold">
          Checkout
        </h1>
        <p class="text-muted-foreground font-body mt-1">
          Complete your purchase securely below.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <!-- Left: form -->
        <div class="lg:col-span-3">
          <form novalidate class="flex flex-col gap-8" @submit="onSubmit">
            <!-- Server error -->
            <Transition name="fade">
              <UiAlert v-if="serverError" variant="destructive">
                <Icon name="ph:warning-circle-bold" size="16" />
                <UiAlertDescription>{{ serverError }}</UiAlertDescription>
              </UiAlert>
            </Transition>

            <!-- Section: Billing details -->
            <fieldset class="flex flex-col gap-5">
              <legend
                class="font-heading text-foreground mb-2 text-base font-bold"
              >
                Billing Details
              </legend>

              <UiFormField v-slot="{ componentField }" name="billingName">
                <UiFormItem>
                  <UiFormLabel>
                    Full Name
                    <span class="text-destructive">*</span>
                  </UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      placeholder="Jane Smith"
                      autocomplete="name"
                      v-bind="componentField"
                    />
                  </UiFormControl>
                  <UiFormMessage class="font-heading text-xs font-semibold" />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField }" name="billingEmail">
                <UiFormItem>
                  <UiFormLabel>
                    Email Address
                    <span class="text-destructive">*</span>
                  </UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      type="email"
                      placeholder="info@yourcompany.com"
                      autocomplete="email"
                      v-bind="componentField"
                    />
                  </UiFormControl>
                  <UiFormMessage class="font-heading text-xs font-semibold" />
                </UiFormItem>
              </UiFormField>
            </fieldset>

            <UiSeparator />

            <!-- Section: Card details -->
            <fieldset class="flex flex-col gap-5">
              <div class="flex items-center justify-between">
                <legend
                  class="font-heading text-foreground text-base font-bold"
                >
                  Card Details
                </legend>
                <!-- Card type icons -->
                <div class="flex items-center gap-2 opacity-50">
                  <Icon
                    name="ph:credit-card-bold"
                    size="20"
                    class="text-muted-foreground"
                  />
                  <span
                    class="font-heading text-muted-foreground text-xs font-semibold tracking-wide"
                  >
                    VISA · MC · AMEX
                  </span>
                </div>
              </div>

              <!-- Card number -->
              <UiFormField v-slot="{ componentField }" name="cardNumber">
                <UiFormItem>
                  <UiFormLabel>
                    Card Number
                    <span class="text-destructive">*</span>
                  </UiFormLabel>
                  <UiFormControl>
                    <div class="relative">
                      <UiInput
                        placeholder="4444 4444 4444 4444"
                        inputmode="numeric"
                        autocomplete="cc-number"
                        maxlength="19"
                        v-bind="componentField"
                        @input="formatCardNumber"
                      />
                      <Icon
                        name="ph:credit-card-bold"
                        size="16"
                        class="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
                      />
                    </div>
                  </UiFormControl>
                  <UiFormMessage class="font-heading text-xs font-semibold" />
                </UiFormItem>
              </UiFormField>

              <!-- Expiry + CVC side by side -->
              <div class="grid grid-cols-2 gap-4">
                <UiFormField v-slot="{ componentField }" name="expiry">
                  <UiFormItem>
                    <UiFormLabel>
                      Expiry
                      <span class="text-destructive">*</span>
                    </UiFormLabel>
                    <UiFormControl>
                      <UiInput
                        placeholder="MM/YY"
                        inputmode="numeric"
                        autocomplete="cc-exp"
                        maxlength="5"
                        v-bind="componentField"
                        @input="formatExpiry"
                      />
                    </UiFormControl>
                    <UiFormMessage class="font-heading text-xs font-semibold" />
                  </UiFormItem>
                </UiFormField>

                <UiFormField v-slot="{ componentField }" name="cvc">
                  <UiFormItem>
                    <UiFormLabel>
                      CVC <span class="text-destructive">*</span>
                    </UiFormLabel>
                    <UiFormControl>
                      <div class="relative">
                        <UiInput
                          placeholder="•••"
                          inputmode="numeric"
                          autocomplete="cc-csc"
                          maxlength="4"
                          v-bind="componentField"
                        />
                        <Icon
                          name="ph:question-bold"
                          size="14"
                          class="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
                        />
                      </div>
                    </UiFormControl>
                    <UiFormMessage class="font-heading text-xs font-semibold" />
                  </UiFormItem>
                </UiFormField>
              </div>
            </fieldset>

            <!-- Submit -->
            <UiButton
              type="submit"
              class="w-full"
              size="lg"
              :disabled="loading"
            >
              <Icon
                v-if="loading"
                name="ph:circle-notch"
                size="16"
                class="animate-spin"
              />
              <Icon v-else name="ph:lock-simple-bold" size="16" />
              {{ loading ? "Processing…" : `Pay £${total.toFixed(2)}` }}
            </UiButton>

            <p class="text-muted-foreground font-body text-center text-xs">
              <Icon
                name="ph:shield-check-bold"
                size="12"
                class="text-primary mr-1 inline-block align-[-1px]"
              />
              Your payment details are encrypted and never stored on our
              servers.
            </p>
          </form>
        </div>

        <!-- Right: order summary -->
        <aside class="lg:col-span-2">
          <UiCard class="sticky top-24">
            <UiCardHeader>
              <UiCardTitle>
                <h2 class="font-heading text-foreground text-base font-bold">
                  Order Summary
                </h2>
              </UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <!-- Item row -->
              <div class="flex flex-col gap-3">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm"
                    >
                      <Icon
                        :name="
                          item === 'subscription'
                            ? 'ph:crown-bold'
                            : 'ph:leaf-bold'
                        "
                        size="18"
                        class="text-primary"
                      />
                    </div>
                    <div>
                      <p
                        class="font-heading text-foreground text-sm font-semibold"
                      >
                        {{ orderLine.label }}
                      </p>
                      <p class="text-muted-foreground font-body text-xs">
                        <template v-if="item === 'vouchers'">
                          {{ orderLine.qty }} × £{{ orderLine.unit.toFixed(2) }}
                        </template>
                        <template v-else> Annual billing </template>
                      </p>
                    </div>
                  </div>
                  <span
                    class="font-heading text-foreground shrink-0 text-sm font-bold"
                  >
                    £{{ orderLine.subtotal.toFixed(2) }}
                  </span>
                </div>

                <!-- Points badge for vouchers -->
                <div
                  v-if="item === 'vouchers'"
                  class="bg-primary/5 border-primary/20 flex items-center gap-2 rounded-sm border px-3 py-2"
                >
                  <Icon
                    name="ph:plus-circle-bold"
                    size="14"
                    class="text-primary"
                  />
                  <p class="font-heading text-primary text-xs font-semibold">
                    +{{ orderLine.qty }} sustainability points added to your
                    score
                  </p>
                </div>
              </div>

              <UiSeparator class="my-5" />

              <!-- Totals -->
              <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                  <span class="text-muted-foreground font-body text-sm">
                    Subtotal
                  </span>
                  <span
                    class="font-heading text-foreground text-sm font-semibold"
                  >
                    £{{ total.toFixed(2) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground font-body text-sm">
                    VAT (0%)
                  </span>
                  <span class="font-heading text-muted-foreground text-sm">
                    £0.00
                  </span>
                </div>
              </div>

              <UiSeparator class="my-4" />

              <div class="flex items-center justify-between">
                <span class="font-heading text-foreground text-base font-bold">
                  Total
                </span>
                <span class="font-heading text-primary text-xl font-bold">
                  £{{ total.toFixed(2) }}
                </span>
              </div>
            </UiCardContent>
            <UiCardFooter>
              <!-- Trust signals -->
              <div class="flex flex-col gap-2">
                <div
                  v-for="trust in [
                    {
                      icon: 'ph:lock-simple-bold',
                      text: 'Secure 256-bit SSL encryption',
                    },
                    {
                      icon: 'ph:shield-check-bold',
                      text: 'No card details stored',
                    },
                    {
                      icon: 'ph:arrow-counter-clockwise-bold',
                      text: 'Cancel subscription anytime',
                    },
                  ]"
                  :key="trust.text"
                  class="flex items-center gap-2"
                >
                  <Icon
                    :name="trust.icon"
                    size="13"
                    class="text-primary shrink-0"
                  />
                  <span class="text-muted-foreground font-body text-xs">
                    {{ trust.text }}
                  </span>
                </div>
              </div>
            </UiCardFooter>
          </UiCard>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.25s,
    transform 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
