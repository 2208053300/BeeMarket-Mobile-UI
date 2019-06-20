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
          <div
            class="op-text"
            @click="$router.push({path:'/persion/order',query:{s_status:0}})"
          >
            <div class="icon-num">
              <van-icon :name="beeIcon.mine_icon_unpaid" />
              <div
                v-if="orderStatus.wait_payment"
                class="num"
                :class="{muchNum:orderStatus.wait_payment>9}"
              >
                <span v-if="orderStatus.wait_payment>99">{{ orderStatus.wait_payment }}</span>
                <span v-else>99+</span>
              </div>
            </div>
            待付款
          </div>
          <div
            class="op-text"
            @click="$router.push({path:'/persion/order',query:{s_status:1}})"
          >
            <div class="icon-num">
              <van-icon :name="beeIcon.mine_icon_undelivered" />
              <div
                v-if="orderStatus.wait_ship"
                class="num"
                :class="{muchNum:orderStatus.wait_ship>9}"
              >
                <span v-if="orderStatus.wait_ship>99">{{ orderStatus.wait_ship }}</span>
                <span v-else>99+</span>
              </div>
            </div>
            待发货
          </div>
          <div
            class="op-text"
            @click="$router.push({path:'/persion/order',query:{s_status:2}})"
          >
            <div class="icon-num">
              <van-icon :name="beeIcon.mine_icon_not_signed" />
              <div
                v-if="orderStatus.wait_receipt"
                class="num"
                :class="{muchNum:orderStatus.wait_receipt>9}"
              >
                <span v-if="orderStatus.wait_receipt>99">{{ orderStatus.wait_receipt }}</span>
                <span v-else>99+</span>
              </div>
            </div>
            待收货
          </div>
          <div
            class="op-text"
            @click="$router.push({path:'/persion/order',query:{s_status:3}})"
          >
            <div class="icon-num">
              <van-icon :name="beeIcon.mine_icon_not_commented" />
              <div
                v-if="orderStatus.wait_assess"
                class="num"
                :class="{muchNum:orderStatus.wait_assess>9}"
              >
                <span v-if="orderStatus.wait_assess>99">{{ orderStatus.wait_assess }}</span>
                <span v-else>99+</span>
              </div>
            </div>
            待评价
          </div>
          <div
            class="op-text"
            @click="$router.push('/persion/order/afterList')"
          >
            <div class="icon-num">
              <van-icon :name="beeIcon.mine_icon_customer_service" />
              <div
                v-if="orderStatus.after_sale"
                class="num"
                :class="{muchNum:orderStatus.after_sale>9}"
              >
                <span v-if="orderStatus.after_sale>99">{{ orderStatus.after_sale }}</span>
                <span v-else>99+</span>
              </div>
            </div>
            退换/售后
          </div>
        </div>
        <van-swipe
          v-if="expressInfo"
          :autoplay="3000"
          :show-indicators="false"
          style="height: 1.9rem"
          vertical
        >
          <van-swipe-item
            v-for="(item, index) in expressInfo"
            :key="index"
          >
            <div>
              <div class="order-status">
                <van-row>
                  <van-col span="6">
                    <div class="order-img">
                      <img
                        :src="item.thumb_url"
                        alt="商品缩略图"
                        :onerror="$store.state.app.defaultImg"
                      >
                    </div>
                  </van-col>
                  <van-col span="12">
                    <div class="status-time">
                      {{ item.time }}
                    </div>
                    <div class="status-details">
                      {{ item.context }}
                    </div>
                  </van-col>
                  <van-col span="6">
                    <!-- TODO 动态变更颜色 -->
                    <div class="status-text">
                      {{ item.status_name }}
                    </div>
                  </van-col>
                  <div class="line-img">
                    <img
                      :src="beeIcon.mine_img_line"
                      alt=""
                      :onerror="$store.state.app.defaultImg"
                    >
                  </div>
                </van-row>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
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
      type: Array,
      default: () => null
    },
    orderStatus: {
      type: Object,
      default: () => {
        return {
          after_sale: 0,
          wait_assess: 0,
          wait_payment: 0,
          wait_receipt: 0,
          wait_ship: 0
        }
      }
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
        .icon-num {
          margin: 0 auto 0.1rem;
          display: block;
          position: relative;
          .van-icon {
            font-size: 0.5rem;
          }
          .num {
            height: 0.24rem;
            width: 0.24rem;
            background-color: @Red1;
            color: #fff;
            font-size: 0.2rem;
            border-radius: 50%;
            text-align: center;
            line-height: 0.24rem;
            position: absolute;
            top: -0.1rem;
            right: 0;
          }
          .muchNum{
            height: auto;
            width: auto;
            padding: 0.05rem 0.08rem;
            border-radius: 0.2rem;
          }
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
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status-text {
      height: 1rem;
      line-height: 1rem;
      text-align: right;
      font-size: 0.28rem;
      color: #ffa42f;
    }
    .line-img {
      position: absolute;
      width: 0.1rem;
      height: 1rem;
      left: 1.8rem;
    }
  }
}
</style>
