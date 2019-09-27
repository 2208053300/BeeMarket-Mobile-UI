<template>
  <div class="pay-order">
    <bee-header />
    <div class="pay-header">
      <div class="header-title">
        礼包金额
      </div>
      <div class="pay-amount">
        ￥ {{ order.payInfo.pay_amount }}
      </div>
      <img class="desc" :src="require('@/assets/icon/giftPackage/farm_pic_description.png')">
    </div>
    <div
      v-if="order.payInfo.pay_methods"
      class="pay-methods"
    >
      <van-cell-group>
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
      </van-cell-group>
    </div>
    <div class="pay-done">
      <van-button
        class="doneBtn"
        round
        @click="pay"
      >
        确认付款
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { orderPay } from '@/api/BeeApi/order'
// import wx from 'weixin-js-api'
// import wxApi from '@/utils/wxapi'
import { GetRequest } from '@/utils/index'
import BeeHeader from './components/header'
// 导入余额支付组件
import goPayFromPayInfo from './goPayFromPayInfo'
export default {
  components: { BeeHeader },
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
      payMethod: 'wxpay'
    }
  },
  computed: {
    ...mapState(['order'])
  },
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = false
    const query = this.$route.query
    this.order.payInfo = {
      balance: parseInt(query.balance),
      count_down: query.count_down,
      pay_amount: query.pay_amount,
      pay_methods: {
        alipay: query.alipay === 'true',
        blpay: query.blpay === 'true',
        wxpay: query.wxpay === 'true'
      },
      trade_no: query.trade_no
    }
  },
  methods: {
    // 开始支付
    pay() {
      if (!this.payMethod) {
        this.$toast('请选择支付方式')
      }
      if (this.payMethod === 'wxpay') {
        this.wxPay(GetRequest('code'))
      }
    },
    async wxPay(code) {
      // 获取微信支付信息
      let res
      try {
        res = await orderPay({
          trade_no: this.order.payInfo.trade_no,
          pay_method: 'wxpay',
          pay_type: 'JSAPI',
          code: code
        })
      } catch (e) {
        this.$toast('支付失败:' + JSON.stringify(e))
      }
      const params = res.data.params
      const _this = this
      // eslint-disable-next-line
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: params.appId, // 公众号名称，由商户传入
          timeStamp: params.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: params.nonceStr, // 随机串
          package: params.package,
          signType: params.signType, // 微信签名方式：
          paySign: params.paySign // 微信签名
        },
        function(res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            _this.toResult()
          } else {
            // 支付失败，重新加载本页面
            goPayFromPayInfo(_this.order.payInfo)
          }
        }
      )
    },
    // 查看付款结果
    toResult() {
      this.$route.replace({ name: 'buySuccess' })
    }
  }
}
</script>

<style scoped lang="less">
.pay-order {
  padding-top: 46px;
  .pay-header {
    margin: 0.32rem;
    padding: 0 0.32rem 0.6rem;
    background-color: #fff;
    border-radius: 0.2rem;
    .header-title {
      padding-top: 0.6rem;
      font-size: 0.28rem;
      color: #666666;
      text-align: center;
    }
    .pay-amount {
      margin-top: 0.32rem;
      color: #333333;
      text-align: center;
      font-size: 0.56rem;
      font-weight: bold;
    }
    .desc {
      margin-top: 0.6rem;
      width: 100%;
      height: auto;
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
  .pay-done {
    position: fixed;
    bottom: 0.3rem;
    text-align: center;
    width: 100%;
    .doneBtn {
      width: 6rem;
      font-size: 0.3rem;
      color: #fff;
      background-color: @BeeDefault;
      box-shadow: 0 5px 10px #e2e2e2;
    }
  }
}
</style>
