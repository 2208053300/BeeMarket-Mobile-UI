<template>
  <div class="goods-action">
    <van-goods-action>
      <van-goods-action-mini-btn
        icon="shop-o"
        text="店铺"
      />
      <van-goods-action-mini-btn
        icon="chat-o"
        text="客服"
      />
      <van-goods-action-mini-btn
        info="5"
        icon="cart-o"
        text="购物车"
      />
      <!-- TODO 不可购买 -->
      <van-goods-action-big-btn
        text="加入购物车"
        class="add-cart"
      />
      <van-goods-action-big-btn
        primary
        text="立即购买"
        class="buy-now"
        to="/category/details/confirmOrder"
      />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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

<style scoped lang="less">
.goods-action {
  .van-button {
    height: 44px;
    line-height: 44px;
    margin: 3px 0;
  }
  // TODO 两个按钮都有渐变
  .add-cart {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  .buy-now {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    margin-right: 0.08rem;
  }
}
</style>
