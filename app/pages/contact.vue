<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import * as z from "zod"

useHead({ title: "Contact Us – Sustain Energy" })

const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const success = ref(false)

const client = useSupabaseClient()

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "Email address is required." })
      .email("Please enter a valid email address."),
    name: z.string({ required_error: "Name is required." }).min(4),
    subject: z.string({ required_error: "Subject is required." }).min(4),
    message: z.string({ required_error: "Message is required" }).min(20),
  }),
)
const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  const { error } = await client.from("feedback").insert({
    message: `${values.email}: ${values.subject}\n${values.message}`,
  })

  if (error) {
    errors.value = error.message
    loading.value = false
    return
  }

  success.value = true
})
</script>

<template>
  <section>
    <div class="container">
      <div class="mb-8">
        <h1 class="font-heading text-3xl font-bold">Get In Touch</h1>
        <p class="text-muted-foreground mt-1">
          We're here to help — expect a reply within 2 business days.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-5">
        <!-- Left info panel -->
        <aside class="flex flex-col gap-6 lg:col-span-2">
          <div class="card flex flex-col gap-5">
            <div class="flex size-14 items-center justify-center rounded-2xl">
              <Icon
                name="ph:envelope-simple-bold"
                size="28"
                class="text-primary"
              />
            </div>
            <div>
              <h2 class="mb-2 text-xl font-bold">Contact Us</h2>
              <p class="text-muted-foreground text-sm leading-relaxed">
                Have a question, suggestion, or technical issue? Fill in the
                form and our team will respond within 2 business days.
              </p>
            </div>

            <div class="flex flex-col gap-3 border-t pt-2">
              <a
                href="mailto:support@sustainenergy.co.uk"
                class="flex items-center gap-3 font-sans text-sm transition-colors"
              >
                <Icon
                  name="ph:envelope-simple-bold"
                  size="18"
                  class="text-primary shrink-0"
                />
                support@sustainenergy.co.uk
              </a>
              <a
                href="tel:+441310000000"
                class="flex items-center gap-3 font-sans text-sm transition-colors"
              >
                <Icon
                  name="ph:phone-bold"
                  size="18"
                  class="text-primary shrink-0"
                />
                +44 131 000 0000
              </a>
              <div class="flex items-start gap-3 text-sm">
                <Icon
                  name="ph:map-pin-bold"
                  size="18"
                  class="text-primary mt-1 shrink-0"
                />
                Edinburgh College, Edinburgh, Scotland
              </div>
            </div>
          </div>

          <!-- Response time card -->
          <div
            class="border-primary flex items-center gap-3 rounded-xl border p-4"
          >
            <Icon name="ph:clock-bold" size="22" class="text-primary" />
            <div>
              <p class="font-heading text-primary text-sm font-semibold">
                Typical Response Time
              </p>
              <p class="mt-0.5 text-xs">
                Within 2 business days, Mon–Fri 9am–5pm
              </p>
            </div>
          </div>
        </aside>

        <!-- Right form -->
        <UiCard class="card lg:col-span-3">
          <UiAlert
            v-if="success"
            dismissible
            class="mb-5"
            title="Message sent!"
          >
            Thank you! Your message has been received. We will be in touch
            within 2 business days.
          </UiAlert>

          <UiCardContent>
            <form v-if="!success" @submit="onSubmit">
              <div class="flex flex-col gap-5">
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <!-- Name -->
                  <UiFormField v-slot="{ componentField }" name="name">
                    <UiFormItem>
                      <UiFormLabel class="font-heading text-sm font-semibold">
                        Name <span class="text-red-400">*</span>
                      </UiFormLabel>
                      <UiFormControl>
                        <UiInputGroup>
                          <UiInputGroupInput
                            type="text"
                            placeholder="John Doe"
                            class="placeholder:text-sm"
                            required
                            v-bind="componentField"
                          />
                          <UiInputGroupAddon align="inline-start">
                            <Icon name="ph:envelope-simple-open-bold" />
                          </UiInputGroupAddon>
                        </UiInputGroup>
                      </UiFormControl>
                      <UiFormMessage
                        class="font-heading text-xs font-semibold"
                      />
                    </UiFormItem>
                  </UiFormField>
                  <!-- END Name -->
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
                      <UiFormMessage
                        class="font-heading text-xs font-semibold"
                      />
                    </UiFormItem>
                  </UiFormField>
                  <!-- END Email -->
                </div>

                <!-- Subject -->
                <UiFormField v-slot="{ componentField }" name="subject">
                  <UiFormItem>
                    <UiFormLabel class="font-heading text-sm font-semibold">
                      Name <span class="text-red-400">*</span>
                    </UiFormLabel>
                    <UiFormControl>
                      <UiInputGroup>
                        <UiInputGroupInput
                          type="text"
                          placeholder="Green Calculator problem"
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
                <!-- END Subject -->

                <!-- Message -->
                <UiFormField v-slot="{ componentField }" name="message">
                  <UiFormItem>
                    <UiFormLabel class="font-heading text-sm font-semibold">
                      Message <span class="text-red-400">*</span>
                    </UiFormLabel>
                    <UiFormControl>
                      <UiTextarea
                        type="text"
                        placeholder="Please describe your query in detail..."
                        class="placeholder:text-sm"
                        rows="6"
                        required
                        v-bind="componentField"
                      />
                    </UiFormControl>
                    <UiFormMessage class="font-heading text-xs font-semibold" />
                  </UiFormItem>
                </UiFormField>
                <!-- END Message -->

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
                </div>
              </div>
            </form>
            <!-- Post-submit state: show fresh form option -->
            <div v-else class="py-6 text-center">
              <Icon
                name="ph:check-circle-bold"
                size="48"
                class="text-primary mx-auto mb-4"
              />
              <h3 class="font-heading mb-2 text-lg font-bold">
                We've received your message!
              </h3>
              <p class="font-body text-muted mb-5 text-sm">
                A confirmation has been sent to {{ form.values.email }}.
              </p>
              <UiButton variant="secondary" size="sm" @click="success = false">
                Send Another Message
              </UiButton>
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </section>
</template>
