<template>
  <div class="rule-content">
    <div class="head-img">
      <img :src="beeIcon.rule_head">
    </div>
    <div
      class="rule-video"
      :style="{ backgroundImage: 'url(' + beeIcon.videoBackground + ')' }"
    >
      <div class="video">
        <video
          ref="video"
          src="https://img.fengjishi.com.cn/app/videos/education/friendship-course-1.mp4"
          class="video-body"
          :poster="showControls ? '' : beeIcon.first_screen"
          :controls="showControls"
        />
        <div v-if="!showControls" style="position: relative">
          <div class="control">
            <img
              :src="beeIcon.title_icon_stop"
              style="width: 1.28rem;height: 1.28rem"
              @click="play"
            >
          </div>
        </div>
      </div>
    </div>
    <div>
      <img :src="beeIcon.rule_1" alt="">
      <img :src="beeIcon.rule_2" alt="">
      <img :src="beeIcon.rule_3" alt="">
      <img :src="beeIcon.rule_4" alt="">
      <img :src="beeIcon.rule_5" alt="">
      <img :src="beeIcon.rule_6" alt="">
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'

export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      showControls: false,
      beeIcon: {
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png'),
        videoBackground: require('@/assets/icon/noviceGuide/00-新手教培_改_02.png'),
        first_screen: require('@/assets/icon/task/talent/first_screen@3x.png'),
        rule_head: require('@/assets/icon/beeFriends/rule/提成规则2_02.jpg'),
        rule_1: require('@/assets/icon/beeFriends/rule/提成规则2_04.jpg'),
        rule_2: require('@/assets/icon/beeFriends/rule/提成规则2_05.jpg'),
        rule_3: require('@/assets/icon/beeFriends/rule/提成规则2_06.png'),
        rule_4: require('@/assets/icon/beeFriends/rule/提成规则2_07.jpg'),
        rule_5: require('@/assets/icon/beeFriends/rule/提成规则2_08.jpg'),
        rule_6: require('@/assets/icon/beeFriends/rule/提成规则2_10.jpg')
      },
      osObj: getOs()
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    if (this.osObj.isWx) {
      // this.loadUID()
    } else if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: false })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(false)
    }
  },
  methods: {
    // 播放视频
    play() {
      this.$refs.video.play()
      this.showControls = true
    },
    pause() {
      this.$refs.video.pause()
    }
  },
  metaInfo() {
    return {

      title: '蜂友圈'
    }
  }
}
</script>

<style scoped lang="less">
   .rule-content {
      // height: 10rem;
      // overflow: scroll;
      // position: relative;
      .rule-header {
        position: fixed;
        width: 100%;
        height: 0.6rem;
        background-color: #fff;
        z-index: 100;
        // .close-img {
        //   position: absolute;
        //   top: 0.16rem;
        //   right: 0.16rem;
        //   width: 0.4rem;
        //   height: 0.4rem;
        // }
      }
      .head-img {
        // margin-top: 0.6rem;
      }
      @videoWidth: 6.4rem;
      @videoHeight: 3.6rem;
      .rule-video {
        display: flex;
        justify-content: center;
        background-size: cover;
        .video {
          padding: 0.52rem 0.54rem;
          border-radius: 0.08rem;
          box-sizing: border-box;
          .video-body {
            width: @videoWidth;
            height: @videoHeight;
            border-radius: 0.08rem;
            object-fit: cover;
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
    }
</style>
