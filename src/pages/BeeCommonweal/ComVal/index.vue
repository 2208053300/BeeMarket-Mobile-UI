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
          <span class="com-text1">累计公益值</span>
          <p class="com-val">
            {{ comVal.total_charity_value }}
          </p>
          <span
            class="time"
            @click="goDetail"
          >本期分值 {{ comVal.begin_time }} - {{ comVal.end_time }} ></span>
          <p class="rank">
            在好友排名第2名
          </p>
        </div>
        <help-chart
          v-if="comVal.novice_data"
          :com-val="comVal"
        />
      </div>
    </div>
    <below-content :com-val="comVal" />
    <rule-card :show-rule.sync="showRule" />
  </div>
</template>

<script>
import { mineCharityValue } from '@/api/BeeApi/user'
import helpChart from './components/helpChart'
import belowContent from './components/belowContent'
import ruleCard from './components/ruleCard'
import { getOs } from '@/utils'

export default {
  components: {
    helpChart,
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
    goDetail() {
      const osObj = getOs()
      if (osObj.isWx) {
        this.$router.push({ name: 'CommonwealDetail' })
      } else if (osObj.isIphone) {
        window.webkit.messageHandlers.ToPWVDetail.postMessage('')
      } else if (osObj.isAndroid) {
        window.beeMarket.ToPWVDetail()
      } else {
        this.$router.push({ name: 'CommonwealDetail' })
      }
    }
  }
}
</script>

<style scoped lang="less">
.com-val {
  .com-content {
    height: 9rem;
    padding: 0.3rem;
    background-color: @BeeDefault;
    color: #ffffff;
    background-size: contain;
    .con-header {
      height: 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-img {
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 50%;
        background-color: #000;
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
  }
}
</style>
