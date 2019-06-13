<template>
  <div class="give-firends">
    <van-notice-bar
      :left-icon="beeIcon.confirmorder_send_icon_presentation"
      background="transparent"
      mode="closeable"
    >
      请分享给好友等待对方接受或转赠
    </van-notice-bar>
    <div class="order-gift">
      <div
        class="bg-content"
        @click="showExplain()"
      >
        <div class="gift-step">
          <div class="step-content">
            <div class="step-img">
              <img
                :src="beeIcon.confirmorder_send_icon_buy"
                alt=""
              >
            </div>
            <span class="step-text1">选购商品</span>
            <span class="step-text2">选择待送的商品</span>
            <div class="arrow-img">
              <img
                :src="beeIcon.confirmorder_send_icon_arrow_normat"
                alt=""
              >
            </div>
          </div>
          <div class="step-content">
            <div class="step-img">
              <img
                :src="beeIcon.confirmorder_send_icon_send_normat"
                alt=""
              >
            </div>
            <span class="step-text1">赠送好友</span>
            <span class="step-text2">线上分享好友</span>
            <div class="arrow-img">
              <img
                :src="beeIcon.confirmorder_send_icon_arrow_disabled"
                alt=""
              >
            </div>
          </div>
          <div class="step-content">
            <div class="step-img">
              <img
                :src="beeIcon.confirmorder_send_icon_receive_disabled"
                alt=""
              >
            </div>
            <span class="step-text1 step-text3">好友接收</span>
            <span class="step-text2 step-text3">好友接收即可发货</span>
          </div>
        </div>
        <div class="arrow-icon">
          <van-icon
            name="arrow"
            color="#ffffff"
          />
        </div>
      </div>
    </div>
    <div class="gift-status">
      <div
        v-if="giftStatus===0"
        class="gift-text"
      >
        <span class="status-text">付款成功</span>
        <div class="gift-price">
          ￥<span class="price-num">840.00</span>
        </div>
      </div>
      <div
        v-else
        class="gift-text"
      >
        <span class="status-text2">好友接收中</span>
        <div class="time">
          剩余时间: <span class="time-num">12</span>
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
    <share-channel v-if="giftStatus===0" />
    <div
      v-else
      class="gift-end"
    >
      <van-button
        type="default"
        class="show-order"
      >
        查看订单
      </van-button>
      <van-button
        type="default"
        class="continue-walk"
      >
        继续逛逛
      </van-button>
    </div>
    <give-explain ref="showExplain" />
  </div>
</template>

<script>
import shareChannel from './components/shareChannel'
import giveExplain from './components/giveExplain'
export default {
  metaInfo: {
    title: '赠送好友'
  },
  components: {
    shareChannel,
    giveExplain
  },
  props: {},
  data() {
    return {
      giftStatus: 0,
      beeIcon: {
        confirmorder_send_icon_presentation: require('@/assets/icon/order/confirmorder_send_icon_presentation@2x.png'),
        confirmorder_send_icon_buy: require('@/assets/icon/order/confirmorder_send_icon_buy@2x.png'),
        confirmorder_send_icon_send_normat: require('@/assets/icon/order/confirmorder_send_icon_send_normat@2x.png'),
        confirmorder_send_icon_receive_disabled: require('@/assets/icon/order/confirmorder_send_icon_receive_disabled@2x.png'),
        confirmorder_send_icon_arrow_normat: require('@/assets/icon/order/confirmorder_send_icon_arrow_normat@2x.png'),
        confirmorder_send_icon_arrow_disabled: require('@/assets/icon/order/confirmorder_send_icon_arrow_disabled@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    // NOTE 显示上拉菜单
    showExplain() {
      this.$refs.showExplain.showExplain = true
    }
  }
}
</script>

<style lang="less">
.give-firends {
  .van-notice-bar {
    font-size: 0.22rem;
    color: @Grey2;
    align-items: center;
    .van-notice-bar__wrap {
      margin-left: 0.2rem;
    }
  }
  .order-gift {
    .bg-content {
      background-color: rgba(255, 191, 109, 0.9);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.2rem;
      .gift-step {
        height: 2rem;
        flex: 1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 2rem;
        padding-bottom: 0.2rem;
        align-items: center;
        .step-content {
          color: #ffffff;
          text-align: center;
          position: relative;
          .step-img {
            height: 0.9rem;
            width: 0.9rem;
            margin: auto;

          }
          .step-text1 {
            font-size: 0.24rem;
            display: block;
          }
          .step-text2 {
            font-size: 0.2rem;
          }
          .step-text3 {
            color: rgba(255, 255, 255, 0.3);
          }
          .arrow-img {
            position: absolute;
            top: 20%;
            right: 0;
            width: 0.44rem;
            height: 0.22rem;
          }
        }
      }
    }
  }
  .gift-status {
    padding: 0.52rem 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    margin: 0 0.16rem;
    position: relative;
    top: -0.2rem;
    border-radius: 0.2rem;
    .gift-text {
      text-align: center;
      .status-text {
        font-size: 0.24rem;
      }
      .status-text2 {
        font-size: 0.32rem;
      }
      .time {
        font-size: 0.24rem;
        margin: 0.2rem 0 0.32rem;
        color: @Grey1;
      }
      .gift-price {
        color: @BeeDefault;
        font-size: 0.3rem;
        .price-num {
          font-size: 0.5rem;
        }
        margin: 0.2rem 0 0.52rem;
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

  .gift-end {
    text-align: center;
    .show-order {
      display: block;
      margin: 1.2rem auto 0.3rem;
      color: @BeeDefault;
      border: 0.02rem solid @BeeDefault;
      border-radius: 0.16rem;
      background-color: transparent;
      width: 5.2rem;
      height: 0.88rem;
      line-height: 0.88rem;
    }
    .continue-walk {
      color: #ffffff;
      border: 0.02rem solid #ffffff;
      border-radius: 0.16rem;
      background-color: @BeeDefault;
      width: 5.2rem;
      height: 0.88rem;
      line-height: 0.88rem;
    }
  }
}
</style>
