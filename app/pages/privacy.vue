<script setup lang="ts">
useHead({ title: "Privacy Policy – Sustain Energy" })

const sections = [
  {
    num: "1",
    title: "Data Controller",
    content:
      "Sustain Energy Ltd is the data controller for personal data collected through this platform. Registered in Scotland, Company No. SC123456. If you have questions about how your data is used, contact our Data Protection Officer at legal@sustainenergy.co.uk.",
  },
  {
    num: "2",
    title: "Data We Collect",
    content:
      "We collect information you provide directly when registering, including company name, contact person details, email address, and telephone number. We also collect usage data such as calculator submissions, subscription records, and voucher purchase history. Payment information is processed by our secure payment provider and is not stored on our servers.",
  },
  {
    num: "3",
    title: "How We Use Your Data",
    content:
      "Your data is used solely to deliver and improve the Sustain Energy service — including account management, Green Calculator functionality, certificate generation, and subscription billing. We do not sell, rent, or share your personal data with third parties for marketing purposes. Data may be shared with service providers operating on our behalf, bound by strict data processing agreements.",
  },
  {
    num: "4",
    title: "Your Rights Under UK GDPR",
    items: [
      "Right of access — request a copy of the data we hold about you.",
      "Right to rectification — request correction of inaccurate data.",
      "Right to erasure — request deletion of your personal data.",
      "Right to data portability — receive your data in a structured, machine-readable format.",
      "Right to object — object to processing of your data in certain circumstances.",
      "Right to restrict processing — request that processing be restricted pending a complaint.",
    ],
  },
  {
    num: "5",
    title: "Cookies",
    content:
      "We use essential cookies only — those strictly necessary for the platform to function (session management, authentication state). We do not use advertising or tracking cookies. You may disable cookies in your browser settings, though this may affect functionality.",
  },
  {
    num: "6",
    title: "Data Retention",
    content:
      "We retain your personal data for as long as your account is active or as needed to provide services. If you close your account, personal data is deleted within 30 days unless retention is required by law.",
  },
  {
    num: "7",
    title: "Contact",
    content:
      "For any privacy-related enquiries or to exercise your rights, contact our Data Protection Officer: legal@sustainenergy.co.uk. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.",
  },
]
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="container py-20">
      <!-- Header -->
      <UiCard class="border-accent bg-secondary mb-10 pb-6">
        <UiCardHeader class="mb-3 flex items-center gap-3">
          <!-- <div
            class="bg-accent/20 flex h-10 w-10 items-center justify-center rounded-xl"
          >
            
          </div> -->
          <UiBadge>
            <Icon name="ph:lock-simple-bold" class="text-white" />
            <span>Legal Document</span>
          </UiBadge>
        </UiCardHeader>

        <UiCardContent>
          <UiCardTitle>
            <h1 class="font-display text-3xl font-bold">Privacy Policy</h1>
          </UiCardTitle>
          <p class="font-body text-muted-foreground mt-2 text-sm">
            Last updated: April 2026. This policy describes how Sustain Energy
            Ltd collects, uses, and protects your personal data in accordance
            with the UK Data Protection Act 2018 and UK GDPR.
          </p>
        </UiCardContent>
      </UiCard>

      <!-- Sections -->
      <div class="flex flex-col gap-6">
        <section
          v-for="sec in sections"
          :key="sec.num"
          class="flex flex-col gap-3 py-4"
        >
          <div class="flex items-center gap-3">
            <span
              class="bg-primary font-heading flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
            >
              {{ sec.num }}
            </span>
            <h2 class="font-display text-xl font-bold">
              {{ sec.title }}
            </h2>
          </div>

          <p v-if="sec.content" class="font-body ml-12 leading-relaxed">
            {{ sec.content }}
          </p>

          <ul v-if="sec.items" class="ml-12 flex flex-col gap-2">
            <li
              v-for="item in sec.items"
              :key="item"
              class="font-body flex items-start gap-3 text-sm"
            >
              <Icon
                name="ph:check-circle-bold"
                size="16"
                class="text-primary mt-0.5 shrink-0"
              />
              {{ item }}
            </li>
          </ul>
        </section>
      </div>

      <!-- Footer note -->
      <div class="mt-12 flex items-start gap-3 rounded-xl border p-5">
        <Icon name="ph:info-bold" size="20" class="text-secondary shrink-0" />
        <p class="font-body text-muted-foreground text-sm leading-relaxed">
          If you have any questions about this privacy policy, please contact us
          at
          <a
            href="mailto:legal@sustainenergy.co.uk"
            class="text-primary font-semibold"
          >
            legal@sustainenergy.co.uk </a
          >. For the full Terms &amp; Conditions, see the
          <NuxtLink to="/terms" class="text-primary font-semibold">
            Terms page </NuxtLink
          >.
        </p>
      </div>
    </div>
  </div>
</template>
