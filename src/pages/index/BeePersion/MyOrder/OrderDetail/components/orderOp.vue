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
    >
      提醒发货
    </van-button>
    <van-button
      v-if="[4,5,6,11,15].indexOf(orderDetail.status)!==-1"
      round
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
                title="我不想要了1"
                clickable
                @click="cancelReason = '1'"
              >
                <van-radio
                  name="1"
                  :checked-color="BeeDefault"
                />
              </van-cell>
              <van-cell
                title="我不想要了2"
                clickable
                @click="cancelReason = '2'"
              >
                <van-radio
                  name="2"
                  :checked-color="BeeDefault"
                />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <div class="submit-cancel">
          提交
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
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
  methods: {}
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
