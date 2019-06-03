<template>
  <div class="goods-action">
    <van-goods-action>
      <van-goods-action-mini-btn
        :icon="beeIcon.product_detail_icon_shop"
        text="店铺"
      />
      <van-goods-action-mini-btn
        :icon="beeIcon.product_detail_icon_service"
        text="客服"
      />
      <van-goods-action-mini-btn
        :icon="beeIcon.product_detail_icon_shopcart"
        text="购物车"
      />
      <!-- TODO 不可购买 -->
      <van-goods-action-big-btn
        text="加入购物车"
        class="add-cart"
        @click="addShopcartProductData"
      />
      <van-goods-action-big-btn
        text="立即购买"
        class="buy-now"
        @click="confirmOrderData"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { addShopcartProduct } from '@/api/BeeApi/user'
import { confirmOrder } from '@/api/BeeApi/order'

export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        product_detail_icon_shop: require('@/assets/icon/product/product_detail_icon_shop@2x.png'),
        product_detail_icon_service: require('@/assets/icon/product/product_detail_icon_service@2x.png'),
        product_detail_icon_shopcart: require('@/assets/icon/product/product_detail_icon_shopcart@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 加入购物车
    async addShopcartProductData() {
      // TODO 如果未选择，如果初始带着商品属性跳转到商品详情页
      if (!this.$store.state.cart.skuId) {
        this.$toast('请先选择商品规格')
        return false
      }
      const res = await addShopcartProduct({
        sid: this.$store.state.cart.skuId,
        number: this.$store.state.cart.pNumber,
        product_source: 'general'
      })
      this.$toast(res.message)
    },
    // 立即购买
    async confirmOrderData() {
      if (!this.$store.state.cart.skuId) {
        this.$toast('请先选择商品规格')
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
        this.$store.state.order.orderDetail = res.data
        this.$router.push('/category/details/confirmOrder')
      }
    }
  }
}
</script>

<style scoped lang="less">
.goods-action {
  .van-button {
    height: 44px;
    line-height: 44px;
    margin: 3px 0;
  }
  .van-goods-action-mini-btn {
    font-size: 0.2rem;
    color: @Grey2;
  }
  // TODO 两个按钮都有渐变
  .add-cart {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    background: linear-gradient(to right, #ffbd2f, #ffa42f);
    border-color: #ffa42f;
  }
  .buy-now {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    margin-right: 0.08rem;
    background: linear-gradient(to right, #ff8c2f, #f15b26);
    border-color: #ff8c2f;
  }
}
</style>
