<template>
  <div class="document__detail-header">
    <el-row>
      <el-col :span="8">
        <span class="document__tag-title">
          <i class="icon iconfont myhr-folder"></i>
          <nuxt-link :to="'/' + (!category ? ''  : ( category.route || category.id))">
            {{category ? category.name : '文档'}}</nuxt-link>
        </span>
        <span class="document__tag-line">/</span>
        <span class="document__tag-second-title">文档详情</span>
      </el-col>
      <el-col :span="16"
              class="document__tag-tags">
        <div>{{category ? category.name : '文档'}}</div>
        <div>{{meta && meta.postfix}}</div>
      </el-col>
    </el-row>
    <div class="document__detail-title">{{meta && meta.title}}.{{meta && meta.postfix}}</div>
    <div class="document__detail-time">
      更新于{{meta && meta.updated_at || meta.created_at}} · 累计下载 {{meta && meta.download}}次
    </div>
    <div class="document__detail-content">{{meta && meta.description}}</div>
    <div class="download">
      <Down :id="meta.id"
            text="下载文档"
            size="large" />
    </div>

  </div>
</template>

<script>
import meta from '@/mixins/meta';
import Down from '@/components/public/Down'
export default {
  mixins: [meta],
  components: {
    Down
  },
  props: {
    category: null
  },
  data () {
    return {
      baseURL: process.env.baseUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.document__detail-header {
  padding: 20px;
  line-height: 20px;
  .document__tag-title {
    color: #000;
  }
  .document__tag-line {
    color: #d8d8d8;
    padding: 0 5px;
    font-size: 16px;
    vertical-align: -2px;
  }
  .document__tag-tags {
    text-align: right;
    div {
      display: inline-block;
      border-radius: 4px;
      background-color: #f4f4f4;
      line-height: 20px;
      padding: 0 8px;
      font-size: 12px;
      color: #95989e;
      border: 1px solid rgb(232, 232, 232);
      box-sizing: border-box;
    }
  }

  .document__detail-title {
    font-size: 20px;
    line-height: 28px;
    margin: 10px 0;
    color: #000;
    cursor: pointer;
    &:hover {
      color: $primaryColor;
    }
  }

  .document__detail-content {
    margin: 20px 0;
  }
}
</style>
