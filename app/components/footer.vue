<script setup lang="ts">
const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Green Calculator", to: "/calculator" },
  { label: "Subscription", to: "/subscription" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
]

const credentials = [
  {
    icon: "ph:seal-check-bold",
    label: "Sustain Energy Approved",
    sub: "Official Platform Certification",
    color: "var(--color-primary)",
  },
  {
    img: "/images/ec_logo.webp",
    label: "Edinburgh College",
    sub: "Endorsed & Supported",
    color: "#003865",
		link: "https://www.edinburghcollege.ac.uk",
  },
  {
    img: "/images/unesco_logo.webp",
    label: "UNESCO",
    sub: "Endorsed & Supported",
    color: "#003865",
    link: "https://www.unesco.org/en",
  },
  {
    icon: "ph:shield-check-bold",
    label: "ISO/IEC 27001:2022",
    sub: "Aligned Security Practice",
    color: "#374151",
  },
]
</script>

<template>
  <footer id="footer" class="bg-foreground flex flex-col items-center text-slate-400">
    <!-- Main grid -->
    <div class="container py-10">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-3">
        <!-- Column 1: Brand -->
        <div class="flex flex-col gap-5">
          <Logo variant="dark" />

          <p class="font-body text-sm leading-relaxed">
            Measuring sustainability, one company at a time. Empowering
            businesses to track, improve and certify their environmental impact.
          </p>

          <!-- Social icons -->
          <div class="flex items-center gap-3">
            <a
              v-for="(social, i) in [
                { icon: 'ph:linkedin-logo-bold', label: 'LinkedIn', href: '#' },
                { icon: 'ph:x-logo-bold', label: 'X (Twitter)', href: '#' },
              ]"
              :key="i"
              :href="social.href"
              :aria-label="social.label"
              class="hover:bg-primary flex size-9 items-center justify-center rounded-full bg-slate-600/80 transition-all duration-200"
            >
              <Icon :name="social.icon" size="17" class="text-white" />
            </a>
          </div>
        </div>

        <!-- Column 2: Quick Links -->
        <div>
          <h4
            class="font-heading text-secondary mb-5 text-sm font-semibold tracking-widest uppercase"
          >
            Quick Links
          </h4>
          <ul class="flex flex-col gap-2.5">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="font-body text-sm transition-colors hover:text-white"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 3: Credentials -->
        <div>
          <h4
            class="font-heading text-secondary mb-5 text-sm font-semibold tracking-widest uppercase"
          >
            Trust &amp; Credentials
          </h4>
          <div class="flex flex-col gap-4">
            <a
              v-for="cred in credentials"
              :key="cred.label"
							:href="cred.link ?? '#footer'"
              class="flex items-center gap-3"
            >
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/6"
              >
                <Icon
                  v-if="cred.icon"
                  :name="cred.icon"
                  size="22"
                  :style="`color: ${cred.color}`"
                />
                <NuxtImg v-else :src="cred.img" class="size-5.5" />
              </div>
              <div>
                <p class="font-heading text-sm font-semibold text-white">
                  {{ cred.label }}
                </p>
                <p class="font-body text-xs text-slate-500">
                  {{ cred.sub }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="container flex flex-col items-center justify-between gap-3 border-t border-[#374151] py-5 text-slate-400/50 sm:flex-row"
    >
      <p class="font-heading text-xs">
        © 2026 Sustain Energy Ltd. Company No. SC123456. Registered in Scotland.
      </p>
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/privacy"
          class="font-heading text-xs transition-colors hover:text-white"
        >
          Privacy Policy
        </NuxtLink>
        <span class="">|</span>
        <NuxtLink
          to="/terms"
          class="font-heading text-xs transition-colors hover:text-white"
        >
          Terms &amp; Conditions
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
