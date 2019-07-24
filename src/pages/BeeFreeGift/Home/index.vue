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
          我的送礼记录 >
        </van-button>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="product-list">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
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
    <ShowGift :show-gift="showGift" :product="nowProduct" :sid="sid" />

    <!-- sku -->
    <Sku :show-sku="showSku" :pid="pid" :props-id="propsId" :p-number="pNumber" :limit-num="limitNum" />
  </div>
</template>

<script>

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
      products: [
      ],
      page: 1,
      pageSize: 10,

      // sku_id
      sid: 0

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getIndexData()
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
    width: 5.6rem;
    padding: 0.3rem;
    border-radius: 0.1rem
  }

}
</style>
