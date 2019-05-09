<template>
  <div class="order-detail">
    <div class="order-status">
      <div class="status-text">
        <!-- TODO 不确定赠送好友状态字段 -->
        <span v-if="orderDetail.status===15">(未支付)已取消</span>
        <!--
        <span v-if="orderDetail.status===0">待付款</span>
        <span v-if="orderDetail.status===1">待发货</span>
        <span v-if="[2,3].indexOf(orderDetail.status)!==-1">待收货</span>
        <span v-if="orderDetail.status===4">待评价</span>
        <span v-if="orderDetail.status===5">已完成</span>
        <span v-if="orderDetail.status===6">已取消</span>
        <span v-if="orderDetail.status===7">待赠送好友</span>
        <span v-if="orderDetail.status===8">待好友接收</span>
        <span v-if="orderDetail.status===9">（好友已接收）待发货</span>
        <span v-if="orderDetail.status===10">（好友已接收）待收货</span>
        <span v-if="orderDetail.status===11">（好友已接收）已完成</span>
        <span v-if="orderDetail.status===12">（未赠送）待处理</span>
        <span v-if="orderDetail.status===13">（赠送超时未接收）待处理</span>
        <span v-if="orderDetail.status===14">（好友未接收）待付款</span>
        <span v-if="orderDetail.status===16">(未处理)已取消</span>
         -->
      </div>
      <span
        v-if="[0,7,8,12].indexOf(orderDetail.status)!==-1"
        class="status-text2"
      >
        <!-- TODO 这里是时分秒倒计时？ -->
        剩余时间: {{ orderDetail.payTime }}
      </span>
      <span
        v-if="[6].indexOf(orderDetail.status)!==-1"
        class="status-text2"
      >
        {{ orderDetail.statusText }}
      </span>
    </div>
    <div class="detail-content">
      <order-address
        :order-detail="orderDetail"
        class="details-card"
      />
      <commodity-list
        :order-detail="orderDetail"
        class="details-card"
      />
      <div class="order-detail2 details-card">
        <div class="details2-title">
          订单信息
        </div>
        <div class="details2-content">
          <div class="details2-text">
            订单编号：{{ orderDetail.orderNum }}
          </div>
          <div class="details2-text">
            下单时间：{{ orderDetail.time1 }}
          </div>
          <div
            v-if="[6].indexOf(orderDetail.status)!==-1"
            class="details2-text"
          >
            取消时间：{{ orderDetail.time1 }}
          </div>
          <div
            v-if="[6].indexOf(orderDetail.status)===-1"
            class="details2-text"
          >
            支付方式：{{ orderDetail.payWay }}
          </div>
          <div
            v-if="[6].indexOf(orderDetail.status)===-1"
            class="details2-text"
          >
            支付时间：{{ orderDetail.time2 }}
          </div>
        </div>
      </div>
    </div>
    <order-op :order-detail="orderDetail" />
    <bee-guess />
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/user'
import orderAddress from './components/orderAddress'
import commodityList from './components/commodityList'
import orderOp from './components/orderOp'
import BeeGuess from '@/components/index/BeeGuess'

export default {
  metaInfo: {
    title: '订单详情'
  },
  components: {
    orderAddress,
    commodityList,
    orderOp,
    BeeGuess
  },
  props: {},
  data() {
    return {
      orderDetail: {
        addressData: {},
        product: []
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getOrderDetailData()
  },
  methods: {
    async getOrderDetailData() {
      const res = await getOrderDetail()
      this.orderDetail = res.data.orderData
    }
  }
}
</script>

<style scoped lang="less">
.order-detail {
  margin-top: 46px;
  padding-bottom: 1rem;
  .order-status {
    height: 1.8rem;
    color: #ffffff;
    background-color: @BeeDefault;
    padding: 0.5rem 0.32rem 0.66rem;
    box-sizing: border-box;
    .status-text {
      margin-bottom: 0.2rem;
      font-size: 0.32rem;
    }
    .status-text2 {
      font-size: 0.26rem;
    }
  }
  .detail-content {
    position: relative;
    top: -0.16rem;
    margin: 0 0.16rem;
    .details-card {
      background-color: #fff;
      border-radius: 0.2rem;
      box-sizing: border-box;
    }
    .order-detail2 {
      .details2-title {
        padding: 0.32rem 0.3rem 0.3rem;
        border-bottom: 0.02rem solid @Grey6;
        font-size: 0.26rem;
      }
      .details2-content {
        padding: 0.3rem 0.2rem 0.4rem;
        .details2-text {
          font-size: 0.26rem;
          color: @Grey1;
          &:not(:last-child) {
            margin-bottom: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
