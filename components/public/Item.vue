<template>
  <li v-if="data">
    <nuxt-link :to="'/' + (data.route || data.article_type_id) + '/' + data.id"
               tag="div">
      <img src="~/assets/images/excel.svg"
           class="icon"
           v-if="+data.icon === 3" />
      <img src="~/assets/images/pdf.svg"
           class="icon"
           v-if="+data.icon === 2" />
      <img src="~/assets/images/word.svg"
           v-if="+data.icon === 1"
           class="icon" />

      <div class="document__item">
        <h3>
          <div class="document__item-title">{{data.title}}.{{data.postfix}}</div>
          <div class="document__item-tag">{{data.article_type_name}}</div>
        </h3>
        <div class="document__item-content">{{data.description}}</div>
        <div class="document__item-time">
          下载{{download}}次
          <span> · </span> {{formateDate(data.updated_at || data.created_at)}}更新
        </div>

      </div>
    </nuxt-link>
    <div class="download">
      <Down :id="data.id"
            @increment="increment" />
    </div>
  </li>
</template>

<script>
import Down from '@/components/public/Down'
import { getDateStr } from '@/utils/time'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    Down
  },
  data () {
    return {
      baseURL: process.env.baseUrl,
      download: this.data.download
    }
  },
  methods: {
    increment () {
      this.download += 1;
    },
    formateDate (time) {
      return getDateStr(time)
    }
  }
}
</script>

<style scoped lang="scss">
li {
  position: relative;
  & > div {
    padding-left: 38px;
    display: block;
    cursor: pointer;
  }
  .icon {
    position: absolute;
    top: 22px;
    left: 0;
    font-size: 22px;
  }
  &:last-child {
    .document__item {
      border-bottom: none;
    }
  }
  .document__item {
    padding: 20px 106px 20px 0;
    border-bottom: 1px solid #d6d6d6;
  }
  h3 {
    .document__item-title {
      display: inline;
      line-height: 20px;
      font-size: 16px;
      margin-right: 10px;
      font-weight: 400;
      color: #000;
      &:hover {
        color: $primaryColor;
        .document__item {
          &-title,
          &-tag,
          &-content {
            color: $primaryColor;
          }
        }
      }
    }
    .document__item-tag {
      display: inline-block;
      @include border();
      padding: 0 9px;
      line-height: 20px;
      border-radius: 4px;
      font-size: 12px;
      background-color: #f4f4f4;
      vertical-align: 1px;
    }
  }
  .document__item-content {
    line-height: 24px;
    margin: 8px 0;
    font-size: 15px;
  }
  .document__item-time {
    line-height: 20px;
    margin: 5px 0;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
  }
}

.download {
  position: absolute;
  top: 50%;
  margin-top: -15px;
  right: 20px;
}
</style>
