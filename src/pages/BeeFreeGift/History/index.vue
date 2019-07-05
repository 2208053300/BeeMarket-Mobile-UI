<template>
  <div class="free-gift-history">
    <div class="head-msg">
      <van-swipe :autoplay="3000" :show-indicators="showIndicators" vertical class="swiper">
        <van-swipe-item class="no-wrap">
          {{ head_msg }}
        </van-swipe-item>
        <van-swipe-item class="no-wrap">
          {{ head_msg }}
        </van-swipe-item>
        <van-swipe-item class="no-wrap">
          {{ head_msg }}
        </van-swipe-item>
      </van-swipe>
    </div>
    <p class="title">
      送礼记录
    </p>
    <div class="product-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的 o(´^｀)o"
        @load="getIndexData"
      >
        <div v-for="(product, index) in products" :key="index" class="product flex flex-between">
          <img :src="product.tUrl" class="product-img">
          <div class="product-info flex flex-column flex-between">
            <div>
              <p class="product-name no-wrap">
                {{ product.name }}
              </p>
              <p class="product-desc no-wrap">
                {{ product.desc }}
              </p>
              <p class="product-price">
                <span class="sell-price">￥{{ product.sell_price }}</span>
                <span class="line-price">￥{{ product.line_price }}</span>
              </p>
            </div>
            <div class="action flex flex-between">
              <span class="num">满5个人开奖</span>
              <van-button round size="mini" @click="showSkuPopup">
                立即送礼
              </van-button>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
import { getUID } from '@/api/BeeApi/user'
import { getIndexData } from '@/api/BeeApi/freeGift'
export default {
  metaInfo: {
    title: '送礼记录'
  },
  components: {

  },
  props: {},
  data() {
    return {
      // 不显示顶部轮播导航
      showIndicators: false,
      head_msg: '',
      loading: false,
      finished: false,
      products: [],
      page: 1,
      pageSize: 10,
      // 图标
      icon: {
        closeImg: require('@/assets/icon/freeGift/bee_firends_invite_icon_off.png'),
        shareTipImg: require('@/assets/icon/share/guide1.png')
      },
      // 获取 os 平台
      osObj: getOs(),

      // 分享数据
      share_data: {
        title: '',
        desc: '',
        img_path: '',
        url: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getIndexData()

    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.appShare
  },
  methods: {
    // 获取商品数据
    async getIndexData() {
      const res = await getIndexData()
      this.page++
      this.loading = false
      this.head_msg = res.data.head_msg
      this.products.push(...res.data.products)
      if (res.data.products.length < this.pageSize) {
        this.finished = true
      }
    },

    // 微信分享
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: this.share_data.title,
        desc: this.share_data.desc,
        imgUrl: this.share_data.img,
        link: this.share_data.link
      })
    }

  }
}
</script>

<style scoped  lang="less">
.free-gift-history {
  p {
    margin: 0;
  }
  .head-msg {
    background: #ffbd2f;
    padding: 0 0.3rem;
  }
  .swiper{height: 0.6rem; line-height: 0.6rem; font-size: 0.26rem; color: #333;}

  .product-list {
    padding: 15px;
    .product {
      background-color: white;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 10px;
      .product-img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.1rem;
      }
      .product-info {
        width:3.66rem;
        .product-name {
          margin-top: 10px;
          font-size: 0.26rem;
        }
        .product-desc {
          font-size: 0.2rem;
          color: #999;
          margin-top: 10px;
        }
        .product-price {
          margin-top: 10px;
        }
        .sell-price{ font-size: 0.26rem;color:@BeeDefault; margin-right: .1rem;}
        .line-price{ font-size: 0.22rem;color:#999; text-decoration: line-through}
      }
      .action{
        .num{font-size: .22rem; color: @BeeDefault;}
        .van-button{font-size: .22rem; color:#fff; background-color: @BeeDefault; padding: 0 0.3rem;}
      }
    }
  }

}

</style>
