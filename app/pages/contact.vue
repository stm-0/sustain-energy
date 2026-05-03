<script setup lang="ts">
useHead({ title: "Contact Us – Sustain Energy" })

const form = reactive({
  name: "Edinburgh College", // pre-filled from profile
  email: "info@edinburghcollege.ac.uk",
  telephone: "+44 131 669 4400",
  subject: "",
  message: "",
  category: "",
})

const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const success = ref(false)

const categoryOptions = [
  { value: "general", label: "General Enquiry" },
  { value: "technical", label: "Technical Support" },
  { value: "billing", label: "Billing" },
  { value: "subscription", label: "Subscription" },
  { value: "other", label: "Other" },
]

const validate = () => {
  Object.keys(errors).forEach(
    (k) => delete (errors as Record<string, string>)[k],
  )
  if (!form.name.trim()) errors.name = "Name is required."
  if (!form.email.trim()) errors.email = "Email is required."
  if (!form.subject.trim()) errors.subject = "Subject is required."
  if (!form.message.trim()) errors.message = "Message is required."
  return Object.keys(errors).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return
  loading.value = true
  await new Promise((r) => setTimeout(r, 1100))
  loading.value = false
  success.value = true
  form.subject = ""
  form.message = ""
  form.category = ""
}

const clearForm = () => {
  form.subject = ""
  form.message = ""
  form.category = ""
  Object.keys(errors).forEach(
    (k) => delete (errors as Record<string, string>)[k],
  )
}
</script>

<template>
  <div class="section">
    <div class="container-app">
      <div class="mb-8">
        <h1
          class="font-display text-3xl font-bold"
          style="color: var(--color-dark)"
        >
          Get In Touch
        </h1>
        <p class="font-body mt-1" style="color: var(--color-muted)">
          We're here to help — expect a reply within 2 business days.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-5">
        <!-- Left info panel -->
        <aside class="flex flex-col gap-6 lg:col-span-2">
          <div class="card flex flex-col gap-5">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl"
              style="background-color: var(--color-lime-muted)"
            >
              <Icon
                name="ph:envelope-simple-bold"
                size="28"
                style="color: var(--color-forest)"
              />
            </div>
            <div>
              <h2
                class="font-display mb-2 text-xl font-bold"
                style="color: var(--color-dark)"
              >
                Contact Us
              </h2>
              <p
                class="font-body text-sm leading-relaxed"
                style="color: var(--color-muted)"
              >
                Have a question, suggestion, or technical issue? Fill in the
                form and our team will respond within 2 business days.
              </p>
            </div>

            <div
              class="flex flex-col gap-3 pt-2"
              style="border-top: 1px solid var(--color-border)"
            >
              <a
                href="mailto:support@sustainenergy.co.uk"
                class="font-body flex items-center gap-3 text-sm transition-colors"
                style="color: var(--color-body)"
              >
                <Icon
                  name="ph:envelope-simple-bold"
                  size="18"
                  style="color: var(--color-forest); flex-shrink: 0"
                />
                support@sustainenergy.co.uk
              </a>
              <a
                href="tel:+441310000000"
                class="font-body flex items-center gap-3 text-sm transition-colors"
                style="color: var(--color-body)"
              >
                <Icon
                  name="ph:phone-bold"
                  size="18"
                  style="color: var(--color-forest); flex-shrink: 0"
                />
                +44 131 000 0000
              </a>
              <div
                class="font-body flex items-start gap-3 text-sm"
                style="color: var(--color-body)"
              >
                <Icon
                  name="ph:map-pin-bold"
                  size="18"
                  style="
                    color: var(--color-forest);
                    flex-shrink: 0;
                    margin-top: 2px;
                  "
                />
                Edinburgh College, Edinburgh, Scotland
              </div>
            </div>
          </div>

          <!-- Response time card -->
          <div
            class="flex items-center gap-3 rounded-xl p-4"
            style="
              background-color: var(--color-lime-muted);
              border: 1px solid var(--color-forest);
            "
          >
            <Icon
              name="ph:clock-bold"
              size="22"
              style="color: var(--color-forest)"
            />
            <div>
              <p
                class="font-display text-sm font-semibold"
                style="color: var(--color-forest)"
              >
                Typical Response Time
              </p>
              <p
                class="font-body mt-0.5 text-xs"
                style="color: var(--color-body)"
              >
                Within 2 business days, Mon–Fri 9am–5pm
              </p>
            </div>
          </div>
        </aside>

        <!-- Right form -->
        <div class="card lg:col-span-3">
          <AppAlert
            v-if="success"
            variant="success"
            dismissible
            class="mb-5"
            title="Message sent!"
          >
            Thank you! Your message has been received. We will be in touch
            within 2 business days.
          </AppAlert>

          <form v-if="!success" novalidate @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-5">
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <AppInput
                  v-model="form.name"
                  label="Name"
                  placeholder="Your name"
                  name="name"
                  required
                  :error="errors.name"
                />
                <AppInput
                  v-model="form.email"
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  name="email"
                  required
                  :error="errors.email"
                />
              </div>

              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <AppInput
                  v-model="form.telephone"
                  label="Contact Number"
                  type="tel"
                  placeholder="+44 131 000 0000"
                  name="telephone"
                />
                <AppSelect
                  v-model="form.category"
                  label="Category"
                  :options="categoryOptions"
                  placeholder="Select a category…"
                  name="category"
                />
              </div>

              <AppInput
                v-model="form.subject"
                label="Subject"
                placeholder="e.g. Technical Issue with Calculator"
                name="subject"
                required
                :error="errors.subject"
              />

              <AppTextarea
                v-model="form.message"
                label="Message"
                placeholder="Please describe your query in detail…"
                name="message"
                required
                :rows="6"
                :error="errors.message"
              />

              <div class="flex flex-col gap-3 pt-1 sm:flex-row">
                <UiButton
                  type="submit"
                  full
                  :loading="loading"
                  :disabled="loading"
                >
                  <Icon name="ph:paper-plane-right-bold" size="16" />
                  Send Message
                </UiButton>
                <UiButton type="button" variant="secondary" @click="clearForm">
                  <Icon name="ph:broom-bold" size="15" />
                  Clear Form
                </UiButton>
              </div>
            </div>
          </form>

          <!-- Post-submit state: show fresh form option -->
          <div v-else class="py-6 text-center">
            <Icon
              name="ph:check-circle-bold"
              size="48"
              class="mx-auto mb-4"
              style="color: var(--color-forest)"
            />
            <h3
              class="font-display mb-2 text-lg font-bold"
              style="color: var(--color-dark)"
            >
              We've received your message!
            </h3>
            <p class="font-body mb-5 text-sm" style="color: var(--color-muted)">
              A confirmation has been sent to {{ form.email }}.
            </p>
            <UiButton variant="secondary" size="sm" @click="success = false">
              Send Another Message
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
