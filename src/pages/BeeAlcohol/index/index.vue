<template>
  <div class="bee-alcohol">
    <bee-winning-roll
      style="position: fixed; top: 0.15rem;left: 0.3rem;z-index: 100"
      type="alcohol"
    />
    <div style="position: relative">
      <img :src="require('@/assets/icon/alcohol/1-首页改版七-切图_01.jpg')" alt="head">
      <div style="position: absolute;bottom: 0;left: 0;display: flex;justify-content: center;width: 100%">
        <img
          :src="beeIcon.rule"
          alt="活动规则"
          style="width: 150px"
          @click="showRule=true"
        >
      </div>
    </div>
    <img :src="require('@/assets/icon/alcohol/1-首页改版七-切图_02.jpg')" alt="head">
    <img :src="require('@/assets/icon/alcohol/1-首页改版七-切图_03.jpg')" alt="head">
    <!-- 视频播放部分 -->
    <div style="position: relative">
      <img :src="require('@/assets/icon/alcohol/1-首页改版七-切图_04.jpg')" alt="head">
      <div class="video">
        <video
          ref="video"
          src="https://img.fengjishi.com/app/videos/maotai/intro.mp4"
          preload="auto"
          :poster="showControls ? '' : require('@/assets/icon/alcohol/pw_pic_video.png')"
          class="video-body"
          :controls="showControls"
        />
        <div
          v-if="!showControls"
          class="control"
        >
          <img
            :src="beeIcon.title_icon_stop"
            style="width: 1.28rem;height: 1.28rem"
            @click="play"
          >
        </div>
      </div>
    </div>
    <img :src="require('@/assets/icon/alcohol/1-首页改版七-切图_05.jpg')" alt="head">
    <img :src="require('@/assets/icon/alcohol/1-首页改版七-切图_06.jpg')" alt="head">
    <img :src="require('@/assets/icon/alcohol/1-首页改版七-切图_07.jpg')" alt="head">
    <div style="position: relative">
      <img :src="require('@/assets/icon/alcohol/1-首页改版七-切图_08.jpg')" alt="head">
      <img
        :src="require('@/assets/icon/alcohol/liqueur_button_buy.png')"
        alt="立即购买"
        class="bottom-btn"
        @click="showBuy=true"
      >
    </div>
    <rule v-model="showRule" />
    <select-num v-model="showBuy" />
    <img :src="beeIcon.ticketImg" class="ticket-img" @click="goTicket">
  </div>
</template>

<script>
import Rule from './components/Rule'
import SelectNum from './components/SelectNum'
import Cookies from 'js-cookie'
import { getUID } from '@/api/BeeApi/user'
import { getOs } from '@/utils'
import { showShareIcon, setShareOptions } from '@/utils/share'
import BeeWinningRoll from '@/components/BeeWinningRoll'

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
        ticketImg: require('@/assets/icon/alcohol/liqueur_pic_red_envelope.png')
      },
      showRule: false,
      uid: 0,
      showBuy: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initShare()
    // 在APP页面不显示header
    if (!getOs().isApp) {
      this.$store.state.app.beeHeader = false
      this.$store.state.app.beeFooter.show = false
    }
    if (this.$route.query.uid) {
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
        setShareOptions({
          title: '年终狂欢，瓜分10亿',
          desc: '茅台免费喝，现金轻松赚！\n全民抢酒，全民抢钱！',
          link: this.uid ? location.origin + '/beeAlcohol#/?uid=' + this.uid : location.origin + '/beeAlcohol#/'
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 分享
    appShare() {
      if (this.osObj.isWx) {
        //
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: this.activity.share_data.title,
          desc: this.activity.share_data.desc,
          img_path: this.activity.share_data.img,
          // 地址应该放 web 站 网页
          url: this.activity.share_data.link
          // url: this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          this.activity.share_data.title,
          this.activity.share_data.desc,
          this.activity.share_data.img,
          this.activity.share_data.link
          // this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        )
      } else {
        //
      }
    },
    // 跳转到现金券列表
    goTicket() {
      this.$router.push({
        path: '/ticket'
      })
    }
  }
}
</script>

<style scoped lang="less">
.bee-alcohol {
  @videoWidth: 6.68rem;
  @videoHeight: 3.76rem;
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
      object-position: center;
      width: @videoWidth;
      height: @videoHeight;
      border-radius: 0.08rem;
      object-fit: cover;
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
  .ticket-img{
    position: fixed;
    bottom: 1rem;
    right: 0;
    width:2rem;
    height: 2.2rem;
  }
}
</style>
