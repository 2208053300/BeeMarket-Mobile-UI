<template>
  <div class="pay-result">
    <div class="result-card">
      <span class="result-text1">代付成功</span>
      <div class="pay-money">
        ￥<span class="money-text">100</span>
      </div>
      <span class="result-text2">【您已为好友在代付成，去选选自己心仪的商品吧】</span>
      <div class="action-button">
        <div class="action1">
          关注公众号
        </div>
        <div class="action2">
          逛逛蜂集市
        </div>
      </div>
      <div class="product-detail">
        <p class="detail-title">
          代付商品订单信息
        </p>
      </div>
    </div>
    <bee-guess />
  </div>
</template>

<script>
import BeeGuess from '@/components/BeeGuess'

export default {
  components: {
    BeeGuess
  },
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
.pay-result {
  margin-top: 56px;
  .result-card {
    border-radius: 0.2rem;
    background-color: #fff;
    padding: 0.4rem 0.2rem 0.5rem;
    text-align: center;
    .pay-money {
      margin: 0.2rem 0;
      font-size: 0.28rem;
      color: @BeeDefault;
      .money-text {
        font-size: 0.5rem;
      }
    }
    .result-text2 {
      font-size: 0.22rem;
      color: @Grey2;
    }
    .action-button {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      font-size: 0.32rem;
      text-align: center;
      margin: 0.5rem 0;
      .action1 {
        color: @Grey1;
        border-right: 0.02rem solid @Grey7;
      }
      .action2 {
        color: @BeeDefault;
      }
    }
    .product-detail {
      background-color: @GreyBg;
      border-radius: 0.1rem;
      padding: 0.3rem 0.2rem;
      text-align: left;
      p {
        padding: 0;
        margin: 0;
      }
      .detail-title {
        font-size: 0.28rem;
      }
    }
  }
}
</style>
