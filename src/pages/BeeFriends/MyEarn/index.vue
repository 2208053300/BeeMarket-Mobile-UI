<template>
  <div class="earn-header">
    <div class="head-img">
      <div class="img-content">
        <!-- 头像 星级 规则 -->
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
            <van-button v-if="false" class="rule-button">
              升星规则
            </van-button>
          </div>
        </div>
        <!-- 收益 -->
        <div class="earning-tabs">
          <div class="my-earn-pic" @click="$router.push({ name: 'myRights' })">
            <img :src="beeIcon.bee_firends_my_earn">
          </div>
          <div class="earning-num text-center">
            <div class="total-num">
              <p class="label">
                累计收益(元)
              </p>
              <p class="num">
                {{ detailData.all_commission }}
              </p>
            </div>
            <p class="month-num">
              <span class="label">本月收益</span>
              <span class="num">{{ detailData.month_commission }}元</span>
            </p>
          </div>
          <!-- 在路上、已到账切换 -->
          <div class="earn-tab flex flex-around">
            <div
              class="tab-content"
              :class="{ active: earnType === 1 }"
              @click="changeEarnType(1)"
            >
              <span class="num">{{ detailData.road_commission }}</span>
              <div class="type-img">
                <img :src="beeIcon.bee_firends_income_icon_growingup" alt="">
                <span class="type-text">
                  在路上
                </span>
              </div>
            </div>
            <div class="line" />
            <div
              class="tab-content"
              :class="{ active: earnType === 2 }"
              @click="changeEarnType(2)"
            >
              <span class="num">{{ detailData.get_commission }}</span>
              <div class="type-img">
                <img :src="beeIcon.bee_firends_income_icon_gold" alt="">
                <span class="type-text">
                  已到账
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- <span class="user-name">{{ detailData.basic.nickname }}</span> -->
      </div>
    </div>
    <div class="earn-detail">
      <div
        v-if="earnType === 1 && detailList.length !== 0"
        class="detail-title"
      >
        <div class="title-img">
          <img :src="beeIcon.bee_firends_gold_add" alt="">
        </div>
        <span class="title-text">增长详情</span>
      </div>
      <div
        v-if="earnType === 2 && detailList.length !== 0"
        class="detail-title"
      >
        <div class="title-img">
          <img :src="beeIcon.bee_firends_gold_add" alt="">
        </div>
        <span class="title-text">增长详情</span>
      </div>

      <!-- 有记录 -->
      <div v-if="!isEmpty" class="detail-content">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="true"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in detailList"
            :key="index"
            class="detail-card"
          >
            <div class="info-time">
              {{ item.time }}
            </div>
            <div class="info-text">
              <div v-if="item.logo" class="head-content">
                <img :src="item.logo" alt="头像">
              </div>
              {{ item.content }}
            </div>
            <div class="circle" />
          </div>
        </van-list>
      </div>
      <!-- v-else 无记录-->
      <div v-if="isEmpty" class="empty-img text-center">
        <img :src="beeIcon.emptyImg" alt="">
        <p class="tip">
          你好{{ detailData.nickname }}
        </p>
        <p class="tip">
          欢迎加入我们 开启共享之旅
        </p>
      </div>
    </div>

    <van-button round class="cash-btn" @click="toCash">
      我要提现
    </van-button>

    <van-popup v-model="downloadTip" class="download-tip flex">
      <div class="info text-center">
        <img :src="beeIcon.tipImg" class="tip-img">
        <p class="txt">
          为保障交易安全<br>请前往蜂集市App提现
        </p>
        <button class="download-btn" @click="goDownload">
          <span>前往蜂集市</span>
        </button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getPartner, getMyEarning, getMyEarningList } from '@/api/BeeApi/user'
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
        bee_firends_my_earn: require('@/assets/icon/beeFriends/info/bee_firend_img_income.png'),
        emptyImg: require('@/assets/icon/public/empty.png'),
        tipImg: require('@/assets/icon/beeFriends/info/tip_img.png')
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
      withdrawNum: 0,
      // 下载App弹框
      downloadTip: false
    }
  },
  computed: {},
  watch: {},
  created() {
    // document.body.style.backgroundColor = '#fff'
  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getMyEarningData()

    this.getPartnerData()
    // FIXME ios bug暂时无解
    try {
      setTimeout(this.getPartnerData(), 3000)
    } catch (error) {
      //
    }
    // FIXME ios bug暂时无解
    try {
      this.page = 1
      // setTimeout(document.querySelector('.tab-content').click(), 3000)
      setTimeout(() => {
        if (this.detailList.length === 0) {
          console.log('3s内没加载数据，手动执行')
          this.onLoad()
        }
      }, 3000)
    } catch (error) {
      //
    }
    if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: false })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(false)
    }
  },
  methods: {
    async getPartnerData() {
      const res = await getPartner()
      console.log('getPartnerData:', res)

      this.$store.state.user.withdrawNum = res.data.sup_balance
      this.withdrawNum = res.data.sup_balance
    },
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
      const res = await getMyEarningList({
        type: this.earnType,
        page: this.page
      })
      this.totalPages = res.data.page_size
      this.detailList = res.data.lists
    },
    // 切换在路上 已得到
    changeEarnType(type) {
      this.earnType = type
      this.page = 1
      this.detailList = []
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

        this.page++
        this.totalPages = res.data.page_size
        this.detailList.push(...res.data.lists)
        if (this.detailList.length === 0) {
          this.isEmpty = true
        } else {
          this.isEmpty = false
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
      if (this.withdrawNum < 100) {
        this.$toast('可提现余额不足100元！')
        return
      } else if (this.withdrawNum >= 100) {
        if (this.osObj.isApp) {
          // NOTE 如果是在app中，跳转到提现页面
          this.$router.push({
            name: 'friendPay'
          })
        } else {
          // NOTE 如果是在公众号中，弹框提示，并跳转到下载页面
          this.downloadTip = true
        }
      }
    },
    // 去下载app页面
    goDownload() {
      // window.location.href = window.location.origin + '/#/beeRegister'
      this.$router.push({
        name: 'beeRegister'
      })
    }
  }
}
</script>

<style scoped lang="less">
.earn-header {
  background-color: #fff;
  .head-img {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background: url("../../../assets/icon/beeFriends/info/bee_firend_img_top_bg1.png")
        top no-repeat,
      linear-gradient(180deg, @BeeDefault 40%, #fff 60%);

    .img-content {
      // margin: 0 auto 0.18rem;
      padding: 0 0.3rem;
      .avatar-img {
        width: 0.8rem;
        height: 0.8rem;
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
      .earning-tabs {
        background-color: #fff;
        border-radius: 0.1rem;
        width: 98%;
        margin: 0.3rem auto 0;
        padding-top: 0.6rem;
        box-shadow: 0 10px 20px #eee;
        position: relative;
        .my-earn-pic {
          position: absolute;
          top: -0.96rem;
          right: 0.3rem;
          width: 2.19rem;
          height: 0.96rem;
        }
      }
      .earning-num {
        font-size: 0.24rem;
        color: #666;

        p {
          margin: 0;
        }
        .label {
          margin-right: 0.2rem;
        }
        .total-num {
          margin-bottom: 0.2rem;
          .label {
            margin-right: 0;
          }
          .num {
            font-size: 0.6rem;
            color: #333;
          }
        }
      }
    }
    .user-name {
      font-size: 0.3rem;
      color: #fff;
    }
  }
  .earn-tab {
    margin-top: 0.6rem;
    .line {
      width: 1px;
      height: 0.9rem;
      background-color: #ccc;
    }
    .tab-content {
      text-align: center;
      padding: 0 0.6rem 0.5rem;
      &.active {
        border-bottom: 0.05rem solid @BeeDefault;
      }
      .num {
        font-size: 0.46rem;
        color: #fff;
        vertical-align: middle;
        color: #333;
        margin-bottom: 0.2rem;
      }
      .type-img {
        img {
          width: 0.36rem;
          height: 0.45rem;
          display: inline-block;
        }
        .type-text {
          font-size: 0.24rem;
          color: #666;
          margin: 0;
          padding: 0;
          margin-top: 0.04rem;
        }
      }
    }
  }
}
.earn-detail {
  padding: 0 0 0.3rem 0.6rem;
  background-color: #fff;
  min-height: 6rem;
  position: relative;
  .detail-title {
    .title-img {
      height: 0.53rem;
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
}
.list-avatar {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}
.empty-img {
  padding-top: 0.5rem;
  margin-left: -0.6rem;
  img {
    width: 2.88rem;
    height: 2.68rem;
    margin-bottom: 0.2rem;
  }
  .tip {
    font-size: 0.24rem;
    color: #999;
    margin-bottom: 0.1rem;
  }
}
.cash-btn {
  position: fixed;
  bottom: 0.2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: @BeeDefault;
  color: #fff;
  font-size: 0.36rem;
  border: none;
  padding: 0 0.35rem;
  width: 6.9rem;
}
.download-tip {
  background: #fff;
  width: 5.8rem;
  height: 5.2rem;
  border-radius: .1rem;
  .info{
    margin: auto;
  }
  .tip-img{
    width: 3.21rem;
    height: .63rem;
  }
  .txt{
    font-size: .28rem;
    color: #333;
    line-height: 1.5;
    margin: .9rem auto .62rem;
  }
  .download-btn {
    border: none;
    color: #fff;
    width: 3.2rem;
    height: 0.72rem;
    background: linear-gradient(
      180deg,
      rgba(255, 220, 31, 1),
      rgba(253, 150, 11, 1)
    );
    border-radius: 0.5rem;
    font-size: 0.32rem;
    span {
      display: block;
      height: 100%;
      width: 100%;
      line-height: 0.72rem;
    }
  }
}
</style>
