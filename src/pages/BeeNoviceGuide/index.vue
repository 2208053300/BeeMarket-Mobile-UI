<template>
  <div>
    <img :src="beeIcon.head">
    <div class="video-container">
      <div class="video">
        <video
          ref="video"
          :src="video_url"
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
    <img
      v-for="(img, index) in imgs"
      :key="index"
      v-lazy="img"
      :src="img"
      class="lazy-img"
    >
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '新手攻略'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        head: require('@/assets/icon/noviceGuide/00-新手教培_改_01.png'),
        videoBackground: require('@/assets/icon/noviceGuide/00-新手教培_改_02.png'),
        title_icon_stop: require('@/assets/icon/noviceGuide/title_icon_stop@2x.png'),
        first_screen: require('@/assets/icon/task/talent/first_screen@3x.png')
      },
      imgs: [
        require('@/assets/icon/noviceGuide/00-新手教培_改_03.png'),
        require('@/assets/icon/noviceGuide/00-新手教培_改_04.png'),
        require('@/assets/icon/noviceGuide/00-新手教培_改_05.png'),
        require('@/assets/icon/noviceGuide/00-新手教培_改_06.png'),
        require('@/assets/icon/noviceGuide/00-新手教培_改_07.png')
      ],
      video_url: 'https://img.fengjishi.com.cn/product/video/mi9.mp4',
      showControls: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    if (this.$store) {
      this.$store.state.app.beeHeader = true
      this.$store.state.app.beeFooter.show = false
    }
  },
  methods: {
    play() {
      this.$refs.video.play()
      this.showControls = true
    }
  }
}
</script>

<style scoped lang="less">
@videoWidth: 6.4rem;
@videoHeight: 3.3rem;
.video-container {
  background: url(../../assets/icon/noviceGuide/00-新手教培_改_02.png);
  background-size: cover;
  padding: 0.52rem 0.54rem;
  .video {
    width: @videoWidth;
    height: @videoHeight;
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
      top: -3.3rem;
      left: 0;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.lazy-img {
  transition: 300ms linear;
  opacity: 0;
}
.lazy-img[lazy=loaded] {
  opacity: 1;
}
</style>
