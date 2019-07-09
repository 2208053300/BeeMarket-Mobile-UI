<template>
  <div class="goods-action">
    <van-goods-action v-if="commodityData">
      <!-- TODO 不可购买 -->
      <van-goods-action-button
        text="更多豪礼"
        class="add-cart"
        @click="goIndex"
      />
      <van-goods-action-button
        text="我要送礼"
        class="buy-now"
        @click="showSkuPopup(index)"
      />
    </van-goods-action>

    <!-- sku -->
    <Sku :show-sku="showSku" :pid="pid" :props-id="propsId" :p-number="pNumber" :limit-num="limitNum" />
    <!-- 免费送礼弹窗 -->
    <ShowGift :show-gift="showGift" :product="nowProduct" />
  </div>
</template>

<script>
// import { addShopcartProduct, security } from '@/api/BeeApi/user'
// import { confirmOrder } from '@/api/BeeApi/order'
// import { collectProduct, cancelCollect } from '@/api/BeeApi/product'
import Sku from '../../components/Sku'
import ShowGift from '../../components/ShowGift'
export default {
  components: {
    Sku,
    ShowGift
  },
  props: {
    commodityData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // 显示sku
      showSku: false,
      pid: 24746,
      propsId: [],
      pNumber: 0,
      limitNum: 0,
      // 送礼弹框
      showGift: false,
      nowProduct: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.nowProduct = this.commodityData
    console.log('nowProduct', this.nowProduct)
  },
  mounted() {},
  methods: {
    // 更多豪礼 回到免费送礼首页
    goIndex() {
      this.$router.push({
        path: '/'
      })
    },
    // NOTE 点击立即送礼,选择sku,sku 确定获取分享数据
    showSkuPopup(index) {
      console.log(index, 456456456)
      this.showSku = true
      this.nowProduct = this.products[index]
      // this.showGift = true
      console.log('立即送礼')
    }

  }
}
</script>

<style scoped lang="less">
.goods-action {
  .limit-product {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    height: 0.68rem;
    box-sizing: border-box;
    padding: 0.14rem 0.15rem;
    display: flex;
    justify-content: space-between;
    background-color: #fff5e9;
    .img-content {
      width: 1.88rem;
    }
    .now-num {
      font-size: 0.26rem;
      color: @BeeDefault;
      .num {
        font-size: 0.4rem;
        font-weight: bold;
      }
    }
  }
  .van-button {
    height: 44px;
    line-height: 44px;
    margin: 3px 0;
  }
  .van-goods-action-icon {
    font-size: 0.2rem;
    color: @Grey2;
  }
  // TODO 两个按钮都有渐变
  .add-cart {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    background: linear-gradient(to right, #ffbd2f, #ffa42f);
    border-color: #ffa42f;
    color: #ffffff;
  }
  .buy-now {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    margin-right: 0.08rem;
    background: linear-gradient(to right, #ff8c2f, #f15b26);
    border-color: #ff8c2f;
    color: #ffffff;
  }
}
</style>
