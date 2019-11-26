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

      <!-- 没有公益值的时候隐藏 -->
      <van-cell v-if="order.orderDetail.cash_coupon" class="deduction-content" is-link @click="selectCouponVisible=true">
        <div
          slot="title"
          class="cell-title cell-deduction"
        >
          <div style="flex-shrink: 0">
            红包抵扣
          </div>
          <div class="deduction-num">
            {{ cash_coupon_total }}元现金红包
          </div>
        </div>
        <div style="display: flex;align-items: center;justify-content: flex-end">
          选择
        </div>
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
    <div class="submit-order">
      <div class="total-price">
        <div>
          <span>合计：</span>
          <div class="price-num">
            ￥{{ order.orderDetail.order_amount && order.orderDetail.order_amount.toFixed(2) }}
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
    <select-coupon
      :visible.sync="selectCouponVisible"
      :order-amount="4800"
      :cash-coupon="cash_coupon_list"
    />
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import orderAddress from './components/orderAddress'
import commodityList from './components/commodityList'
import SelectCoupon from '@/pages/BeeAlcohol/ConfirmOrder/components/SelectCoupon'
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
    commodityList,
    SelectCoupon
  },
  props: {},
  data() {
    return {
      BeeDefault,
      anonymous: false,
      selectCouponVisible: false,
      orderTypeText: 'general',
      balance_used: false,
      bakOrderAmount: 0,
      query: {
        os: 'liquor',
        product: {
          sid: 0,
          number: parseInt(this.$route.query.number)
        }
      }
    }
  },
  computed: {
    ...mapState(['order']),
    deductionText() {
      return '抵扣文案'
    },
    cash_coupon_total() {
      return this.order.orderDetail.cash_coupon.reduce(
        (total, item) => {
          return total + item.amount
        }, 0)
    },
    cash_coupon_list() {
      if (this.order.orderDetail.cash_coupon) {
        return this.order.orderDetail.cash_coupon
      } else {
        return []
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

    if (this.$route.query.origin === 'selectAddress') {
      this.addressChange()
    }
    this.confirmOrder()
  },
  methods: {
    // 确认订单信息
    async confirmOrder() {
      // 获取确认订单
      // const res = await confirmOrder(this.query)
      const res = JSON.parse('{"message":"OK","code":1,"status_code":200,"data":{"stores":[{"mid":1310,"store_name":"\u5fae\u60e0\u7535\u5b50\u5546\u52a1","is_free_freight":0,"meet_amount_free_freight":0,"products":[{"sid":170754,"pname":"\u6296\u97f3\u540c\u6b3e\u4e00\u6b21\u6027\u67d3\u53d1\u7c89\u997c\u5939","number":1,"sell_price":30,"tUrl":"https:\\/\\/img.fengjishi.com\\/product\\/album\\/2019\\/10\\/07111631rLXqVaf41Hy2tZce.jpeg?x-oss-process=style\\/Thumb","props_name":"6\u4e2a\u88c5\u67d3\u8272\u7c89\u997c"}],"merchant_price":30}],"addr":{"addr_id":9,"def":1,"tag":"home","name":"\u9ec4\u67d0\u4eba","mobileNum":"176****2556","address":"\u91cd\u5e86 \u91cd\u5e86 \u6e1d\u5317 \u9f99\u6eaa\u8857\u9053 \u6d4b\u8bd5\u5730\u5740"},"product_amount":30,"freight_amount":0,"order_amount":30,"charity_deduction":0,"charity_balance":2,"pgpackage_deduct":0,"charity_amount":200,"cash_balance":0,"cash_balance_str":"0","charity_balance_str":"2"}}')
      res.data.cash_coupon = [
        {
          id: 1,
          amount: 2000,
          checked: false,
          disable: false
        }, {
          id: 2,
          amount: 2000,
          checked: false,
          disable: false
        }, {
          id: 3,
          amount: 3000,
          checked: false,
          disable: false
        }, {
          id: 4,
          amount: 3000,
          checked: false,
          disable: false
        }
      ]
      if (res.status_code === 200) {
        this.$store.state.order.orderDetail = res.data
        this.$store.state.order.addrDetail = res.data.addr
        this.bakOrderAmount = res.data.order_amount
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
          anonymous: this.anonymous,
          os: this.$route.query.target || 'liquor',
          // 此处暂时无赠送好友ot不变
          ot: 'general'
        })
      )
      if (res.status_code === 200) {
        console.log(res)
        this.order.payInfo = res.data
        console.log('支付信息', res.data)
        if (this.orderTypeText === 'please') {
          this.$router.push('/category/details/payForAnother')
        } else if (this.orderTypeText === 'present') {
          this.$router.push('/category/details/giveFirends')
        } else {
          // 去支付
          goPayFromPayInfo(this.order.payInfo)
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
