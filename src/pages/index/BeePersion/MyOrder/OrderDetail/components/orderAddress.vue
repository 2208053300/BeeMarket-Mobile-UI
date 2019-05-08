<template>
  <div class="order-address">
    <div
      v-if="[2,3,4,5,9,10,11].indexOf(orderDetail.status)!==-1"
      class="order-logistics"
    >
      <van-icon
        name="location-o"
        size="0.40rem"
      />
      <div class="logistics-text">
        <!-- TODO 未录入与拆分判断 -->
        <div class="logistics-text2">
          您的订单正由平台积极处理中，请耐心等待
        </div>
        <div class="logistics-time">
          2019
        </div>
      </div>
      <van-icon
        name="arrow"
        class="arrow-icon"
      />
    </div>
    <div
      v-if="[7,8,9,10,11,12,14,15,16].indexOf(orderDetail.status)===-1"
      class="default-address"
    >
      <van-icon
        name="location-o"
        size="0.40rem"
      />
      <div class="address-details">
        <div class="user-details">
          <span class="name">{{ orderDetail.addressData.username }}</span>
          <span
            v-if="orderDetail.addressData.phone"
            class="phone"
          >{{ orderDetail.addressData.phone|toTel }}</span>
        </div>
        <div class="address">
          <div class="address-details">
            {{ orderDetail.addressData.details }}
          </div>
        </div>
      </div>
      <van-icon
        name="arrow"
        color="#ffffff"
      />
    </div>
    <div
      v-if="[7,8,9,10,11,12].indexOf(orderDetail.status)!==-1"
      class="gift-status"
    >
      <div class="status-title">
        <span v-if="[12,13].indexOf(orderDetail.status)===-1">赠送成功</span>
        <span v-else>赠送失败</span>
      </div>
      <div
        v-if="[12,13,16].indexOf(orderDetail.status)===-1"
        class="gift-detail"
      >
        <div>您的好友张三接受了您赠送的商品</div>
      </div>
      <div
        v-else-if="[12].indexOf(orderDetail.status)!==-1"
        class="gift-detail"
      >
        <div>您未在指定时间内将订单赠送好友</div>
        <div>您可以在剩余的时间内选择自己接收，超出将自动取消订单</div>
      </div>
      <div
        v-else-if="[13].indexOf(orderDetail.status)!==-1"
        class="gift-detail"
      >
        <div>您的好友暂未领取您的赠送商品</div>
        <div>您可以在剩余的时间内选择自己接收，超出将自动取消订单</div>
      </div>
      <div
        v-else-if="[16].indexOf(orderDetail.status)!==-1"
        class="gift-detail"
      >
        <div>您未在规定时间内操作</div>
        <div>系统已自动取消订单，退款已原路返回至您的账户</div>
      </div>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  components: {},
  filters: {
    // NOTE 隐藏手机号
    toTel(value) {
      value = value.toString()
      return value.substr(0, 3) + '****' + value.substr(7)
    }
  },
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
      BeeDefault
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
.order-address {
  background-color: #fff;
  .order-logistics {
    padding: 0.3rem 0.16rem 0.4rem 0.3rem;
    border-bottom: 0.02rem solid @Grey6;
    color: @BeeDefault;
    font-size: 0.24rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logistics-text {
      flex: 1;
      margin-left: 0.3rem;
      .logistics-text2 {
      }
      .logistics-time {
        margin-top: 0.2rem;
      }
    }
  }
  .default-address {
    padding: 0.32rem 0.3rem 0.32rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    .address-details {
      margin-left: 0.3rem;
      .user-details {
        font-size: 0.24rem;
        .name {
          margin-right: 0.2rem;
        }
      }
      .address {
        margin-top: 0.2rem;
        font-size: 0.24rem;
        display: flex;
        align-items: center;
        .address-details {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-left: 0;
          max-width: 6rem;
        }
      }
    }
  }
  .gift-status {
    padding: 0.32rem;
    margin-bottom: 0.2rem;
    .status-title {
      font-size: 0.26rem;
    }
    .gift-detail {
      div {
        font-size: 0.26rem;
        color: @Grey2;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
