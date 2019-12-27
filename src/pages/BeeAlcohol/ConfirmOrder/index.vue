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

      <!-- 没有买酒抵扣的时候隐藏 -->
      <van-cell
        v-if="order.orderDetail.cash_subsidy_amount"
        class="deduction-content"
      >
        <div
          slot="title"
          class="cell-title cell-deduction"
        >
          <div style="flex-shrink: 0">
            抵扣
          </div>
          <div class="deduction-num">
            {{ order.orderDetail.cash_subsidy_amount }}元现金补贴
          </div>
        </div>
        <van-checkbox
          slot="right-icon"
          v-model="cash_subsidy_used"
          :checked-color="BeeDefault"
        />
      </van-cell>
    </van-cell-group>
    <van-cell-group class="other-info2">
      <van-cell class="deduction-content">
        <div
          slot="title"
          class="cell-title "
        >
          匿名购买
        </div>
        <van-checkbox
          v-model="anonymous"
          :checked-color="BeeDefault"
        />
      </van-cell>
    </van-cell-group>
    <div v-if="order.orderDetail.cash_subsidy_amount" class="tips">
      注：使用现金补贴的订单不享受7天无条件全额退款权益。
    </div>
    <div class="submit-order">
      <div class="total-price">
        <div>
          <span>合计：</span>
          <div class="price-num">
            ￥{{ totalMount }}
          </div>
        </div>
        <div v-if="deductionText" style="color: gray;font-size: 0.22rem">
          {{ deductionText }}
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
import { hideShareIcon } from '@/utils/share'

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
      anonymous: false,
      selectCouponVisible: false,
      orderTypeText: 'general',
      balance_used: false,
      cash_subsidy_used: false,
      query: {
        os: 'liquor',
        product: {
          sid: parseInt(this.$route.query.sid),
          number: parseInt(this.$route.query.number)
        }
      }
    }
  },
  computed: {
    ...mapState(['order']),
    // 抵扣文案
    deductionText() {
      if (this.cash_subsidy_used) {
        const amount = this.order.orderDetail.order_amount - this.totalMount
        return `(现金补贴抵扣￥${amount})`
      } else {
        return ''
      }
    },
    // 订单总价
    totalMount() {
      if (this.cash_subsidy_used) {
        let amount = this.order.orderDetail.order_amount - this.order.orderDetail.freight_amount - this.order.orderDetail.cash_subsidy_amount
        if (amount < 0) {
          amount = 0
        }
        amount = amount + this.order.orderDetail.freight_amount
        return amount
      } else {
        return this.order.orderDetail.order_amount
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    // 在APP页面不显示header
    if (!getOs().isApp) {
      this.$store.state.app.beeHeader = true
      this.$store.state.app.beeFooter.show = false
    }
    hideShareIcon()
    if (this.$route.query.origin === 'selectAddress') {
      this.addressChange()
    }
    this.confirmOrder()
  },
  methods: {
    // 确认订单信息
    async confirmOrder() {
      // 获取确认订单
      const res = await confirmOrder(this.query)
      if (res.status_code === 200) {
        if (res.data.cash_subsidy_amount > 0) {
          this.cash_subsidy_used = true
        }
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
          addr_id: this.order.addrDetail.addr_id,
          stores: storeData,
          charity_used: false,
          balance_used: false,
          is_special_pgpackage: 0,
          anonymous: this.anonymous,
          os: 'liquor',
          // 此处暂时无赠送好友ot不变
          ot: 'general',
          cash_subsidy_used: this.cash_subsidy_used
        })
      )
      if (res.status_code === 200) {
        const osObj = getOs()
        this.order.payInfo = res.data
        if (osObj.isIphone && osObj.isApp) {
          window.webkit.messageHandlers.ToPayOrder.postMessage({
            payOrderJson: JSON.stringify(this.order.payInfo),
            isRechargePackage: false,
            ot: 'liquor'
          })
        } else if (osObj.isAndroid && osObj.isApp) {
          window.beeMarket.ToPayOrder(
            JSON.stringify(res),
            'liquor'
          )
          window.beeMarket.CloseThisActivity()
        } else {
          if (this.orderTypeText === 'please') {
            this.$router.push('/category/details/payForAnother')
          } else if (this.orderTypeText === 'present') {
            this.$router.push('/category/details/giveFirends')
          } else {
            // 去支付
            goPayFromPayInfo(this.order.payInfo, '/beeAlcohol#/paySuccess')
          }
        }
      }
    },
    // 地址改变
    async addressChange() {
      this.query.addr_id = this.$store.state.order.addrDetail.addr_id
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
    .cell-deduction {
      display: flex;
      align-items: center;
      width: 75vw;
    }
    .deduction-content {
      align-items: center;
      .van-cell__title {
        flex: 3;
      }
      .deduction-num {
        margin-left: 0.1rem;
        padding: 0.06rem;
        box-sizing: border-box;
        color: @BeeDefault;
        border: 0.02rem solid @BeeDefault;
        display: inline-block;
        font-size: 0.24rem;
        border-radius: 0.05rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
  .tips {
    margin-top: 0.2rem;
    margin-left: 0.3rem;
    color: @Grey1;
    font-size: 0.24rem;
    text-align: center;
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
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
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
