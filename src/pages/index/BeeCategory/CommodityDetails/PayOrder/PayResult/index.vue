<template>
  <div class="pay-result">
    <div
      v-if="[3,4].indexOf($store.state.user.userStatus)!==-1"
      class="pay-result1"
    >
      <div class="result-container">
        <div class="result-card">
          <div class="result-img">
            <img
              :src="beeIcon.paymentresult_pic_success_yes"
              alt=""
            >
          </div>
          <p class="result">
            付款成功
          </p>
          <p class="money">
            <span>￥</span>{{ payResult.pay_amount }}
          </p>
          <div class="option">
            <van-button
              class="button-default see-order"
              @click="checkOrder"
            >
              查看订单
            </van-button>
            <van-button
              class="button-default go-category"
              @click="goCategory"
            >
              继续逛逛
            </van-button>
          </div>
        </div>
      </div>
      <div
        class="charity"
        :style="{backgroundImage:'url('+beeIcon.paymentresult_pic_value_bg+')'}"
      >
        <div class="bottom-text1">
          <div class="img-content1">
            <img
              :src="beeIcon.paymentresult_pic_value_left"
              alt=""
            >
          </div>
          <span class="charity_value">{{ payResult.charity_value_get }}</span>
          <div class="img-content2">
            <img
              :src="beeIcon.paymentresult_pic_value_right"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="[1,2,5].indexOf($store.state.user.userStatus)!==-1"
      class="pay-result0"
    >
      <div class="first-pay">
        <img
          :src="beeIcon.paymentresult_pic_congratulation"
          alt="首购成功"
        >
      </div>
      <div class="center-img">
        <img
          :src="beeIcon.paymentresult_pic_success_no"
          alt="money"
        >
      </div>
      <div class="action-btn">
        <van-button
          class="btn1"
          round
          @click="$router.push('/')"
        >
          以后再说
        </van-button>
        <van-button
          class="btn1 btn2"
          round
          @click="$router.push({path:'/beeFriends/apply',query:{trade_no:$route.query.trade_no}})"
        >
          立即开启
        </van-button>
      </div>
      <div class="bottom-text">
        <div class="bottom-text1">
          <div class="img-content1">
            <img
              :src="beeIcon.paymentresult_pic_value_left"
              alt=""
            >
          </div>
          <span class="charity_value">{{ payResult.charity_value_get }}</span>
          <div class="img-content2">
            <img
              :src="beeIcon.paymentresult_pic_value_right"
              alt=""
            >
          </div>
        </div>
        <div class="bottom-text2">
          选择立即开启则此订单<span class="bee-text">不支持</span>7天无理由退货
        </div>
      </div>
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
      payResult: {},
      beeIcon: {
        paymentresult_pic_congratulation: require('@/assets/icon/order/paymentresult_pic_congratulation@2x.png'),
        paymentresult_pic_success_no: require('@/assets/icon/order/paymentresult_pic_success_no@2x.png'),
        paymentresult_pic_value_left: require('@/assets/icon/order/paymentresult_pic_value_left@2x.png'),
        paymentresult_pic_value_right: require('@/assets/icon/order/paymentresult_pic_value_right@2x.png'),
        paymentresult_pic_success_yes: require('@/assets/icon/order/paymentresult_pic_success_yes@2x.png'),
        paymentresult_pic_value_bg: require('@/assets/icon/order/paymentresult_pic_value_bg@2x.png')
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    await next(async vm => {
      // 通过 `vm` 访问组件实例
      try {
        await vm.$store.dispatch('GerUserStatus')
      } catch (error) {
        console.log(error)
      }
    })
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
  .pay-result1 {
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
        height: 4.36rem;
        box-sizing: border-box;
        .result-img {
          margin: auto;
          width: 1.83rem;
          height: 1.28rem;
        }
        .result {
          color: @Grey12;
          font-size: 0.32rem;
          margin: 0.28rem auto;
        }
        .money {
          color: @BeeDefault3;
          font-size: 0.4rem;
          margin: 0;
          padding: 0;
          span {
            font-size: 0.3rem;
          }
        }
        .option {
          margin: 0.4rem auto 0;
          text-align: center;
          .button-default {
            width: 2.28rem;
            height: 0.68rem;
            line-height: 0.68rem;
            border-radius: 0.08rem;
            border: 0.02rem solid @Grey1;
            font-size: 0.28rem;
          }
          .go-category {
            border-color: @BeeDefault;
            color: @BeeDefault;
            margin-left: 0.8rem;
          }
        }
      }
    }
    .charity {
      background-size: 100% 100%;
      margin-top: 0.2rem;
      height: 1rem;
      margin: 0 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .bottom-text1 {
        color: @BeeDefault;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .img-content1 {
          width: 2.49rem;
          height: 0.32rem;
        }
        .charity_value {
          position: relative;
          top: 0.06rem;
          font-size: 0.3rem;
        }
        .img-content2 {
          width: 1.05rem;
          height: 0.32rem;
        }
      }
    }
  }
  .pay-result0 {
    background-color: #fff;
    padding: 1.24rem 0.68rem 1.12rem;
    .first-pay {
      width: 5.79rem;
      height: 1.15rem;
      margin: auto;
    }
    .center-img {
      width: 5.6rem;
      height: 5.78rem;
      margin: 0.8rem auto;
    }
    .action-btn {
      margin: 0 auto 0.44rem;
      text-align: center;
      .btn1 {
        width: 2.9rem;
        height: 0.76rem;
        box-sizing: border-box;
        line-height: 0.76rem;
        border: 0.04rem solid @Grey2;
        color: @Grey2;
        font-size: 0.3rem;
      }
      .btn2 {
        margin-left: 0.2rem;
        color: @BeeDefault;
        border-color: @BeeDefault;
      }
    }
    .bottom-text {
      padding-top: 0.44rem;
      border-top: 0.02rem solid @BeeDefault;
      .bottom-text1 {
        color: @BeeDefault;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .img-content1 {
          width: 2.49rem;
          height: 0.32rem;
        }
        .charity_value {
          position: relative;
          top: 0.06rem;
          font-size: 0.3rem;
        }
        .img-content2 {
          width: 1.05rem;
          height: 0.32rem;
        }
      }
      .bottom-text2 {
        margin-top: 0.24rem;
        font-size: 0.26rem;
        color: @Grey2;
        text-align: center;
        .bee-text {
          color: @BeeDefault;
        }
      }
    }
  }
}
</style>
