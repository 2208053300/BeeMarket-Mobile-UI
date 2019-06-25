<template>
  <div class="pay-order">
    <div class="pay-header">
      <div class="header-title">
        <span>剩余支付时间</span>
        <div class="countDown">
          <div class="time-text">
            {{ getTimes(order.payInfo.count_down)[0] }}
          </div>时
          <div class="time-text">
            {{ getTimes(order.payInfo.count_down)[1] }}
          </div>分
          <div class="time-text">
            {{ getTimes(order.payInfo.count_down)[2] }}
          </div>秒
        </div>
      </div>
      <div class="pay-amount">
        ￥ {{ order.payInfo.pay_amount }}
      </div>
    </div>
    <div v-if="order.payInfo.pay_methods" class="pay-methods">
      <van-cell-group>
        <van-cell
          v-if="order.payInfo.pay_methods.blpay"
          class="pay-method"
        >
          <div
            slot="title"
            class="method-title"
          >
            <div class="method-img">
              <img
                :src="beeIcon.confirmorder_pay_icon_overage_normat"
                alt="余额支付"
              >
            </div>
            <div class="method-name">
              余额支付<span>剩余￥{{ order.payInfobalance }}</span>
            </div>
          </div>
          <div class="check-method">
            <div class="check-img">
              <img
                :src="beeIcon.confirmorder_pay_icon_select"
                alt="选中"
              >
            </div>
          </div>
        </van-cell>
        <van-cell
          v-if="order.payInfo.pay_methods.wxpay"
          class="pay-method"
        >
          <div
            slot="title"
            class="method-title"
          >
            <div class="method-img">
              <img
                :src="beeIcon.confirmorder_pay_icon_wechat"
                alt="微信支付"
              >
            </div>
            <div class="method-name">
              微信支付
            </div>
          </div>
          <div class="check-method">
            <div class="check-img">
              <img
                :src="beeIcon.confirmorder_pay_icon_select"
                alt="选中"
              >
            </div>
          </div>
        </van-cell>
        <van-cell
          v-if="order.payInfo.pay_methods.alipay"
          class="pay-method"
        >
          <div
            slot="title"
            class="method-title"
          >
            <div class="method-img">
              <img
                :src="beeIcon.confirmorder_pay_icon_alipay"
                alt="支付宝支付"
              >
            </div>
            <div class="method-name">
              支付宝支付
            </div>
          </div>
          <div class="check-method">
            <div class="check-img">
              <img
                :src="beeIcon.confirmorder_pay_icon_select"
                alt="选中"
              >
            </div>
          </div>
        </van-cell>
        <van-cell
          v-if="!order.payInfo.pay_methods.blpay"
          class="pay-method"
        >
          <div
            slot="title"
            class="method-title"
          >
            <div class="method-img">
              <img
                :src="beeIcon.confirmorder_pay_icon_overage_disabled"
                alt="余额支付"
              >
            </div>
            <div class="method-name">
              <div class="overage">
                <span class="grey-text">
                  余额支付
                </span>
                <span class="grey-text2">
                  余额不足
                </span>
              </div>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="pay-done">
      <van-button class="doneBtn">
        确认付款
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { repayOrder } from '@/api/BeeApi/user'
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        confirmorder_pay_icon_select: require('@/assets/icon/order/confirmorder_pay_icon_select@2x.png'),
        confirmorder_pay_icon_wechat: require('@/assets/icon/order/confirmorder_pay_icon_wechat@2x.png'),
        confirmorder_pay_icon_alipay: require('@/assets/icon/order/confirmorder_pay_icon_alipay@2x.png'),
        confirmorder_pay_icon_overage_normat: require('@/assets/icon/order/confirmorder_pay_icon_overage_normat@2x.png'),
        confirmorder_pay_icon_overage_disabled: require('@/assets/icon/order/confirmorder_pay_icon_overage_disabled@2x.png')
      },
      timer: ''
    }
  },
  computed: {
    ...mapState(['order'])
  },
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    const orderNo = this.$route.query.orderNo
    if (orderNo) {
      this.getPayInfo(orderNo)
    }
  },
  methods: {
    // TODO 切分时间，样式每个数字切分,countUp.js
    getTime() {},
    // 获取支付信息
    async getPayInfo(orderNo) {
      const res = await repayOrder({ order_no: orderNo })
      this.order.payInfo = res.data
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.order.payInfo.count_down--
        if (this.order.payInfo.count_down === 0) {
          clearInterval(this.timer)
          // TODO:提示超时未支付
        }
      }, 1000)
    },
    getTimes(value) {
      var theTime = parseInt(value) // 秒
      var theTime1 = 0 // 分
      var theTime2 = 0 // 小时
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        // alert(theTime1+"-"+theTime);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60)
          theTime1 = parseInt(theTime1 % 60)
        }
      }
      return [
        this.prefixInteger(theTime2),
        this.prefixInteger(theTime1),
        this.prefixInteger(theTime)]
    },
    prefixInteger(num) {
      num = parseInt(num)
      return (Array(2).join('0') + num).slice(-2)
    }
  }
}
</script>

<style scoped lang="less">
.pay-order {
  .pay-header {
    margin: 0.32rem;
    padding: 0.32rem 0.2rem 0;
    background-color: #fff;
    border-radius: 0.2rem;
    .header-title {
      font-size: 0.24rem;
      color: @Grey2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 0.28rem;
      border-bottom: 0.02rem solid @Grey7;
      .countDown {
        display: flex;
        align-items: flex-end;
        font-size: 0.2rem;
        .time-text {
          margin-left: 0.05rem;
          margin-right: 0.08rem;
          border-radius: 0.08rem;
          display: inline-block;
          background-color: @BeeDefault;
          font-size: 0.4rem;
          padding: 0.1rem;
          color: #fff;
        }
      }
    }
    .pay-amount {
      height: 1.32rem;
      line-height: 1.32rem;
      text-align: center;
      font-size: 0.56rem;
      color: @Grey2;
      font-weight: bold;
    }
  }
  .pay-methods {
    .pay-method {
      padding: 0.3rem 0.3rem 0.3rem 0.24rem;
      .method-title {
        display: flex;
        align-items: center;
        .method-name {
          font-size: 0.32rem;
          .overage {
            color: @Grey1;
            .grey-text2 {
              display: block;
              font-size: 0.22rem;
            }
          }
        }
        .method-img {
          height: 0.5rem;
          width: 0.5rem;
          margin-right: 0.16rem;
        }
      }
      .check-method {
        display: flex;
        justify-content: flex-end;
        .check-img {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
    }
  }
  .pay-done{
    .doneBtn{
      font-size: 0.3rem;
      color: #fff;
      background-color: @BeeDefault;
    }
  }
}
</style>
