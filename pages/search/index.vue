<template>
  <div class="scroll-full-wrapper">
    <el-scrollbar class="scrollbar-box">
      <div class="search clearfix">
        <div class="left-side">
          <h1 class="search__title">
            <i></i>
            <span class="search__title-one">所有文档</span>
            <span class="search__title-line">/</span>
            <span class="search__title-two">搜索结果</span>
          </h1>
          <div v-if="list && list.length">
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
          <div v-if="list && list.length === 0"
               class="no-data">
            <img src="@/assets/images/nodata.png" />
          </div>
        </div>
        <div class="right-side">
          <Carousel :data="banners" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import Carousel from '@/components/public/Carousel'
import Item from '@/components/public/Item.vue'
import meta from '@/mixins/meta';
import { SET_KEYWORD, SET_ICON } from '@/utils/constants'
export default {
  mixins: [meta],
  layout: 'search',
  components: {
    Carousel,
    Item
  },
  data () {
    return {
      banners: [],
      list: [],
      icon: 0,
      keyword: '',
      pageSize: 0,
      total: 0,
      current: 1,
      count: ''
    }
  },
  async asyncData ({ app, query, $axios, store }) {
    const { type, keyword } = query;
    store.commit(SET_KEYWORD, keyword)
    store.commit(SET_ICON, type)
    const result = await $axios.get(+type === 0 ? `/article/search?name=${keyword}` : `/article/search?icon=${type}&name=${keyword}`);
    const res = (result.status && result.status === 200) ? result.data.data : result;
    return {
      list: res.hots.data,
      banners: res.banners,
      pageSize: res.hots.per_page,
      current: res.hots.current_page,
      total: res.hots.total,
      count: res.hots.total / res.hots.per_page
    }

  },
  mounted () {
    this.$bus.on('search', this.getData);
  },
  destroyed () {
    this.$bus.off('search', this.getData);
  },
  methods: {
    async getData ({ type, keyword }) {
      const { banners, hots } = await this.$axios.get(+type === 0 ? `/article/search?name=${keyword}` : `/article/search?icon=${type}&name=${keyword}`);
      this.banners = banners;
      this.list = hots.data;
    },
    onChange (e) {
      const { icon, keyword } = this.$store.state;
      const api = +icon === 0 ? '' : `&icon=${icon}`;
      this.$axios.get(`/article/search?name=${keyword}&page=${e}${api}`)
        .then(res => {
          this.list = res.hots.data;
          this.current = e;
        })
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  padding: 0 20px;
}
.left-side {
  @include leftSide();
  background: #fff;
  padding: 20px;
  @include border();
  .search__title {
    line-height: 20px;
  }
  .search__title-one {
    font-size: 14px;
    color: #000;
  }

  .search__title-line {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    margin: 0 3px;
  }

  .search__title-two {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
}

.right-side {
  @include rightSide();
}
.no-data {
  padding: 60px 0;
  text-align: center;
  img {
    width: 240px;
  }
}
</style>
