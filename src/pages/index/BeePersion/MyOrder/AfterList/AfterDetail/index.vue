<template>
  <div class="after-detail">
    <div class="after-title">
      <div class="after-text">
        <span v-if="afterDetail.status===0">已关闭</span>
        <span v-if="afterDetail.status===1">审核中</span>
        <span v-if="afterDetail.status===2">处理中（待买家发货）</span>
        <span v-if="afterDetail.status===3">处理中（待商家收货）</span>
        <span v-if="afterDetail.status===4">已完成</span>
      </div>
      <span
        v-if="[1,2,3].indexOf(afterDetail.status)!==-1"
        class="status-text2"
      >
        <!-- TODO 这里是时分秒倒计时？ -->
        剩余时间: {{ afterDetail.payTime }}
      </span>
    </div>
    <div class="detail-content">
      <after-status
        :after-detail="afterDetail"
        class="details-card"
      />
      <div
        v-if="[3,4].indexOf(afterDetail.status)!==-1"
        class="logistics-text details-card"
      >
        <span class="logistics-title">
          最新物流信息
        </span>
        <div class="logistics-detail">
          <van-cell
            icon="shop-o"
            is-link
          >
            <template slot="title">
              <div class="logistics-detail2">
                <div class="logistics-address">
                  到达目的地网点
                </div>
                <div class="logistics-time">
                  2019-5-9
                </div>
              </div>
            </template>
          </van-cell>
        </div>
      </div>
      <div class="go-details details-card">
        <van-cell-group>
          <van-cell
            title="进度详情"
            value="查看详情"
            is-link
            to="/persion/order/afterList/afterProgress"
          />
          <van-cell
            title="沟通记录"
            value="查看详情"
            is-link
            to="/persion/order/afterList/communicationRecord"
          />
        </van-cell-group>
      </div>
      <order-detail
        :after-detail="afterDetail"
        class="details-card"
      />
    </div>
    <after-op :after-detail="afterDetail" />
  </div>
</template>

<script>
import { getAfterDetail } from '@/api/user'
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
      afterDetail: {}
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
    async getAfterDetailData() {
      const res = await getAfterDetail()
      this.afterDetail = res.data.orderData
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
    padding: 0.5rem 0.32rem 0.66rem;
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
}
</style>
