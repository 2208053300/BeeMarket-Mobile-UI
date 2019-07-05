<template>
  <div
    v-if="$store.state.user.userStatus===1"
    class="my-friends"
    :style="{backgroundImage:'url('+beeIcon.bee_firends_img_bg+')'}"
    :class="{hasHeader:$store.state.app.beeHeader&&!osObj.isApp}"
  >
    <div
      class="user-fixed"
      :style="{backgroundImage:'url('+beeIcon.bee_firends_img_avatar_bg+')'}"
    >
      <div
        class="header-img"
        @click="$router.push({name:'myEarn'})"
      >
        <div class="header-img2">
          <div class="header-img3">
            <img
              :src="partnerData.user_head||$store.state.app.head_detault"
              alt="头像"
              :onerror="$store.state.app.head_detault"
            >
          </div>
        </div>
      </div>
      <div
        ref="countItem"
        class="my-grade"
        :style="{backgroundImage:'url('+beeIcon.bee_firend_icon_gold_top+')'}"
        @click="showProject=true"
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
    </div>
    <div
      class="rule-fixed"
      @click="$router.push({name:'beeFriendRule'})"
    >
      <img
        :src="beeIcon.bee_firends_icom_rule"
        alt="规则"
      >
    </div>
    <list-type
      ref="listType"
      :honey-type.sync="honeyType"
    />
    <div
      class="bottom-fixed1"
      @click="showRank=true"
    >
      <img
        :src="beeIcon.bee_firends_icon_firends"
        alt="蜂友排行"
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
    <join-project :show-project.sync="showProject" />
    <transition name="fade1">
      <div
        v-if="showHoney"
        class="honey-pop"
        :style="{backgroundImage:'url('+beeIcon.bee_firend_icon_bubble+')'}"
        @click="harvestBalanceData()"
      >
        <div
          v-if="can_receive_balance"
          class="get-num"
        >
          {{ can_receive_balance }}
        </div>
        <div
          v-if="can_receive_balance"
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
import { getPartner, getReceiveNum, harvestBalance } from '@/api/BeeApi/user'
import Honeycomb from './components/Honeycomb'
import UserCard from './components/UserCard'
import FriendsRank from './components/FriendsRank'
import JoinProject from './components/JoinProject'
import ListType from './components/ListType'
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
    JoinProject,
    ListType,
    ICountUp
  },
  props: {},
  data() {
    return {
      detailCard: false,
      showRank: false,
      showProject: false,
      beeIcon: {
        bee_firends_img_avatar_bg: require('@/assets/icon/beeFriends/home/bee_firends_img_avatar_bg.png'),
        bee_firend_icon_gold_top: require('@/assets/icon/beeFriends/home/bee_firend_icon_gold_top.png'),
        bee_firends_icom_rule: require('@/assets/icon/beeFriends/home/bee_firends_icom_rule.png'),
        bee_firends_icon_firends: require('@/assets/icon/beeFriends/home/bee_firends_icon_firends.png'),
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
        show_users2: [],
        sup_balance: 0
      },
      combData: [],
      can_receive_balance: 0,
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
  async beforeRouteEnter(to, from, next) {
    await next(async vm => {
      // 通过 `vm` 访问组件实例
      try {
        await vm.$store.dispatch('GerUserStatus')
      } catch (error) {
        vm.$toast('获取合伙人身份失败，请重试！')
      }
      // 0 非合伙人 1 合伙人 2 冻结
      if (vm.$store.state.user.userStatus === 0) {
        // 当 is_partner = 0 时，该字段有效；1表示满足申请条件，0表示不满足
        // if (vm.$store.state.user.applyCondition === 0) {
        //   vm.$router.replace({ name: 'noQualified' })
        // } else if (vm.$store.state.user.applyCondition === 1) {
        //   vm.$router.replace({ name: 'introduction' })
        // }
        vm.$router.replace({ name: 'introduction' })
      } else if (vm.$store.state.user.userStatus === 1) {
        vm.$router.push({ name: 'beeFriends' })
      } else if (vm.$store.state.user.userStatus === 2) {
        vm.$router.replace({ name: 'freeze' })
      } else {
        vm.$toast('获取合伙人身份失败，请重试！')
        // vm.$router.push({ name: 'beeFriends' })
        // vm.$router.replace({ name: 'introduction' })
        // vm.$router.go(-1)
      }
    })
  },
  computed: {},
  watch: {},
  created() {},
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
    this.getReceiveNumData()
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
        link: `https://app.fengjishi.com/#/beeFriends?uid=${this.uid}`
      })
    },

    async getPartnerData() {
      this.showComb = false
      const res = await getPartner({ type: this.honeyType })
      this.partnerData = res.data
      this.showComb = true
      // try {
      //   await this.$refs.honeycomb.handleAction(50)
      // } catch (error) {
      //   setTimeout(await this.$refs.honeycomb.handleAction(50), 3000)
      // }
      // await this.$refs.honeycomb.animateList()
    },
    async getReceiveNumData() {
      try {
        const res = await getReceiveNum({ type: this.honeyType })
        this.can_receive_balance = res.data ? res.data.can_receive_balance : 0
      } catch (error) {
        //
      }
    },
    async harvestBalanceData() {
      if (!this.can_receive_balance) {
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
            Number(this.can_receive_balance)
          this.getReceiveNumData()
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
    // 播放视频
    play() {
      this.$refs.video.play()
      this.showControls = true
    },
    pause() {
      this.$refs.video.pause()
    },
    handleCloseRule() {
      this.showRule = false
      this.pause()
    },
    omitNumber(val) {
      if (Number(val) > 1000) {
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
    top: 0.32rem;
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
      margin-right: 0.2rem;
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
    .my-grade {
      width: 0.74rem;
      height: 0.85rem;
      text-align: center;
      line-height: 0.85rem;
      background-size: contain;
      background-repeat: no-repeat;
      color: #fff;
      -webkit-text-stroke: 0.02rem #9d6232;
      text-stroke: 0.02rem #9d6232;
      font-weight: bold;
      font-size: 0.32rem;
      // font-family: PingFang-SC-Heavy, sans-serif;
    }
  }
  .rule-fixed {
    position: fixed;
    top: 1.5rem;
    left: 0.22rem;
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
  .rule-pop {
    border-radius: 0.3rem 0.3rem 0 0;
    overflow: hidden;
    .rule-content {
      height: 10rem;
      overflow: scroll;
      position: relative;
      .rule-header {
        position: fixed;
        width: 100%;
        height: 0.6rem;
        background-color: #fff;
        z-index: 100;
        .close-img {
          position: absolute;
          top: 0.16rem;
          right: 0.16rem;
          width: 0.4rem;
          height: 0.4rem;
        }
      }
      .head-img {
        margin-top: 0.6rem;
      }
      @videoWidth: 6.4rem;
      @videoHeight: 3.28rem;
      .rule-video {
        background-size: cover;
        .video {
          padding: 0.52rem 0.54rem;
          border-radius: 0.08rem;
          .video-body {
            background-color: black;
            width: @videoWidth;
            height: @videoHeight;
            border-radius: 0.08rem;
          }
          .control {
            width: @videoWidth;
            height: @videoHeight;
            top: -@videoHeight;
            left: 0;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .img-content {
        height: 45.49rem;
      }
    }
  }
}
.hasHeader {
  .user-fixed {
    top: 1.2rem;
  }
  .rt-fixed {
    top: 1.2rem;
  }
  .rule-fixed {
    top: 2.5rem;
  }
}
</style>
