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
          ￥600
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
          ￥0
        </div>
      </van-cell>
      <van-cell class="deduction-content">
        <div
          slot="title"
          class="cell-title "
        >
          抵扣
          <div class="deduction-num">
            您共有500公益值，可抵扣50元
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
          ￥3000
        </div>
      </div>
      <van-button
        type="default"
        class="submit-button"
      >
        提交订单
      </van-button>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '../../../styles/variables.less'
import orderAddress from './components/orderAddress'
import commodityList from './components/commodityList'
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
      BeeDefault
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../../styles/variables.less";

.confirm-order {
  margin-top: 46px;
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
