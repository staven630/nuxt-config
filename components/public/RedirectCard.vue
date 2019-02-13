<template>
  <transition name="el-zoom-in-top">
    <div class="redirect__card">
      <h1 class="redirect__card-title"><i class="icon iconfont myhr-setting"></i>{{title}}</h1>
      <div class="redirect__card-link">
        <a :href="url"
           target="_blank">点击此处</a>{{text}}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped lang="scss">
.redirect__card {
  padding: 20px;
  margin: 10px 0;
  border-radius: 3px;
  background-color: $primaryTextColor;
  color: #fff;
  font-size: 14px;

  .redirect__card-title {
    font-size: 16px;
    color: #fff;
    margin-bottom: 20px;
    i {
      margin-right: 5px;
    }
  }
  .redirect__card-link {
    margin-top: 10px;
    a {
      margin-right: 10px;
      color: $primaryColor;
    }
  }
}
</style>
