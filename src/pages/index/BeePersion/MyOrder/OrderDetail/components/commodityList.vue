<template>
  <div class="commodity-list">
    <div class="commodity-card">
      <div class="store-name">
        <van-icon name="shop-o" />
        <span class="name">{{ orderDetail.storeName }}
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="commodity-content">
        <div
          v-for="item2 in orderDetail.product"
          :key="item2.id"
          class="commodity-content2"
        >
          <div class="commodity-details">
            <div class="commodity-img">
              <img
                :src="item2.previewImg"
                alt=""
              >
            </div>
            <div class="commodity-info">
              <div class="name-unit">
                <div class="name">
                  {{ item2.name }}
                </div>

                <span class="price-num">
                  ￥{{ item2.currentPrice }}
                </span>
              </div>
              <div class="sku-price">
                <div class="sku-text">
                  {{ item2.sku }}
                </div>
                <span class="num">
                  x{{ item2.num }}
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="[1,2,3].indexOf(orderDetail.status)!==-1"
            class="apply-after"
          >
            <van-button
              class="apply-button"
              @click="$router.push('/persion/order/applyAfter')"
            >
              申请售后
            </van-button>
          </div>
          <div
            v-if="[6].indexOf(orderDetail.status)!==-1"
            class="apply-after"
          >
            <van-button class="apply-button">
              加入购物车
            </van-button>
          </div>
        </div>
        <div class="price-detail">
          <div class="price-text">
            <span>商品总额</span>
            <span>￥{{ orderDetail.price1 }}</span>
          </div>
          <div class="price-text">
            <span>公益值抵扣</span>
            <span>￥{{ orderDetail.price2 }}</span>
          </div>
          <div class="price-text">
            <span>运费</span>
            <span>￥{{ orderDetail.price3 }}</span>
          </div>
        </div>
      </div>
      <div
        class="real-pay"
        :class="{realPay2:[1,2,3].indexOf(orderDetail.status)!==-1}"
      >
        <span>实付金额</span>
        <span class="pay-num">￥{{ orderDetail.price4 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    orderDetail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.commodity-list {
  .commodity-card {
    background-color: #fff;
    border-radius: 0.2rem;
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    .store-name {
      padding: 0.3rem 0.3rem 0;
      .van-icon {
        vertical-align: text-top;
        margin-right: 0.08rem;
      }
      .name {
        font-size: 0.24rem;
      }
    }
    .commodity-content {
      .commodity-content2 {
        .apply-after {
          padding: 0.2rem 0.3rem 0.3rem;
          border-bottom: 0.02rem solid @Grey6;
          text-align: right;
          .apply-button {
            padding: 0;
            font-size: 0.26rem;
            color: @Grey2;
            width: 1.6rem;
            height: 0.6rem;
            line-height: 0.6rem;
            border-radius: 0.1rem;
            border-color: @Grey2;
          }
        }
        .commodity-details {
          padding: 0 0.3rem;
          margin-top: 0.3rem;
          display: flex;
          align-items: center;
          .commodity-img {
            width: 1.72rem;
            height: 1.72rem;
            border-radius: 0.04rem;
            overflow: hidden;
            margin-right: 0.2rem;
          }
          .commodity-info {
            flex: 1;
            .name-unit {
              display: flex;
              justify-content: space-between;
              .name {
                font-size: 0.22rem;
                max-width: 3.5rem;
              }
              .price-num {
                font-size: 0.24rem;
              }
            }
            .sku-price {
              display: flex;
              justify-content: space-between;
              margin-top: 0.2rem;
              font-size: 0.22rem;
              color: @Grey1;
            }
            .num {
              font-size: 0.24rem;
              color: @Grey1;
            }
          }
        }
      }
      .price-detail {
        padding: 0.4rem 0.3rem 0.3rem;
        font-size: 0.26rem;
        color: @Grey1;
        .price-text {
          display: flex;
          justify-content: space-between;
          &:not(:last-child) {
            margin-bottom: 0.2rem;
          }
        }
      }
    }
    .real-pay {
      border-top: 0.02rem solid @Grey6;
      padding: 0.3rem 0.3rem 0.4rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.28rem;
      .pay-num {
        color: @BeeDefault;
      }
    }
    .realPay2 {
      border-top: none;
      padding: 0 0.3rem 0.3rem;
    }
  }
}
</style>
