<template>
  <div class="bee-alcohol">
    <bee-winning-roll
      v-if="showSwipe"
      style="position: fixed; top: 0.15rem;left: 0.3rem;z-index: 100"
      type="alcohol"
      width="200px"
      :autoplay="2000"
    />
    <!-- <transition name="van-slide-right">
      <div
        v-if="!osObj.isApp&&showShare"
        class="share-icon"
        @click="$router.push({ name: 'shareActive' })"
      >
        <van-icon name="share" />
      </div>
    </transition> -->

    <div style="position: relative">
      <img
        :src="require('@/assets/icon/alcohol/1-首页改版七-切图_01.jpg')"
        alt="head"
      >
      <div
        style="position: absolute;bottom: 0;left: 0;display: flex;justify-content: center;width: 100%"
      >
        <div style="width:150px;height:44.06px;">
          <img
            :src="beeIcon.rule"
            alt="活动规则"
            style="width: 150px;z-index:100;"
            @click="showRule = true"
          >
        </div>
        <div
          class="active-rule"
          @click="showRule = true"
        >
          活动规则
        </div>
      </div>
    </div>
    <div class="splice-2">
      <img
        :src="require('@/assets/icon/alcohol/index_splice_2.jpg')"
        alt="head"
      >
      <img
        class="heartBeat drink"
        :src="require('@/assets/icon/alcohol/drink.png')"
      >
      <img
        class="heartBeat earning"
        :src="require('@/assets/icon/alcohol/earning.png')"
      >
    </div>
    <img
      :src="require('@/assets/icon/alcohol/1-首页改版七-切图_03.jpg')"
      alt="head"
    >
    <!-- 视频播放部分 -->
    <div style="position: relative">
      <img
        :src="require('@/assets/icon/alcohol/1-首页改版七-切图_04.jpg')"
        alt="head"
      >
      <div class="video">
        <video
          ref="video"
          src="https://img.fengjishi.com/app/videos/maotai/intro.mp4"
          preload="auto"
          :poster="
            showControls
              ? ''
              : require('@/assets/icon/alcohol/pw_pic_video.png')
          "
          class="video-body"
          :controls="showControls"
        />
        <div v-if="!showControls" class="control">
          <img
            :src="beeIcon.title_icon_stop"
            style="width: 1.28rem;height: 1.28rem"
            @click="play"
          >
        </div>
      </div>
    </div>
    <img
      :src="require('@/assets/icon/alcohol/1-首页改版七-切图_05.jpg')"
      alt="head"
    >
    <img
      :src="require('@/assets/icon/alcohol/1-首页改版七-切图_06.jpg')"
      alt="head"
    >
    <img
      :src="require('@/assets/icon/alcohol/1-首页改版七-切图_07.jpg')"
      alt="head"
    >
    <div style="position: relative">
      <img
        :src="require('@/assets/icon/alcohol/1-首页改版七-切图_08.jpg')"
        alt="head"
      >
      <img
        :src="require('@/assets/icon/alcohol/liqueur_button_buy.png')"
        alt="立即购买"
        class="bottom-btn"
        @click="showBuy = true"
      >
    </div>
    <rule v-model="showRule" />
    <select-num v-model="showBuy" />
    <img :src="beeIcon.ticketImg" class="ticket-img " @click="goTicket">
  </div>
</template>

<script>
import Rule from './components/Rule'
import SelectNum from './components/SelectNum'
import Cookies from 'js-cookie'
import { getUID } from '@/api/BeeApi/user'
import { showShareIcon, hideShareIcon } from '@/utils/share'
import BeeWinningRoll from '@/components/BeeWinningRoll'
import wait from '@/utils/wait'
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
export default {
  metaInfo: {
    title: '年终狂欢 瓜分10亿'
  },
  components: { Rule, SelectNum, BeeWinningRoll },
  props: {},
  data() {
    return {
      showControls: false,
      beeIcon: {
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png'),
        rule: require('@/assets/icon/alcohol/liqueur_button_rule.png'),
        ticketImg: require('@/assets/icon/alcohol/liqueur_pic_red_envelope1.png')
      },
      showRule: false,
      uid: 0,
      showBuy: false,
      showSwipe: true,
      osObj: getOs(),
      showShare: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  destroyed() {
    this.$store.commit('SET_BACKTOP_HIDE', false)
    hideShareIcon()
  },
  mounted() {
    this.initShare()
    this.$store.commit('SET_BACKTOP_HIDE', true)
    // 在APP页面显示header
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = false
    if ('uid' in this.$route.query) {
      Cookies.set('uid', this.$route.query.uid)
    }
    showShareIcon()
  },
  methods: {
    // 播放视频
    play() {
      this.$refs.video.play()
      this.showControls = true
    },
    async initShare() {
      try {
        const res = await getUID()
        this.uid = res.data.uid

        const osObj = getOs()
        if (osObj.isWx) {
          wxapi.wxShare({
            title: '年终狂欢，瓜分10亿',
            desc: '茅台免费喝，现金轻松赚！\n全民抢酒，全民抢钱！',
            imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
            link: this.uid
              ? location.origin + '/#/beeAlcohol?uid=' + this.uid
              : location.origin + '/#/beeAlcohol'
          })
          await wait(1000)
          this.showShare = true
        } else {
          window.appShare = () => {
            if (osObj.isIphone) {
              window.webkit.messageHandlers.ToLiquorShare.postMessage('')
            } else if (osObj.isAndroid) {
              window.beeMarket.ToLiquorShare()
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 跳转到现金券列表
    goTicket() {
      this.$router.push({
        name: 'redPacket'
      })
    }
  }
}
</script>

<style scoped lang="less">
.bee-alcohol {
  @videoWidth: 6.68rem;
  @videoHeight: 3.76rem;
  width: 7.5rem;
  margin: 0 auto;
  .share-icon {
    position: fixed;
    top: 0.2rem;
    right: 0.2rem;
    width: 0.6rem;
    height: 0.6rem;
    color: @BeeDefault;
    text-align: center;
    font-weight: bold;
    font-size: 0.6rem;
    z-index: 100;
    background-color: #fff;
    border-radius: 50%;
  }
  // 图片衔接处有白线，随出此下策
  img {
    margin-bottom: -1px;
  }
  .video {
    width: 100%;
    border-radius: 0.08rem;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    .video-body {
      background: white;
      object-position: center;
      width: @videoWidth;
      height: @videoHeight;
      border-radius: 0.1rem;
      object-fit: cover;
      border: 0.04rem solid #fbf9fe;
    }
    .control {
      width: 100%;
      height: @videoHeight;
      top: 0;
      left: 0;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .bottom-btn {
    height: auto;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    left: 0;
  }
  .ticket-img {
    position: fixed;
    bottom: 1.2rem;
    right: 0.3rem;
    width: 1.48rem;
    height: 1.78rem;
    // width: 1.12rem;
    // height: 1.35rem;
    animation: shake 1.5s infinite;
  }
  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    5% {
      transform: rotate(10deg);
    }
    10% {
      transform: rotate(0deg);
    }
    15% {
      transform: rotate(-10deg);
    }
    20% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(10deg);
    }
    30% {
      transform: rotate(0deg);
    }
    35% {
      transform: rotate(-10deg);
    }
    40% {
      transform: rotate(0deg);
    }
  }
  .splice-2 {
    position: relative;
  }
  .heartBeat {
    position: absolute;
    top: 0.9rem;
    width: 1.33rem;
    height: 0.56rem;
    animation:heartBeat 1.3s ease-in-out infinite ;
  }
  .drink {
    left: 1.5rem;
  }
  .earning {
    right: 1.5rem;
  }
  @keyframes heartBeat {
    0% {
      transform: scale(1);
    }

    14% {
      transform: scale(1.3);
    }

    28% {
      transform: scale(1);
    }

    42% {
      transform: scale(1.3);
    }

    70% {
      transform: scale(1);
    }
  }
  .active-rule{
    width: 150px;
    height:40px;
    background:linear-gradient(180deg,rgba(255,220,31,1),rgba(253,150,11,1));
    border-radius:44px;
    z-index: 99;
    position: absolute;
    font-size:0.3rem;
    color:rgba(255,255,255,1);
    line-height:40px;
    text-shadow:0px 2px 5px rgba(214,63,3,0.55);
    text-align: center;
    box-shadow: 0 3px 1px #BB3B03;
  }
}
</style>
