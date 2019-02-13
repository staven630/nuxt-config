import {
  SET_TOKEN,
  SET_IDENTITY,
  SET_META,
  SET_MENU,
  SET_FORMAT,
  SET_KEYWORD,
  SET_ICON
} from '../utils/constants'

export const state = () => ({
  token: '',
  identity: 3, // 1表示管理员身份，2 表示管理员以访客身份 3 表示访客
  meta: {}, // meta信息
  menu: [], // 菜单列表
  format: {}, // 搜索类型
  keyword: '',
  icon: 0
})

export const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token
  },
  [SET_IDENTITY](state, identity) {
    state.identity = identity
  },
  [SET_META](state, meta) {
    state.meta = meta
  },
  [SET_MENU](state, menu) {
    state.menu = menu
  },
  [SET_FORMAT](state, format) {
    state.format = format
  },
  [SET_KEYWORD](state, keyword) {
    state.keyword = keyword
  },
  [SET_ICON](state, icon) {
    state.icon = icon
  }
}

export const actions = {
  // 判断是否是管理员
  async nuxtServerInit({ commit }, { query, $axios }) {
    if (query.code) {
      const result = await $axios.post('/admin/login', {
        code: query.code
      })
      if (result.status === 200 && result.data.data) {
        if (result.data.data.access_token) {
          commit(SET_TOKEN, result.data.data.access_token)
          commit(SET_IDENTITY, 1)
        } else {
          commit(SET_TOKEN, '')
          commit(SET_IDENTITY, 3)
        }
      }
    } else {
      commit(SET_TOKEN, '')
      commit(SET_IDENTITY, 3)
    }
  }
}
