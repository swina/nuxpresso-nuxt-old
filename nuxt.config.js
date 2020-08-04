import dotenv from 'dotenv'
import path from 'path'
dotenv.config()
export default {
  mode: "universal",
  target: 'static',
  /*
   ** Headers of the page
   */
  env: {
    strapiBaseUri: process.env.API_URL || "http://localhost:1337",
    VUE_APP_HERE_APIKEY: process.env.VUE_APP_HERE_APIKEY,
    DEV_USER: process.env.NUXPRESSO_DEV_USER,
    DEV_PWD: process.env.NUXPRESSO_DEV_PASSWORD,
    VERSION: "1.0.0"
  },

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Work+Sans"//Staatliches"
      },
      { rel: "stylesheet" ,
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }

    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/tailwind.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/utils.js" ],//"~/plugins/axios.js"
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/recaptcha'
  ],
  tailwindcss: {
      exposeConfig: true
  },
  recaptcha : {
    siteKey: process.env.RECAPTCHA,
    version: 3,
    size: 'invisible',
    hideBadge: true
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
      'postcss-nested': {}
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/apollo", "@nuxtjs/markdownit","@nuxtjs/tailwindcss","@nuxtjs/axios"],//"nuxt-material-design-icons-iconfont"],
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: (process.env.API_URL || "http://localhost:1337") + "/graphql"
      }
    }
  },
  axios: {
    baseUrl: process.env.API_URL + '/'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    srcDir: 'src',
    buildDir: 'dist',
    extend(config, ctx) {},
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
              useBuiltIns: "entry"
            }
          ]
        ]
      }
    }
  }
};
