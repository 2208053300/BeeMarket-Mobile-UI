<template>
  <div class="bee-alcohol">
    <div style="position: relative">
      <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_01.jpg')" alt="head">
      <div style="position: absolute;bottom: 0;left: 0;display: flex;justify-content: center;width: 100%">
        <img
          :src="beeIcon.rule"
          alt="活动规则"
          style="width: 150px"
          @click="showRule=true"
        >
      </div>
    </div>
    <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_02.jpg')" alt="head">
    <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_03.jpg')" alt="head">
    <!-- 视频播放部分 -->
    <div style="position: relative">
      <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_04.jpg')" alt="head">
      <div class="video">
        <video
          ref="video"
          src="https://back-1252641901.cos.ap-chengdu.myqcloud.com/intro.mp4"
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
    <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_05.jpg')" alt="head">
    <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_06.jpg')" alt="head">
    <rule v-model="showRule" />
  </div>
</template>

<script>
import Rule from './components/rule'
export default {
  metaInfo: {
    title: '年终狂欢 瓜分1亿'
  },
  components: { Rule },
  props: {},
  data() {
    return {
      showControls: false,
      beeIcon: {
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png'),
        rule: require('@/assets/icon/alcohol/liqueur_button_rule.png')
      },
      showRule: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 如果有store说明改页面作为组件在webApp显示
    if (this.$store) {
      this.$store.state.app.beeHeader = true
      this.$store.state.app.beeFooter.show = false
    }
  },
  methods: {
    // 播放视频
    play() {
      this.$refs.video.play()
      this.showControls = true
    }
  }
}
</script>

<style scoped lang="less">
.bee-alcohol {
  @videoWidth: 6.68rem;
  @videoHeight: 3.76rem;
  .video {
    width: 100%;
    border-radius: 0.08rem;
    position: absolute;
    top: 1.36rem;
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
      width: 1.28rem;
      height: 1.28rem;
      top: 0.8rem;
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
}
</style>
