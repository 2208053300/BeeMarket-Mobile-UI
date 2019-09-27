<template>
  <div class="free-gift-index">
    <!-- 暂时不要顶部滚动消息 -->
    <div v-if="false" class="head-msg">
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
          我的参与记录 >
        </van-button>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="product-list">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="immediateCheck"
        finished-text="我也是有底线的 o(´^｀)o"
        @load="getIndexData"
      >
        <div v-for="(product, index) in products" :key="index" class="product flex flex-between">
          <img :src="product.tUrl" class="product-img" @click="showDetail(product.pid,product.target)">
          <div class="product-info flex flex-column flex-between">
            <div>
              <p class="product-name no-wrap" @click="showDetail(product.pid,product.target)">
                {{ product.pname }}
              </p>
              <p class="product-desc no-wrap">
                {{ product.product_desc }}
              </p>
              <p class="product-price">
                <span class="sell-price">￥{{ product.sell_price }}</span>
                <span class="line-price">￥{{ product.line_price }}</span>
              </p>
            </div>
            <div class="action flex flex-between align-center">
              <span class="num">满{{ product.lottery_num }}个人开奖</span>
              <van-button round size="mini" @click="showSkuPopup(index,product.pid)">
                立即送礼
              </van-button>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 规则 -->
    <van-popup v-model="showRule" position="bottom" class="rule-box">
      <div class="text-right">
        <img :src="icon.close" alt="" class="close-rule" @click="showRule=false">
      </div>
      <img :src="icon.title" alt="" class="rule-title">
      <div class=" rule-content">
        <h3>一、送礼攻略</h3>
        <p>
          <span>1.1</span>  <span>选择商品，点击“立即送礼”选择礼物并将礼物送给微信好友；</span>
        </p>
        <p>
          <span>1.2</span>  <span>好友点击您的链接并参与抽奖；</span>
        </p>
        <p>
          <span>1.3</span>  <span>在3小时内，参与抽奖人数达到指定人数立刻开奖（随机产生中奖用户）。</span>
        </p>
        <h3>二、活动规则</h3>
        <p>
          <span>2.1</span>  <span>参与抽奖用户必须为“蜂集市”APP新用户，同一设备、微信号、手机号视为同一用户；</span>
        </p>
        <p>
          <span>2.2</span>  <span>每位用户每日可多次参与免费送礼；</span>
        </p>
        <p>
          <span>2.3</span>  <span>若发现用户存在刷单，虚假用户等违规行为，蜂集市友圈判断单次活动无效；</span>
        </p>
        <p>
          <span>2.4</span>  <span>活动完成后“蜂集市”会在48小时内安排发货，用户可登录APP并前往我的订单中查看物流详情；</span>
        </p>
      </div>
    </van-popup>
    <!-- 免费送礼弹窗 -->
    <ShowGift :show-gift="showGift" :product="nowProduct" :sid="sid" />

    <!-- sku -->
    <Sku :show-sku="showSku" :pid="pid" :props-id="propsId" :p-number="pNumber" :limit-num="limitNum" />
  </div>
</template>

<script>
import { getOs } from '@/utils'
import { getIndexData } from '@/api/BeeApi/freeGift'
import Sku from '../components/Sku'
import ShowGift from '../components/ShowGift'
export default {
  metaInfo: {
    title: '免费送礼'
  },
  components: {
    Sku,
    ShowGift
  },
  props: {},
  data() {
    return {
      // 不显示顶部轮播导航
      showIndicators: false,
      // 是否显示规则弹框
      showRule: false,
      // 规则弹框关闭图片
      icon: {
        close: require('@/assets/icon/freeGift/gif_icon_cancel.png'),
        title: require('@/assets/icon/freeGift/gift_pic_title.png')
      },
      // 送礼弹框
      showGift: false,
      nowProduct: {},

      // 显示sku
      showSku: false,
      pid: 0,
      propsId: [],
      pNumber: 0,
      limitNum: 0,

      head_msg: '恭喜小贾送出4个礼盒，',
      loading: false,
      finished: false,
      immediateCheck: true,
      products: [
      ],
      page: 1,
      pageSize: 10,

      // sku_id
      sid: 0,

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
    // this.getIndexData()

    // if (this.osObj.isWx) {
    //   //
    // } else if (this.osObj.isIphone && this.osObj.isApp) {
    //   window.webkit.messageHandlers.showShareIcon.postMessage({ mark: false })
    // } else if (this.osObj.isAndroid && this.osObj.isApp) {
    //   window.beeMarket.showShareIcon(false)
    // } else {
    //   //
    // }
  },
  methods: {
    // 获取商品数据
    async getIndexData() {
      const res = await getIndexData({ page: this.page, pageSize: this.pageSize })
      console.log('首页res：', res)
      this.page++
      this.loading = false
      // this.head_msg = res.data.head_msg
      this.products.push(...res.data)
      if (res.data.length < this.pageSize) {
        this.finished = true
      }
    },

    // NOTE 点击立即送礼,选择sku,sku 确定获取分享数据
    showSkuPopup(index, pid) {
      this.pid = pid
      this.showSku = true
      // this.nowProduct = this.products[index]
      // this.showGift = true
      console.log('立即送礼')
    },
    // 商品详情
    showDetail(pid, target) {
      this.$router.push({
        path: '/detail',
        query: {
          pid,
          target
        }
      })
    }

  }
}
</script>

<style scoped  lang="less">
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
    height: 5.42rem;
    background-color: rgba(255, 167, 32, 0.18);
    background-image: url(../../../assets/icon/freeGift/freegift_home_img_top.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
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
    width: 100%;
    padding: 0.3rem;
    overflow-y: visible;
    box-sizing:border-box;
    background: url(../../../assets/icon/freeGift/gif_pic_bg.png) no-repeat;
    background-size:100% 100%;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    // border-radius: 0.1rem
    .close-rule{width: .48rem;height: .48rem; margin-bottom: 0.2rem}
    .rule-title{
      position: absolute;
      left: 50%;
      top: -0.28rem;
      width: 3.84rem;
      height: .78rem;
      transform: translateX(-50%);
    }
    .rule-content{
      background-color: rgba(255,255,255,.8);
      border-radius: 0.1rem;
      padding: 0.2rem 0.3rem;
      h3{
        color: #FFA42F;
        font-size:0.36rem;
      }

      p{
        display: flex;
        padding-left: 0.4rem;
      span:nth-of-type(1){
        font-weight: 600;
        margin-right: 0.1rem;
      }

        margin: 0.1rem 0;
        font-size: 0.28rem;
        color: #333;
        line-height: 1.5;
      }
    }
  }

}
</style>
