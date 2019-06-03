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
          ￥{{ order.orderDetail.freight_amount }}
        </div>
      </van-cell>
      <van-cell class="deduction-content">
        <div
          slot="title"
          class="cell-title "
        >
          抵扣
          <div class="deduction-num">
            您共有{{ order.orderDetail.charity_amount }}公益值，可抵扣{{ order.orderDetail.charity_deduction }}元
          </div>
        </div>
        <van-switch />
      </van-cell>
    </van-cell-group>
    <van-cell-group class="other-info2">
      <van-cell class="benefit-content">
        <div
          slot="title"
          class="cell-title"
        >
          峰公益
        </div>
        <span class="benefit-text">将我的消费计入公益值</span>
        <van-checkbox />
      </van-cell>
      <!-- TODO赠送好友取消该选项 -->
      <van-cell>
        <div
          slot="title"
          class="cell-title"
        >
          朋友代付
        </div>
        <van-checkbox />
      </van-cell>
      <van-cell class="deduction-content">
        <div
          slot="title"
          class="cell-title "
        >
          匿名购买
        </div>
        <van-checkbox />
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
      charity_used: false
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
  },
  methods: {
    async createOrderData() {
      const storeData = []
      // 获取商品数据
      this.order.orderDetail.map((item, index) => {
        storeData[index].mid = item.mid
        storeData[index].note = item.note
        item.map((item2, index2) => {
          storeData[index].products[index2].sid = item2.sid
          storeData[index].products[index2].number = item2.number
        })
      })
      const res = await createOrder(
        JSON.stringify({
          addr_id: this.order.addrDetail.addr_id,
          stores: storeData,
          charity_used: this.charity_used,
          anonymous: this.anonymous,
          ot: this.orderType ? 'please' : 'general',
          os: this.order.source
        })
      )
      if (res.status_code === 200) {
        console.log(res)
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
