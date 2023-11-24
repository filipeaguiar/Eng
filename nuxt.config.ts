// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true
  },
  pages: true,
  colorMode: {
    preference: "light",
    fallback: "light",
  },
  modules: [
    "@nuxtjs/supabase",
    "@nuxt/ui"
  ],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  imports: {
    presets: [
      {
        from: './types/supabase',
        imports: ['Database']
      }
    ]
  },
})
