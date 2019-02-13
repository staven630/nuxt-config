import { mapState } from 'vuex'

export default {
  head() {
    const route = this.$route
    let title = ''
    switch (route.name) {
      case 'index':
      case 'category':
        title = this.getCategoryTitle()
        break
      case 'category-id':
        title = this.getArticleTitle()
        break
      case 'search':
        title = '搜索_人事星球'
        break
      default:
        title = '人事星球'
    }

    return {
      titleTemplate: title,
      meta: [
        { charset: 'utf-8' },
        { title: title },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: this.meta ? this.meta.description : ''
        },
        { hid: 'keywords', name: 'keywords', content: this.meta ? this.meta.keywords : '' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  computed: {
    ...mapState(['identity', 'meta'])
  },
  methods: {
    getCategoryTitle() {
      return this.meta && this.meta.title ? `${this.meta.title}_人事星球` : '人事星球'
    },
    getArticleTitle() {
      let arr = []
      if (this.meta) {
        if (this.meta.title) {
          arr.push(this.meta.title)
        }

        if (
          this.meta.hasOwnProperty('article_type_id') &&
          this.$store.state.hasOwnProperty('menu')
        ) {
          let name = null
          this.$store.state.menu.some(item => {
            if (item.id === this.meta.article_type_id) {
              name = item.name
              return true
            }
          })
          name !== null && arr.push(name)
        }
      }
      arr.push('人事星球')
      return arr.join('_')
    }
  }
}
