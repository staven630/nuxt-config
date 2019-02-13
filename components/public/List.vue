<template>
  <div>
    <ul class="document__list">

      <Item v-for="item in list"
            :key="item.id"
            :data="item" />

    </ul>
    <el-pagination :page-size="pageSize"
                   :pager-count="11"
                   :total="total"
                   :current-page="current"
                   @current-change="onChange"
                   v-if="count > 1"
                   layout="prev, pager, next"></el-pagination>
  </div>
</template>

<script>
import Item from '@/components/public/Item.vue'
import { mapState } from 'vuex'
export default {
  props: {
    source: {
      type: Object,
      default: () => {
        return {
          data: [],
          total: 0,
          per_page: 10,
          current_page: 1
        }
      }
    },
    flag: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      value: ''
    }
  },
  data () {
    return {
      pageSize: this.source.per_page,
      list: this.source.data,
      total: this.source.total,
      count: this.source.total / this.source.per_page,
      current: this.source.current_page
    }
  },
  components: {
    Item
  },

  methods: {
    onChange (e) {
      let api = +this.flag === 1 ? '' : `&menu=${this.$store.state.meta.id}`;
      this.$axios.get(`/article/page?list_type=${this.type}&page=${e}${api}`)
        .then(res => {
          this.list = res[this.type].data;
          this.current = e;
        })
    }
  }

}
</script>

<style lang="scss" scoped>
.document__list {
  margin-bottom: 10px;
}
</style>
