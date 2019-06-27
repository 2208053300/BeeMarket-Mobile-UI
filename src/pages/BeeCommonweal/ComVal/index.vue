<template>
  <div class="com-val">
    <van-notice-bar
      v-if="comVal.scroll_message"
      :text="comVal.scroll_message"
      left-icon="volume-o"
      background="transparent"
    />
    <div
      class="com-content"
      :style="{backgroundImage:'url('+beeIcon.mine_public_img_bg+')'}"
    >
      <div class="con-header">
        <div class="header-left">
          <div class="header-img">
            <img
              :src="comVal.head_img"
              alt=""
            >
          </div>
          <span class="name">{{ comVal.nickname }}</span>
        </div>
        <div
          class="header-rule"
          @click="showRule=true"
        >
          <van-icon :name="beeIcon.mine_public_icon_rule" />
          规则
        </div>
      </div>
      <div class="com-detail">
        <div class="com-detail1">
          <span class="com-text1">可用公益值</span>
          <p
            class="com-val"
            @click="goDetail(0)"
          >
            {{ comVal.available_charity_value }}
          </p>
          <!-- <span
            class="time"
            @click="goDetail"
          >本期分值 {{ comVal.begin_time }} - {{ comVal.end_time }} ></span>
          <p class="rank">
            在好友排名第{{ comVal.ranking }}名
          </p> -->
          <van-button
            class="com-text2"
            round
            @click="goCategory"
          >
            <span class="com-text3">海量商品</span>
            <span>畅享免单</span>
          </van-button>
        </div>
        <div class="com-detail2">
          <div
            class="detail2-item"
            @click="goDetail(1)"
          >
            <div class="detail2-title">
              累计公益值
            </div>
            <span class="num">{{ comVal.total_charity_value }}</span>
          </div>
          <div
            class="detail2-item"
            @click="goDetail(2)"
          >
            <div class="detail2-title">
              途中公益值
            </div>
            <span class="num">{{ comVal.not_arrived_charity_value }}</span>
          </div>
        </div>
        <!-- <help-chart
          v-if="comVal.novice_data"
          :com-val="comVal"
        /> -->
      </div>
    </div>
    <below-content :com-val="comVal" />
    <rule-card :show-rule.sync="showRule" />
  </div>
</template>

<script>
import { mineCharityValue } from '@/api/BeeApi/user'
// import helpChart from './components/helpChart'
import belowContent from './components/belowContent'
import ruleCard from './components/ruleCard'
import { getOs } from '@/utils'

export default {
  components: {
    // helpChart,
    belowContent,
    ruleCard
  },
  props: {},
  data() {
    return {
      beeIcon: {
        mine_public_img_bg: require('@/assets/icon/common/commonweal/mine_public_img_bg.png'),
        mine_public_icon_rule: require('@/assets/icon/common/commonweal/mine_public_icon_rule.png'),
        mine_public_icon_boost: require('@/assets/icon/common/commonweal/mine_public_icon_boost.png'),
        mine_public_icon_initiate: require('@/assets/icon/common/commonweal/mine_public_icon_initiate.png'),
        mine_public_icon_shop: require('@/assets/icon/common/commonweal/mine_public_icon_shop.png')
      },
      comVal: {},
      showRule: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.mineCharityValueData()
  },
  methods: {
    async mineCharityValueData() {
      const res = await mineCharityValue()
      this.comVal = res.data
    },
    goDetail(active) {
      const osObj = getOs()
      if (osObj.isWx) {
        this.$router.push({
          name: 'CommonwealDetail',
          query: { active: active }
        })
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToPWVDetail.postMessage(active)
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToPWVDetail(active)
      } else {
        this.$router.push({
          name: 'CommonwealDetail',
          query: { active: active }
        })
      }
    },
    goCategory() {
      const osObj = getOs()
      if (osObj.isWx) {
        this.$router.push('/category')
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToCatList.postMessage()
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToCatList()
      } else {
        this.$router.push('/category')
      }
    }
  }
}
</script>

<style scoped lang="less">
.com-val {
  .com-content {
    height: 6.06rem;
    padding: 0.3rem;
    background-color: @BeeDefault;
    color: #ffffff;
    background-size: cover;
    .con-header {
      height: 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-img {
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.3rem;
        overflow: hidden;
      }
      .name {
        color: #ffffff;
        font-size: 0.32rem;
      }
      .header-rule {
        text-align: center;
        font-size: 0.2rem;
        .van-icon {
          display: block;
          font-size: 0.4rem;
          margin-bottom: 0.04rem;
        }
      }
    }
    .com-detail {
      .com-detail1 {
        margin-top: 0.26rem;
        text-align: center;
        .com-text1 {
          font-size: 0.32rem;
        }
        .com-text2 {
          width: 2.9rem;
          height: 0.46rem;
          border: 0.02rem solid #ffffff;
          font-size: 0.24rem;
          color: #ffffff;
          line-height: 0.46rem;
          background-color: transparent;
          margin-top: 0.2rem;
          .com-text3 {
            margin-right: 0.26rem;
          }
        }
        .com-val {
          font-size: 1.1rem;
          padding: 0;
          margin: 0;
          margin-top: 0.2rem;
        }
        .time {
          margin-top: 0.25rem;
          font-size: 0.2rem;
        }
        .rank {
          font-size: 0.24rem;
          padding: 0;
          margin: 0;
          margin-top: 0.18rem;
        }
      }
    }
    .com-detail2 {
      margin-top: 0.6rem;
      display: flex;
      justify-content: space-around;
      .detail2-item {
        color: #ffffff;
        text-align: center;
        .detail2-title {
          font-size: 0.24rem;
          margin-bottom: 0.2rem;
        }
        .num {
          font-size: 0.32rem;
        }
      }
    }
  }
}
</style>
