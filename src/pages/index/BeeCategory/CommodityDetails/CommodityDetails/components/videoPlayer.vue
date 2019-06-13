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
    <div
      v-if="playStatus"
      class="control-overlay"
      @click="changeControl"
    />
    <transition name="van-slide-up">
      <div
        v-show="playStatus&&showControlBar"
        class="control-bar"
      >
        <div
          v-if="isPlay"
          class="play-btn"
          @click.stop="videoPause"
        >
          <img
            :src="beeIcon.product_detail_icon_broadcast1"
            alt="暂停"
          >
        </div>
        <div
          v-else
          class="play-btn"
          @click.stop="videoPlay"
        >
          <img
            :src="beeIcon.product_detail_icon_pause"
            alt="播放"
          >
        </div>
        <div class="play-progress">
          <div class="time">
            {{ time1 }}
          </div>
          <div
            ref="progressCon"
            class="progress-content"
          >
            <div
              class="progress"
              :style="{width:videoPro+'%'}"
            />
            <div
              ref="progressBtn"
              class="progress-btn"
            >
              <img
                :src="beeIcon.product_detail_icon_circle"
                alt=""
              >
            </div>
          </div>
          <div class="time">
            {{ time2 }}
          </div>
        </div>
        <div class="full-btn">
          <!-- v-if="isFull" -->
          <div
            class="img-content"
            @click.stop="enterFullScreen"
          >
            <img
              :src="beeIcon.product_detail_icon_fullscreen"
              alt=""
            >
          </div>
          <!-- <div
            v-else
            class="img-content"
            @click.stop="enterFullScreen"
          >
            <img
              :src="beeIcon.product_detail_icon_halfscreen"
              alt=""
            >
          </div> -->
        </div>
        <div
          v-if="isSound"
          class="vol-btn"
          @click.stop="soundOff"
        >
          <img
            :src="beeIcon.product_detail_icon_sound_open"
            alt=""
          >
        </div>
        <div
          v-else
          class="vol-btn"
          @click.stop="soundOpen"
        >
          <img
            :src="beeIcon.product_detail_icon_sound_off"
            alt=""
          >
        </div>
      </div>
    </transition>
    <div
      v-show="!showControlBar"
      class="bottom-progress"
    >
      <div
        class="progress-bar"
        :style="{width:videoPro+'%'}"
      />
    </div>
    <div
      v-if="!playStatus"
      class="play-button"
      @click="firstPlay"
    >
      <img
        :src="beeIcon.product_detail_icon_broadcast"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import videojs from 'video.js/dist/video.min.js'
import 'video.js/dist/video-js.css'
export default {
  components: {},
  props: {
    videoUrl: {
      type: String,
      default: ''
    },
    videoImg: {
      type: String,
      default: ''
    },
    playStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      player: null,
      beeIcon: {
        product_detail_icon_broadcast: require('@/assets/icon/product/product_detail_icon_broadcast@2x.png'),
        product_detail_icon_broadcast1: require('@/assets/icon/product/product_detail_icon_broadcast1@2x.png'),
        product_detail_icon_pause: require('@/assets/icon/product/product_detail_icon_pause@2x.png'),
        product_detail_icon_sound_open: require('@/assets/icon/product/product_detail_icon_sound_open@2x.png'),
        product_detail_icon_sound_off: require('@/assets/icon/product/product_detail_icon_sound_off@2x.png'),
        product_detail_icon_fullscreen: require('@/assets/icon/product/product_detail_icon_fullscreen@2x.png'),
        product_detail_icon_halfscreen: require('@/assets/icon/product/product_detail_icon_halfscreen@2x.png'),
        product_detail_icon_circle: require('@/assets/icon/product/product_detail_icon_circle@2x.png')
      },
      isPlay: false,
      isSound: true,
      isFull: false,
      videoPro: 0,
      time1: null,
      time2: null,
      showControlBar: true
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
        {
          // autoplay: true
          controls: true,
          bigPlayButton: false,
          poster: this.videoImg
        },
        function onPlayerReady() {
          this.controls(false)
        }
      )
      // 全屏时显示控制条
      this.player.on('fullscreenchange', () => {
        if (this.isFull) {
          this.player.controls(true)
          this.isFull = false
        } else {
          this.player.controls(false)
        }
      })
      this.player.one('play', () => {
        setInterval(() => {
          this.setVideoTime()
        }, 500)
        const Content = this.$refs.progressCon
        const Button = this.$refs.progressBtn

        Button.addEventListener('touchmove', e => {
          e.stopPropagation()
          if (
            e.targetTouches[0].clientX <
              Content.offsetWidth + Content.offsetLeft &&
            e.targetTouches[0].clientX > Content.offsetLeft
          ) {
            // 获取位移X
            const time = (
              (e.targetTouches[0].clientX - Content.offsetLeft) /
              Content.offsetWidth
            ).toFixed(2)
            this.setVideoTime(time)
          }
        })
      })
    },
    // 视频控制
    videoPlay() {
      this.isPlay = true
      this.player.play()
    },
    videoPause() {
      this.isPlay = false
      this.player.pause()
    },
    soundOpen() {
      this.isSound = true
      this.player.muted(false)
    },
    soundOff() {
      this.isSound = false
      this.player.muted(true)
    },
    enterFullScreen() {
      this.isFull = true
      this.player.requestFullscreen()
    },
    exitFullScreen() {
      this.isFull = false
      this.player.exitFullScreen()
    },
    s_to_hs(s) {
      // 计算分钟
      // 算法：将秒数除以60，然后下舍入，既得到分钟数
      var h
      h = Math.floor(s / 60)
      // 计算秒
      // 算法：取得秒%60的余数，既得到秒数
      s = s % 60
      // 将变量转换为字符串
      h += ''
      s += ''
      // 如果只有一位数，前面增加一个0
      h = h.length === 1 ? '0' + h : h
      s = s.length === 1 ? '0' + s : s
      return h + ':' + s
    },
    setVideoTime(time) {
      if (time) {
        this.player.currentTime(this.player.duration() * time)
      }
      // 进度条
      this.videoPro = (this.player.currentTime() * 100) / this.player.duration()
      // 已播放时间
      this.time1 = this.s_to_hs(this.player.currentTime().toFixed())
      // 剩余时间
      this.time2 = this.s_to_hs(
        this.player.duration().toFixed() - this.player.currentTime().toFixed()
      )
    },
    changeControl() {
      this.showControlBar = !this.showControlBar
    },
    firstPlay() {
      this.$emit('update:playStatus', true)
      this.videoPlay()
    }
  }
}
</script>

<style lang="less">
.product-video-player {
  height: 7.5rem;
  display: flex;
  align-items: center;
  position: relative;
  .control-overlay {
    position: absolute;
    width: 100%;
    height: 80%;
    left: 0;
    top: 0;
  }
  .play-button {
    position: absolute;
    top: 36%;
    left: 41%;
    height: 1.3rem;
    width: 1.3rem;
  }
  .control-bar {
    height: 1rem;
    box-sizing: border-box;
    padding: 0.28rem 0.3rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    .play-btn {
      width: 0.36rem;
      height: 0.42rem;
      margin-right: 0.28rem;
    }
    .play-progress {
      display: flex;
      align-items: center;
      .time {
        font-size: 0.2rem;
        color: #ffffff;
      }
      .progress-content {
        margin: 0 0.2rem;
        width: 3.84rem;
        height: 0.08rem;
        border-radius: 0.04rem;
        background-color: rgba(255, 255, 255, 0.4);
        position: relative;
        white-space: nowrap;
        display: flex;
        .progress {
          height: 0.08rem;
          border-radius: 0.04rem;
          background: linear-gradient(
            to right,
            rgba(244, 152, 34, 0.8),
            #ffa42f
          );
        }
        .progress-btn {
          width: 0.36rem;
          height: 0.36rem;
          position: relative;
          top: -0.12rem;
          left: -0.05rem;
        }
      }
    }
    .full-btn {
      height: 0.4rem;
      width: 0.4rem;
      margin-left: 0.4rem;
    }
    .vol-btn {
      height: 0.6rem;
      width: 0.6rem;
      position: absolute;
      top: -0.6rem;
      right: 0.3rem;
    }
  }
  .bottom-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0.04rem;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 0.04rem;
      background: linear-gradient(to right, rgba(244, 152, 34, 0.8), #ffa42f);
    }
  }
}
</style>
