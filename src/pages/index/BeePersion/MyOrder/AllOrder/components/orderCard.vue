<template>
  <div class="order-content">
    <van-list
      v-model="loading"
      finished-text="没有更多了"
      class="guess-container"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
    >
      <div
        v-for="(card,index) in orderList"
        :key="index"
        class="order-card"
      >
        <div class="card-title">
          <div class="store-name">
            {{ card.store_name }}
            <van-icon name="arrow" />
          </div>
          <div class="order-status">
            <!-- TODO 状态之后根据接口再V-IF -->
            <span>{{ card.status_name }}</span>
          </div>
        </div>
        <div class="card-content">
          <div
            v-for="(product,index2) in card.product_list"
            :key="index2"
            class="product-content"
          >
            <div class="product-img">
              <img
                :src="product.thumb_url"
                alt=""
              >
            </div>
            <div class="product-details">
              <div class="name-price">
                <div class="product-name">
                  {{ product.product_name }}
                </div>
                <span class="product-price">￥{{ product.price }}</span>
              </div>
              <div class="sku-num">
                <div class="product-sku">
                  {{ product.props_name }}
                </div>
                <span class="product-num">x{{ product.number }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="order-total">
          <span v-if="card.toFriend===1">赠送朋友订单</span>
          <div class="total-details">
            <div class="total-num">
              共<span>{{ card.total_number }}</span>件商品
            </div>
            <div class="total-price">
              合计￥<span class="price-num">{{ card.order_amount }}</span>
            </div>
          </div>
        </div>
        <div class="order-op">
          <van-button
            v-if="[-1,4].indexOf(card.s_order)!==-1||card.s_pay===-1"
            round
            class="order-button"
          >
            删除订单
          </van-button>
          <van-button
            v-if="card.s_order===4"
            round
            class="order-button"
            @click="$router.push('/persion/order/comment')"
          >
            评价晒单
          </van-button>
          <van-button
            v-if="[-1,4].indexOf(card.s_order)!==-1"
            round
            class="order-button"
          >
            再次购买
          </van-button>
          <van-button
            v-if="[1,2,3].indexOf(card.s_order)!==-1"
            round
            class="order-button"
            @click="$router.push('/persion/order/logistics')"
          >
            物流追踪
          </van-button>
          <van-button
            v-if="[1,2,3].indexOf(card.s_order)!==-1"
            round
            class="order-button"
          >
            确认收货
          </van-button>
          <van-button
            v-if="card.s_order===1"
            round
            class="order-button"
          >
            提醒发货
          </van-button>
          <van-button
            v-if="card.s_pay===0"
            round
            class="order-button"
          >
            <!-- TODO 接口缺少时间 -->
            付款<span>23:59</span>
          </van-button>
          <van-button
            v-if="card.s_order===4"
            round
            class="order-button"
            @click="$router.push('/persion/order/orderDetail')"
          >
            查看详情
          </van-button>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getOrderList } from '@/api/BeeApi/user'
export default {
  components: {},
  props: {
    orderList: {
      type: Array,
      default: () => {
        return []
      }
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      finished: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await getOrderList(this.formData)
        this.orderList.push(...res.data)
        this.formData.page++
        this.loading = false
        if (res.data.length === 0) {
          this.finished = true
        }
      }, 500)
    }
  }
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
      justify-content: flex-end;
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
