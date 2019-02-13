<template>
  <el-row class="header">
    <el-col :span="6">
      <nuxt-link to="/"
                 class="logo">
        <img src="~/assets/images/logo.svg" />
        <!-- <span class="green">蚂蚁HR</span><span>文档大全</span> -->
      </nuxt-link>
    </el-col>
    <el-col :span="12">
      <div class="search-box custom">
        <el-input class="input-with-select"
                  placeholder="输入文档名称进行搜索"
                  @keyup.enter.native="search"
                  v-model="keyword">
          <el-select placeholder="请选择格式"
                     slot="prepend"
                     v-model="searchType">

            <el-option label="所有格式"
                       :value="0"
                       :key="0"></el-option>

            <el-option :label="item.name"
                       :value="item.id"
                       :key="item.id"
                       v-for="item in format"></el-option>
          </el-select>
          <el-button icon="el-icon-search"
                     slot="append"
                     @click="search"></el-button>
        </el-input>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="login clearfix"
           v-if="identity < 3">
        <div class="logout"
             @click="logout">登出</div>
        <div class="login__change"
             v-if="identity === 1"
             @click="change(2)">切换为访客视角</div>
        <div class="login__change"
             v-if="identity === 2"
             @click="change(1)">切换为管理员视角</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import identity from '@/mixins/identity';
import { SET_TOKEN, SET_IDENTITY, SET_KEYWORD, SET_ICON } from '@/utils/constants';
import { IS_EMPTY } from '@/utils/pattern'
import { mapState } from 'vuex'
export default {
  mixins: [identity],
  props: {
    jump: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      keyword: '',
      searchType: 0
    }
  },
  computed: {
    ...mapState(['format'])
  },
  mounted () {
    if (this.$route.query && this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword;
      this.searchType = +this.$route.query.type
    }
  },
  methods: {
    change (e) {
      this.$store.commit(SET_IDENTITY, e)
    },
    logout () {
      this.$store.commit(SET_TOKEN, null);
      this.$store.commit(SET_IDENTITY, 3);
    },
    search () {
      if (IS_EMPTY.test(this.keyword)) {
        return this.$message({
          message: '请输入搜索内容',
          type: 'warning',
          duration: 1000
        });
      }
      this.$store.commit(SET_KEYWORD, this.keyword)
      this.$store.commit(SET_ICON, this.searchType)
      if (this.jump) {
        return this.$router.push({ path: `/search?type=${this.searchType}&keyword=${this.keyword}` })
      }
      this.$bus.emit('search', {
        keyword: this.keyword,
        type: this.searchType
      })
    }
  },
  watch: {
    $route (newVal) {
      if (newVal.query && newVal.query.keyword) {
        this.keyword = newVal.query.keyword;
        this.searchType = +newVal.query.type
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/scss/components/public/header.scss';
</style>
