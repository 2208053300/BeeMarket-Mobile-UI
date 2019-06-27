<template>
  <div class="my-earn">
    <div class="earn-header">
      <div class="head-img">
        <div class="img-content">
          <img
            :src="detailData.basic.head_image_url||$store.state.app.head_detault"
            alt="头像"
          >
        </div>
        <span class="user-name">{{ detailData.basic.nickname }}</span>
      </div>
      <div class="earn-tab">
        <div
          class="tab-content"
          @click="changeEarnType('left')"
        >
          <div class="type-img">
            <img
              :src="beeIcon.bee_firends_income_icon_growingup"
              alt=""
            >
          </div>
          <span class="num">{{ detailData.basic.public_welfare_value }}</span>
          <p class="type-text">
            公益值
          </p>
        </div>
        <div
          class="tab-content"
          @click="changeEarnType('right')"
        >
          <div class="type-img">
            <img
              :src="beeIcon.bee_firends_income_icon_gold"
              alt=""
            >
          </div>
          <span class="num">{{ detailData.basic.balance }}</span>
          <p class="type-text">
            余额数
          </p>
        </div>
      </div>
    </div>
    <div class="earn-detail">
      <div
        v-if="earnType==='left'"
        class="detail-title"
      >
        <div class="title-img">
          <img
            :src="beeIcon.bee_firends_income_icon_growingup"
            alt=""
          >
        </div>
        <span class="title-text">增长详情</span>
      </div>
      <div
        v-if="earnType==='right'"
        class="detail-title"
      >
        <div class="title-img">
          <img
            :src="beeIcon.bee_firends_income_icon_gold"
            alt=""
          >
        </div>
        <span class="title-text">增长详情</span>
      </div>
      <div
        v-if="detailList.length!==0"
        class="detail-content"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          @load="onLoad"
        >
          <div
            v-for="(item,index) in detailList"
            :key="index"
            class="detail-card"
          >
            <div class="info-time">
              {{ item.time }}
            </div>
            <div class="info-text">
              {{ item.desc }}
            </div>
            <div class="circle" />
          </div>
        </van-list>
      </div>
      <div class="bottom-text">
        我们只记录自然年的公益值收益
      </div>
    </div>
  </div>
</template>

<script>
import { getMyEarning } from '@/api/BeeApi/user'

export default {
  metaInfo: {
    title: '我的收益'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        bee_firends_income_icon_growingup: require('@/assets/icon/beeFriends/info/bee_firends_income_icon_growingup.png'),
        bee_firends_income_icon_gold: require('@/assets/icon/beeFriends/info/bee_firends_income_icon_gold.png')
      },
      earnType: 'left',
      page: 1,
      detailData: {
        basic: {},
        record: {}
      },
      detailList: [],
      loading: false,
      finished: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getMyEarningData()
    // FIXME ios bug暂时无解
    try {
      this.page = 1
      setTimeout(this.getMyEarningData(), 3000)
    } catch (error) {
      //
    }
    if (this.osObj.isWx) {
      // this.loadUID()
    } else if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: false })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(false)
    }
  },
  methods: {
    async getMyEarningData() {
      const res = await getMyEarning({
        type: this.earnType,
        page: this.page
      })
      this.detailData = res.data
      this.detailList = res.data.record.list
      if (this.earnType === 'left') {
        this.finished = true
      } else {
        if (this.detailList.length === res.data.record.total_num) {
          this.finished = true
        } else {
          this.finished = false
        }
      }
      this.page = 2
    },
    changeEarnType(type) {
      this.earnType = type
      this.page = 1
      this.finished = true
      this.getMyEarningData()
    },
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await getMyEarning({
          type: this.earnType,
          page: this.page
        })
        this.page++
        this.detailList.push(...res.data.record.list)
        this.loading = false
        if (this.detailList.length === res.data.record.total_num) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
.my-earn {
  .earn-header {
    height: 4.3rem;
    background-color: @BeeDefault;
    .head-img {
      padding-top: 1.3rem;
      text-align: center;
      .img-content {
        margin: 0 auto 0.18rem;
        width: 1.2rem;
        height: 1.2rem;
        overflow: hidden;
        border-radius: 50%;
        box-sizing: border-box;
        border: 0.04rem solid rgba(255, 255, 255, 0.2);
      }
      .user-name {
        font-size: 0.3rem;
        color: #fff;
      }
    }
    .earn-tab {
      margin-top: 0.2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .tab-content {
        text-align: center;
        .type-img {
          width: 0.52rem;
          height: 0.53rem;
          display: inline-block;
          margin-right: 0.15rem;
        }
        .num {
          font-size: 0.46rem;
          color: #fff;
          vertical-align: middle;
        }
        .type-text {
          font-size: 0.24rem;
          color: #fff;
          margin: 0;
          padding: 0;
          margin-top: 0.04rem;
        }
      }
    }
  }
  .earn-detail {
    padding: 0.3rem 0 0.3rem 0.6rem;
    background-color: #fff;
    min-height: 9rem;
    position: relative;
    .detail-title {
      .title-img {
        height: 0.53rem;
        width: 0.52rem;
        display: inline-block;
        margin-right: 0.1rem;
      }
      .title-text {
        font-size: 0.26rem;
        vertical-align: middle;
      }
    }
    .detail-content {
      padding: 0.38rem 0 0 0.32rem;
      margin-left: 0.25rem;
      border-left: 0.02rem solid #ebebeb;
      .detail-card {
        background-color: #fff8ec;
        padding: 0.23rem 0.64rem 0.2rem 0.46rem;
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
        margin-bottom: 0.2rem;
        position: relative;
        .info-time {
          font-size: 0.24rem;
          color: @Grey1;
        }
        .info-text {
          font-size: 0.26rem;
          margin-top: 0.14rem;
          line-height: 0.36rem;
        }
        .circle {
          width: 0.22rem;
          height: 0.22rem;
          box-sizing: border-box;
          border: 0.05rem solid #ffaa16;
          border-radius: 50%;
          background-color: #fff;
          position: absolute;
          left: -0.46rem;
          top: 0.6rem;
        }
      }
    }
    .bottom-text {
      position: absolute;
      bottom: 0.5rem;
      left: 2.2rem;
      font-size: 0.22rem;
      color: @Grey1;
    }
  }
}
</style>
