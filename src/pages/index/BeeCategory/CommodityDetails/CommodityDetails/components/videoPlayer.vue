<template>
  <div class="video-player">
    <!-- TODO swiper中放置视频必须设置高度 -->
    <video
      ref="videoPlayer"
      class="video-js commodity-video vjs-default-skin vjs-big-play-centered vjs-16-9 "
    >
      <source
        :src="videoUrl"
        type="video/mp4"
      >
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
export default {
  components: {},
  props: {
    videoUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      player: null,
      options: {
        // autoplay: true
        controls: true
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initPlayer()
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    // FIXME 需要渲染视频组件
    initPlayer() {
      this.player = videojs(
        this.$refs.videoPlayer,
        this.options,
        function onPlayerReady() {
          console.log('onPlayerReady', this)
        }
      )
    }
  }
}
</script>

<style scoped lang="less">
.video-player {
  height: 7.5rem;
  display: flex;
  align-items: center;
}
</style>
