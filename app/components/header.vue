<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)

// Close menu on route change
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false
  },
)

// Simulate auth state
const isLoggedIn = ref(false)
const companyName = ref("Edinburgh College")

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Green Calculator", to: "/calculator" },
  { label: "Subscription", to: "/subscription" },
  { label: "Dashboard", to: "/dashboard", auth: true },
  { label: "Contact", to: "/contact" },
]

const visibleLinks = computed(() =>
  navLinks.filter((l) => !l.auth || isLoggedIn.value),
)

const isActive = (path: string) => {
  if (path === "/") return route.path === "/"
  return route.path.startsWith(path)
}
</script>

<template>
  <header
    class="bg-background/80 sticky top-0 z-40 flex h-16 justify-center backdrop-blur-sm"
  >
    <div
      class="relative container flex h-full items-center justify-between gap-6"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex shrink-0 items-center gap-2.5">
        <div
          class="bg-accent flex size-8 items-center justify-center rounded-full"
        >
          <Icon name="ph:leaf-bold" size="18" class="text-white" />
        </div>
        <span class="font-heading hidden text-xl font-bold sm:block">
          Sustain<span class="text-primary">Energy</span>
        </span>
      </NuxtLink>

      <!-- Desktop Nav Links -->
      <nav
        class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 self-center lg:flex"
        aria-label="Main navigation"
      >
        <NuxtLink
          v-for="link in visibleLinks"
          :key="link.to"
          :to="link.to"
          :class="[
            'font-heading hover:text-primary relative transition',
            'after:bg-primary after:absolute after:bottom-0 after:left-px after:h-0.5 after:w-0 after:transition-all hover:after:w-5',
            isActive(link.to) ? 'text-primary after:w-5' : '',
          ]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Auth Area — Desktop -->
      <div class="hidden items-center gap-3 lg:flex">
        <UiButton as-child>
          <!-- TODO: Redirect person from login page to dashboard if user authorised -->
          <NuxtLink to="/login" class="font-heading">
            Get Started
            <Icon name="ph:arrow-right" :size="20" class="text-white" />
          </NuxtLink>
        </UiButton>

        <template v-if="isLoggedIn">
          <div class="group relative flex cursor-pointer items-center gap-2">
            <div
              class="bg-secondary flex h-8 w-8 items-center justify-center rounded-full"
            >
              <Icon name="ph:building-office" size="16" class="text-white" />
            </div>
            <span class="font-heading text-sm font-semibold text-white">
              {{ companyName }}
            </span>
            <Icon name="ph:caret-down" size="14" class="text-white/70" />

            <!-- Dropdown -->
            <div
              class="border-border invisible absolute top-full right-0 mt-2 w-48 origin-top-right rounded-b-lg border bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100"
              style="animation: slideDown 0.2s ease both"
            >
              <NuxtLink
                to="/dashboard"
                class="font-heading hover:bg-muted border-border flex items-center gap-2 border-b px-4 py-3 text-sm font-semibold"
              >
                <Icon name="ph:grid-four" size="16" class="text-primary" />
                Dashboard
              </NuxtLink>
              <NuxtLink
                to="/profile"
                class="font-heading hover:bg-muted border-border flex items-center gap-2 border-b px-4 py-3 text-sm font-semibold"
              >
                <Icon name="ph:user" size="16" class="text-primary" />
                My Profile
              </NuxtLink>
              <button
                class="font-heading text-accent-amber flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold hover:bg-[#FEE2E2]"
              >
                <Icon name="ph:sign-out" size="16" />
                Log Out
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- Mobile Hamburger -->
      <button
        class="p-1 text-white lg:hidden"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation"
        @click="isMenuOpen = !isMenuOpen"
      >
        <Icon :name="isMenuOpen ? 'ph:x' : 'ph:list'" size="28" />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="slide-down">
      <div
        v-if="isMenuOpen"
        class="bg-primary border-t border-white/10 lg:hidden"
        style="background-color: #1f4d39"
      >
        <div class="container-app flex flex-col gap-1 py-4">
          <NuxtLink
            v-for="link in visibleLinks"
            :key="link.to"
            :to="link.to"
            :class="[
              'font-heading flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition-colors',
              isActive(link.to)
                ? 'text-accent bg-white/15'
                : 'text-white/85 hover:bg-white/10',
            ]"
          >
            {{ link.label }}
          </NuxtLink>

          <div class="my-2 h-px bg-white/15" />

          <template v-if="!isLoggedIn">
            <UiButton variant="ghost" size="sm" to="/login" full>
              Log In</UiButton
            >
            <UiButton size="sm" to="/register" full class="mt-2">
              Register
            </UiButton>
          </template>
          <template v-else>
            <UiButton variant="ghost" size="sm" full> Log Out </UiButton>
          </template>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
