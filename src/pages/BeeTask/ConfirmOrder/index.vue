<template>
  <div class="confirm-order">
    <order-address />
    <commodity-list />
    <van-cell-group class="other-info1">
      <van-cell>
        <div
          slot="title"
          class="cell-title"
        >
          商品总额
        </div>
        <div class="cell-val">
          ￥{{ order.orderDetail.product_amount }}
        </div>
      </van-cell>
      <van-cell>
        <div
          slot="title"
          class="cell-title"
        >
          运费
        </div>
        <div class="cell-val">
          ￥{{ order.orderDetail.freight_amount||0 }}
        </div>
      </van-cell>
    </van-cell-group>
    <div class="submit-order">
      <div class="total-price">
        <span>合计：</span>
        <div class="price-num">
          ￥{{ order.orderDetail.order_amount }}
        </div>
      </div>
      <van-button
        type="default"
        class="submit-button"
        @click="createOrderData"
      >
        提交订单
      </van-button>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import orderAddress from './components/orderAddress'
import commodityList from './components/commodityList'
import { mapState } from 'vuex'
import { createOrder } from '@/api/BeeApi/order'
import { goPayFromPayInfo } from '@/utils/wxPay'
import { confirmOrder } from '@/api/BeeApi/order'
import { getOs } from '@/utils'

export default {
  metaInfo: {
    title: '确认订单'
  },
  components: {
    orderAddress,
    commodityList
  },
  props: {},
  data() {
    return {
      BeeDefault,
      orderType: false,
      anonymous: false,
      charity_used: false,
      orderTypeText: 'general',
      joinBee: true
    }
  },
  computed: {
    ...mapState(['order'])
  },
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    if (this.$route.query.target === 'pgpackage') {
      this.confirmGiftPackageOrder()
    } else {
      if (JSON.stringify(this.order.orderDetail) === '{}') {
        this.$router.go(-1)
        return
      }
      if (this.$route.query.origin === 'selectAddress') {
        this.addressChange()
      }
    }
  },
  methods: {
    // 确认礼包订单信息
    async confirmGiftPackageOrder() {
      // 获取确认订单
      const res = await confirmOrder(
        JSON.stringify({
          os: 'pgpackage'
        })
      )
      if (res.status_code === 200) {
        this.$store.state.order.orderDetail = res.data
        this.$store.state.order.addrDetail = res.data.addr
        if (this.order.orderDetail.stores.length === 0) {
          this.$router.go(-1)
        }
      }
    },
    async createOrderData() {
      if (!this.order.addrDetail) {
        this.$toast('请选择收货地址')
        return
      }
      const storeData = []
      // 获取商品数据
      this.order.orderDetail.stores.map((item, index) => {
        storeData[index] = {}
        storeData[index].mid = item.mid
        storeData[index].note = item.note
        storeData[index].products = []
        item.products.map((item2, index2) => {
          storeData[index].products[index2] = {}
          storeData[index].products[index2].sid = item2.sid
          storeData[index].products[index2].number = item2.number
        })
      })
      // TODO 缺少农副产品和限量蜂抢字段获取
      const res = await createOrder(
        JSON.stringify({
          tid: this.$route.query.tid,
          addr_id: this.order.addrDetail.addr_id,
          stores: storeData,
          charity_used: this.charity_used,
          anonymous: this.anonymous,
          os: this.$route.query.target || 'general',
          // 此处暂时无赠送好友ot不变
          ot: 'general'
        })
      )
      if (res.status_code === 200) {
        const osObj = getOs()
        this.order.payInfo = res.data
        if (osObj.isWx) {
          if (this.orderTypeText === 'please') {
            this.$router.push('/category/details/payForAnother')
          } else if (this.orderTypeText === 'present') {
            this.$router.push('/category/details/giveFirends')
          } else {
            // 去支付
            goPayFromPayInfo(this.order.payInfo)
          }
        } else if (osObj.isIphone && osObj.isApp) {
          window.webkit.messageHandlers.ToPayOrder.postMessage({
            payOrderJson: JSON.stringify(this.order.payInfo),
            isRechargePackage: false,
            ot: 'general'
          })
        } else if (osObj.isAndroid && osObj.isApp) {
          window.beeMarket.ToPayOrder(
            JSON.stringify(res),
            'general'
          )
          window.beeMarket.CloseThisActivity()
        } else {
          if (this.orderTypeText === 'please') {
            this.$router.push('/category/details/payForAnother')
          } else if (this.orderTypeText === 'present') {
            this.$router.push('/category/details/giveFirends')
          } else {
            // 去支付
            goPayFromPayInfo(this.order.payInfo)
          }
        }
      }
    },
    changeOt(val) {
      if (val) {
        this.orderTypeText = 'please'
      } else {
        this.orderTypeText = 'general'
      }
    },
    deductionMoney(checked) {
      if (checked) {
        this.order.orderDetail.order_amount =
          this.order.orderDetail.order_amount -
          this.order.orderDetail.charity_deduction
      } else {
        this.order.orderDetail.order_amount =
          this.order.orderDetail.order_amount +
          this.order.orderDetail.charity_deduction
      }
    },
    // 地址改变
    async addressChange() {
      const params = this.$store.state.order.confirmOrderParams
      params.addr_id = this.$store.state.order.addrDetail.addr_id
      const res = await confirmOrder(params)
      if (res.status_code === 200) {
        this.$store.state.order.orderDetail = res.data
      }
    }
  }
}
</script>

<style scoped lang="less">
.confirm-order {
  padding-bottom: 60px;
  .other-info1 {
    border-top-right-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
    overflow: hidden;
    .cell-title {
      font-size: 0.28rem;
    }
    .deduction-content {
      align-items: center;
      .van-cell__title {
        flex: 3;
      }
      .deduction-num {
        margin-left: 0.24rem;
        padding: 0.06rem;
        box-sizing: border-box;
        color: @BeeDefault;
        border: 0.02rem solid @BeeDefault;
        display: inline-block;
        font-size: 0.24rem;
        border-radius: 0.05rem;
      }
    }
  }
  .other-info2 {
    margin-top: 0.2rem;
    .cell-title {
      font-size: 0.28rem;
    }
    .van-cell__value {
      flex: 2;
      .benefit-text {
        font-size: 0.24rem;
        color: @Grey2;
      }
      .van-checkbox {
        margin-left: 0.3rem;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .submit-order {
    z-index: 2;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    height: 0.98rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .total-price {
      font-size: 0.24rem;
      color: @Grey2;
      margin-right: 0.32rem;
      .price-num {
        font-size: 0.28rem;
        color: @BeeDefault;
        display: inline-block;
        vertical-align: text-top;
      }
    }
    .submit-button {
      background-color: @BeeDefault;
      color: #ffffff;
      font-size: 0.32rem;
      height: 0.98rem;
      line-height: 0.98rem;
    }
  }
}
</style>
