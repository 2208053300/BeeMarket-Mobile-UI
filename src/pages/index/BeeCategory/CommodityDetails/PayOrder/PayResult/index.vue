<template>
  <div class="pay-result">
    <div class="result-container">
      <div class="result-card">
        <p class="result">
          付款成功
        </p>
        <p class="money">
          <span>￥</span>{{ payResult.pay_amount }}
        </p>
        <div class="option">
          <span class="see-order" @click="checkOrder">查看订单</span>
          <span style="color: #c9c9c9">|</span>
          <span class="go-category" @click="goCategory">继续逛逛</span>
        </div>
      </div>
    </div>
    <div class="charity">
      <img
        :src="require('@/assets/icon/order/confirmorder_pay_result_value@2x.png')"
        style="width: 0.46rem;height: 0.46rem;margin-right: 0.16rem"
      >
      确认收货后，本次消费将获得<span>{{ payResult.charity_value_get }}</span>公益值
    </div>
  </div>
</template>

<script>
import { payResult } from '@/api/BeeApi/order'
export default {
  metaInfo: {
    title: '付款结果'
  },
  components: {},
  props: {},
  data() {
    return {
      payResult: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getPayResult()
  },
  methods: {
    async getPayResult() {
      const res = await payResult({
        trade_no: this.$route.query.trade_no
      })
      this.payResult = res.data
    },
    // 去商品分类
    goCategory() {
      this.$router.replace('/category')
    },
    // 查看订单
    checkOrder() {
      if (this.payResult.check_to === 'list') {
        this.$router.replace('/persion/order')
      } else {
        this.$router.replace({
          path: '/persion/order/orderDetail',
          query: { order_no: this.payResult.order_no }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.pay-result {
  p {
    margin: 0;
  }
  .result-container {
    padding: 0.2rem 0.3rem 0.28rem 0.3rem;
    .result-card {
      background: white;
      border-radius: 0.2rem;
      text-align: center;
      padding: 0.4rem;
      .result {
        color: @Grey12;
        font-size: 0.24rem;
      }
      .money {
        margin-top: 0.2rem;
        color: @BeeDefault3;
        font-size: 0.5rem;
        span {
          font-size: 0.3rem;
        }
      }
      .option {
        margin-top: 0.56rem;
        width: 100%;
        display: flex;
        font-size: 0.28rem;
        .see-order {
          flex-grow: 1;
          color: @Grey12;
        }
        .go-category {
          flex-grow: 1;
          color: @BeeDefault3;
        }
      }
    }
  }
  .charity {
    display: flex;
    align-items: center;
    vertical-align: center;
    padding: 0 0.72rem;
    font-size: 0.28rem;
    color: @Grey1;
    span {
      margin: 0 0.1rem;
      color: @BeeDefault3;
    }
  }
}
</style>
