// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale='",
      title: "Sistema Gerenciador de Vagas"
    }
  },
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
  supabase: {
    redirect: false
  }
})
