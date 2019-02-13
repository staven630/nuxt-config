<template>
  <div class="ad">
    <h3 class="ad__title">还可以这样发工资</h3>
    <div class="ad__content">上传日常使用的工资表就可以一键分发电子工资条，还可以撤回、实时修改，更环保、更聪明的工资条。</div>
    <el-button>免费试用</el-button>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
.ad {
  @include border();
  margin: 10px 0;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  color: #fff;
  .ad__tip,
  .ad__content {
    line-height: 20px;
    opacity: 0.6;
  }
  .ad__title {
    line-height: 28px;
    font-size: 20px;
    color: #fff;
    margin: 10px 0;
  }
  .ad__content {
    margin-bottom: 20px;
  }
}
</style>
