<template>
  <van-popup
    v-model="visible"
    position="bottom"
    class="select-coupon"
    :close-on-click-overlay="false"
    @close="handleClose()"
    @click-overlay="handleClose()"
  >
    <div class="container">
      <div style="margin: 0.4rem;text-align: center;font-size: 0.32rem">
        红包
      </div>
      <div class="desc">
        选择抵扣（可任意搭配 全额抵扣）
      </div>
      <!-- 优惠券列表 start-->
      <div class="coupons">
        <div v-for="item in selfCoupon" :key="item.id" class="coupon-item">
          <div class="checkbox">
            <van-checkbox
              v-model="item.checked"
              :checked-color="BeeDefault"
              :disabled="item.disable"
              @change="itemChange(item)"
            />
          </div>
          <div class="coupon-amount" :class="{'coupon-amount-disable': item.disable}">
            <div>
              <span class="rmb">￥</span>{{ item.amount }}
            </div>
          </div>
          <div class="description" :class="{'desc-disable': item.disable}">
            <div>
              <span class="hb">活动红包</span>仅可用于 [购一箱 送一万]钜惠活动的抵扣
            </div>
          </div>
        </div>
      </div>
      <!-- 优惠券列表 end-->
      <div style="text-align: center">
        <button class="submit" @click="handleClose()">
          完成
        </button>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  props: {
    visible: {
      // 是否显示
      type: Boolean,
      default: false
    },
    cashCoupon: {
      // 优惠券列表
      type: Array,
      default: () => []
    },
    orderAmount: {
      // 订单金额
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      BeeDefault,
      selfCoupon: [],
      deducted: 0
    }
  },
  watch: {
    cashCoupon(val) {
      this.selfCoupon = val
    }
  },
  mounted() {
    this.selfCoupon = this.cashCoupon
  },
  methods: {
    handleClose() {
      this.$emit('update:cashCoupon', this.selfCoupon)
      this.$emit('update:visible', false)
    },
    computeDisable() {
      this.selfCoupon.forEach(item => {
        if (this.deducted >= this.orderAmount && !item.checked) {
          item.disable = true
        }
        if (this.deducted < this.orderAmount && !item.checked) {
          item.disable = false
        }
      })
    },
    itemChange(item) {
      // 优惠券选择变换
      if (item.checked) {
        this.deducted += item.amount
      } else {
        this.deducted -= item.amount
      }
      this.computeDisable()
    }
  }
}
</script>

<style lang="less" scoped>
.select-coupon {
  background-color: white;
  border-top-right-radius: 0.20rem;
  border-top-left-radius: 0.20rem;
  .container {
    .desc {
      padding-left: 0.25rem;
      font-size: 0.28rem;
      color:rgba(153,153,153,1);
    }
    .coupons {
      padding: 0 0.25rem;
      max-height: 50vh;
      overflow-y: scroll;
      margin-top: 0.2rem;
      @coupon-height: 1.3rem;
      .coupon-item {
        margin-bottom: 0.2rem;
        display: grid;
        grid-template-columns: 0.6rem 2.28rem 1fr;
        height: @coupon-height;
        .checkbox {
          display: flex;
          align-items: center;
        }
        .coupon-amount {
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 0.56rem;
          font-weight: bold;
          background: url("../../../../assets/icon/alcohol/liqueur_order_red_envelope_bg_n.png");
          background-size: cover;
          .rmb {
            font-weight: normal;
            font-size: 0.28rem;
          }
        }
        .coupon-amount-disable {
          background: url("../../../../assets/icon/alcohol/liqueur_order_red_envelope_bg_d.png");
          background-size: cover;
        }
        .description {
          padding: 0.3rem 0.15rem;
          font-size: 0.24rem;
          font-weight: 500;
          color: @Grey12;
          display: flex;
          justify-items: flex-start;
          align-items: center;
          line-height: 1.6;
          background: rgba(255,245,233,1);
          .hb {
            padding: 0 0.15rem;
            background: linear-gradient(-20deg, #fc9829, #ff6e17);
            border-radius: 0.16rem;
            color: white;
            margin-right: 0.1rem;
          }
        }
        .desc-disable {
          background: rgba(244,244,244,1);;
        }
      }
    }
    .submit {
      background: @BeeDefault;
      width: 6.86rem;
      line-height: 0.9rem;
      border: unset;
      padding: 0;
      border-radius: 1rem;
      margin-top: 0.6rem;
      margin-bottom: 0.2rem;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
