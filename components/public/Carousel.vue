<template>
  <div class="carousel">
    <el-carousel :interval="5000"
                 :arrow="arrow"
                 class="home__carousel carousel__custom">
      <el-carousel-item :key="item.id"
                        v-for="item in data">
        <a :href="item.url"
           target="_blank"
           class="img-link">
          <img :src="item.new_info_img" />
        </a>
        <div class="home__carousel-detail"
             :class="{top: top, bottom: !top}">
          <h3 class="home__carousel-title">{{item.title}}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    top: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: 'never'
    }
  }
}
</script>

<style  scoped lang="scss">
.carousel {
  margin: 10px 0;
  border-radius: 3px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.61), rgba(0, 0, 0, 0));
  height: 360px;
  overflow: hidden;
  .img-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 100%;
    height: 100%;
    max-height: 360px;
  }
  .home__carousel-detail {
    position: absolute;
    width: 450px;
    left: 30px;
    color: #fff;
    &.top {
      top: 20px;
    }
    &.bottom {
      bottom: 35px;
    }
    .home__carousel-tip {
      font-size: 14px;
      opacity: 0.6;
      line-height: 20px;
    }
    .home__carousel-title {
      line-height: 28px;
      font-size: 20px;
      margin: 5px 0 10px 0;
      color: #fff;
    }
    .home__carousel-content {
      font-size: 14px;
      line-height: 20px;
      opacity: 0.6;
    }
  }
}
</style>
