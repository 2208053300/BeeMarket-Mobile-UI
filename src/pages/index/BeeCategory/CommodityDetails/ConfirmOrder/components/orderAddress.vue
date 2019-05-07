<template>
  <div>
    <van-tabs
      v-model="buyFor"
      :color="BeeDefault"
      :title-active-color="BeeDefault"
      :line-width="30"
    >
      <van-tab>
        <div slot="title">
          自己购买
        </div>
        <div
          class="order-address"
          @click="selectAddress()"
        >
          <div
            v-if="detaultAddress"
            class="default-address"
          >
            <van-icon
              name="location-o"
              size="0.40rem"
            />
            <div class="address-details">
              <div class="user-details">
                <span class="name">{{ detaultAddress.username }}</span>
                <span
                  v-if="detaultAddress.phone"
                  class="phone"
                >{{ detaultAddress.phone|toTel }}</span>
              </div>
              <div class="address">
                <div class="address-tag default-tag">
                  默认
                </div>
                <div class="address-tag">
                  {{ detaultAddress.tag }}
                </div>
                <div class="address-details">
                  {{ detaultAddress.details }}
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
              <van-icon
                name="location-o"
                size="0.40rem"
              />
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
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import { getDefaultAddress } from '@/api/category'
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
      detaultAddress: {},
      buyFor: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getDefaultAddress()
  },
  methods: {
    async getDefaultAddress() {
      const res = await getDefaultAddress()
      this.detaultAddress = res.data.addressData
    },
    selectAddress() {
      // TODO 重新选择送货地址
      this.$router.push('/persion/addressSetting')
    },
    sendToFirend() {
      this.$router.push('/category/details/giveFirends')
    }
  }
}
</script>

<style scoped lang="less">
.order-address {
  padding-top: 0.24rem;
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
      .van-icon {
        vertical-align: middle;
        margin-right: 0.16rem;
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
    .address-details {
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
</style>
