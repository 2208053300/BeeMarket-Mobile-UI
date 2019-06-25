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
          clickable
          @click="payMethod = 'blpay'"
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
              余额支付<span class="balance">￥{{ order.payInfo.balance }}</span>
            </div>
          </div>
          <div class="check-method">
            <div class="check-img">
              <img
                v-if="payMethod === 'blpay'"
                :src="beeIcon.confirmorder_pay_icon_select"
                alt="选中"
              >
            </div>
          </div>
        </van-cell>
        <van-cell
          v-if="order.payInfo.pay_methods.wxpay"
          class="pay-method"
          clickable
          @click="payMethod='wxpay'"
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
                v-if="payMethod === 'wxpay'"
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
      <van-button class="doneBtn" round @click="pay">
        确认付款
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { repayOrder } from '@/api/BeeApi/user'
import { orderPay } from '@/api/BeeApi/order'
import wx from 'weixin-js-sdk'
import wxApi from '@/utils/wxapi'
import { getOs } from '@/utils/index'

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
      timer: '',
      payMethod: ''
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
    if (this.order.payInfo.pay_methods) {
      this.setTimer()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // 获取支付信息
    async getPayInfo(orderNo) {
      const res = await repayOrder({ order_no: orderNo })
      this.order.payInfo = res.data
      this.setTimer()
    },
    // 设置倒计时
    setTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.order.payInfo.count_down--
        if (this.order.payInfo.count_down === 0) {
          clearInterval(this.timer)
          this.$dialog.alert({
            message: '订单超时未支付，已自动关闭'
          }).then(() => {
            this.$router.back()
          })
        }
      }, 1000)
    },
    // 获取时分秒
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
    // 数字自动补0，2位
    prefixInteger(num) {
      num = parseInt(num)
      return (Array(2).join('0') + num).slice(-2)
    },
    // 开始支付
    pay() {
      // 检查是否选择支付方式
      if (!this.payMethod) {
        this.$toast('请选择支付方式')
      }
      if (this.payMethod === 'wxpay') {
        this.readWxPay()
      }
    },
    // 准备微信支付
    readWxPay() {
      if (getOs().isWx) {
        // 初始化微信api
        wxApi.wxRegister(this.wxPay)
      }
    },
    async wxPay() {
      // 获取微信支付信息
      const res = await orderPay({
        trade_no: this.order.payInfo.trade_no,
        pay_method: 'wxpay'
      })
      const params = res.data.params
      wx.chooseWXPay({
        timestamp: params.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
        package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: params.paySign, // 支付签名
        success(res) {
          if (res.errMsg === 'chooseWXPay:ok') {
            this.toResult()
          } else {
            this.$toast('支付失败')
          }
        },
        cancel(res) {
          this.$toast('用户取消支付~')
        },
        fail(res) {
          this.$toast('支付失败~')
        }
      })
    },
    // 查看付款结果
    toResult() {
      this.$router.push({
        name: 'payResult',
        query: {
          trade_no: this.order.payInfo.trade_no
        }
      })
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
          display: flex;
          align-items: center;
          font-size: 0.32rem;
          .overage {
            color: @Grey1;
            .grey-text2 {
              display: block;
              font-size: 0.22rem;
            }
          }
          .balance {
            color: @Grey1;
            font-size: 0.22rem;
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
    position: fixed;
    bottom: 0.3rem;
    text-align: center;
    width: 100%;
    .doneBtn{
      width: 6rem;
      font-size: 0.3rem;
      color: #fff;
      background-color: @BeeDefault;
      box-shadow: 0 5px 10px #e2e2e2;
    }
  }
}
</style>
