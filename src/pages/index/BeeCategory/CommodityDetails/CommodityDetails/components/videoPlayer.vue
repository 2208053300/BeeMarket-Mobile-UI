<template>
  <div class="product-video-player">
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
      },
      beeIcon: {
        product_detail_icon_broadcast: require('@/assets/icon/product/product_detail_icon_broadcast@2x.png')
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
      var Component = videojs.getComponent('Component')
      var playButton = videojs.extend(Component, {
        createEl: () => {
          return videojs.createEl('img', {
            className: 'play-button',
            src: this.beeIcon.product_detail_icon_broadcast,
            enableTouchActivity: (event) => {
              console.log(event)
            }
          })
        }
      })
      videojs.registerComponent('playButton', playButton)
      this.player.addChild('playButton')
    }
  }
}
</script>

<style lang="less">
.product-video-player {
  height: 7.5rem;
  display: flex;
  align-items: center;
  .video-js {
  }
  .play-button{
    position: absolute;
    top: 38%;
    left: 41%;
    height: 1.3rem;
    width: 1.3rem;
  }
}
</style>
