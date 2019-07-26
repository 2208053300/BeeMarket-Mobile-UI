<template>
  <!-- eslint-disable -->
  <div class="task-detail">
    <van-notice-bar
      :left-icon="beeIcon.confirmorder_send_icon_presentation"
      background="#e2e2e2"
      color="#666666"
      mode="closeable"
    >
      <div class="notice-text">
        完成累计消费即可免费领取豪礼！
      </div>
    </van-notice-bar>
    <div class="task-content">
      <task-header
        ref="taskHeader"
        :task-data="taskData"
      />
      <div class="task-detail2">
        <div
          class="active-header"
          :style="{backgroundImage:'url('+getBg()+')'}"
          :class="[{leftTab:tid === '2'},{rightTab:tid === '10'}]"
        >
          <div
            class="disableTab"
            :class="{activeTab:tid === '2'}"
            @click="changeTab"
          >茅台贵宾陈酿</div>
          <div
            class="disableTab"
            :class="{activeTab:tid === '10'}"
            @click="changeTab"
          >木糖醇即食燕窝</div>
        </div>
        <div
          class="goods-card"
          :class="[{rightRadio:tid === '10'},{leftRadio:tid === '2'}]"
        >
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
                  class="get-button"
                  @click="getGift"
                  :class="{getButton2:!checkStatus()}"
                >
                  <span v-if="!taskData.is_current_finish">免费领取</span>
                  <span v-else>已领取</span>
                </van-button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="product-detailImg"
          v-html="taskData.details_url"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { confirmOrder } from '@/api/BeeApi/order'
import { getTaskDetail, getTaskPrompt } from '@/api/BeeApi/task'
import taskHeader from './components/taskHeader'

export default {
  metaInfo: {
    title: '任务详情'
  },
  components: {
    taskHeader
  },
  props: {},
  data() {
    return {
      beeIcon: {
        confirmorder_send_icon_presentation: require('@/assets/icon/order/confirmorder_send_icon_presentation@2x.png'),
        task_details_nav_bg_bird: require('@/assets/icon/task/task_details_nav_bg_bird.png'),
        task_details_nav_bg_liquor: require('@/assets/icon/task/task_details_nav_bg_liquor.png')
      },
      taskData: {},
      tid: '2'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    // TODO 如果已经成功，则不执行渲染，否则报错
    this.tid = String(this.$route.query.tid)
    this.getTaskDetailData()
  },
  methods: {
    async getTaskDetailData() {
      const res = await getTaskDetail({ tid: this.tid })
      this.taskData = res.data
      // 判断是否弹出弹窗
      this.getTaskPromptData(this.tid)
      if (this.taskData.proportion < 100) {
        this.$refs.taskHeader.initPie(this.taskData.proportion)
      }
    },
    async getTaskPromptData(tid) {
      if (this.taskData.mine_consume_amount >= 3600) {
        if (
          this.taskData.mine_consume_amount >= 4489 &&
          !this.taskData.is_prompt &&
          !this.taskData.is_other_prompt
        ) {
          this.$refs.taskHeader.showGift = true
          this.$refs.taskHeader.tid = '2'
          await getTaskPrompt({ tid: '2' })
          await getTaskPrompt({ tid: '10' })
        } else if (this.tid === '2' && !this.taskData.is_prompt) {
          this.$refs.taskHeader.showGift = true
          this.$refs.taskHeader.tid = '2'
          await getTaskPrompt({ tid: '2' })
        } else if (this.tid === '10' && !this.taskData.is_other_prompt) {
          this.$refs.taskHeader.showGift = true
          this.$refs.taskHeader.tid = '2'
          await getTaskPrompt({ tid: '2' })
        }
      } else if (this.taskData.mine_consume_amount >= 889) {
        if (this.tid === '2' && !this.taskData.is_other_prompt) {
          this.$refs.taskHeader.showGift = true
          this.$refs.taskHeader.tid = '10'
          await getTaskPrompt({ tid: '10' })
        } else if (this.tid === '10' && !this.taskData.is_prompt) {
          this.$refs.taskHeader.showGift = true
          this.$refs.taskHeader.tid = '10'
          await getTaskPrompt({ tid: '10' })
        }
      }
    },
    // 判断是否满足领取条件
    checkStatus() {
      let status = true
      if (
        this.taskData.mine_consume_amount >= 4489 &&
        !this.taskData.is_current_finish
      ) {
        status = true
      } else {
        if (this.tid === '2') {
          if (
            this.taskData.mine_consume_amount >= 3600 &&
            !this.taskData.is_current_finish &&
            !this.taskData.is_other_finish
          ) {
            status = true
          } else {
            status = false
          }
        } else if (this.tid === '10') {
          if (
            this.taskData.mine_consume_amount >= 889 &&
            !this.taskData.is_current_finish &&
            !this.taskData.is_other_finish
          ) {
            status = true
          } else {
            status = false
          }
        }
      }
      return status
    },
    async getGift() {
      // 如果已经领取过
      if (!this.checkStatus()) {
        return
      }
      const os = this.tid === '2' ? 'task|maotai' : 'task|bns'
      // TODO 跳转下单
      const res = await confirmOrder(
        JSON.stringify({
          os: os,
          tid: this.tid
        })
      )
      if (res.status_code === 200) {
        this.$store.state.order.orderDetail = res.data
        this.$store.state.order.addrDetail = res.data.addr
        this.$router.push({
          name: 'confirmOrder',
          query: {
            target: os,
            tid: this.tid
          }
        })
      }
    },
    getBg() {
      return this.tid === '2'
        ? this.beeIcon.task_details_nav_bg_liquor
        : this.beeIcon.task_details_nav_bg_bird
    },
    changeTab() {
      if (this.tid === '2') {
        this.tid = '10'
      } else {
        this.tid = '2'
      }
      this.getTaskDetailData()
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
    .van-icon__image {
      width: 0.34rem;
      height: 0.17rem;
    }
  }
  .task-content {
    background-color: @GreyBg;
    padding: 0.32rem 0.3rem;
    .headerPadding {
      padding-bottom: 0.4rem;
    }

    .task-detail2 {
      margin-top: 0.6rem;
      .active-header {
        height: 0.8rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
        box-sizing: border-box;
        background-size: contain;
        align-items: center;
        background-repeat: no-repeat;
        .disableTab {
          line-height: 0.8rem;
          font-size: 0.28rem;
          color: @Grey2;
          text-align: center;
          position: relative;
          top: 0.06rem;
        }
        .activeTab {
          font-size: 0.32rem;
          color: @ProductName;
          top: 0;
        }
      }
      .leftTab {
        background-position: left;
      }
      .rightTab {
        background-position: right;
      }
      .goods-card {
        display: flex;
        padding: 0.2rem;
        background-color: #fff;
        border-radius: 0.08rem;
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
            min-height: 0.6rem;
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
      .leftRadio {
        border-top-left-radius: 0;
      }
      .rightRadio {
        border-top-right-radius: 0;
      }
      .product-detailImg {
        margin-top: -0.2rem;
        border-radius: 0.08rem;
        p {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>
