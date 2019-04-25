<template>
  <div class="commodity-pre">
    <!-- TODO 视频图片开关 -->
    <van-swipe
      class="swipe-img"
      @change="onChange"
    >
      <van-swipe-item>
        <video
          ref="videoPlayer"
          class="video-js commodity-video vjs-default-skin vjs-big-play-centered vjs-16-9 "
        >
          <source
            src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
            type="video/mp4"
          >
        </video>
      </van-swipe-item>
      <van-swipe-item
        v-for="item in commodityData.img"
        :key="item"
      >
        <img
          :src="item"
          alt=""
        >
      </van-swipe-item>
      <div
        slot="indicator"
        class="custom-indicator"
      >
        {{ current + 1 }}/5
      </div>
    </van-swipe>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
export default {
  components: {},
  props: {
    commodityData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      current: 0,
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
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this)
      }
    )
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    onChange(index) {
      this.current = index
    }
  }
}
</script>

<style scoped lang="less">
.commodity-pre {
  min-height: 3.5rem;
  .van-swipe {
    .van-swipe-item {
      height: 7.5rem;
    }
  }
  .swipe-img {
    position: relative;
    .custom-indicator {
      width: 0.76rem;
      height: 0.4rem;
      line-height: 0.4rem;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 0.2rem;
      text-align: center;
      position: absolute;
      right: 0.3rem;
      bottom: 0.3rem;
    }
    .commodity-video {
    }
  }
}
</style>
