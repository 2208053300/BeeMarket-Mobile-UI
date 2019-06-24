<template>
  <div class="logistics-list">
    <div class="logisticsList-content">
      <!-- TODO v-for -->
      <div
        v-for="(logistics,index) in logisticsList"
        :key="index"
        class="logistics-card"
      >
        <div class="logistics-title">
          <span class="status-text">该商品被拆分成多个包裹</span>
          <span class="status">待收货</span>
        </div>
        <div class="img-content">
          <div
            v-for="(item,index2) in logistics.images"
            :key="index2"
            class="logistics-img"
          >
            <img
              :src="item||$store.state.app.defaultImg2"
              alt="商品图片"
            >
          </div>
        </div>
        <div class="num-list">
          <!-- TODO v-for -->
          <div
            v-for="(item3,index3) in logistics.express_no"
            :key="index3"
            class="number-content"
          >
            <div class="number-left">
              <span>物流单号: </span>
              <span class="number">{{ item3 }}</span>
            </div>
            <van-button @click="goDetail(item3)">
              物流详情
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogisticsList } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '查看物流'
  },
  components: {},
  props: {},
  data() {
    return {
      logisticsList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getLogisticsListData()
  },
  methods: {
    async getLogisticsListData() {
      const res = await getLogisticsList({
        order_no: this.$route.query.order_no
      })
      this.logisticsList = res.data.deliveries
    },
    goDetail(express) {
      this.$router.push({
        path: '/persion/order/logisticsDetail',
        query: { order_no: this.$route.query.order_no, express_no: express }
      })
    }
  }
}
</script>

<style scoped lang="less">
.logistics-list {
  padding-top: 0.3rem;
  .logisticsList-content {
    margin: 0 0.2rem;
    .logistics-card {
      margin-bottom: 0.3rem;
      padding: 0.32rem 0.32rem 0.4rem;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 0.2rem;
      overflow: hidden;
      .logistics-title {
        display: flex;
        justify-content: space-between;
        font-size: 0.24rem;
        .status {
          color: @BeeDefault;
        }
      }
      .img-content {
        display: grid;
        grid-template-columns: repeat(3, 1.72rem);
        grid-template-rows: 1.72rem;
        grid-gap: 0.2rem;
        margin: 0.3rem 0 0.4rem;
        .logistics-img {
          border-radius: 0.02rem;
          overflow: hidden;
        }
      }
      .num-list {
        .number-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:not(:last-child) {
            margin-bottom: 0.3rem;
          }
          .number-left {
            font-size: 0.28rem;
          }
          .van-button {
            font-size: 0.28rem;
            color: @Grey2;
            border-radius: 0.1rem;
            border-color: @Grey2;
            width: 1.4rem;
            height: 0.56rem;
            line-height: 0.56rem;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
