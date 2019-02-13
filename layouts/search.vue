<template>
  <el-scrollbar class="container">
    <Header />
    <div class="content">
      <nuxt />
    </div>
  </el-scrollbar>
</template>
<script>
import Header from '@/components/public/Header'
export default {
  components: {
    Header
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: rgb(238, 238, 238);
  min-width: $minWidth;
  padding-top: $headerHeight;
  box-sizing: border-box;
  .content {
    box-sizing: border-box;
    width: 80%;
    min-width: 1000px;
    margin: 0 auto;
  }
}
</style>

