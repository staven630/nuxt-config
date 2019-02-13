import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR }) => {
  if (isHMR) return
  if (process.client) {
    window.onNuxtReady(() => {
      createPersistedState({
        key: 'docssr',
        storage: window.sessionStorage
      })(store)
    })
  }
}
