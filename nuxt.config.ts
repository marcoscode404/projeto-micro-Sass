// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  srcDir: "src/",
  ssr: false,

  // runtimeConfig: {
  //   public: {
  //     baseURL: process.env.BASE_URL,
  //     appsURL: process.env.APPS_URL
  //   },
  // },

  css: ["~/assets/css/main.css", "~/assets/css/global.css"],
  
  icon: {
    customCollections: [{
      prefix: 'ms',
      dir: './assets/icons'
    }]
  },

  colorMode: {
    preference: 'light'
  },

   // config pwa
   app: {
    head: {
      title: 'Quadra Flex',
      link: [{ rel: "manifest", href: "/manifest.json" }],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "my website description",
        },
      ],
    },
  },

  imports: {
    autoImport: true, // Enables auto-import globally (no array here)
  },

  vite: {
    server: {
      hmr: {
        protocol: 'wss',
        overlay: false
      },
    },
    assetsInclude: ['**/*.xlsx', '**/*.mp4'],
    vueJsx: {optimize: true},
    optimizeDeps: {
      include: ['pinia'],
    },
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
