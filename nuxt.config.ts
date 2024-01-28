// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/stylelint-module', { /* module options */ }]
  ]
})
