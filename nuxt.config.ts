// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  pages: true,
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss"
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
