const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Antoine Denis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Antoine Denis. Graphic designer, Paris.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss',
    'swiper/dist/css/swiper.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // {src: '~/plugins/vue-carousel', ssr: false}
    { src: '~/plugins/swiper.js', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['prismic-nuxt', {
      endpoint: 'https://antoine-denis.cdn.prismic.io/api/v2',
      linkResolver: function(doc, ctx) {
        return '/'
      }
    }],
    [
      'nuxt-sass-resources-loader',
      [
          '~/assets/scss/abstracts/_functions.scss',
          '~/assets/scss/abstracts/_mixins.scss',
          '~/assets/scss/abstracts/_placeholders.scss',
          '~/assets/scss/abstracts/_variables.scss'
      ]
    ]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
