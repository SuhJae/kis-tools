// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@pinia/nuxt",
  ],

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: "",
  },

  typescript: {
    shim: false,
  },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
      { from: "vue-sonner", name: "toast", as: "useSonner" },
    ],
  },

  build: {
    transpile: ["vue-sonner"],
  },

  routeRules: {
    // disable SSR for /calculator route
    "/calculator": { ssr: false },
    "/" : { ssr: false }
  },
});
