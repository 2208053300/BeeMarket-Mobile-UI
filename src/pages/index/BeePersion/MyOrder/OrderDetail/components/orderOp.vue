<template>
  <div class="order-op">
    <!-- <div class="left-button">
      <van-button class="back-list">
        返回订单列表
      </van-button>
    </div> -->
    <van-button
      v-if="orderDetail.s_pay===0"
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
      v-if="orderDetail.s_pay===0"
      round
    >
      朋友代付
    </van-button>
    <van-button
      v-if="orderDetail.s_pay===0"
      round
      class="bee-button"
    >
      去支付
    </van-button>
    <van-button
      v-if="orderDetail.s_pay===1&&orderDetail.s_order===1"
      round
      @click="remindDelivery"
    >
      提醒发货
    </van-button>
    <van-button
      v-if="[4,5,6,11,15].indexOf(orderDetail.status)!==-1"
      round
      @click="deleteOrderData"
    >
      删除订单
    </van-button>

    <van-button
      v-if="orderDetail.s_pay===1&&[3].indexOf(orderDetail.s_order)"
      round
    >
      查看物流
    </van-button>
    <van-button
      v-if="[5,6,11,15].indexOf(orderDetail.status)!==-1"
      round
      class="bee-button"
      @click="buyAgain(orderDetail)"
    >
      再次购买
    </van-button>
    <van-button
      v-if="[4].indexOf(orderDetail.status)!==-1"
      round
      class="bee-button"
    >
      去评价
    </van-button>
    <van-button
      v-if="orderDetail.s_pay===1&&[3].indexOf(orderDetail.s_order)"
      round
      class="bee-button"
    >
      确认收货
    </van-button>
    <van-button
      v-if="[7].indexOf(orderDetail.status)!==-1"
      round
    >
      点击赠送
    </van-button>
    <van-button
      v-if="[8].indexOf(orderDetail.status)!==-1"
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
                title="1.多拍/拍错/不喜欢/不想要了"
                clickable
                @click="cancelReason = '多拍/拍错/不喜欢/不想要了'"
              >
                <van-radio
                  name="1"
                  :checked-color="BeeDefault"
                />
              </van-cell>
              <van-cell
                title="2.商品属性规格选错"
                clickable
                @click="cancelReason = '商品属性规格选错'"
              >
                <van-radio
                  name="2"
                  :checked-color="BeeDefault"
                />
              </van-cell>
              <van-cell
                title="3.地址信息填写错误"
                clickable
                @click="cancelReason = '地址信息填写错误'"
              >
                <van-radio
                  name="3"
                  :checked-color="BeeDefault"
                />
              </van-cell>
              <van-cell
                title="4.商品暂时无货"
                clickable
                @click="cancelReason = '商品暂时无货'"
              >
                <van-radio
                  name="4"
                  :checked-color="BeeDefault"
                />
              </van-cell>
              <van-cell
                title="5.其他"
                clickable
                @click="cancelReason = '其他'"
              >
                <van-radio
                  name="5"
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
import { closeOrder, deleteOrder } from '@/api/BeeApi/order'

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
      cancelReason: ''
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
      const res = await closeOrder({
        order_no: this.$route.query.order_no,
        reason: this.cancelReason
      })
      if (res.status_code === 200) {
        this.$toast(res.message)
      }
    },
    // 删除订单
    async deleteOrderData() {
      const res = await deleteOrder({ order_no: this.$route.query.order_no })
      if (res.status_code === 200) {
        this.$toast(res.message)
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
