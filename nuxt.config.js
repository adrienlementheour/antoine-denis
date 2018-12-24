const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  < meta property = "og:url"
  content = "http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" / >
    <
    meta property = "og:type"
  content = "article" / >
    <
    meta property = "og:title"
  content = "When Great Minds Don’t Think Alike" / >
    <
    meta property = "og:description"
  content = "How much does culture influence creative thinking?" / >
    <
    meta property = "og:image"
  content = "http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" / >
  */
  head: {
    title: 'Antoine Denis',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Antoine Denis. Graphic designer, Paris.'
      },
      {
        name: 'msapplication-TileColor',
        content: '#ffffff'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      },
      {
        property: 'og:title',
        content: 'Antoine Denis'
      },
      {
        property: 'og:description',
        content: 'Graphic designer, Paris.'
      },
      {
        property: 'og:image',
        content: '/share-1200x630.png'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: 'Antoine Denis'
      },
      {
        name: 'twitter:description',
        content: 'Graphic designer, Paris.'
      },
      {
        name: 'twitter:image',
        content: '/share-1200x630.png'
      },
    ],
    link: [{
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#5bbad5'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

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
    {
      src: '~/plugins/swiper.js',
      ssr: false
    },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['prismic-nuxt', {
      endpoint: 'https://antoine-denis.cdn.prismic.io/api/v2',
      linkResolver: function (doc, ctx) {
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
