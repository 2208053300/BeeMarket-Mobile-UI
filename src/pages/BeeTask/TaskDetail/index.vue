<template>
  <div class="task-detail">
    <van-notice-bar
      :left-icon="beeIcon.confirmorder_send_icon_presentation"
      background="transparent"
      color="#666666"
      mode="closeable"
    >
      <div class="notice-text">
        完成累计消费即可免费领取1箱价值3600元的茅台贵宾陈酿
      </div>
    </van-notice-bar>
    <div class="task-content">
      <div
        class="task-header"
        :class="{headerPadding:taskData.proportion===100}"
      >
        <div class="header-part1">
          <div class="header-left">
            <div class="left-text1">
              我的累计消费<span class="unit">(元)</span>
            </div>
            <div class="left-text2">
              {{ taskData.mine_consume_amount }}
            </div>
            <div class="left-text3">
              <van-icon :name="beeIcon.task_icon_sigh" />需完成累计消费{{ taskData.condition_amount }}元
            </div>
          </div>
          <div class="header-right">
            <div class="right-chart">
              <div
                v-if="taskData.proportion!==100"
                class="pie-bg"
              >
                <div
                  ref="pieChart"
                  class="pieChart"
                />
              </div>
              <div
                v-else
                class="success-pie"
              >
                <div class="pie-success">
                  100%
                </div>
              </div>
            </div>
            <div class="right-scale">
              <div class="scale-content">
                <div class="scale1" />
                <span class="scale-text">已消费</span>
              </div>
              <div class="scale-content">
                <div class="scale2" />
                <span class="scale-text">剩余消费</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="taskData.proportion!==100"
          class="header-part2"
        >
          <div class="part2-content">
            <span>您暂未完成累计消费，再去看看商品吧!</span>
            <van-button
              class="go-shopping"
              @click="arouseApp"
            >
              去逛逛
            </van-button>
          </div>
        </div>
      </div>
      <div class="task-detail2">
        <div class="goods-card">
          <div class="goods-img">
            <img
              :src="taskData.thumb_url"
              alt=""
            >
          </div>
          <div class="goods-detail">
            <div class="goods-name">
              {{ taskData.product_name }}
            </div>
            <div class="goods-desc">
              {{ taskData.desc }}
            </div>
            <div class="goods-price">
              <span>￥{{ taskData.price }}</span>
              <div class="get-gift">
                <!-- 剩余数量：<span class="num">{{ taskData.remain_qty }}</span> -->
                <van-button
                  v-if="taskData.proportion===100"
                  class="get-button"
                  @click="getGift"
                >
                  免费领取
                </van-button>
                <van-button
                  v-else
                  class="get-button getButton2"
                >
                  免费领取
                </van-button>
              </div>
            </div>
          </div>
        </div>
        <!-- eslint-disable-next-line -->
        <div class="product-detailImg" v-html="taskData.details_url" />
      </div>
    </div>
  </div>
</template>

<script>
// import { confirmOrder } from '@/api/BeeApi/order'
import { getTaskDetail } from '@/api/BeeApi/task'
import echarts from 'echarts/dist/echarts.simple.min.js'
import { goHome, getOs } from '@/utils'

export default {
  metaInfo: {
    title: '任务详情'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        confirmorder_send_icon_presentation: require('@/assets/icon/order/confirmorder_send_icon_presentation@2x.png'),
        task_icon_sigh: require('@/assets/icon/task/task_icon_sigh@2x.png'),
        task_icon_smile_white: require('@/assets/icon/task/task_icon_smile_white@2x.png')
      },
      taskData: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    // TODO 如果已经成功，则不执行渲染，否则报错
    this.getTaskDetailData()
  },
  methods: {
    initPie() {
      const pie1 = echarts.init(this.$refs.pieChart)
      const option = {
        series: [
          {
            name: '销量',
            type: 'pie',
            radius: '100%',
            center: ['50%', '50%'],
            data: [
              this.taskData.mine_consume_amount,
              this.taskData.condition_amount - this.taskData.mine_consume_amount
            ],
            hoverAnimation: false,
            label: {
              normal: {
                position: 'inside',
                formatter: '{d}%',
                textStyle: {
                  color: '#ffa42f',
                  fontSize: 12
                }
              }
            },
            labelLine: {
              show: false
            }
          }
        ],
        color: ['#fff', 'rgba(255,255,255,0.1)']
      }
      pie1.setOption(option)
    },
    async getTaskDetailData() {
      const res = await getTaskDetail({ tid: this.$route.query.tid })
      this.taskData = res.data
      if (this.taskData.proportion < 100) {
        this.initPie()
      }
    },
    async getGift() {
      this.$toast('敬请等待！')
      // TODO 跳转下单
      // const res = await confirmOrder(
      //   JSON.stringify({
      //     source: 'task'
      //   })
      // )
      // if (res.status_code === 200) {
      //   this.$store.state.order.orderDetail = res.data
      //   this.$store.state.order.addrDetail = res.data.addr
      //   this.$router.push({
      //     path: '/category/details/confirmOrder',
      //     query: {
      //       target: 'task'
      //     }
      //   })
      // }
    },
    arouseApp() {
      const osObj = getOs()
      if (osObj.isWx) {
        // 微信直接跳转路由
        goHome()
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToCatList.postMessage(1)
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToCatList()
      } else {
        goHome()
      }
    }
  }
}
</script>

<style scoped lang="less">
.task-detail {
  .van-notice-bar {
    font-size: 0.22rem;
    color: @Grey2;
    align-items: center;
    .notice-text {
      margin-left: 0.2rem;
    }
  }
  .task-content {
    background-color: #fff;
    padding: 0.32rem 0.3rem;
    .headerPadding {
      padding-bottom: 0.4rem;
    }
    .task-header {
      background: linear-gradient(to right, #ffab38, #f9a247);
      border-radius: 0.16rem;
      box-shadow: 0 0.1rem 0.2rem rgba(255, 164, 47, 0.4);
      .header-part1 {
        display: flex;
        padding: 0.4rem 0.3rem 0 0.4rem;
        color: #fff;
        justify-content: space-between;
        .header-left {
          .left-text1 {
            font-size: 0.34rem;
            .unit {
              font-size: 0.28rem;
            }
          }
          .left-text2 {
            font-size: 0.5rem;
            margin-top: 0.12rem;
          }
          .left-text3 {
            font-size: 0.24rem;
            margin-top: 0.64rem;
            .van-icon {
              font-size: 0.34rem;
              vertical-align: middle;
              margin-right: 0.08rem;
            }
          }
        }
        .header-right {
          display: flex;
          align-items: center;
          .right-chart {
            margin-right: 0.32rem;
            .pie-bg {
              width: 1.52rem;
              height: 1.52rem;
              background-color: rgba(255, 255, 255, 0.4);
              border-radius: 50%;
              .pieChart {
                width: 1.68rem;
                height: 1.68rem;
                position: relative;
                left: -0.08rem;
                top: -0.08rem;
              }
            }
            .success-pie {
              width: 1.68rem;
              height: 1.68rem;
              background-color: #fff;
              border-radius: 50%;
              .pie-success {
                width: 1.52rem;
                height: 1.52rem;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                font-size: 0.2rem;
                color: @BeeDefault;
                box-shadow: 0 0 0.3rem rgba(255, 164, 47, 0.9);
                text-align: center;
                line-height: 1.52rem;
                position: relative;
                left: 0.08rem;
                top: 0.08rem;
              }
            }
          }
          .right-scale {
            .scale-content {
              font-size: 0.22rem;
              .scale1 {
                width: 0.24rem;
                height: 0.06rem;
                background-color: #fff;
                margin-bottom: 0.08rem;
              }
              .scale2 {
                width: 0.24rem;
                height: 0.06rem;
                background-color: rgba(255, 255, 255, 0.4);
                margin: 0.16rem 0 0.08rem;
              }
            }
          }
        }
      }
      .header-part2 {
        padding: 0.2rem 0.12rem 0.12rem;
        .part2-content {
          background-color: @Yellow2;
          height: 0.8rem;
          padding: 0 0.12rem;
          border-bottom-left-radius: 0.12rem;
          border-bottom-right-radius: 0.12rem;
          color: @BeeDefault3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.26rem;
          .go-shopping {
            padding: 0;
            width: 1.32rem;
            height: 0.6rem;
            line-height: 0.6rem;
            background-color: @BeeDefault;
            color: #fff;
            font-size: 0.28rem;
            border: none;
            border-radius: 0.08rem;
          }
        }
      }
    }
    .task-detail2 {
      margin-top: 0.6rem;
      .goods-card {
        display: flex;
        margin-bottom: 0.28rem;
        .goods-img {
          height: 1.48rem;
          width: 1.48rem;
          margin-right: 0.2rem;
          border-radius: 0.04rem;
          overflow: hidden;
        }
        .goods-detail {
          margin-top: 0.16rem;
          flex: 1;
          .goods-name {
            font-size: 0.28rem;
          }
          .goods-desc {
            font-size: 0.22rem;
            color: @Grey1;
            margin-top: 0.12rem;
          }
          .goods-price {
            font-size: 0.28rem;
            margin-top: 0.1rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            .get-gift {
              font-size: 0.26rem;
              color: @Grey1;
              text-align: right;
              .num {
                color: @BeeDefault;
              }
              .get-button {
                margin-left: 0.16rem;
                border-radius: 0.08rem;
                background-color: @BeeDefault;
                color: #fff;
                font-size: 0.28rem;
                width: 1.52rem;
                height: 0.6rem;
                line-height: 0.6rem;
                padding: 0;
                border: none;
              }
              .getButton2 {
                background-color: rgba(255, 164, 47, 0.2);
              }
            }
          }
        }
      }

      .product-detailImg {
        margin-top: 0.4rem;
        border-radius: 0.08rem;
      }
    }
  }
}
</style>
