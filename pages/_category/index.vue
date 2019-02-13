<template>
  <div class="scroll-wrapper">
    <el-scrollbar class="scrollbar-box">
      <div class="navbar">
        <manage-card v-if="identity === 1"></manage-card>
        <div class="navbar__content clearfix">
          <div class="navbar__left">
            <div class="navbar__info">
              <h3><i class="icon iconfont myhr-folder"></i> {{meta && meta.name}}</h3>
              <h2>{{meta && meta.title}}</h2>
              <div class="navbar__text">{{ meta && meta.description}}</div>
            </div>
            <TabList :news="news || {}"
                     :hots="hots || {}"
                     :type="type"
                     :flag="2" />
          </div>
          <div class="navbar__right">
            <Carousel v-if="banners.length"
                      :data="banners" />
            <redirect-card v-if="identity === 1"
                           title="广告位管理"
                           :url="'https://'+ api +'/banner/index'"
                           :text="'跳转到'+ api +'中的banner管理页面，此处banner位置为“文档大全-内页”'" />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>

</template>

<script>
import ManageCard from '@/components/public/ManageCard'
import RedirectCard from '@/components/public/RedirectCard'
import TabList from '@/components/public/TabList'
import Carousel from '@/components/public/Carousel'
import meta from '@/mixins/meta';
import { SET_META, SET_MENU, SET_FORMAT } from '@/utils/constants'

export default {
  mixins: [meta],
  components: {
    ManageCard,
    RedirectCard,
    TabList,
    Carousel
  },
  data () {
    return {
      banners: [],
      news: {},
      hots: {},
      type: 'new',
      api: process.env.BASE_API === 'prod' ? 'guanli.mayihr.com' : 'guanli.mayitest.cn'
    }
  },
  async asyncData ({ $axios, store, params, query }) {
    if (params.category || params.category == 0) {
      const result = await $axios.get(`/article/index?menu=${params.category}`);
      const res = (result.status && result.status === 200) ? result.data.data : result;
      const { meta, hots, news, banners, menu, format } = res;
      store.commit(SET_META, meta);
      store.commit(SET_MENU, menu);
      store.commit(SET_FORMAT, format);

      return {
        banners,
        news,
        hots,
        type: query.type ? query.type : 'new'
      }
    }

  },

  transition: 'page'
}
</script>

<style scoped lang="scss">
.navbar {
  padding: 10px;
  .button__danger {
    float: right;
  }

  .navbar__left {
    @include leftSide();
    padding: 5px 20px 20px 20px;
    background: #fff;
    @include border();

    .navbar__info {
      h3 {
        margin: 15px 0;
        line-height: 20px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
      h2 {
        line-height: 28px;
        font-size: 20px;
        margin: 15px 0;
        color: #000;
        &:hover {
          color: $primaryColor;
        }
      }
      .navbar__text {
        line-height: 20px;
        font-size: 14px;
        margin: 15px 0;
      }
    }
  }

  .navbar__right {
    @include rightSide();
  }
}
@media screen and (max-width: 768px) {
  .navbar {
    .navbar__right {
      display: none;
    }
    .navbar__left {
      width: 100%;
    }
  }
}
</style>
