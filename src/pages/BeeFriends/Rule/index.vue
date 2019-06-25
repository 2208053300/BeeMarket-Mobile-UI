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
          :poster="beeIcon.first_screen"
          class="video-body"
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
    <div class="img-content">
      <img :src="beeIcon.bee_firends_img_rule" alt="">
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      showControls: false,
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
      }
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
  meteInfo() {
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
      @videoHeight: 3.28rem;
      .rule-video {
        background-size: cover;
        .video {
          padding: 0.52rem 0.54rem;
          border-radius: 0.08rem;
          box-sizing: border-box;
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
</style>
