<template>
  <div class="my-earn">
    <div class="earn-header">
      <div class="head-img">
        <div class="img-content flex flex-between align-center">
          <!-- 左边头像 星级 规则 -->
          <div class="avatar flex align-center">
            <img
              :src="detailData.head_img || $store.state.app.head_detault"
              alt="头像"
              class="avatar-img"
            >
            <div class="info">
              <div class="level flex align-center">
                <!-- <div class="star-imgs"> -->
                <img
                  v-for="(item, index) in detailData.level"
                  :key="index"
                  :src="beeIcon.level_star_img"
                  class="star"
                >
                <!-- </div> -->
                <span class="partner-mark">{{ detailData.level_text }}</span>
              </div>
              <van-button
                v-if="false"
                class="rule-button"
              >
                升星规则
              </van-button>
            </div>
          </div>
          <!-- 右边收益数值 -->
          <div class="earning-num">
            <p class="total-num">
              <span class="label">累计收益</span>
              <span class="num">￥{{ detailData.all_commission }}</span>
            </p>
            <p class="month-num">
              <span class="label">本月收益</span>
              <span class="num">￥{{ detailData.month_commission }}</span>
            </p>
          </div>
          <!-- <span class="user-name">{{ detailData.basic.nickname }}</span> -->
        </div>
        <div class="earn-tab">
          <div
            class="tab-content"
            @click="changeEarnType(1)"
          >
            <div class="type-img">
              <img
                :src="beeIcon.bee_firends_income_icon_growingup"
                alt=""
              >
            </div>
            <span class="num">{{ detailData.road_commission }}</span>
            <p class="type-text">
              在路上
            </p>
          </div>
          <div
            class="tab-content"
            @click="changeEarnType(2)"
          >
            <div class="type-img">
              <img
                :src="beeIcon.bee_firends_income_icon_gold"
                alt=""
              >
            </div>
            <span class="num">{{ detailData.get_commission }}</span>
            <p class="type-text">
              已到账
            </p>
          </div>
        </div>
      </div>
      <div class="earn-detail">
        <div
          v-if="earnType === 1 && detailList.length !== 0"
          class="detail-title"
        >
          <div class="title-img">
            <img
              :src="beeIcon.bee_firends_gold_add"
              alt=""
            >
          </div>
          <span class="title-text">增长详情</span>
        </div>
        <div
          v-if="earnType === 2 && detailList.length !== 0"
          class="detail-title"
        >
          <div class="title-img">
            <img
              :src="beeIcon.bee_firends_gold_add"
              alt=""
            >
          </div>
          <span class="title-text">增长详情</span>
        </div>

        <div
          v-if="!isEmpty"
          class="detail-content"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="true"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- <div
              class="detail-card"
            >
              <div class="info-time">
                2019.20.20
              </div>
              <div class="info-text">
                <img :src="beeIcon.bee_firends_income_icon_growingup" class="list-avatar">
                fdsff1d21f3d1f3ds
              </div>
              <div class="circle" />
            </div> -->
            <div
              v-for="(item, index) in detailList"
              :key="index"
              class="detail-card"
            >
              <div class="info-time">
                {{ item.time }}
              </div>
              <div class="info-text">
                <div
                  v-if="item.logo"
                  class="head-content"
                >
                  <img
                    :src="item.logo"
                    alt="头像"
                  >
                </div>
                {{ item.content }}
              </div>
              <div class="circle" />
            </div>
          </van-list>
          <div class="bottom-text">
            我们只记录自然年的公益值收益
          </div>
        </div>
        <!-- v-else -->
        <div
          v-if="isEmpty"
          class="empty-img text-center"
        >
          <img
            :src="beeIcon.emptyImg"
            alt=""
          >
          <p class="tip">
            暂无数据
          </p>
        </div>
      </div>

      <van-button
        block
        class="cash-btn"
        @click="toCash"
      >
        我要提现
      </van-button>
    </div>
  </div>
</template>

<script>
import { getMyEarning, getMyEarningList } from '@/api/BeeApi/user'
import { getOs } from '@/utils'
export default {
  metaInfo: {
    title: '我的收益'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        level_star_img: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_star.png'),
        bee_firends_income_icon_growingup: require('@/assets/icon/beeFriends/info/bee_firends_gold_ontheway.png'),
        bee_firends_income_icon_gold: require('@/assets/icon/beeFriends/info/bee_firends_gold.png'),
        bee_firends_gold_add: require('@/assets/icon/beeFriends/info/bee_firends_gold_add.png'),
        emptyImg: require('@/assets/icon/public/empty.png')
      },
      // 类型 1在路上（默认为1） 2已到账
      earnType: 1,
      page: 1,
      detailData: {},
      // 收益记录
      detailList: [],
      // 总页数
      totalPages: 0,
      // 是否没有数据记录
      isEmpty: false,
      loading: false,
      osObj: getOs(),
      finished: false,
      // 余额数量
      withdrawNum: 0
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
      // this.page = 1
      // setTimeout(document.querySelector('.tab-content').click(), 3000)
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
    // 收益顶部信息
    async getMyEarningData() {
      // this.loading = true
      const res = await getMyEarning({
        type: this.earnType,
        page: this.page
      })
      console.log('我的收益：', res)

      this.detailData = res.data
      // this.loading = false
    },
    // 收益记录
    async getEarningList() {
      const res = await getMyEarningList(
        {
          type: this.earnType,
          page: this.page
        }
      )
      this.totalPages = res.data.page_size
      this.detailList = res.data.lists
    },
    // 切换在路上 已得到
    changeEarnType(type) {
      this.earnType = type
      this.page = 1
      this.onLoad()
    },
    // 加载列表
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await getMyEarningList({
          type: this.earnType,
          page: this.page
        })
        console.log(res, 1111111111)

        this.page++
        this.totalPages = res.data.page_size
        this.detailList.push(...res.data.lists)
        if (this.detailList.length === 0) {
          this.isEmpty = true
        }
        this.loading = false
        console.log('this.page,this.totalPages', this.page, this.totalPages)
        if (this.page > this.totalPages) {
          console.log('stop')

          this.finished = true
        }
      }, 500)
    },

    // 我要提现
    toCash() {
      if (this.$store.state.user.withdrawNum < 100) {
        this.$toast('可提现余额不足100元！')
        return
      }
      this.$router.push({
        name: 'friendPay'
      })
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
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      // text-align: center;
      .img-content {
        // margin: 0 auto 0.18rem;
        padding: 0 0.3rem;
        .avatar-img {
          width: 1.2rem;
          height: 1.2rem;
          overflow: hidden;
          border-radius: 50%;
          box-sizing: border-box;
          border: 0.04rem solid rgba(255, 255, 255, 0.2);
          margin-right: 0.2rem;
        }
        .star-imgs {
          margin-right: 0.1rem;
        }
        .level {
          margin-bottom: 0.1rem;
        }
        .star {
          width: 0.24rem;
          height: 0.23rem;
          margin-right: 0.05rem;
        }
        .partner-mark {
          font-size: 0.26rem;
          color: #fff;
        }
        .rule-button {
          width: 1.56rem;
          height: 0.52rem;
          line-height: 0.5rem;
          font-size: 0.26rem;
          color: #fefefe;
          border-color: #fefefe;
          background-color: transparent;
          border-radius: 0.1rem;
          padding: 0;
        }
        .earning-num {
          font-size: 0.24rem;
          color: #fff;
          p {
            margin: 0;
          }
          .total-num {
            margin-bottom: 0.2rem;
          }
          .label {
            margin-right: 0.2rem;
          }
        }
      }
      .user-name {
        font-size: 0.3rem;
        color: #fff;
      }
    }
    .earn-tab {
      margin-top: 0.5rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .tab-content {
        text-align: center;
        .type-img {
          width: 0.43rem;
          height: 0.52rem;
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
        height: 0.52rem;
        width: 0.43rem;
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
      border-left: 0.02rem solid #ebebeb;
      margin: 0.3rem 0 0.5rem 0.22rem;
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
          .head-content {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 0.2rem;
            margin-bottom: 0.1rem;
            display: inline-block;
            vertical-align: middle;
          }
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
  .list-avatar {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }
  .empty-img {
    padding-top: 1.5rem;
    margin-left: -0.6rem;
    img {
      width: 2.88rem;
      height: 2.68rem;
    }
    .tip {
      font-size: 0.24rem;
      color: #999;
    }
  }
  .cash-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: @BeeDefault;
    color: #fff;
    font-size: 0.36rem;
    border: none;
    padding: 0 0.35rem;
  }
}
</style>
