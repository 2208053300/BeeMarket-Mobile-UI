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
      <div class="coupons">
        <div v-for="item in selfCoupon" :key="item.id" class="coupon-item">
          <div>
            <van-checkbox
              v-model="anonymous"
              :checked-color="BeeDefault"
            />
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
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
      selfCoupon: []
    }
  },
  watch: {
    cashCoupon(val) {
      this.selfCoupon = val
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
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
    padding: 0 0.25rem;
    .desc {
      font-size: 0.28rem;
      color:rgba(153,153,153,1);
    }
    .coupons {
      max-height: 50vh;
      overflow-y: scroll;
      .coupon-item {
        margin-bottom: 0.2rem;
        display: grid;
        grid-template-columns: 0.48rem 2.28rem 1fr;
      }
    }
  }
}
</style>
