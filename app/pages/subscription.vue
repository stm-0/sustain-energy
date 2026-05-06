<script setup lang="ts">
useHead({ title: "Subscription – Sustain Energy" })

const features = [
  "Full Green Calculator Access",
  "Official Sustainability Certificate",
  "Dashboard & History",
  "Green Voucher Store",
  "Priority Support",
  "Annual Score Report",
]

const loading = ref(false)

const checkoutRedirect = async () => {
  // Check if user is logged in
  const client = useSupabaseClient()
  const { data, error } = await client.auth.getUser()
  if (!data.user || error) {
    console.log("User is unauthorised. Redirecting to login...")
    navigateTo("/auth/login")
  }

  // Redirect user to /checkout page if authorised
  navigateTo({
    path: "/checkout",
    query: { item: "subscription", quantity: 1 },
  })
}
</script>

<template>
  <section>
    <div class="container">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold">Subscription</h1>
        <p class="font-body text-muted-foreground mt-2">
          Manage your Sustain Energy subscription plan.
        </p>
      </div>

      <!-- Plan card -->
      <div class="mx-auto mb-12 w-full max-w-md">
        <UiCard>
          <UiCardHeader>
            <UiBadge class="mx-auto">
              <Icon name="ph:crown-bold" size="11" />
              <UiCardTitle class="font-sans text-xs"> BASIC PLAN </UiCardTitle>
            </UiBadge>
            <!-- Green top bar -->
          </UiCardHeader>
          <UiCardContent class="flex flex-col gap-5 pt-4 text-center">
            <div class="">
              <p class="font-heading text-5xl leading-none font-bold">£99.99</p>
              <p
                class="font-heading text-muted-foreground mt-1 text-sm font-semibold"
              >
                per year, all-inclusive
              </p>
            </div>
            <!-- Feature list -->
            <ul class="flex flex-col gap-2.5 text-left">
              <li
                v-for="feat in features"
                :key="feat"
                class="flex items-center gap-3 text-sm"
              >
                <Icon
                  name="ph:check-circle-bold"
                  size="18"
                  class="text-primary shrink-0"
                />
                {{ feat }}
              </li>
            </ul>
          </UiCardContent>
          <UiCardFooter>
            <p class="text-muted-foreground px-3 text-xs">
              <Icon
                name="ph:lock-simple-bold"
                size="12"
                class="mr-1 inline-block align-[-2px]"
              />
              Payments handled securely. <br />
              Cancel anytime.
            </p>
            <UiCardAction class="row-span-2">
              <!-- Payment confirmation modal -->
              <UiAlertDialog>
                <UiAlertDialogTrigger as-child>
                  <UiButton full size="lg">
                    <Icon name="ph:credit-card-bold" size="17" />
                    Purchase Subscription
                  </UiButton>
                </UiAlertDialogTrigger>
                <UiAlertDialogContent>
                  <UiAlertDialogHeader>
                    <UiAlertDialogTitle>Confirm Purchase</UiAlertDialogTitle>
                  </UiAlertDialogHeader>
                  <UiAlertDialogDescription>
                    <div class="rounded-xl p-4">
                      <div
                        class="font-heading mb-2 flex justify-between text-sm"
                      >
                        <span class="text-muted-foreground">Plan</span>
                        <span class="font-semibold"> Basic — Annual </span>
                      </div>
                      <div class="font-heading flex justify-between text-sm">
                        <span class="text-muted-foreground">Total</span>
                        <span class="text-primary text-xl font-bold">
                          £99.99
                        </span>
                      </div>
                    </div>
                    <p class="text-muted-foreground text-xs">
                      By purchasing you agree to our Terms & Conditions. Your
                      subscription will renew annually.
                    </p>
                  </UiAlertDialogDescription>
                  <UiAlertDialogFooter>
                    <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                    <UiAlertDialogAction as-child>
                      <UiButton
                        size="sm"
                        :loading="loading"
                        @click="checkoutRedirect"
                      >
                        <Icon name="ph:lock-simple-bold" size="13" />
                        Confirm & Checkout
                      </UiButton>
                    </UiAlertDialogAction>
                  </UiAlertDialogFooter>
                </UiAlertDialogContent>
              </UiAlertDialog>
            </UiCardAction>
          </UiCardFooter>
        </UiCard>
      </div>
    </div>
  </section>
</template>
