<script setup lang="ts">
useHead({ title: "Terms & Conditions – Sustain Energy" })

const sections = [
  {
    num: "1",
    title: "Service Description",
    content:
      "Sustain Energy provides a web-based sustainability assessment platform that allows registered companies to measure their environmental performance, receive a sustainability certificate, purchase annual subscriptions, and acquire green vouchers. Access to the platform is subject to these Terms and Conditions and to payment of the applicable subscription fee.",
  },
  {
    num: "2",
    title: "Subscription Terms",
    items: [
      "The Basic Plan subscription costs £99.99 per year and renews annually on the anniversary of your registration date.",
      "Subscriptions may be cancelled at any time; access continues until the end of the current billing period. No refunds are issued for partial periods.",
      "Green voucher purchases are non-refundable once applied to your account.",
      "Sustain Energy reserves the right to adjust pricing with 30 days' written notice to subscribers.",
    ],
  },
  {
    num: "3",
    title: "Company Obligations",
    content:
      'By registering and using the Green Calculator, your company agrees to provide accurate, truthful, and up-to-date information regarding its sustainability practices. Providing false or misleading information is a material breach of these Terms. Sustain Energy promotes "Good Corporate Citizenship" and expects all registered companies to engage with the platform in good faith. Certificates are issued based on self-reported data; misrepresentation may result in certificate revocation and account termination.',
  },
  {
    num: "4",
    title: "Intellectual Property",
    content:
      "All content, software, design, logos, and certificates produced by the Sustain Energy platform are the intellectual property of Sustain Energy Ltd. You are granted a limited, non-exclusive licence to use your sustainability certificate for legitimate promotional and reporting purposes. Reproduction or commercial exploitation of platform content without written permission is prohibited.",
  },
  {
    num: "5",
    title: "Liability Limitation",
    content:
      'Sustain Energy Ltd provides the platform on an "as is" basis. To the extent permitted by law, we exclude all warranties, express or implied. We are not liable for any indirect, consequential, or special damages arising from use of the platform. Our total liability in any circumstance shall not exceed the subscription fee paid by you in the preceding 12 months.',
  },
  {
    num: "6",
    title: "Data Protection",
    content:
      "Your personal data is processed in accordance with our Privacy Policy and the UK Data Protection Act 2018. By creating an account, you consent to the processing of your company data as described in the Privacy Policy.",
  },
  {
    num: "7",
    title: "Governing Law",
    content:
      "These Terms and Conditions are governed by and construed in accordance with the law of Scotland. Any disputes arising from your use of the platform shall be subject to the exclusive jurisdiction of the Scottish courts.",
  },
  {
    num: "8",
    title: "Amendments",
    content:
      "Sustain Energy reserves the right to update these Terms at any time. Registered users will be notified by email of material changes at least 14 days before they take effect. Continued use of the platform after changes take effect constitutes acceptance of the revised Terms.",
  },
]
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="container py-20">
      <!-- Header -->
      <UiCard class="border-accent bg-secondary mb-10 pb-6">
        <UiCardHeader class="mb-3 flex items-center gap-3">
          <UiBadge>
            <Icon name="ph:lock-simple-bold" class="text-white" />
            <span>Legal Document</span>
          </UiBadge>
        </UiCardHeader>

        <UiCardContent>
          <UiCardTitle>
            <h1 class="font-display text-3xl font-bold">
              Terms &amp; Conditions
            </h1>
          </UiCardTitle>
          <p class="font-body text-muted-foreground mt-2 text-sm">
            Last updated: February 2026. Please read these terms carefully
            before using the Sustain Energy platform. By registering, you
            confirm that you have read and agreed to these terms.
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
          Questions about these terms? Contact us at
          <a
            href="mailto:legal@sustainenergy.co.uk"
            class="text-primary font-semibold"
          >
            legal@sustainenergy.co.uk </a
          >. See also our
          <NuxtLink to="/privacy" class="text-primary font-semibold">
            Privacy Policy </NuxtLink
          >.
        </p>
      </div>
    </div>
  </div>
</template>
