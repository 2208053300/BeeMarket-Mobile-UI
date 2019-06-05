<template>
  <div class="bee-replace">
    <replace-header />
    <div class="pay-money">
      <span>需代付金额</span>
      <div class="monery-text">
        ￥100.00
      </div>
    </div>
    <commodity-list />
    <div class="pay-explain">
      <p class="explain-title">
        代付说明
      </p>
      <p class="explain-text">
        1.朋友代付前请和朋友提前确认
      </p>
      <p class="explain-text">
        2.如果申请退款并通过，已支付金额将原路返回至付款人
      </p>
    </div>
    <div class="wx-pay">
      <div
        class="pay-button"
        @click="payAction"
      >
        <img
          :src="beeIcon.confirmorder_wait_pay_btn_wechat"
          alt="微信支付"
        >
      </div>
    </div>
  </div>
</template>

<script>
import replaceHeader from './components/replaceHeader'
import commodityList from './components/commodityList'

export default {
  components: {
    replaceHeader,
    commodityList
  },
  props: {},
  data() {
    return {
      beeIcon: {
        confirmorder_wait_pay_btn_wechat: require('@/assets/icon/order/confirmorder_wait_pay_btn_wechat@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    payAction() {
      this.$router.push('/payResult')
    }
  }
}
</script>

<style scoped lang="less">
.bee-replace {
  margin-top: 56px;
  .pay-money {
    font-size: 0.28rem;
    height: 1.12rem;
    line-height: 1.12rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.3rem;
    background-color: #fff;
    margin: 0.2rem 0;
    .monery-text {
      font-size: 0.32rem;
      color: @BeeDefault3;
    }
  }
  .pay-explain {
    padding: 0.4rem;

    p {
      padding: 0;
      margin: 0;
    }
    .explain-title {
      font-size: 0.28rem;
    }
    .explain-text {
      font-size: 0.24rem;
      color: @Grey2;
    }
  }
  .wx-pay {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.2rem;
    box-sizing: border-box;
    border-top: 0.02rem solid @Grey7;
    line-height: 1.2rem;
    border-right-color: @Grey10;
    .pay-button {
      height: 0.88rem;
      width: 6.86rem;
      margin: auto;
    }
  }
}
</style>
