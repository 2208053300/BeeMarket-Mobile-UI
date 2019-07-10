<template>
  <div
    class="header-banner"
    :style="{backgroundImage:'url('+$store.state.app.defaultImg3+')'}"
  >
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="(item, index) in homeData.banner"
        :key="index"
        @touchmove="isMove=true"
        @touchend="goPage(item)"
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
// const urlParse = require('url-parse')
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
    return {
      isMove: false // 轮播图触摸事件是否为移动
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 根据banner类型打开指定页面
    goPage(banner) {
      if (this.isMove) {
        this.isMove = false
        return
      }
      const bannerHandlers = {
        1: this.goAction,
        2: this.goArticle,
        3: this.goWebPage,
        4: this.goProduct,
        5: this.goPublicWelfareAction,
        6: this.goGiftPackage
      }
      bannerHandlers[banner.type](banner)
    },
    // 打开活动
    goAction(banner) {
      // const pathname = urlParse(banner.url).pathname
      this.$router.push({
        path: '/beeActiveTpl',
        query: {
          id: banner.plan_id
        }
      })
    },
    // 打开文章
    goArticle(banner) {
      this.$router.push(`/discover/article/${banner.article_id}`)
    },
    // 打开网页
    goWebPage(banner) {
      window.location.href = banner.url
    },
    // 打开商品详情页
    goProduct(banner) {
      this.$router.push({
        path: '/category/details',
        query: {
          pid: banner.product_id
        }
      })
    },
    // 打开公益行动
    goPublicWelfareAction(banner) {
      this.$router.push({
        path: '/discover/action',
        query: {
          id: banner.action_id
        }
      })
    },
    // 打开农礼包
    goGiftPackage(banner) {
      this.$router.push('/beeGiftPackage')
    }
  }
}
</script>

<style lang="less">
.header-banner {
  margin: 0.2rem 0.3rem 0;
  border-radius: 0.16rem;
  overflow: hidden;
  height: 2.8rem;
  background-size: 100% 100%;
  .van-swipe {
    .van-swipe-item {
      background-color: @Grey2;
      height: 2.8rem !important;
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
