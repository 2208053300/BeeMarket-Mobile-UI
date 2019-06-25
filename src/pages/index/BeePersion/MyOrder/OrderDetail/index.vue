<template>
  <div class="order-detail">
    <div class="order-status">
      <div class="status-text">
        <!-- TODO 不确定赠送好友状态字段 -->
        <span>{{ getText1() }}</span>
        <!--
        <span v-if="orderDetail.status===15">(未支付)已取消</span>
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
        <span
          v-if="orderDetail.s_pay===0 && orderDetail.s_order !== -1"
          class="status-text2"
        >
          <!-- TODO 这里是时分秒倒计时？ -->
          剩余时间: {{ orderDetail.count_down|getTime }}
        </span>
        <span
          v-if="[-1].indexOf(orderDetail.s_order)!==-1"
          class="status-text2"
        >
          {{ orderDetail.canceled_reason }}
        </span>
      </div>
      <div class="bag-img">
        <img
          :src="beeIcon.mine_order_buymyself_img_top_box"
          alt=""
        >
      </div>
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
          <div
            v-if="orderDetail.note"
            class="details2-text"
          >
            订单留言：{{ orderDetail.note }}
          </div>
          <div class="details2-text">
            订单编号：{{ orderDetail.order_no }}
          </div>
          <div class="details2-text">
            下单时间：{{ orderDetail.created_at }}
          </div>
          <div
            v-if="[-1].indexOf(orderDetail.s_order)!==-1"
            class="details2-text"
          >
            取消时间：{{ orderDetail.canceled_at }}
          </div>
          <div
            v-if="orderDetail.s_pay!==0"
            class="details2-text"
          >
            支付方式：{{ orderDetail.pay_method_name }}
          </div>
          <div
            v-if="orderDetail.s_pay!==0"
            class="details2-text"
          >
            支付时间：{{ orderDetail.paid_at }}
          </div>
        </div>
      </div>
    </div>
    <order-op :order-detail="orderDetail" @change="getOrderDetailData" />
    <bee-guess :guess-data="orderDetail.guess" />
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/BeeApi/user'
import orderAddress from './components/orderAddress'
import commodityList from './components/commodityList'
import orderOp from './components/orderOp'
import BeeGuess from '@/components/index/BeeGuess'
import { formatSeconds } from '@/utils'
import { clearInterval, setInterval } from 'timers'

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
  filters: {
    getTime(val) {
      const timeStr = formatSeconds(val)
      return timeStr
    }
  },
  props: {},
  data() {
    return {
      orderDetail: {
        addressData: {},
        product: []
      },
      beeIcon: {
        mine_order_buymyself_img_top_box: require('@/assets/icon/order/mine_order_buymyself_img_top_box@2x.png')
      },
      timer: ''
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
      const res = await getOrderDetail({
        order_no: this.$route.query.order_no
      })
      this.orderDetail = res.data
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.orderDetail.count_down--
        if (this.orderDetail.count_down === 0) {
          clearInterval(this.timer)
          window.location.reload()
        }
      }, 1000)
    },
    // 获取订单状态文字
    getText1(val) {
      let text1 = ''
      switch (this.orderDetail.s_pay) {
        case 0:
          text1 = '待付款'
          break
        case 1:
          break
        default:
          break
      }
      switch (this.orderDetail.s_order) {
        case 1:
          text1 = '待发货'
          break
        case 3:
          text1 = '待收货'
          break
        case 4:
          text1 = '待评价'
          break
        case 5:
          text1 = '已完成'
          break
        case -1:
          text1 = '已取消'
          break
        default:
          break
      }
      return text1
    }
  }
}
</script>

<style scoped lang="less">
.order-detail {
  padding-bottom: 1rem;
  .order-status {
    height: 1.8rem;
    color: #ffffff;
    background-color: @BeeDefault;
    padding: 0.5rem 0.32rem 0.66rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .status-text {
      font-size: 0.32rem;
      .status-text2 {
        margin-top: 0.2rem;
        font-size: 0.26rem;
        display: block;
      }
    }
    .bag-img {
      width: 1.38rem;
      height: 1.21rem;
      align-self: center;
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
