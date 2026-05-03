<script setup lang="ts">
const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Green Calculator", to: "/calculator" },
  { label: "Subscription", to: "/subscription" },
  { label: "Contact", to: "/contact" },
]

const isActive = (path: string): boolean => {
  if (path === "/") return route.path === "/"
  return route.path.startsWith(path)
}

const route = useRoute()
const isMenuOpen = ref(false)

// Close menu on route change
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false
  },
)

// Check auth state
const user = useSupabaseUser().value
const isLoggedIn = ref(!!user)
</script>

<template>
  <header
    class="bg-background/80 sticky top-0 z-40 flex h-16 justify-center backdrop-blur-sm"
  >
    <div
      class="relative container flex h-full items-center justify-between gap-6"
    >
      <Logo />

      <!-- Desktop Nav Links -->
      <nav
        class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 self-center lg:flex"
        aria-label="Main navigation"
      >
        <NuxtLink
          v-for="link in navLinks"
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
          <NuxtLink v-if="!isLoggedIn" to="/auth/login" class="font-heading">
            Get Started
            <Icon name="ph:arrow-right" :size="20" class="text-white" />
          </NuxtLink>
          <NuxtLink v-else to="/dashboard" class="font-heading">
            Dashboard
            <Icon name="ph:arrow-right" :size="20" class="text-white" />
          </NuxtLink>
        </UiButton>
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
            v-for="link in navLinks"
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
