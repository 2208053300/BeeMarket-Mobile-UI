<template>
  <div>
    <van-row class="persion-order">
      <van-cell
        title="我的订单"
        is-link
        value="查看全部订单"
        to="/persion/order"
      />
      <!-- TODO 跳转时带上订单状态，安装后直接切换标签栏 -->
      <div class="order-op">
        <div class="op-type">
          <div class="op-text">
            <van-icon
              name="paid"
              :color="BeeDefault"
            />
            待付款
          </div>
          <div class="op-text">
            <van-icon
              name="logistics"
              :color="BeeDefault"
            />
            待发货
          </div>
          <div class="op-text">
            <van-icon
              name="completed"
              :color="BeeDefault"
            />
            待收货
          </div>
          <div class="op-text">
            <van-icon
              name="chat-o"
              :color="BeeDefault"
            />
            待评价
          </div>
          <div class="op-text">
            <van-icon
              name="after-sale"
              :color="BeeDefault"
            />
            退换/售后
          </div>
        </div>
        <div class="order-status">
          <van-row>
            <van-col span="6">
              <div class="order-img">
                <img
                  src=""
                  alt=""
                >
              </div>
            </van-col>
            <van-col span="12">
              <div class="status-time">
                2019.04.01 17:00:00
              </div>
              <div class="status-dot" />
              <div class="status-details">
                【重庆市】快件已到达重庆
              </div>
            </van-col>
            <van-col span="6">
              <!-- TODO 动态变更颜色 -->
              <div class="status-text">
                运输中
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-row>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  components: {},
  props: {},
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
.persion-order {
  background-color: #fff;

  .van-cell:not(:last-child)::after {
    left: 0;
  }
  .van-cell {
    .van-cell__title {
      color: @ProductName;
      font-size: 0.32rem;
      font-weight: 700;
    }
    .van-cell__value {
      font-size: 0.22rem;
      color: @Grey3;
    }
  }
  .order-op {
    padding: 0.3rem;
    .op-type {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 0.6rem;
      .op-text {
        font-size: 0.26rem;
        text-align: center;
        white-space: nowrap;
        .van-icon {
          display: block;
          font-size: 0.5rem;
          margin-bottom: 0.1rem;
        }
      }
    }
  }
  .order-status {
    background-color: @GreyBg;
    margin-top: 0.3rem;
    border-radius: 0.1rem;
    padding: 0.3rem;
    .order-img {
      width: 1rem;
      height: 1rem;
      overflow: hidden;
      margin: auto;
      background-color: @BeeDefault;
    }
    .status-time {
      height: 0.4rem;
      line-height: 0.4rem;
      border-left: 0.01rem solid @Grey2;
      font-size: 0.22rem;
      color: @Grey2;
      padding-left: 0.3rem;
    }
    .status-dot {
      height: 0.1rem;
      width: 0.1rem;
      border-radius: 50%;
      background-color: @Grey2;
      margin: 0.05rem 0;
      position: relative;
      left: -0.04rem;
    }
    .status-details {
      height: 0.4rem;
      line-height: 0.4rem;
      border-left: 0.01rem solid @Grey2;
      font-size: 0.22rem;
      color: @Grey2;
      padding-left: 0.3rem;
      white-space: nowrap;
    }
    .status-text {
      height: 1rem;
      line-height: 1rem;
      text-align: right;
      font-size: 0.28rem;
    }
  }
}
</style>
