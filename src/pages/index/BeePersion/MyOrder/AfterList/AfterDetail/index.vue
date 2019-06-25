<template>
  <div class="after-detail">
    <!-- type_code  售后类型值,1 退货,2 换货,3 补寄 -->
    <!-- status_code 状态值:-1 已拒绝, 0 待审核,1 待买家发货,2 待商家收货,3 待买家收货,4 已完成,5 已关闭 -->

    <!-- 状态内容 -->
    <div class="after-title">
      <div class="flex align-center flex-between">
        <div>
          <div class="after-text">
            <span>{{ afterDetail.status_content.status_name }}</span>
          </div>

          <span v-if="afterDetail.status_content.remain_time>0" class="status-text2">
            <!-- TODO 这里是时分秒倒计时？ -->
            剩余时间: {{ remain_time_sec }}
          </span>
          <!-- 描述 -->
          <span v-if="afterDetail.status_content.content_desc" class="status-text2">
            {{ afterDetail.status_content.content_desc }}
          </span>
        </div>
        <img :src="refundImg" alt="" class="refund-img">
      </div>
    </div>

    <div class="detail-content">
      <!-- 收货状态描述 -->
      <after-status :after-detail="afterDetail" class="details-card" />

      <!-- 待商家收货2、已完成4 有物流信息 -->
      <div
        v-if="[2, 4].indexOf(afterDetail.status) !== -1"
        class="logistics-text details-card"
      >
        <span class="logistics-title">
          最新物流信息
        </span>
        <div class="logistics-detail">
          <van-cell
            icon="shop-o"
            is-link
            @click="
              router.push({
                path: '/persion/order/logisticsDetail',
                query: { aid: afterDetail.aid }
              })
            "
          >
            <!-- to="/persion/order/logisticsDetail" -->
            <template slot="title">
              <div class="logistics-detail2">
                <div class="logistics-address">
                  {{ afterDetail.express_info.context }}
                </div>
                <div class="logistics-time">
                  {{ afterDetail.express_info.time }}
                </div>
              </div>
            </template>
          </van-cell>
        </div>
      </div>
      <div class="go-details details-card">
        <van-cell-group>
          <van-cell
            v-if="afterDetail.type_code === 2 && [2,3,4].includes( afterDetail.status_code)"
            title="物流信息"
            value="查看详情"
            is-link
            @click="
              $router.push({
                path: '/persion/order/logisticsDetail',
                query: { aid: afterDetail.aid }
              })
            "
          />
          <van-cell
            title="进度详情"
            value="查看详情"
            is-link
            @click="
              $router.push({
                path: '/persion/order/afterList/afterProgress',
                query: { aid: afterDetail.aid }
              })
            "
          />
          <van-cell
            title="沟通记录"
            value="查看详情"
            is-link
            @click="
              $router.push({
                path: '/persion/order/afterList/communicationRecord',
                query: { aid: afterDetail.aid }
              })
            "
          />
        </van-cell-group>
      </div>
      <order-detail :after-detail="afterDetail" class="details-card" />
    </div>
    <after-op :after-detail="afterDetail" />
  </div>
</template>

<script>
import { getAfterDetail } from '@/api/BeeApi/user'
import afterStatus from './components/afterStatus'
import orderDetail from './components/orderDetail'
import afterOp from './components/afterOp'

export default {
  metaInfo: {
    title: '售后单详情'
  },
  components: {
    afterStatus,
    orderDetail,
    afterOp
  },
  props: {},
  data() {
    return {
      // 售后单id
      aid: this.$route.query.aid,
      // 售后单详情
      afterDetail: {
        aid: null,
        product_info: {},
        status_code: 0,
        status_content: {},
        status_desc: {},
        type_code: 0
      },
      // 剩余处理时间
      remain_time_sec: 0,
      // 顶部状态栏右边图片
      refundImg: require('@/assets/icon/personalCenter/refund/mine_order_img_top_customerapply@2x.png')
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getAfterDetailData()
  },
  methods: {
    // 获取售后单详情数据
    async getAfterDetailData() {
      const res = await getAfterDetail({ aid: this.aid })
      this.afterDetail = res.data
      // this.remain_time_sec = this.afterDetail.status_content.remain_time
      if (this.afterDetail.status_content.remain_time) {
        const clock = setInterval(() => {
          this.afterDetail.status_content.remain_time--
          this.remain_time_sec = this.formatSeconds(this.afterDetail.status_content.remain_time)
          if (this.afterDetail.status_content.remain_time === 0) {
            this.afterDetail.status_content.remain_time = 0
            this.remain_time_sec = this.formatSeconds(this.afterDetail.status_content.remain_time)
            window.clearInterval(clock)
          }
        }, 1000)
      }
    },
    // 剩余处理时间 秒转时分
    // 将秒数转换为时分秒格式
    formatSeconds(value) {
      let theTime = parseInt(value) // 秒
      let middle = 0 // 分
      let hour = 0 // 小时
      let day = 0 // 天
      if (theTime > 60) {
        middle = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        if (middle > 60) {
          hour = parseInt(middle / 60)
          middle = parseInt(middle % 60)
          if (hour > 24) {
            day = parseInt(hour / 24)
            hour = parseInt(hour % 24)
          }
        }
      }
      let result = '' + parseInt(theTime) + '秒'
      if (middle > 0) {
        result = '' + parseInt(middle) + '分' + result
      }
      if (hour > 0) {
        result = '' + parseInt(hour) + '小时' + result
      }
      if (day > 0) {
        result = '' + parseInt(day) + '天' + result
      }
      return result
    }

  }
}
</script>

<style scoped lang="less">
.after-detail {
  padding-bottom: 1rem;
  .after-title {
    height: 1.8rem;
    color: #ffffff;
    background-color: @BeeDefault;
    padding: 0.3rem 0.32rem 0.66rem;
    box-sizing: border-box;
    .after-text {
      margin-bottom: 0.2rem;
      font-size: 0.32rem;
    }
    .status-text2 {
      font-size: 0.26rem;
    }
  }
  .detail-content {
    position: relative;
    top: -0.16rem;
    margin: 0 0.16rem;
    .details-card {
      background-color: #fff;
      border-radius: 0.2rem;
      box-sizing: border-box;
      overflow: hidden;
    }
  }
  .logistics-text {
    padding: 0.3rem 0.16rem;
    margin-bottom: 0.2rem;
    .van-cell {
      align-items: center;
      padding: 0.2rem 0 0;
      .van-cell__left-icon {
        margin-right: 0.3rem;
      }
      .van-cell__title {
        font-size: 0.24rem;
        color: @BeeDefault;
      }
    }
  }
  .go-details {
    margin-bottom: 0.2rem;
    .van-cell {
      padding: 0.4rem 0.16rem;
      &:not(:last-child)::after {
        left: 0;
      }
      .van-cell__title {
        font-size: 0.26rem;
      }
      .van-cell__value {
        font-size: 0.24rem;
        color: @Grey1;
      }
    }
  }
  .refund-img{
    width: 1.51rem;
    height: 1.21rem;
  }

}
</style>
