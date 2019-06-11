<template>
  <div class="logistics-detail">
    <div class="logistics-status">
      <div class="logistics-img">
        <img
          :src="logisticsInfo.product_img"
          alt=""
        >
      </div>
      <!-- <div class="text-content">
        <div class="logistics-text1">
          快递方式：<span class="bee-text">正在更新中</span>
        </div>
        <div class="logistics-text1">
          物流编号：<span class="bee-text">正在更新中</span>
        </div>
        <div class="logistics-text1">
          官方电话：<span class="bee-text">正在更新中</span>
        </div>
      </div> -->
      <div class="text-content2">
        <div class="logistics-text">
          {{ logisticsInfo.express_status }}
        </div>
        <div class="logistics-text1">
          快递方式：<span class="bee-text">{{ logisticsInfo.express_mode }}</span>
        </div>
        <div class="logistics-text1">
          物流编号：<span class="bee-text">{{ logisticsInfo.express_no }}</span>
        </div>
        <div class="logistics-text1">
          官方电话：<span class="bee-text">{{ logisticsInfo.express_tel }}</span>
        </div>
      </div>
    </div>
    <div class="logistics-status2">
      <!-- <div class="status-content">
        <div class="bee-cir" />
        <span>您的订单正由平台积极处理中，请耐心等待</span>
      </div> -->
      <!-- TODO 最后一个不加线 -->
      <div v-for="(item, index) in logisticsInfo.express_details" class="status-content" :key="index">
        <div class="bee-cir" />
        <div class="bee-line" />
        <div class="status-text">
          <div class="status-text1">
            {{ item.context }}
          </div>
          <div class="status-time">
            {{ item.time }}
          </div>
        </div>
      </div>
    </div>
    <bee-guess />
  </div>
</template>

<script>
import BeeGuess from '@/components/index/BeeGuess'
import { getAfterLogDetail } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '物流详情'
  },
  components: { BeeGuess },
  props: {},
  data() {
    return {
      logisticsInfo: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getLogisticsDetail()
  },
  methods: {
    // 获取物流详情
    async getLogisticsDetail() {
      const res = await getAfterLogDetail({ aid: this.$route.query.aid })
      console.log('物流详情：', res)
      this.logisticsInfo = res.data
    }
  }
}
</script>

<style scoped lang="less">
.logistics-detail {

  .logistics-status {
    background-color: @Yellow1;
    padding: 0.24rem 0.3rem;
    display: flex;
    align-items: center;
    .logistics-img {
      height: 1.4rem;
      width: 1.4rem;
      border-radius: 0.05rem;
      overflow: hidden;
      margin-right: 0.2rem;
      background-color: #000;
    }
    .text-content {
      .logistics-text1 {
        font-size: 0.28rem;
        color: @Grey8;
        &:not(:last-child) {
          margin-bottom: 0.2rem;
        }
        .bee-text {
          color: @BeeDefault;
        }
      }
    }
    .text-content2 {
      .logistics-text {
        font-size: 0.3rem;
        color: @BeeDefault;
        margin-bottom: 0.2rem;
      }
      .logistics-text1 {
        font-size: 0.22rem;
        color: @Grey8;
        &:not(:last-child) {
          margin-bottom: 0.1rem;
        }
      }
    }
  }
  .logistics-status2 {
    padding: 0.2rem 0 0.2rem 0.2rem;
    margin-top: 0.2rem;
    background-color: #fff;
    .status-content {
      display: flex;
      align-items: center;
      position: relative;
      &:first-child {
        color: @BeeDefault;
      }
      &:not(:last-child) {
        margin-bottom: 0.3rem;
      }
      .bee-cir {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background-color: @BeeDefault;
        margin-right: 0.44rem;
      }
      .status-text {
        flex: 1;
        border-bottom: 0.02rem solid @Grey6;
        padding-right: 0.2rem;

        .status-text1 {
          font-size: 0.28rem;
        }
        .status-time {
          font-size: 0.22rem;
          color: @Grey4;
          margin-top: 0.2rem;
          padding-bottom: 0.3rem;
        }
      }
      .bee-line {
        width: 0.02rem;
        height: 1rem;
        position: absolute;
        background-color: @Grey6;
        left: 0.18rem;
        top: 74%;
      }
    }
  }
}
</style>
