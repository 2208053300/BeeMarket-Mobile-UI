<template>
  <div class="pay-success">
    <div class="result text-center">
      <img :src="beeIcon.tipImg" class="tip-img">
      <p class="tip-txt">
        付款成功
      </p>
      <p class="price">
        ￥ {{ result.pay_amount }}
      </p>
      <button class="order-btn" @click="orderDetail">
        查看订单
      </button>
    </div>
    <div v-if="result.cash_coupon>0" class="subsidy">
      <div class="sub-price">
        <p class="price">
          {{ result.cash_coupon }}元
        </p>
        <p class="txt">
          现金补贴已到账
        </p>
      </div>
      <img :src="beeIcon.useBtn" class="use-btn" @click="goIndex">
    </div>
  </div>
</template>

<script>
import { payResult } from '@/api/BeeApi/order'
import { getOs } from '@/utils'

export default {
  metaInfo: {
    title: '付款结果'
  },
  components: { },
  props: {},
  data() {
    return {
      beeIcon: {
        tipImg: require('@/assets/icon/alcohol/liqueur_result_icon_success.png'),
        useBtn: require('@/assets/icon/alcohol/liqueur_result_button.png')
      },
      result: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getPayResult()
    // 如果有store说明该页面作为组件在webApp显示
    if (!getOs().isApp) {
      this.$store.state.app.beeHeader = true
      this.$store.state.app.beeFooter.show = false
    }
  },
  methods: {
    async getPayResult() {
      const res = await payResult({ trade_no: this.$route.query.trade_no })
      this.result = res.data
    },
    goIndex() {
      window.location.href = this.result.cash_coupon_url
    },
    // 查看订单
    orderDetail() {
      if (this.result.check_to === 'list') {
        // 跳订单列表
        window.location.href = window.location.origin + '/#/persion/order'
      } else if (this.result.check_to === 'order') {
        // 跳订单详情
        window.location.href = window.location.origin + '/#/persion/order/orderDetail?order_no=' + this.result.order_no
      }
    }
  }
}
</script>

<style scoped lang="less">
.pay-success {
  width:100%;
  height: 100%;
  // backgroung-color: ;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  background:url(../../../assets/icon/alcohol/liqueur_result_bg.png) no-repeat,linear-gradient(to top, rgba(232,99,58,1),rgba(213,24,14,1));
  background-size: 100% 100%,contain;
  .result{
    padding-top:1rem;
    margin-bottom: 1rem;
  }
  .tip-img{
    width:0.93rem;
    height:0.93rem;
  }
  .tip-txt{
    font-size: 0.38rem;
    color: #fff;
    margin-top: 0.5rem;
    margin-bottom:.1rem;
  }
  .price{
    margin: 0;
    font-size: 0.36rem;
    color: #fff;
  }
  .order-btn{
    border:1px solid #E9DCB8;
    color: #E9DCB8;
    font-size: 0.28rem;
    border-radius: 0.5rem;
    padding: 0.1rem 0.3rem;
    margin-top: 0.3rem;
    background-color:transparent;
  }
  .subsidy{
    background: url(../../../assets/icon/alcohol/liqueur_result_red_envelope.png) no-repeat;
    background-size: 100% 100%;
    width: 7.5rem;
    height:5.02rem;
    position: relative;
  }
  .sub-price{
    text-align: center;
    padding-top: 0.4rem;
    .price{
      font-size: 1.2rem;
      margin:0 auto 0.1rem;
      font-weight: 600;
      background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent; }
    .txt{font-size: .28rem;color:#ef5821; margin: 0; font-weight: 600;}
  }
  .use-btn{
   width:2.94rem;
   height: 0.88rem;
   position: absolute;
   bottom: .3rem;
   left: 50%;
   transform: translateX(-50%)
  }
}
</style>
