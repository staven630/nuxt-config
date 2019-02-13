const BASE_API =
  process.env.BASE_API === 'prod' ? 'https://api.rsxq.com' : 'https://xingqiu.mayitest.cn'

module.exports = {
  mode: 'universal',
  loading: { color: '#3B8070' },
  css: ['~/theme/reset.css', '~/assets/scss/common.scss', '~/assets/fonts/iconfont.css'],
  plugins: [
    { src: '@/plugins/bus', ssr: false },
    { src: '@/plugins/axios', ssr: false },
    { src: '@/plugins/persistedstate', ssr: false },
    { src: '@/plugins/element-ui', ssr: true }
  ],

  env: {
    baseUrl: BASE_API
  },

  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios'],

  styleResources: {
    sass: ['@/assets/scss/variable.scss', '@/assets/scss/mixins.scss']
  },

  axios: {
    baseURL: process.env.baseUrl + '/api'
  },

  router: {
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },

  build: {
    extractCSS: true,
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: '~theme'
          }
        ]
      ],
      comments: true
    }
  }
}
