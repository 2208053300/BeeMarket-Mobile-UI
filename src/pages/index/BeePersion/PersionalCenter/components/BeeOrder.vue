<template>
  <div>
    <van-row class="persion-order">
      <van-cell
        style="border-top-left-radius: 0.2rem;border-top-right-radius: 0.2rem"
        title="我的订单"
        is-link
        value="查看全部订单"
        to="/persion/order"
      />
      <!-- TODO 跳转时带上订单状态，安装后直接切换标签栏 -->
      <div class="order-op">
        <div class="op-type">
          <div class="op-text">
            <van-icon :name="beeIcon.mine_icon_unpaid" />
            待付款
          </div>
          <div class="op-text">
            <van-icon :name="beeIcon.mine_icon_undelivered" />
            待发货
          </div>
          <div class="op-text">
            <van-icon :name="beeIcon.mine_icon_not_signed" />
            待收货
          </div>
          <div class="op-text">
            <van-icon :name="beeIcon.mine_icon_not_commented" />
            待评价
          </div>
          <div
            class="op-text"
            @click="$router.push('/persion/order/afterList')"
          >
            <van-icon :name="beeIcon.mine_icon_customer_service" />
            退换/售后
          </div>
        </div>
        <div v-if="expressInfo" class="order-status">
          <van-row>
            <van-col span="6">
              <div class="order-img">
                <img
                  :src="expressInfo.thumb_url"
                  alt="商品缩略图"
                  :onerror="$store.state.app.defaultImg"
                >
              </div>
            </van-col>
            <van-col span="12">
              <div class="status-time">
                {{ expressInfo.time }}
              </div>
              <div class="status-details">
                {{ expressInfo.context }}
              </div>
            </van-col>
            <van-col span="6">
              <!-- TODO 动态变更颜色 -->
              <div class="status-text">
                {{ expressInfo.status_name }}
              </div>
            </van-col>
            <div class="line-img">
              <img
                :src="beeIcon.mine_img_line"
                alt=""
              >
            </div>
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
  props: {
    expressInfo: {
      type: Object,
      default: () => undefined
    }
  },
  data() {
    return {
      BeeDefault,
      beeIcon: {
        mine_icon_unpaid: require('@/assets/icon/personalCenter/mine_icon_unpaid@2x.png'),
        mine_icon_undelivered: require('@/assets/icon/personalCenter/mine_icon_undelivered@2x.png'),
        mine_icon_not_signed: require('@/assets/icon/personalCenter/mine_icon_not_signed@2x.png'),
        mine_icon_not_commented: require('@/assets/icon/personalCenter/mine_icon_not_commented@2x.png'),
        mine_icon_customer_service: require('@/assets/icon/personalCenter/mine_icon_customer_service@2x.png'),
        mine_img_line: require('@/assets/icon/personalCenter/mine_img_line@2x.png')
      }
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
  border-radius: 0.2rem;
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
          margin: 0 auto 0.1rem;
        }
      }
    }
  }
  .order-status {
    background-color: @GreyBg;
    margin-top: 0.3rem;
    border-radius: 0.1rem;
    padding: 0.3rem;
    position: relative;
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
      font-size: 0.22rem;
      color: @Grey2;
      padding-left: 0.3rem;
    }
    .status-details {
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.22rem;
      color: @Grey2;
      padding-left: 0.3rem;
      white-space: nowrap;
      margin-top: 0.2rem;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .status-text {
      height: 1rem;
      line-height: 1rem;
      text-align: right;
      font-size: 0.28rem;
      color: #ffa42f;
    }
    .line-img{
      position: absolute;
      width: 0.1rem;
      height: 1rem;
      left: 1.8rem;
    }
  }
}
</style>
