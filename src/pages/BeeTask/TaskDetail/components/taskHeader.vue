<template>
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
    <van-dialog
      v-model="showGift"
      show-cancel-button
      cancel-button-text="继续购物"
      confirm-button-text="马上领取"
      confirm-button-color="#ffa42f"
      class="text-center"
      @confirm="getNow()"
    >
      <van-icon
        name="passed"
        color="#FFA431"
        size="1rem"
        style="margin-top: 0.2rem"
      />
      <p
        v-if="tid === '10'"
        style="font-size:0.3rem;"
      >
        燕窝领取条件已达标
      </p>
      <p
        v-if="tid === '2'"
        style="font-size:0.3rem;"
      >
        贵宾陈酿领取条件已达标
      </p>
      <p style="font-size:0.24rem;">
        请及时领取！
      </p>
    </van-dialog>
  </div>
</template>

<script>
import echarts from 'echarts/dist/echarts.simple.min.js'
import { goHome, getOs } from '@/utils'

export default {
  components: {},
  props: {
    taskData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      beeIcon: {
        task_icon_sigh: require('@/assets/icon/task/task_icon_sigh@2x.png')
      },
      showGift: false,
      tid: '2'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    initPie(proportion) {
      const pie1 = echarts.init(this.$refs.pieChart)
      const option = {
        series: [
          {
            name: '消费',
            type: 'pie',
            radius: '100%',
            center: ['50%', '50%'],
            data: [proportion, 100 - proportion],
            hoverAnimation: false,
            // label: {
            //   normal: {
            //     position: 'center',
            //     formatter: '{d}%',
            //     textStyle: {
            //       color: '#ffa42f',
            //       fontSize: 12
            //     }
            //   }
            // },
            labelLine: {
              show: false
            }
          }
        ],
        color: ['#fff', 'rgba(255,255,255,0.1)']
      }
      pie1.setOption(option)
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
    },
    getNow() {
      this.$parent.getGift()
    }
  }
}
</script>

<style scoped lang="less">
.task-header {
  background: linear-gradient(to right, #ffab38, #f9a247);
  border-radius: 0.16rem;
  box-shadow: 0 0.1rem 0.2rem rgba(255, 164, 47, 0.4);
  .header-part1 {
    display: flex;
    padding: 0.4rem 0.3rem 0;
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
</style>
