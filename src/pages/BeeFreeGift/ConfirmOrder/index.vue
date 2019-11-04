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
      <van-cell v-if="order.orderDetail.pgpackage_deduct > 0 ">
        <div
          slot="title"
          class="cell-title"
        >
          礼包抵扣
        </div>
        <div class="cell-val">
          -￥{{ order.orderDetail.pgpackage_deduct }}
        </div>
      </van-cell>

      <!-- 没有余额的时候隐藏 -->
      <van-cell v-if="bakOrderAmount > 0 && order.orderDetail.cash_balance > 0" class="deduction-content">
        <div
          slot="title"
          class="cell-title cell-deduction"
        >
          <div style="flex-shrink: 0">
            收益抵扣
          </div>
          <span class="deduction-num">
            您的收益{{ order.orderDetail.cash_balance }}元，可抵扣{{ order.orderDetail.cash_balance }}元
          </span>
        </div>
        <van-switch
          v-model="balance_used"
          :active-color="BeeDefault"
          :disabled="balance_disabled"
          size="20px"
          @change="deductionBalanceMoney"
        />
      </van-cell>

      <!-- 没有公益值的时候隐藏 -->
      <van-cell v-if="bakOrderAmount > 0 && order.orderDetail.charity_balance > 0" class="deduction-content">
        <div
          slot="title"
          class="cell-title cell-deduction"
        >
          <div style="flex-shrink: 0">
            公益值抵扣
          </div>
          <div class="deduction-num">
            您共有{{ order.orderDetail.charity_amount }}公益值，可抵扣{{ order.orderDetail.charity_balance }}元
          </div>
        </div>
        <van-switch
          v-model="charity_used"
          :active-color="BeeDefault"
          :disabled="charity_disabled"
          size="20px"
          @change="deductionCharityMoney"
        />
      </van-cell>
    </van-cell-group>
    <van-cell-group class="other-info2">
      <van-cell class="benefit-content">
        <div
          slot="title"
          class="cell-title"
        >
          公益宝贝
        </div>
        <span class="benefit-text">将我的消费计入公益值</span>
        <van-checkbox
          v-model="joinBee"
          :checked-color="BeeDefault"
        />
      </van-cell>
      <!-- TODO赠送好友取消该选项 -->
      <!-- <van-cell v-if="orderTypeText!=='present'">
        <div
          slot="title"
          class="cell-title"
        >
          朋友代付
        </div>
        <van-checkbox
          v-model="orderType"
          :checked-color="BeeDefault"
          @change="changeOt"
        />
      </van-cell> -->
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
            ￥{{ order.orderDetail.order_amount }}
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
      joinBee: true,
      bakOrderAmount: 0,
      balance_used: false,
      balance_disabled: false,
      charity_disabled: false
    }
  },
  computed: {
    ...mapState(['order']),
    deductionText() {
      if (this.balance_used && this.charity_used) {
        let charityDeduction = this.order.orderDetail.charity_balance
        const balanceDeductionAfter = this.bakOrderAmount - this.order.orderDetail.cash_balance
        if (balanceDeductionAfter < charityDeduction) {
          charityDeduction = balanceDeductionAfter
        }
        return `(收益已抵扣￥${this.order.orderDetail.cash_balance}；公益值已抵扣￥${charityDeduction})`
      } else if (this.balance_used && !this.charity_used) {
        const balanceDeduction = this.order.orderDetail.cash_balance >= this.bakOrderAmount ? this.bakOrderAmount
          : this.order.orderDetail.cash_balance
        return `(收益已抵扣￥${balanceDeduction})`
      } else if (!this.balance_used && this.charity_used) {
        const charityDeduction = this.order.orderDetail.charity_balance >= this.bakOrderAmount ? this.bakOrderAmount
          : this.order.orderDetail.charity_balance
        return `(公益值已抵扣￥${charityDeduction})`
      } else {
        return ''
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.bakOrderAmount = this.order.orderDetail.order_amount
    if (this.$route.query.target === 'pgpackage') {
      this.confirmGiftPackageOrder()
    } else {
      if (JSON.stringify(this.order.orderDetail) === '{}') {
        this.$router.go(-1)
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
          sid: this.$route.query.sid || this.$store.state.cart.sid,
          addr_id: this.order.addrDetail.addr_id,
          stores: storeData,
          charity_used: this.charity_used,
          balance_used: this.balance_used,
          anonymous: this.anonymous,
          // os: this.$route.query.target || 'general',
          os: 'general|present',
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
    // 余额抵扣状态改变
    deductionBalanceMoney(checked) {
      const cash_balance = this.order.orderDetail.cash_balance
      const charity_balance = this.order.orderDetail.charity_balance
      if (checked) {
        const cash_balance_after = this.bakOrderAmount - cash_balance // 余额抵扣后的金额
        const charity_deduction_after = this.bakOrderAmount - charity_balance // 公益值抵扣后的金额
        // 余额能全部抵扣
        if (cash_balance_after <= 0) {
          // 公益值抵扣开关选中
          if (this.charity_used) {
            // 关掉开关
            this.charity_used = false
          }
          // 公益值不能全部抵扣则禁用公益值抵扣开关
          this.charity_disabled = charity_deduction_after > 0
        }
        // 计算扣除后的金额
        // 公益值抵扣开启
        if (this.charity_used) {
          this.order.orderDetail.order_amount = this.bakOrderAmount - cash_balance - charity_balance
        } else {
          this.order.orderDetail.order_amount = this.bakOrderAmount - cash_balance
        }
        if (this.order.orderDetail.order_amount < 0) {
          this.order.orderDetail.order_amount = 0
        }
      } else {
        this.charity_disabled = false
        if (this.charity_used) {
          this.order.orderDetail.order_amount = this.bakOrderAmount - charity_balance
        } else {
          this.order.orderDetail.order_amount = this.bakOrderAmount
        }
      }
    },
    // 公益值抵扣状态改变
    deductionCharityMoney(checked) {
      const cash_balance = this.order.orderDetail.cash_balance
      const charity_balance = this.order.orderDetail.charity_balance
      if (checked) {
        const cash_balance_after = this.bakOrderAmount - cash_balance // 余额抵扣后的金额
        const charity_deduction_after = this.bakOrderAmount - charity_balance // 公益值抵扣后的金额
        // 公益值能全部抵扣
        if (charity_deduction_after <= 0) {
          // 余额抵扣开关选中
          if (this.balance_used) {
            // 关掉开关
            this.balance_used = false
          }
          // 余额不能全部抵扣则禁用余额抵扣开关
          this.balance_disabled = cash_balance_after > 0
        }
        // 计算扣除后的金额
        // 公益值抵扣开启
        if (this.balance_used) {
          this.order.orderDetail.order_amount = this.bakOrderAmount - cash_balance - charity_balance
        } else {
          this.order.orderDetail.order_amount = this.bakOrderAmount - charity_balance
        }
        if (this.order.orderDetail.order_amount < 0) {
          this.order.orderDetail.order_amount = 0
        }
      } else {
        this.balance_disabled = false
        if (this.balance_used) {
          this.order.orderDetail.order_amount = this.bakOrderAmount - cash_balance
        } else {
          this.order.orderDetail.order_amount = this.bakOrderAmount
        }
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
        margin-left: 0.05rem;
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
