<template>
  <div class="header-banner">
    <van-swipe
      :autoplay="3000"
      :height="170"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="(item, index) in homeData.banner"
        :key="index"
      >
        <img
          :src="item.show_img"
          :alt="item.url"
        >
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    homeData: {
      type: Object,
      default: () => {
        return {
          banner: []
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less">
.header-banner {
  margin: 0.2rem 0.3rem;
  border-radius: 0.2rem;
  overflow: hidden;
  height: 3.1rem;
  .van-swipe {
    .van-swipe-item {
      background-color: @Grey2;
    }
    .van-swipe__indicators {
      .van-swipe__indicator {
        width: 0.2rem;
        border-radius: 0.08rem;
      }
      .van-swipe__indicator--active {
        width: 0.3rem;
        border-radius: 0.1rem;
      }
    }
  }
}
</style>
