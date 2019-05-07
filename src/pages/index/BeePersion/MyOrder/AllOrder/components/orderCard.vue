<template>
  <div class="order-content">
    <div
      v-for="card in orderList"
      :key="card.storeName"
      class="order-card"
    >
      <div class="card-title">
        <div class="store-name">
          {{ card.storeName }}
          <van-icon name="arrow" />
        </div>
        <div class="order-status">
          <!-- TODO 状态之后根据接口再V-IF -->
          <span v-if="card.orderStatus===0">已取消</span>
          <span v-if="card.orderStatus===1">待评价</span>
          <span v-if="card.orderStatus===2">待收货</span>
          <span v-if="card.orderStatus===3">交易关闭</span>
          <span v-if="card.orderStatus===4">待发货</span>
          <span v-if="card.orderStatus===5">待付款</span>
        </div>
      </div>
      <div class="card-content">
        <div
          v-for="product in card.product"
          :key="product.id"
          class="product-content"
        >
          <div class="product-img">
            <img
              :src="product.previewImg"
              alt=""
            >
          </div>
          <div class="product-details">
            <div class="name-price">
              <div class="product-name">
                {{ product.name }}
              </div>
              <span class="product-price">￥{{ product.price }}</span>
            </div>
            <div class="sku-num">
              <div class="product-sku">
                {{ product.sku }}
              </div>
              <span class="product-num">x{{ product.num }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="order-total">
        <span v-if="card.toFriend===1">赠送朋友订单</span>
        <div class="total-details">
          <div class="total-num">
            共<span>{{ card.product.length }}</span>件商品
          </div>
          <div class="total-price">
            合计￥<span class="price-num">{{ card.totalPrice }}</span>
          </div>
        </div>
      </div>
      <div class="order-op">
        <van-button
          v-if="card.toFriend===0&&(card.orderStatus===0||card.orderStatus===1||card.orderStatus===0||3)"
          round
          class="order-button"
          @click=""
        >
          删除订单
        </van-button>
        <van-button
          v-if="card.toFriend===0&&(card.orderStatus===1)"
          round
          class="order-button"
          @click=""
        >
          评价晒单
        </van-button>
        <van-button
          v-if="card.toFriend===0&&(card.orderStatus===0||card.orderStatus===1)"
          round
          class="order-button"
          @click=""
        >
          再次购买
        </van-button>
        <van-button
          v-if="card.toFriend===0&&(card.orderStatus===2)"
          round
          class="order-button"
          @click=""
        >
          物流追踪
        </van-button>
        <van-button
          v-if="card.toFriend===0&&(card.orderStatus===2)"
          round
          class="order-button"
          @click=""
        >
          确认收货
        </van-button>
        <van-button
          v-if="card.toFriend===0&&(card.orderStatus===4)"
          round
          class="order-button"
          @click=""
        >
          提醒发货
        </van-button>
        <van-button
          v-if="card.toFriend===0&&(card.orderStatus===5)"
          round
          class="order-button"
          @click=""
        >
          付款<span>23:59</span>
        </van-button>
        <van-button
          v-if="card.toFriend===1"
          round
          class="order-button"
          @click=""
        >
          查看详情
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    orderList: {
      type: Array,
      default: () => {
        return []
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
.order-content {
  margin: 0.32rem 0.12rem;
  .order-card {
    background-color: #fff;
    padding: 0.3rem 0.32rem;
    box-sizing: border-box;
    border-radius: 0.2rem;
    margin-bottom: 0.2rem;
    .card-title {
      display: flex;
      justify-content: space-between;
      .store-name {
        font-size: 0.24rem;
        .van-icon {
          vertical-align: middle;
        }
      }
      .order-status {
        font-size: 0.24rem;
        color: @BeeDefault;
      }
    }
    .card-content {
      margin: 0.3rem 0 0.4rem;
      .product-content {
        display: flex;
        margin-bottom: 0.3rem;
        &:last-child {
          margin-bottom: 0;
        }
        .product-img {
          border-radius: 0.1rem;
          overflow: hidden;
          width: 1.72rem;
          margin-right: 0.2rem;
        }
        .product-details {
          box-sizing: border-box;
          padding-top: 0.1rem;
          flex: 1;
          .name-price {
            display: flex;
            font-size: 0.22rem;
            .product-name {
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-right: 0.5rem;
            }
          }
          .sku-num {
            display: flex;
            font-size: 0.22rem;
            margin-top: 0.2rem;
            color: @Grey1;
            justify-content: space-between;
            .product-sku {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .order-total {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 0.24rem;
      margin-bottom: 0.4rem;
      .total-details {
        display: flex;
        align-items: flex-end;

        .total-num {
          margin-right: 0.2rem;
        }
        .total-price {
          .price-num {
            font-size: 0.3rem;
          }
        }
      }
    }
    .order-op {
      display: flex;
      justify-content: flex-end;
      .order-button {
        padding: 0;
        font-size: 0.24rem;
        width: 1.4rem;
        height: 0.56rem;
        line-height: 0.56rem;
        margin-left: 0.2rem;
        color: @BeeDefault;
        border-color: @BeeDefault;
      }
    }
  }
}
</style>
