<template>
  <div class="give-firends">
    <van-notice-bar
      left-icon="volume-o"
      mode="closeable"
      background="transparent"
    >
      请分享给好友等待对方接受或转赠
    </van-notice-bar>
    <div class="order-gift">
      <div class="bg-content">
        <div class="gift-step">
          <div class="step-content">
            <div class="step-img">
              <img
                src=""
                alt=""
              >
            </div>
            <span class="step-text1">选购商品</span>
            <span class="step-text2">选择待送的商品</span>
          </div>
          <div class="step-content">
            <div class="step-img">
              <img
                src=""
                alt=""
              >
            </div>
            <span class="step-text1">赠送好友</span>
            <span class="step-text2">线上分享好友</span>
          </div>
          <div class="step-content">
            <div class="step-img">
              <img
                src=""
                alt=""
              >
            </div>
            <span class="step-text1">好友接收</span>
            <span class="step-text2">好友接收即可发货</span>
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
    <div
      v-if="giftStatus===0"
      class="gift-way"
    >
      <span class="way-title">请点击赠送</span>
      <div class="way-gird">
        <div class="way-content">
          <div class="way-img">
            <img
              src=""
              alt=""
            >
          </div>
          <span class="way-text">微信</span>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '赠送好友'
  },
  components: {},
  props: {},
  data() {
    return {
      giftStatus: 1
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {}
}
</script>

<style scoped lang="less">
.give-firends {
  padding-top: 46px;
  .order-gift {
    .bg-content {
      background-color: rgba(255, 191, 109, 0.9);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .gift-step {
        height: 2rem;
        flex: 1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        .step-content {
          color: #ffffff;
          text-align: center;
          .step-img {
            height: 0.9rem;
            width: 0.9rem;
          }
          .step-text1 {
            font-size: 0.24rem;
            display: block;
          }
          .step-text2 {
            font-size: 0.2rem;
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
  .gift-way {
    padding: 0.4rem 0.2rem;
    margin: 0.16rem;
    border-radius: 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
    top: -0.2rem;
    .way-gird {
      margin: 0.4rem 0.2rem 0 0.2rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      .way-content {
        text-align: center;
        .way-img {
          margin-bottom: 0.2rem;
        }
        .way-text {
          font-size: 0.28rem;
        }
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
