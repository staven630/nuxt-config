<template>
  <div class="scroll-wrapper">
    <el-scrollbar class="scrollbar-box">
      <div class="detail">
        <manage-document v-if="identity === 1">
        </manage-document>
        <div class="clearfix">
          <div class="left-side">
            <Header :category="category" />
            <Preview :doc="doc" />
          </div>
          <div class="right-side">
            <Carousel v-if="banners.length"
                      :data="banners" />
            <RedirectCard v-if="identity === 1"
                          :url="'https://'+ api +'/banner/index'"
                          :text="'跳转到'+ api +'中的banner管理页面，此处banner位置为“文档大全-文档”'"
                          title="广告位管理" />
            <DownList :category="category"
                      :data="hots" />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>

</template>

<script>
import ManageDocument from '@/components/public/ManageDocument'
import RedirectCard from '@/components/public/RedirectCard'
import Carousel from '@/components/public/Carousel'
import Header from '@/components/detail/Header'
import Preview from '@/components/detail/Preview'
import DownList from '@/components/detail/DownList'
import meta from '@/mixins/meta';
import { SET_META, SET_MENU, SET_FORMAT } from '@/utils/constants'
export default {
  mixins: [meta],

  data () {
    return {
      hots: [],
      doc: '',
      api: process.env.BASE_API === 'prod' ? 'guanli.mayihr.com' : 'guanli.mayitest.cn'
    }
  },
  async asyncData ({ store, $axios, params }) {
    if (params.id || params.id == 0) {
      const result = await $axios.get(`/article/${params.id}`)

      const res = (result.status && result.status === 200) ? result.data.data : result;
      const { data, hots, banners, menu, format, doc } = res;
      store.commit(SET_META, data);
      store.commit(SET_MENU, menu);
      store.commit(SET_FORMAT, format);
      return {
        banners,
        hots: hots.data,
        doc
      }
    }

  },

  components: {
    ManageDocument,
    RedirectCard,
    Carousel,
    Header,
    Preview,
    DownList
  },
  computed: {
    category () {
      let obj = {};
      this.$store.state.menu.some(item => {
        if (item.id === this.meta.article_type_id) {
          obj = item
          return true;
        }
      });
      return obj;
    }
  },
  transition: 'page'
}
</script>

<style lang="scss" scoped>
.detail {
  padding: 10px;
}
.clearfix {
  min-width: 832px;
}
.left-side {
  @include leftSide();
  background: #fff;
  min-width: 520px;
  height: auto;

  @include border();
}

.right-side {
  z-index: 100;
  @include rightSide();
}

.m20 {
  margin: 10px 0;
}

@media screen and (max-width: 768px) {
  .left-side {
    width: 100%;
    min-width: auto;
  }
  .right-side {
    display: none;
  }
}
</style>
