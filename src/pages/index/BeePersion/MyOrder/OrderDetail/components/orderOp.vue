<template>
  <div class="order-op">
    <!-- <div class="left-button">
      <van-button class="back-list">
        返回订单列表
      </van-button>
    </div> -->
    <van-button
      v-if="orderDetail.s_pay===0 && orderDetail.s_order!==-1"
      round
      @click="cancelPop=true"
    >
      取消订单
    </van-button>
    <van-button
      v-if="[12,13].indexOf(orderDetail.status)!==-1"
      round
      class="bee-button"
    >
      自己接收
    </van-button>
    <van-button
      v-if="orderDetail.s_pay===0 && orderDetail.s_order!==-1"
      round
      class="bee-button"
    >
      去支付
    </van-button>
    <van-button
      v-if="orderDetail.s_pay===1&&[1].indexOf(orderDetail.s_order)!==-1"
      round
      @click="remindDelivery"
    >
      提醒发货
    </van-button>
    <van-button
      v-if="orderDetail.take_apart>1||[4,5,-1].includes(orderDetail.s_order)"
      round
      @click="deleteOrderData"
    >
      删除订单
    </van-button>

    <van-button
      v-if="orderDetail.s_pay===1&&[3,4].includes(orderDetail.s_order)"
      round
      @click="showLogistics(orderDetail)"
    >
      查看物流
    </van-button>
    <van-button
      v-if="[5,-1].includes(orderDetail.s_order)"
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
      v-if="orderDetail.s_pay===1&&[3].includes(orderDetail.s_order)"
      round
      class="bee-button"
      @click="completeOrderData(card.order_no)"
    >
      确认收货
    </van-button>
    <van-button
      v-if="[7].includes(orderDetail.status)"
      round
    >
      点击赠送
    </van-button>
    <van-button
      v-if="[8].includes(orderDetail.status)"
      round
      class="bee-button"
    >
      再次赠送
    </van-button>
    <van-popup
      v-model="cancelPop"
      position="bottom"
      class="cancel-pop"
    >
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
                <van-radio
                  :name="item"
                  :checked-color="BeeDefault"
                />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <div
          class="submit-cancel"
          @click="closeOrderData"
        >
          提交
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import { addShopcartProduct, remindOrder } from '@/api/BeeApi/user'
import { closeOrder, deleteOrder, completeOrder } from '@/api/BeeApi/order'

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
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 再次购买
    buyAgain(order) {
      order.products.map(async item => {
        await addShopcartProduct({
          sid: item.sku_id,
          number: item.number,
          product_source: order.t_order
        })
      })
      this.$toast('已加入购物车')
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
    }
  }
}
</script>

<style scoped lang="less">
.order-op {
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
        .van-radio{
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
</style>
