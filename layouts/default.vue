<template>
  <div class="container">
    <Header :jump="true" />
    <LeftSide />
    <nuxt />
  </div>
</template>
<script>
import Header from '@/components/public/Header'
import LeftSide from '@/components/public/LeftSide'
export default {
  components: {
    Header,
    LeftSide
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/layouts/default.scss';
</style>

