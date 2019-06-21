<template>
  <div class="goods-action">
    <div
      v-if="commodityData.remaining"
      class="limit-product"
    >
      <div class="img-content">
        <img
          :src="beeIcon.product_detail_pic_grab"
          alt="限量蜂抢"
        >
      </div>
      <div class="now-num">
        仅剩 <span class="num">{{ commodityData.remaining }}</span> 件
      </div>
    </div>
    <van-goods-action v-if="commodityData">
      <van-goods-action-icon
        :icon="beeIcon.product_detail_icon_shop"
        text="店铺"
        @click="goStore(commodityData.mid)"
      />
      <van-goods-action-icon
        :icon="commodityData.favor?beeIcon.product_detail_icon_attention_d:beeIcon.product_detail_icon_attention_n"
        text="收藏"
        @click="handleFollow"
      />
      <van-goods-action-icon
        :icon="beeIcon.product_detail_icon_shopcart"
        text="购物车"
        @click="$router.push('/cart')"
      />
      <!-- TODO 不可购买 -->
      <van-goods-action-button
        text="加入购物车"
        class="add-cart"
        :disabled="!!$store.state.cart.skuId"
        @click="addShopcartProductData"
      />
      <van-goods-action-button
        text="立即购买"
        class="buy-now"
        :disabled="!!$store.state.cart.skuId"
        @click="confirmOrderData"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { addShopcartProduct } from '@/api/BeeApi/user'
import { confirmOrder } from '@/api/BeeApi/order'
import { collectProduct, cancelCollect } from '@/api/BeeApi/product'

export default {
  components: {},
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
      beeIcon: {
        product_detail_icon_shop: require('@/assets/icon/product/product_detail_icon_shop@2x.png'),
        product_detail_icon_attention_n: require('@/assets/icon/product/product_detail_icon_attention_n@2x.png'),
        product_detail_icon_attention_d: require('@/assets/icon/product/product_detail_icon_attention_d@2x.png'),
        product_detail_icon_shopcart: require('@/assets/icon/product/product_detail_icon_shopcart@2x.png'),
        product_detail_pic_grab: require('@/assets/icon/product/product_detail_pic_grab@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goStore(mid) {
      this.$router.push({
        path: '/category/store',
        query: {
          mid: mid
        }
      })
    },
    async handleFollow() {
      if (this.commodityData.favor) {
        const res = await cancelCollect({
          content_ids: this.commodityData.pid,
          type: 1
        })
        this.commodityData.favor = 0
        this.$toast(res.message)
      } else {
        const res = await collectProduct({
          contentId: [this.commodityData.pid],
          type: 1
        })
        this.commodityData.favor = 1
        this.$toast(res.message)
      }
    },
    // 加入购物车
    async addShopcartProductData() {
      // TODO 如果未选择，如果初始带着商品属性跳转到商品详情页
      if (!this.$store.state.cart.skuId) {
        this.$toast('请先选择商品规格')
        this.$store.state.cart.showSku = true
        return false
      }
      const res = await addShopcartProduct({
        sid: this.$store.state.cart.skuId,
        number: this.$store.state.cart.pNumber,
        product_source: 'general'
      })
      this.$store.state.cart.skuId = 0
      this.$toast(res.message)
    },
    // 立即购买
    async confirmOrderData() {
      if (!this.$store.state.cart.skuId) {
        this.$toast('请先选择商品规格')
        this.$store.state.cart.showSku = true
        return false
      }
      const res = await confirmOrder(
        JSON.stringify({
          product: {
            sid: this.$store.state.cart.skuId,
            number: this.$store.state.cart.pNumber
          }
        })
      )
      if (res.status_code === 200) {
        this.$store.state.cart.skuId = 0
        this.$store.state.order.orderDetail = res.data
        this.$store.state.order.addrDetail = res.data.addr
        this.$router.push('/category/details/confirmOrder')
      }
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
