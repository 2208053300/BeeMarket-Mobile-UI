<template>
  <div
    v-if="$store.state.user.userStatus===3||$store.state.user.userStatus===4"
    class="my-friends"
    :style="{backgroundImage:'url('+beeIcon.bee_firends_img_bg+')'}"
    :class="[{hasHeader:$store.state.app.beeHeader&&!osObj.isApp},{hasNotice:$store.state.user.userStatus === 3}]"
  >
    <Swiper :block="true" :type="type" :bg-color="bgColor" :font-color="fontColor" class="bee-swiper" />
    <div
      v-if="$store.state.user.userStatus === 3"
      class="active-notice"
    >
      <div id="noticeContent" class="notice-content">
        <van-notice-bar
          left-icon="volume-o"
          background="transparent"
          color="#ff3f3f"
        >
          <span class="notice-text">您的蜂友圈尚未激活，任购商品即可激活蜂友圈～</span>
        </van-notice-bar>
      </div>
    </div>
    <div
      id="userFixed"
      class="user-fixed"
      :style="{backgroundImage:'url('+beeIcon.bee_firends_img_avatar_bg+')'}"
      @click="$router.push({name:'myEarn'})"
    >
      <div class="header-img">
        <div class="header-img2">
          <div class="header-img3">
            <img
              :src="partnerData.head_image_url||$store.state.app.head_detault"
              alt="头像"
              :onerror="$store.state.app.head_detault"
            >
          </div>
        </div>
      </div>
      <div class="right-header">
        <div
          ref="countItem"
          class="my-grade"
          :style="{backgroundImage:'url('+beeIcon.bee_firend_icon_gold_top+')'}"
        >
          <template v-if="Number(partnerData.sup_balance)<1000">
            <ICountUp
              :delay="delay"
              :end-val="omitNumber(partnerData.sup_balance)"
              :options="options"
            />
          </template>
          <span v-else>{{ omitNumber(partnerData.sup_balance) }}</span>
        </div>
        <span class="grade-text">我的收益</span>
      </div>
    </div>
    <div
      id="rule-fixed"
      class="rule-fixed"
      @click="$router.push({name:'beeFriendRule'})"
    >
      <img
        :src="beeIcon.bee_firends_icom_rule"
        alt="规则"
      >
    </div>
    <!-- <list-type
      ref="listType"
      :honey-type.sync="honeyType"
    /> -->
    <div
      class="bottom-fixed1"
      @click="showRank=true"
    >
      <img
        :src="beeIcon.bee_firends_icon_firends"
        alt="蜂友排行"
      >
    </div>
    <div
      class="bottom-fixed2"
      @click="showRank2=true"
    >
      <img
        :src="beeIcon.bee_firends_home_icon_vendor"
        alt="厂商排行"
      >
    </div>
    <honeycomb
      v-if="showComb"
      ref="honeycomb"
      :detail-card.sync="detailCard"
      :comb-data="combData"
      :detail-item.sync="detailItem"
    />
    <user-card
      :detail-card.sync="detailCard"
      :detail-item.sync="detailItem"
      :honey-type="honeyType"
      :center-point="centerPoint"
    />
    <friends-rank :show-rank.sync="showRank" />
    <factory-rank :show-rank2.sync="showRank2" />
    <join-project :show-project.sync="showProject" />
    <go-farm-gift :show-gift.sync="showGift" />
    <transition name="fade1">
      <div
        v-if="showHoney"
        class="honey-pop"
        :style="{backgroundImage:'url('+beeIcon.bee_firend_icon_bubble+')'}"
        @click="harvestBalanceData()"
      >
        <div
          v-if="Number(partnerData.can_receive_balance)"
          class="get-num"
        >
          {{ partnerData.can_receive_balance }}
        </div>
        <div
          v-if="Number(partnerData.can_receive_balance)"
          class="handle-tip"
        >
          <div class="tip-hand">
            <img
              :src="beeIcon.bee_firend_icon_charge"
              alt="一键收取"
            >
          </div>
          <div class="circle" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import { getPartner, harvestBalance } from '@/api/BeeApi/user'
import Honeycomb from './components/Honeycomb'
import UserCard from './components/UserCard'
import FriendsRank from './components/FriendsRank'
import FactoryRank from './components/FactoryRank'
import JoinProject from './components/JoinProject'
import Swiper from '../../BeeFreeGift/components/Swiper'
// import ListType from './components/ListType'
import GoFarmGift from './components/GoFarmGift'
import ICountUp from 'vue-countup-v2'
import { setTimeout } from 'timers'
import { getUID } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'

export default {
  metaInfo: {
    title: '蜂友圈'
  },
  components: {
    Honeycomb,
    UserCard,
    FriendsRank,
    FactoryRank,
    JoinProject,
    // ListType,
    ICountUp,
    GoFarmGift,
    Swiper
  },
  props: {},
  data() {
    return {
      // 中奖信息滚动所需数据
      bgColor: 'rgba(255, 237, 213, 1)',
      fontColor: '#333',
      type: 3,

      detailCard: false,
      showRank: false,
      showRank2: false,
      showProject: false,
      showGift: false,
      fromRoute: false,
      beeIcon: {
        bee_firends_img_avatar_bg: require('@/assets/icon/beeFriends/home/bee_firends_img_avatar_bg.png'),
        bee_firend_icon_gold_top: require('@/assets/icon/beeFriends/home/bee_firend_icon_gold_top.png'),
        bee_firends_icom_rule: require('@/assets/icon/beeFriends/home/bee_firends_icom_rule.png'),
        bee_firends_icon_firends: require('@/assets/icon/beeFriends/home/bee_firends_icon_firends.png'),
        bee_firends_home_icon_vendor: require('@/assets/icon/beeFriends/home/bee_firends_home_icon_vendor.png'),
        bee_firend_icon_gold: require('@/assets/icon/beeFriends/home/bee_firend_icon_gold.png'),
        bee_firend_icon_moregold: require('@/assets/icon/beeFriends/home/bee_firend_icon_moregold.png'),
        bee_firend_icon_bubble: require('@/assets/icon/beeFriends/home/bee_firend_icon_bubble.png'),
        bee_firend_icon_charge: require('@/assets/icon/beeFriends/home/bee_firend_icon_charge.png'),
        bee_firends_img_bg: require('@/assets/icon/beeFriends/home/bee_firends_img_bg.png'),
        bee_firends_img_rule: require('@/assets/icon/beeFriends/home/bee_firends_img_rule.png'),
        bee_firends_invite_icon_off: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_off.png'),
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png'),
        first_screen: require('@/assets/icon/task/talent/first_screen@3x.png'),
        videoBackground: require('@/assets/icon/noviceGuide/00-新手教培_改_02.png'),
        rule_head: require('@/assets/icon/noviceGuide/00-新手教培_改_01.png')
      },
      showHoney: true,
      honeyType: 2,
      partnerData: {
        lists: [],
        sup_balance: 0
      },
      combData: [],
      detailItem: {},
      delay: 1000,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: '',
        decimalPlaces: 2
      },
      centerPoint: {},
      // 获取 os 平台
      osObj: getOs(),
      showRule: false,
      showControls: false,
      uid: 0,
      showComb: false
    }
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      // 判断是否弹出农礼包弹框
      if (['myEarn', 'beeFriendRule'].indexOf(from.name) === -1) {
        vm.$store.state.user.showFarmPop = true
      } else {
        vm.$store.state.user.showFarmPop = false
      }
      // 通过 `vm` 访问组件实例
      try {
        await vm.$store.dispatch('GerUserStatus')
      } catch (error) {
        vm.$toast('获取合伙人身份失败，请重试！' + error)
      }
      // 1未绑定手机号普通用户 2注销后的普通用户 3有蜂友圈的普通用户 4有蜂友圈的合伙人 5冻结蜂友圈的合伙人
      if (vm.$store.state.user.userStatus === 1) {
        // 如果不满足，跳转绑定手机号
        vm.$router.replace({
          path: '/persion/profile/accountBind/bindPhone',
          query: { reason: 'beeFriends' }
        })
      } else if (vm.$store.state.user.userStatus === 2) {
        vm.$router.replace({ name: 'introduction' })
      } else if (vm.$store.state.user.userStatus === 5) {
        vm.$router.replace({ name: 'freeze' })
      }
    })
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    this.getPartnerData()
    // FIXME ios bug暂时无解
    try {
      setTimeout(this.getPartnerData(), 3000)
    } catch (error) {
      //
    }
    this.clearHistory()
    this.loadUID()
  },
  methods: {
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: '蜂集市-蜂友圈',
        desc: '就差你了，成为合伙人加入蜂友圈，一起拥有持续收益！',
        imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
        link:
          window.location.href.split('#')[0] +
          '#' +
          `/beeFriends?uid=${this.uid}`
      })
    },

    async getPartnerData() {
      this.showComb = false
      const res = await getPartner()
      this.partnerData = res.data
      this.showComb = true
      this.$store.state.user.withdrawNum = this.partnerData.sup_balance
      // 如果是一星合伙人
      if (
        this.$store.state.user.showFarmPop &&
        this.partnerData.lists[0].level < 2
      ) {
        this.showGift = true
        this.$store.state.user.showFarmPop = false
      }
    },
    async harvestBalanceData() {
      if (!Number(this.partnerData.can_receive_balance)) {
        this.$toast({
          position: 'bottom',
          message: '您目前还没有可收集的余额！'
        })
        return false
      }
      const res = await harvestBalance({ type: this.honeyType })
      if (res.status_code === 200) {
        this.showHoney = false
        setTimeout(() => {
          this.showHoney = true
          this.partnerData.sup_balance =
            Number(this.partnerData.sup_balance) +
            Number(this.partnerData.can_receive_balance)
          // 保存变更余额
          this.$store.state.user.withdrawNum = this.partnerData.sup_balance
          this.partnerData.can_receive_balance = 0
        }, 3000)
      }
    },
    // 清除历史
    async clearHistory() {
      if (this.osObj.isWx) {
        //
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        await window.webkit.messageHandlers.clearHistory.postMessage({
          url: window.location.href
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        await window.beeMarket.clearHistory()
      } else {
        //
      }
    },
    omitNumber(val) {
      if (Number(val) > 1000000) {
        return Math.floor(Number(val) / 10000) / 100 + 'M'
      } else if (Number(val) > 1000) {
        return Math.floor(Number(val) / 10) / 100 + 'K'
      } else {
        return Number(val)
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-friends {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #fdd354 !important;
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  .user-fixed {
    position: fixed;
    top: 0.92rem;
    left: 0.22rem;
    height: 0.9rem;
    width: 2.14rem;
    z-index: 100;
    background-size: contain;
    display: flex;
    align-items: center;
    .header-img {
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 50%;
      border: 0.02rem solid @BeeDefault;
      box-sizing: border-box;
      padding: 0.02rem;
      margin-right: 0.14rem;
      .header-img2 {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0.02rem;
        border-radius: 50%;
        border: 0.05rem solid #fff;
        .header-img3 {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border-radius: 50%;
          border: 0.02rem solid #fed559;
          background-color: #fff;
          overflow: hidden;
        }
      }
    }
    .right-header {
      text-align: center;
      .my-grade {
        height: 0.56rem;
        line-height: 0.56rem;
        text-align: center;
        background-size: 0.47rem 0.56rem;
        background-repeat: no-repeat;
        background-position: center;
        color: #fff;
        -webkit-text-stroke: 0.02rem #9d6232;
        text-stroke: 0.02rem #9d6232;
        font-weight: bold;
        font-size: 0.28rem;
        // font-family: PingFang-SC-Heavy, sans-serif;
      }
      .grade-text {
        font-size: 0.2rem;
        color: #9d6232;
      }
    }
  }
  .rule-fixed {
    position: fixed;
    top: 0.92rem;
    right: 0.3rem;
    height: 0.92rem;
    width: 0.75rem;
    z-index: 100;
  }
  .bottom-fixed1 {
    position: fixed;
    bottom: 0.6rem;
    left: 0.4rem;
    height: 1.14rem;
    width: 1.01rem;
    z-index: 100;
  }
  .bottom-fixed2 {
    position: fixed;
    bottom: 0.6rem;
    left: 1.8rem;
    height: 1.14rem;
    width: 1.01rem;
    z-index: 100;
  }
  .honey-pop {
    position: absolute;
    width: 1.06rem;
    height: 1.19rem;
    background-size: contain;
    background-repeat: no-repeat;
    text-align: center;
    line-height: 1.1rem;
    bottom: 0.6rem;
    right: 0.7rem;
    z-index: 100;
    animation: heart 1.3s ease-in-out 2.7s infinite alternate;
    @keyframes heart {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(0.3rem);
      }
    }
    .get-num {
      position: absolute;
      top: 0;
      left: -0.3rem;
      height: 0.3rem;
      min-width: 0.7rem;
      text-align: center;
      line-height: 0.3rem;
      border-radius: 0.2rem;
      background-color: @Red4;
      box-sizing: border-box;
      border: 0.02rem solid #fff;
      font-size: 0.2rem;
      color: #fff;
    }
    .handle-tip {
      position: absolute;
      bottom: 0;
      right: -0.4rem;
      .tip-hand {
        width: 0.91rem;
        height: 0.72rem;
        z-index: 100;
      }
      .circle {
        width: 0.3rem;
        height: 0.3rem;
        border: 0.04rem solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        position: absolute;
        left: -0.2rem;
        top: 0;
        animation: heart3 1.3s ease-in-out 2.7s infinite alternate;
        @keyframes heart3 {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.2);
          }
        }
      }
    }
  }
  // .fade1-enter-active,
  .fade1-leave-active {
    animation-play-state: paused;
    transition: all 3s;
  }
  // .fade1-enter,
  .fade1-leave-to {
    transform: translateY(-30px);
    bottom: 6rem;
    opacity: 0;
  }
  .active-notice {
    position: fixed;
    width: 100%;
    top: 2.1rem;
    height: 0.4rem;
    line-height: 0.4rem;
    z-index: 80;
    .notice-content {
      max-width: 5rem;
      height: 0.4rem;
      border-radius: 0.4rem;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      margin: auto;
      .van-notice-bar {
        position: relative;
        top: -0.16rem;
      }
    }
    .notice-icon {
      vertical-align: middle;
      color: @Red1;
      margin-right: 0.2rem;
    }
    .notice-text {
      font-size: 0.26rem;
      color: #fff;
    }
  }
}
.hasHeader {
  .user-fixed {
    top: 1.8rem;
  }
  .rt-fixed {
    top: 1.2rem;
  }
  .rule-fixed {
    top: 1.8rem;
  }
  .active-notice {
    top: 3.1rem;
  }
}
</style>
