<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="最新文档"
                 name="new">
      <List :source="news"
            :flag="flag"
            type="news"
            v-if="news.data && news.data.length" />
      <div class="no-data"
           v-else>
        暂无数据
      </div>
    </el-tab-pane>
    <el-tab-pane label="最热文档"
                 name="hot">
      <List :source="hots"
            type="hots"
            :flag="flag"
            v-if="hots.data && hots.data.length" />
      <div class="no-data"
           v-else>
        暂无数据
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import List from './List';
export default {
  props: {
    news: {
      type: Object,
      required: true
    },
    hots: {
      type: Object,
      required: true
    },
    flag: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: 'new'
    }
  },
  data () {
    return {
      activeTab: this.type
    }
  },
  components: {
    List
  }
}
</script>

<style scoped lang="scss">
.no-data {
  min-height: 187px;
  text-align: center;
}
</style>
