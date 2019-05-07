<template>
  <div class="pay-for-another">
    <div class="waiting-pay">
      <span class="waiting-title">
        等待好友代付中
      </span>
      <div class="time">
        剩余时间：
      </div>
    </div>
    <div
      class="pay-status"
      :class="{payStatus2:payStatus===1}"
    >
      <div class="gift-text">
        <span class="status-text">需支付金额</span>
        <div class="gift-price">
          ￥<span class="price-num">840.00</span>
        </div>
        <div
          v-if="payStatus===1"
          class="status-text2"
        >
          【确认收货后，本次消费将获得 <span class="price-num">840</span> 公益值】
        </div>
      </div>
      <div class="gift-info">
        <div class="info-title">
          赠送好友商品订单
        </div>
        <p class="gift-name">
          123456
        </p>
      </div>
    </div>
    <share-channel v-if="payStatus===0" />
    <div class="pay-explain">
      <div class="explain-title">
        代付说明
      </div>
      <p class="explain-desc">
        1.朋友代付前请和朋友提前确认
      </p>
      <p class="explain-desc">
        2.如果申请退款并通过，已支付金额将原路返回至付款人
      </p>
    </div>
    <van-dialog
      v-model="askExit"
      show-cancel-button
      cancel-button-text="继续分享"
      confirm-button-text="退出"
      @confirm="confirmRoute()"
    >
      <img src="https://img.yzcdn.cn/1.jpg">
      <span>是否退出</span>
      <p>如果退出，好友将不能为您进行代付</p>
    </van-dialog>
  </div>
</template>

<script>
import shareChannel from './components/shareChannel'
export default {
  metaInfo() {
    if (this.payStatus === 0) {
      return {
        title: '发起代付'
      }
    } else {
      return { title: '代付中' }
    }
  },
  components: {
    shareChannel
  },
  props: {},
  data() {
    return {
      payStatus: 1,
      askExit: false,
      toPath: '',
      isConfirm: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  // NOTE 通过路由守卫弹出弹窗
  beforeRouteLeave(to, from, next) {
    this.toPath = to.path
    if (!this.isConfirm) {
      this.askExit = true
      next(false)
    } else {
      next()
    }
  },
  methods: {
    confirmRoute() {
      this.isConfirm = true
      this.$router.push(this.toPath)
    }
  }
}
</script>

<style scoped lang="less">
.pay-for-another {
  padding-top: 46px;
  .waiting-pay {
    background-color: @BeeDefault;
    padding: 0.5rem 0.3rem 0.2rem;
    box-sizing: border-box;
    color: #ffffff;
    .waiting-title {
      font-size: 0.32rem;
    }
    .time {
      font-size: 0.24rem;
      padding: 0.2rem 0 0.5rem;
    }
  }
  .payStatus2 {
    position: relative;
    top: -0.45rem;
  }
  .pay-status {
    padding: 0.52rem 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    margin: 0.3rem 0.16rem;
    border-radius: 0.2rem;
    .gift-text {
      text-align: center;
      .status-text {
        font-size: 0.24rem;
      }
      .status-text2 {
        font-size: 0.2rem;
        color: @Grey2;
        margin: 0.32rem 0 0.52rem;
        .price-num {
          color: @BeeDefault;
        }
      }
      .gift-price {
        color: @BeeDefault;
        font-size: 0.3rem;
        margin-top: 0.2rem;
        .price-num {
          font-size: 0.5rem;
        }
      }
    }
    .gift-info {
      padding: 0.28rem 0.2rem;
      margin: 0 0.2rem;
      box-sizing: border-box;
      background-color: @Grey5;
      border-radius: 0.08rem;
      .info-title {
        font-size: 0.24rem;
        margin-bottom: 0.28rem;
      }
    }
  }
  .pay-explain {
    box-sizing: border-box;
    margin: 0.3rem 0.16rem;
    .explain-title {
      font-size: 0.28rem;
      margin-bottom: 0.2rem;
    }
    .explain-desc {
      font-size: 0.24rem;
      margin: 0;
      color: @Grey2;
    }
  }
}
</style>
