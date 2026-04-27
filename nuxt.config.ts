import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  css: ["~/assets/css/fonts.css", "~/assets/css/tailwind.css"],
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/auth/**": { appLayout: "auth" },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@vueuse/core"],
    },
  },
  modules: [
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],
  shadcn: {
    prefix: "Ui",
    componentDir: "@/components/ui",
  },
  icon: {
    mode: "css",
    cssLayer: "base",
    serverBundle: {
      collections: ["ph"],
    },
  },
  image: {
    quality: 85,
    format: ["webp", "jpeg"],
    screens: {
      xs: 375,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
  supabase: {
    redirectOptions: {
      login: "/auth/login",
      callback: "/confirm",
      include: undefined,
      exclude: ["/", "/about", "/calculator"], // TODO: change before production
      saveRedirectToCookie: false,
    },
  },
  pinia: {},
})
