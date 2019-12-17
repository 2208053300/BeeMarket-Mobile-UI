<template>
  <div class="order-detail2">
    <div class="order-detail-op">
      <!-- <div class="left-button">
      <van-button class="back-list">
        返回订单列表
      </van-button>
    </div> -->

      <!-- orderDetail.s_order!==-1 -->
      <!-- v-if="orderDetail.s_pay===0 || orderDetail.s_order!==-1" -->
      <van-button
        v-if="orderDetail.s_order === 1 && orderDetail.t_order === 'liquor'"
        round
        @click.stop="liquorAction(orderDetail.order_no)"
      >
        全额退款
      </van-button>
      <van-button
        v-if="orderDetail.s_order === 1 && orderDetail.t_order === 'liquor'"
        round
        class="bee-button"
        @click.stop="liquorAction2(orderDetail.order_no)"
      >
        立即发货
      </van-button>
      <van-button v-if="cancelable" round @click="cancelPop = true">
        取消订单
      </van-button>

      <van-button
        v-if="[12, 13].indexOf(orderDetail.status) !== -1"
        round
        class="bee-button"
      >
        自己接收
      </van-button>

      <van-button
        v-if="orderDetail.s_pay === 0 && orderDetail.s_order !== -1"
        round
        class="bee-button"
        @click="goPay(orderDetail.order_no)"
      >
        去支付
      </van-button>

      <van-button
        v-if="
          orderDetail.s_pay === 1 &&
            [1].indexOf(orderDetail.s_order) !== -1 &&
            orderDetail.t_order !== 'liquor'
        "
        round
        @click="remindDelivery"
      >
        提醒发货
      </van-button>

      <van-button
        v-if="
          orderDetail.take_apart > 1 || [4, 5, -1].includes(orderDetail.s_order)
        "
        round
        @click="deleteOrderData"
      >
        删除订单
      </van-button>

      <van-button
        v-if="
          orderDetail.s_pay === 1 && [3, 4, 5].includes(orderDetail.s_order)
        "
        round
        @click="showLogistics(orderDetail)"
      >
        查看物流
      </van-button>

      <van-button
        v-if="[5, -1].includes(orderDetail.s_order)"
        round
        class="bee-button"
        @click="buyAgain(orderDetail)"
      >
        再次购买
      </van-button>

      <van-button
        v-if="[4].includes(orderDetail.s_order)"
        round
        class="bee-button"
        @click="goComment(orderDetail)"
      >
        去评价
      </van-button>
      <van-button
        v-if="orderDetail.s_pay === 1 && [3].includes(orderDetail.s_order)"
        round
        class="bee-button"
        @click="completeOrderData(orderDetail.order_no)"
      >
        确认收货
      </van-button>
      <van-button v-if="[7].includes(orderDetail.status)" round>
        点击赠送
      </van-button>
      <van-button
        v-if="[8].includes(orderDetail.status)"
        round
        class="bee-button"
      >
        再次赠送
      </van-button>
      <van-popup v-model="cancelPop" position="bottom" class="cancel-pop">
        <div class="cancel-reason">
          <div class="cancel-title">
            取消订单
          </div>
          <div class="reason-content">
            <div class="cancel-text">
              请选择取消订单的原因
            </div>
            <van-radio-group v-model="cancelReason">
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in reasonList"
                  :key="index"
                  :title="item"
                  clickable
                  @click="cancelReason = item"
                >
                  <van-radio :name="item" :checked-color="BeeDefault" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </div>
          <div class="submit-cancel" @click="closeOrderData">
            提交
          </div>
        </div>
      </van-popup>
    </div>
    <van-dialog
      v-model="askLiquor"
      show-cancel-button
      cancel-button-text="取消"
      confirm-button-text="确认退款"
      confirm-button-color="#fff"
      class="text-center"
      @confirm="closeLiquor()"
    >
      <van-icon
        name="warning-o"
        color="#FFA431"
        size="1rem"
        style="margin-top: 0.2rem"
      />
      <p>全额退款</p>
      <p>全额退款，放弃现金补贴</p>
    </van-dialog>
    <van-dialog
      v-model="askLiquor2"
      show-cancel-button
      cancel-button-text="取消"
      confirm-button-text="确认发货"
      confirm-button-color="#fff"
      class="text-center"
      @confirm="doneLiquor()"
    >
      <van-icon
        name="warning-o"
        color="#FFA431"
        size="1rem"
        style="margin-top: 0.2rem"
      />
      <p>立即发货</p>
      <p>发货后，您将失去7天无条件退款权益</p>
    </van-dialog>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import { remindOrder } from '@/api/BeeApi/user'
import {
  closeOrder,
  deleteOrder,
  completeOrder,
  reBuy,
  sendOrder
} from '@/api/BeeApi/order'
import { goPayFromOrder } from '@/utils/wxPay'

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
    return {
      BeeDefault,
      cancelPop: false,
      cancelReason: '',
      reasonList: [
        '多拍/拍错/不喜欢/不想要了',
        '商品属性规格选错',
        '地址信息填写错误',
        '商品暂时无货',
        '其他'
      ],
      askLiquor: false,
      askLiquor2: false
    }
  },
  computed: {
    cancelable() {
      if (this.orderDetail.cancelable === false) {
        return false
      } else {
        const orderDetail = this.orderDetail
        return (
          (orderDetail.s_pay === 0 && orderDetail.s_order !== -1) ||
          (orderDetail.s_pay === 1 && orderDetail.s_order === 1)
        )
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 去支付
    goPay(orderNo) {
      if (this.orderDetail.source === 'liquor') {
        goPayFromOrder(orderNo, '/#/beeAlcohol/paySuccess')
      } else {
        goPayFromOrder(orderNo)
      }
    },
    // 再次购买
    async buyAgain(order) {
      try {
        const res = await reBuy({
          order_no: order.order_no
        })
        if (res.status_code === 200) {
          if (res.data.url) {
            window.location.href = res.data.url
          } else {
            this.$toast('已加入购物车')
            this.$router.push('/cart')
          }
        }
      } catch (error) {
        this.$toast(error)
      }
    },
    // 提醒发货
    async remindDelivery() {
      const res = await remindOrder({ order_no: this.$route.query.order_no })
      if (res.status_code === 200) {
        this.$toast(res.message)
      }
    },
    // 取消订单
    async closeOrderData() {
      if (!this.cancelReason) {
        this.$toast('请选择取消订单原因')
        return
      }
      const res = await closeOrder({
        order_no: this.$route.query.order_no,
        reason: this.cancelReason
      })
      if (res.status_code === 200) {
        this.$toast(res.message)
        this.cancelPop = false
        this.$emit('change')
      }
    },
    // 删除订单
    async deleteOrderData() {
      const res = await deleteOrder({ order_no: this.$route.query.order_no })
      if (res.status_code === 200) {
        this.$toast(res.message)
        this.$router.back()
      }
    },
    // 确认收货（订单完成）
    async completeOrderData() {
      const res = await completeOrder({ order_no: this.$route.query.order_no })
      if (res.status_code === 200) {
        this.$toast(res.message)
        setTimeout(() => {
          window.location.reload()
        }, 1500)

        // this.$router.back()
      }
    },
    // 查看物流
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
    },
    // 去评价
    goComment(item) {
      if (item.uncomment >= 2) {
        this.$router.push({
          path: '/persion/order/comment/waitCommentOrder',
          query: { order_no: item.order_no }
        })
      } else {
        this.$router.push({
          path: '/persion/order/comment',
          query: { order_no: item.order_no, sku_id: item.products[0].sku_id }
        })
      }
    },
    liquorAction(order_no) {
      this.askLiquor = true
    },
    liquorAction2(order_no) {
      this.askLiquor2 = true
    },
    async doneLiquor() {
      const res = await sendOrder({ order_no: this.$route.query.order_no })
      if (res.status_code === 200) {
        this.$toast(res.message)
        this.askLiquor = false
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    },
    async closeLiquor() {
      const res = await closeOrder({ order_no: this.$route.query.order_no })
      if (res.status_code === 200) {
        this.$toast(res.message)
        this.askLiquor2 = false
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    }
  }
}
</script>

<style lang="less">
.order-detail2 {
  .order-detail-op {
    position: fixed;
    bottom: 0;
    height: 1rem;
    background-color: #fff;
    border-top: 0.02rem solid @Grey6;
    box-sizing: border-box;
    width: 100%;
    z-index: 1;
    padding: 0 0.32rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .left-button {
      flex: 1;
      text-align: left;
      .back-list {
        border: none;
        color: @Grey2;
        font-size: 0.26rem;
      }
    }
    .van-button {
      width: 1.6rem;
      height: 0.6rem;
      line-height: 0.6rem;
      padding: 0;
      margin-left: 0.2rem;
      font-size: 0.26rem;
      color: @Grey2;
      border-color: @Grey2;
    }
    .bee-button {
      border-color: #fff;
      background-color: @BeeDefault;
      color: #fff;
    }
    .cancel-pop {
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      .cancel-reason {
        .cancel-title {
          margin-top: 0.5rem;
          text-align: center;
        }
        .reason-content {
          margin-bottom: 1rem;
          .cancel-text {
            padding: 0.6rem 0.32rem;
            font-size: 0.26rem;
            color: @Grey1;
          }
          .van-radio {
            display: inline-block;
          }
        }
        .submit-cancel {
          background-color: @BeeDefault;
          color: #fff;
          font-size: 0.36rem;
          height: 1rem;
          text-align: center;
          line-height: 1rem;
        }
      }
    }
  }
  .van-dialog__confirm {
    color: #fff;
    background: #ffa431;
  }
}
</style>
