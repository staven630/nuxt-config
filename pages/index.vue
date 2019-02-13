<template>
  <div class="scroll-wrapper">
    <el-scrollbar class="scrollbar-box">
      <div class="home">
        <manage-home v-if="identity === 1"></manage-home>
        <Carousel v-if="banners.length"
                  :data="banners"
                  arrow="hover"
                  :top="false" />
        <redirect-card v-if="identity === 1"
                       title="Banner管理"
                       :url="'https://'+ api +'/banner/index'"
                       :text="'跳转到'+ api +'中的banner管理页面，此处banner位置为“文档大全-首页”'" />
        <div class="list-wrapper">
          <TabList :news="news"
                   :hots="hots"
                   :flag="1" />
        </div>
      </div>
    </el-scrollbar>
  </div>

</template>
<script>
import ManageHome from '@/components/public/ManageHome'
import RedirectCard from '@/components/public/RedirectCard'
import TabList from '@/components/public/TabList'
import Carousel from '@/components/public/Carousel'
import meta from '@/mixins/meta';
import getData from '@/mixins/getdata';
import { SET_META, SET_MENU, SET_FORMAT, SET_TOKEN, SET_IDENTITY } from '@/utils/constants'
export default {
  mixins: [meta],
  data () {
    return {
      card_title: '',
      banners: [],
      news: {},
      hots: {},
      api: process.env.BASE_API === 'prod' ? 'guanli.mayihr.com' : 'guanli.mayitest.cn'
    }
  },
  async asyncData ({ $axios, store }) {
    const result = await $axios.get('/article/index');
    if (result) {
      const res = (result.data && result.data.status_code === 200) ? result.data.data : result;
      const { meta, hots, news, banners, menu, format } = res;
      store.commit(SET_META, meta);
      store.commit(SET_MENU, menu);
      store.commit(SET_FORMAT, format);
      return {
        banners,
        news,
        hots
      }
    }
  },

  async mounted () {
    if (this.$route.query.code) {
      const docsrr = window.sessionStorage.getItem('docssr');
      if (docsrr) {
        const identity = +JSON.parse(docsrr).identity;
        if (this.$route.query.code && identity === 3) {
          const result = await this.$axios.post('/admin/login', {
            code: this.$route.query.code
          })
          if (result.access_token) {
            this.$store.commit(SET_TOKEN, result.access_token)
            this.$store.commit(SET_IDENTITY, 1)
          } else {
            this.$store.commit(SET_TOKEN, '')
            this.$store.commit(SET_IDENTITY, 3)
          }
          this.$router.replace('/');
        } else {
          this.$router.replace('/');
        }
      } else {
        this.$router.replace('/');
      }
    }

  },

  components: {
    ManageHome,
    RedirectCard,
    TabList,
    Carousel
  },
  transition: 'page'
}
</script>

<style scoped lang="scss">
.home {
  padding: 10px;
  box-sizing: border-box;
}
.list-wrapper {
  padding: 5px 20px 20px 20px;
  margin: 10px 0;
  background: #fff;
  @include border();
}
</style>
