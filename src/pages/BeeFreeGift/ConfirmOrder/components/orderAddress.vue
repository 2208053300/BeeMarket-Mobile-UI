<template>
  <div class="confirmOrder-address">
    <div
      class="order-address"
      @click="selectAddress()"
    >
      <div
        v-if="order.addrDetail"
        class="default-address"
      >
        <div class="img-content">
          <img
            :src="beeIcon.confirmorder_icon_address"
            alt=""
          >
        </div>
        <div class="address-details">
          <div class="user-details">
            <span class="name">{{ order.addrDetail.name }}</span>
            <span
              v-if="order.addrDetail.mobileNum"
              class="phone"
            >{{ order.addrDetail.mobileNum }}</span>
          </div>
          <div class="address">
            <div
              v-if="order.addrDetail.def"
              class="address-tag default-tag"
            >
              默认
            </div>
            <!-- 需要调整字段显示中文 -->
            <!-- <div
                  v-if="order.addrDetail.tag"
                  class="address-tag"
                >
                  {{ order.addrDetail.tag }}
                </div> -->
            <div class="address-details">
              {{ order.addrDetail.address }}
            </div>
          </div>
        </div>
        <van-icon
          name="arrow"
          color="#ffffff"
        />
      </div>
      <div
        v-else
        class="no-default-address"
      >
        <div class="no-left">
          <div class="img-content">
            <img
              :src="beeIcon.confirmorder_icon_address"
              alt=""
            >
          </div>
          <span class="no-text">请选择收货地址</span>
        </div>
        <div class="no-right">
          <van-icon
            name="arrow"
            color="#ffffff"
          />
        </div>
      </div>
    </div>
    <!-- <van-tabs
      v-model="buyFor"
      :color="BeeDefault"
      :title-active-color="BeeDefault"
      :line-width="30"
      class="buyFor-tabs"
      @change="changeOt"
    >
      <van-tab>
        <div slot="title">
          自己购买
        </div>
        原位
      </van-tab>
      <van-tab>
        <div slot="title">
          赠送好友
        </div>
        <div class="order-gift">
          <div
            class="bg-content"
            @click="sendToFirend()"
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
                    :src="beeIcon.confirmorder_send_icon_send_disabled"
                    alt=""
                  >
                </div>
                <span class="step-text1 step-text3">赠送好友</span>
                <span class="step-text2 step-text3">线上分享好友</span>
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
      </van-tab>
    </van-tabs> -->
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import { mapState } from 'vuex'
export default {
  components: {},
  filters: {
    // NOTE 隐藏手机号
    toTel(value) {
      value = value.toString()
      return value.substr(0, 3) + '****' + value.substr(7)
    }
  },
  props: {},
  data() {
    return {
      BeeDefault,
      buyFor: 0,
      beeIcon: {
        confirmorder_icon_address: require('@/assets/icon/order/confirmorder_icon_address@2x.png'),
        confirmorder_send_icon_buy: require('@/assets/icon/order/confirmorder_send_icon_buy@2x.png'),
        confirmorder_send_icon_send_disabled: require('@/assets/icon/order/confirmorder_send_icon_send_disabled@2x.png'),
        confirmorder_send_icon_receive_disabled: require('@/assets/icon/order/confirmorder_send_icon_receive_disabled@2x.png'),
        confirmorder_send_icon_arrow_normat: require('@/assets/icon/order/confirmorder_send_icon_arrow_normat@2x.png'),
        confirmorder_send_icon_arrow_disabled: require('@/assets/icon/order/confirmorder_send_icon_arrow_disabled@2x.png')
      }
    }
  },
  computed: {
    ...mapState(['order'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    selectAddress() {
      this.$store.state.app.pushName = 'confirmOrder'
      // TODO 重新选择送货地址
      this.$router.push({
        name: 'addressManage',
        query: {
          mode: 'select'
        }
      })
    },
    sendToFirend() {
      this.$router.push('/category/details/giveFirends')
    },
    changeOt(index) {
      if (index === 1) {
        this.$parent.orderType = false
        this.$parent.orderTypeText = 'present'
      } else {
        this.$parent.orderTypeText = 'general'
      }
    }
  }
}
</script>

<style lang="less">
.confirmOrder-address {
  .buyFor-tabs {
    .van-hairline--top-bottom::after {
      border: none;
    }
  }
  .order-address {
    background-color: #fff;
    .no-default-address {
      height: 1.08rem;
      background-color: rgba(255, 191, 109, 0.9);
      padding: 0.36rem 0.3rem 0.6rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .no-left {
        color: #ffffff;
        .img-content {
          width: 0.29rem;
          height: 0.38rem;
          margin-right: 0.16rem;
          display: inline-block;
        }
        .no-text {
          font-size: 0.28rem;
        }
      }
    }
    .default-address {
      background-color: rgba(255, 191, 109, 0.9);
      padding: 0.36rem 0.3rem 0.56rem;
      box-sizing: border-box;
      display: flex;
      height: 1.48rem;
      align-items: center;
      color: #ffffff;
      .img-content {
        width: 0.29rem;
        height: 0.38rem;
      }
      .address-details {
        flex: 1;
        margin-left: 0.3rem;
        .user-details {
          font-size: 0.28rem;
          .name {
            margin-right: 0.2rem;
          }
        }
        .address {
          margin-top: 0.2rem;
          display: flex;
          align-items: center;
          .address-tag {
            width: 0.56rem;
            height: 0.28rem;
            line-height: 0.28rem;
            text-align: center;
            margin-right: 0.1rem;
            display: inline-block;
            font-size: 0.2rem;
            box-sizing: border-box;
            border-radius: 0.1rem;
            border: 0.02rem solid #ffffff;
          }
          .default-tag {
            color: @BeeDefault;
            background-color: #ffffff;
            border-color: #ffffff;
          }
          .address-details {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 0;
            max-width: 4.5rem;
          }
        }
      }
    }
  }
  .order-gift {
    padding-top: 0.24rem;
    background-color: #fff;
    .bg-content {
      background-color: rgba(255, 191, 109, 0.9);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.2rem;
      .gift-step {
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
}
</style>
