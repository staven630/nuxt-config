<template>
  <div class="down-list">
    <h3>
      下载最多的{{category ? category.name : '文档'}}
      <nuxt-link :to="'/' + (!category ? ''  : ( category.route || category.id)) + '?type=hot'">更多</nuxt-link>
    </h3>
    <ul v-if="data.length">
      <li v-for="item in data"
          :key="item.id">
        <nuxt-link :to="'/' + (item.route || item.article_type_id) + '/' + item.id">
          <img src="~/assets/images/excel.svg"
               class="icon"
               v-if="+item.icon === 3" />
          <img src="~/assets/images/pdf.svg"
               class="icon"
               v-if="+item.icon === 2" />
          <img src="~/assets/images/word.svg"
               v-if="+item.icon === 1"
               class="icon" />
          {{item.title}}
        </nuxt-link>
      </li>
    </ul>
    <div v-else>
      暂无数据
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    category: null
  }
}
</script>

<style lang="scss" scoped>
.down-list {
  padding: 20px;
  margin: 10px 0;
  background-color: #fff;
  @include border();
  h3 {
    position: relative;
    line-height: 20px;
    margin-bottom: 20px;
    padding-right: 30px;
    font-size: 16px;
    @include ellipsis();
    a {
      position: absolute;
      right: 0;
      top: 0;
      line-height: 20px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  li {
    position: relative;
    a {
      display: block;
      padding-left: 38px;
      font-size: 16px;
      line-height: 50px;
      @include ellipsis();
      color: #000;
    }

    .icon {
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -11px;
      font-size: 22px;
    }
  }
}
</style>
