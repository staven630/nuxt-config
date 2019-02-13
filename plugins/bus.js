import Vue from 'vue'

const bus = new Vue()

Vue.prototype.$bus = {
  on(...event) {
    bus.$on(...event)
  },
  off(...event) {
    bus.$off(...event)
  },
  emit(...event) {
    bus.$emit(...event)
  }
}
