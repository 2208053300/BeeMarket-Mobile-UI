<template>
  <div class="commodity-list">
    <div class="commodity-card">
      <div class="store-name">
        <van-icon name="shop-o" />
        <span class="name">{{ orderDetail.store_name }}
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="commodity-content">
        <div
          v-for="(product,index) in orderDetail.products"
          :key="index"
          class="commodity-content2"
        >
          <div
            class="commodity-details"
            @click="$router.push({path:'/category/details',query: { pid: product.pid, target: product.target }})"
          >
            <div class="commodity-img">
              <img
                :src="product.tUrl"
                alt="预览图"
              >
            </div>
            <div class="commodity-info">
              <div class="name-unit">
                <div class="name">
                  {{ product.pname }}
                </div>

                <span class="price-num">
                  ￥{{ product.sell_price }}
                </span>
              </div>
              <div class="sku-price">
                <div class="sku-text">
                  {{ product.props_name }}
                </div>
                <span class="num">
                  x{{ product.number }}
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="[3,4,5].indexOf(orderDetail.s_order)!==-1"
            class="apply-after"
          >
            <!-- cs_status
               0 隐藏售后按钮
               1 售后按钮不可点击
               2 售后按钮正常
           -->
            <van-button
              v-if="product.cs_status!==0"
              class="apply-button"
              :class="{applying:product.cs_status===1}"
              @click="$router.push({path:'/persion/order/applyAfter',query:{order_product_id:product.opid}})"
            >
              申请售后
            </van-button>
          </div>
          <!-- <div
            v-if="[6].indexOf(orderDetail.status)!==-1"
            class="apply-after"
          >
            <van-button class="apply-button">
              加入购物车
            </van-button>
          </div> -->
        </div>
        <div class="price-detail">
          <div class="price-text">
            <span>商品总额</span>
            <span>￥{{ orderDetail.product_amount }}</span>
          </div>
          <div class="price-text">
            <span>余额抵扣</span>
            <span>￥{{ orderDetail.balance_used }}</span>
          </div>
          <div v-if="orderDetail.source !== 'pgpackage'" class="price-text">
            <span>公益值抵扣</span>
            <span>￥{{ orderDetail.charity_used }}</span>
          </div>
          <div v-if="orderDetail.source === 'pgpackage'" class="price-text">
            <span>农礼包抵扣</span>
            <span>￥{{ orderDetail.used_pgpackage_amount }}</span>
          </div>
          <div class="price-text">
            <span>运费</span>
            <span>￥{{ orderDetail.freight_amount }}</span>
          </div>
        </div>
      </div>
      <div
        class="real-pay"
        :class="{realPay2:[1,2,3].indexOf(orderDetail.status)!==-1}"
      >
        <span>实付金额</span>
        <span class="pay-num">￥{{ orderDetail.actual_paid }}</span>
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
            &.applying {
              opacity: 0.5;
              pointer-events: none;
            }
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
