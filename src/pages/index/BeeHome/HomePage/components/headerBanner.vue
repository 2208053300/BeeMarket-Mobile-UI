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
        @click="goPage(item)"
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
const urlParse = require('url-parse')
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
  methods: {
    // 根据banner类型打开指定页面
    goPage(banner) {
      const bannerHandlers = {
        1: this.goAction,
        2: this.goArticle,
        3: this.goWebPage,
        4: this.goProduct,
        5: this.goPublicWelfareAction
      }
      bannerHandlers[banner.type](banner)
    },
    // 打开活动
    goAction(banner) {
      const pathname = urlParse(banner.url).pathname
      const urlMap = {
        '/beeActiveTpl': 'activeTpl'
      }
      this.$router.push({
        path: urlMap[pathname],
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
    }
  }
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
