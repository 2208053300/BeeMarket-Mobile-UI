<template>
  <div>
    <img :src="require('@/assets/icon/giftPackage/wellcome/wellcome_01.png')" alt="">
    <div class="video">
      <video
        ref="video"
        preload="auto"
        src="https://img.fengjishi.com/app/videos/produce/produce_charity.mp4"
        :poster="video.showControls ? '' : video.first_screen"
        class="video-body"
        :controls="video.showControls"
      />
      <div
        v-if="!video.showControls"
        class="control"
      >
        <img
          :src="video.title_icon_stop"
          style="width: 1.28rem;height: 1.28rem"
          @click="play"
        >
      </div>
    </div>
    <img :src="require('@/assets/icon/giftPackage/wellcome/wellcome_02.png')" alt="">
    <img :src="require('@/assets/icon/giftPackage/wellcome/wellcome_03.png')" alt="">
    <img :src="require('@/assets/icon/giftPackage/wellcome/wellcome_04.png')" alt="">
    <img :src="require('@/assets/icon/giftPackage/wellcome/wellcome_05.png')" alt="">
    <img :src="require('@/assets/icon/giftPackage/wellcome/wellcome_06.png')" alt="">
    <div class="goto-buy">
      <button @click="toGiftPackage">
        立即选购
      </button>
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import { getUID } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'

export default {
  props: {},
  data() {
    return {
      video: {
        showControls: false,
        first_screen: require('@/assets/icon/giftPackage/wellcome/first_screen@3x.png'),
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png')
      },
      // 获取 os 平台
      osObj: getOs()
    }
  },
  mounted() {
    this.$store.commit('SET_BACKTOP_HIDE', true)
    this.$store.state.app.beeFooter.show = false

    this.loadUID()

    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.appShare
    if (this.osObj.isWx) {
      //
    } else if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: true })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(true)
    } else {
      //
    }
  },
  destroyed() {
    this.$store.commit('SET_BACKTOP_HIDE', false)
  },
  methods: {
    toGiftPackage() {
      const osObj = getOs()
      if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToProducePackage.postMessage({
          alertRule: false
        })
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToPackage(false)
      } else {
        this.$router.replace({ name: 'giftPackageHome' })
      }
    },
    // 播放视频
    play() {
      this.$refs.video.play()
      this.video.showControls = true
    },

    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: '蜂集市-让生活蜂富起来！',
        desc: '能省能免能赚，共享电商平台',
        imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
        link: window.location.href.split('#')[0] + '#' + `/beeGiftPackage?uid=${this.uid}`
      })
    },
    // 分享
    appShare() {
      if (this.osObj.isWx) {
        //
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: '蜂集市-让生活蜂富起来！',
          desc: '能省能免能赚，共享电商平台',
          img_path: 'https://img.fengjishi.com/app/images/share_logo.jpg',
          // 地址应该放 web 站 网页
          url: window.location.href.split('#')[0] + '#' + `/beeGiftPackage?uid=${this.uid}`
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          '蜂集市-让生活蜂富起来！',
          '能省能免能赚，共享电商平台',
          'https://img.fengjishi.com/app/images/share_logo.jpg',
          window.location.href.split('#')[0] + '#' + `/beeLimit?uid=${this.uid}`
        )
      } else {
        //
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @videoWidth: 6.4rem;
  @videoHeight: 3.6rem;
  .video {
    padding: 0 0.54rem;
    border-radius: 0.08rem;
    position: relative;
    display: flex;
    top: -@videoHeight;
    margin-bottom: -@videoHeight;
    justify-content: center;
    .video-body {
      width: @videoWidth;
      height: @videoHeight;
      border-radius: 0.08rem;
      object-fit: cover;
    }
    .control {
      width: 1.28rem;
      height: 1.28rem;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .goto-buy {
    position: fixed;
    width: 100vw;
    display: flex;
    justify-content: center;
    bottom: 0.7rem;
    button {
      border: none;
      padding: 0;
      line-height: 1rem;
      width: 6.8rem;
      color: white;
      font-size: 0.42rem;
      border-radius: 5rem;
      background: #915212;
      box-shadow: 2px 2px 27px #76410b;
    }
  }
</style>
