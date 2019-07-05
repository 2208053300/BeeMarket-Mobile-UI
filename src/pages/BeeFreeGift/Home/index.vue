<template>
  <div class="free-gift-index">
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
    <div class="header">
      <div class="rule" @click="showRule = true">
        活动规则
      </div>
      <div class="history-btn">
        <van-button round :to="{path: 'history'}">
          我的送礼记录 >
        </van-button>
      </div>
    </div>
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
              <van-button round size="mini" @click="giveGift">
                立即送礼
              </van-button>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 规则 -->
    <van-popup v-model="showRule" class="rule-box">
      <div class=" bg-white">
        <p>  规则弹框</p>
        <p>  规则弹框</p>
        <p>  规则弹框</p>
        <p>  规则弹框</p>
        <p>  规则弹框</p>
      </div>
    </van-popup>
    <!-- 免费送礼弹窗 -->
    <van-popup v-model="showGift" class="gift-box">
      <div class="bg-white">
        <p>  送礼</p>
        <p>  送礼</p>
        <p>  送礼</p>
        <p>  送礼</p>
        <p>  送礼</p>
      </div>
      <img :src="icon.closeImg" class="close-img" @click="showGift = false">
    </van-popup>

    <!-- 微信分享提示遮罩 -->
    <van-popup v-model="showWxTip" class="share-tip-box" position="top">
      <img :src="icon.shareTipImg" class="share-tip-img">
    </van-popup>

    <!-- sku -->
    <Sku />
  </div>
</template>

<script>
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
import { getUID } from '@/api/BeeApi/user'
import { getIndexData } from '@/api/BeeApi/freeGift'
import Sku from '../components/Sku'
export default {
  metaInfo: {
    title: '免费送礼'
  },
  components: {
    Sku
  },
  props: {},
  data() {
    return {
      // 不显示顶部轮播导航
      showIndicators: false,
      // 是否显示规则弹框
      showRule: false,

      // 送礼弹框
      showGift: false,
      // 微信分享提示
      showWxTip: false,

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
      osObj: getOs()
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

    // NOTE 点击立即送礼,选择sku
    giveGift() {
      this.showGift = true
      console.log('立即送礼')
    },

    // NOTE 邀请好友抢礼物 调用app、微信分享
    appShare() {
      if (this.osObj.isWx) {
        this.loadUID()
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: this.activity.share_data.title,
          desc: this.activity.share_data.desc,
          img_path: this.activity.share_data.img,
          // 地址应该放 web 站 网页
          url: this.activity.share_data.link
          // url: this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          this.activity.share_data.title,
          this.activity.share_data.desc,
          this.activity.share_data.img,
          this.activity.share_data.link,
          // this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        )
      } else {
        //
      }
    },

    // 微信分享
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: this.activity.share_data.title,
        desc: this.activity.share_data.desc,
        imgUrl: this.activity.share_data.img,
        link: this.activity.share_data.link
      })
    }

  }
}
</script>

<style scoped lang="less">
.free-gift-index {
  p {
    margin: 0;
  }
  .head-msg {
    background: #ffbd2f;
    padding: 0 0.3rem;
  }
  .swiper{height: 0.6rem; line-height: 0.6rem; font-size: 0.26rem; color: #333;}
  .header {
    position: relative;
    height: 200px;
    background: rgba(255, 167, 32, 0.18);
    .rule {
      font-size: 0.24rem;
      color: white;
      position: absolute;
      right: 0;
      top: 10px;
      background: #ffbd2f;
      padding: 0 10px;
      height: 0.44rem;
      line-height: 0.44rem;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
    }
    .history-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 0.2rem;

      .van-button {
        background: #ffbd2f;
        color: white;
        height: 0.44rem;
        line-height: 0.4rem;
        font-size: 0.26rem;
        padding: 0 0.3rem;
        // box-shadow:0px 2px 2px 0px rgba(220,219,218,0.85);
      }
    }
  }
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
  .rule-box{
    width: 5.6rem;
    padding: 0.3rem;
    border-radius: 0.1rem
  }
  .gift-box{
    width: 5.6rem;
    overflow-y: visible;
    .close-img{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: -0.5rem;
      right: 0;
    }
  }
}
</style>
