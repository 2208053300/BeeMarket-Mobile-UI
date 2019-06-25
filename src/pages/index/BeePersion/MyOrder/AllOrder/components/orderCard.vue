<template>
  <div class="order-content">
    <van-list
      v-model="loading"
      finished-text="我也是有底线的 o(´^｀)o"
      class="guess-container"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
    >
      <div
        v-for="(card, index) in orderList"
        :key="index"
        class="order-card"
        @click="
          $router.push({
            path: '/persion/order/orderDetail',
            query: { order_no: card.order_no }
          })
        "
      >
        <div class="card-title">
          <div
            class="store-name"
            @click.stop="$router.push({path:'/category/store',query:{mid:card.merchant_id}})"
          >
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
            v-for="(product, index2) in card.product_list"
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
          <span v-if="card.toFriend === 1">赠送朋友订单</span>
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
            v-if="[-1, 4,5].indexOf(card.s_order) !== -1 || card.s_pay === -1"
            round
            class="order-button del-button"
            @click="deleteOrderData(card.order_no)"
          >
            删除订单
          </van-button>
          <van-button
            v-if="card.s_order === 4"
            round
            class="order-button"
            @click.stop="
              goComent(
                card.order_no,
                card.comment_product_num,
                card.product_sku_id
              )
            "
          >
            评价晒单
          </van-button>
          <van-button
            v-if="[-1, 4,5].indexOf(card.s_order) !== -1"
            round
            class="order-button"
            @click.stop="buyAgain(card)"
          >
            再次购买
          </van-button>
          <van-button
            v-if="[2, 3].indexOf(card.s_order) !== -1"
            round
            class="order-button"
            @click.stop="showLogistics(card)"
          >
            物流追踪
          </van-button>
          <van-button
            v-if="[2, 3].indexOf(card.s_order) !== -1"
            round
            class="order-button"
            @click.stop="completeOrderData(card.order_no)"
          >
            确认收货
          </van-button>
          <van-button
            v-if="card.s_order === 1"
            round
            class="order-button"
            @click="remindDelivery(card.order_no)"
          >
            提醒发货
          </van-button>
          <van-button
            v-if="card.s_pay === 0&&card.s_order !== -1"
            round
            class="order-button"
            @click.stop="$router.push('/category/details/payOrder?orderNo='+card.order_no)"
          >
            去支付
          </van-button>
          <!-- v-if="card.s_order === 4" -->
          <!-- <van-button
            round
            class="order-button"
            @click="
              $router.push({
                path: '/persion/order/orderDetail',
                query: { order_no: card.order_no }
              })
            "
          >
            查看详情
          </van-button> -->
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import {
  getOrderList,
  addShopcartProduct,
  remindOrder
} from '@/api/BeeApi/user'
import { deleteOrder, completeOrder } from '@/api/BeeApi/order'

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
    },
    // 评论晒单
    goComent(order_no, num, sku_id) {
      console.log(order_no, num, sku_id)

      if (num > 1) {
        this.$router.push({
          name: 'waitCommentOrder',
          qurey: {
            order_no
          }
        })
      } else {
        this.$router.push({
          name: 'CommentProduct',
          qurey: {
            order_no,
            sku_id
          }
        })
      }
    },
    // 再次购买
    buyAgain(order) {
      order.product_list.map(async item => {
        await addShopcartProduct({
          sid: item.sku_id,
          number: item.number,
          product_source: order.t_order
        })
      })
      this.$toast('已加入购物车')
      this.$router.push('/cart')
    },
    // 删除订单
    async deleteOrderData(order_no) {
      const res = await deleteOrder({ order_no: order_no })
      if (res.status_code === 200) {
        this.$toast(res.message)
        this.$parent.changeOrder()
      }
    },
    // 确认收货
    async completeOrderData(order_no) {
      const res = await completeOrder({ order_no: order_no })
      if (res.status_code === 200) {
        this.$toast(res.message)
        this.$parent.changeOrder()
      }
    },
    // 提醒发货
    async remindDelivery(order_no) {
      const res = await remindOrder({ order_no: order_no })
      if (res.status_code === 200) {
        this.$toast(res.message)
      }
    },
    // 物流追踪
    showLogistics(item) {
      if (item.take_apart > 1) {
        this.$router.push({
          path: '/persion/order/logistics',
          query: { order_no: item.order_no }
        })
      } else {
        this.$router.push({
          path: '/persion/order/logisticsDetail',
          query: { order_no: item.order_no }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.order-content {
  margin: 0.32rem 0.12rem;
  background-color: @GreyBg;
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
          vertical-align: text-top;
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
        min-width: 1.4rem;
        height: 0.56rem;
        line-height: 0.56rem;
        margin-left: 0.2rem;
        color: @BeeDefault;
        border-color: @BeeDefault;
      }
      .del-button {
        color: @Grey2;
        border-color: @Grey2;
      }
    }
  }
}
</style>
