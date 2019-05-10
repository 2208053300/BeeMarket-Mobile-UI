<template>
  <div class="commodity-pre">
    <!-- TODO 视频图片开关 -->
    <van-swipe
      class="swipe-img"
      @change="onChange"
    >
      <van-swipe-item>
         <!-- TODO swiper中放置视频必须设置高度 -->
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
        <div class="video-img-swipe">
          <div class="video-img">
            <img
              v-if="showPicture"
              :src="beeIcon.product_detail_btn_video_normat"
              alt=""
            >
            <img
              v-else
              :src="beeIcon.product_detail_btn_video_selected"
              alt=""
            >
          </div>
          <div class="img-img">
            <img
              v-if="!showPicture"
              :src="beeIcon.product_detail_btn_pic_normat"
              alt=""
            >
            <img
              v-else
              :src="beeIcon.product_detail_btn_pic_selected"
              alt=""
            >
          </div>
        </div>
      </div>
    </van-swipe>
    <div class="limit-time">
      <span>限量疯抢中</span>
      <div class="limit-nowNum">
        仅剩<span class="num">  80  </span>件
      </div>
    </div>
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
      },
      beeIcon: {
        product_detail_btn_pic_normat: require('@/assets/icon/product/product_detail_btn_pic_normat@2x.png'),
        product_detail_btn_video_normat: require('@/assets/icon/product/product_detail_btn_video_normat@2x.png'),
        product_detail_btn_pic_selected: require('@/assets/icon/product/product_detail_btn_pic_selected@2x.png'),
        product_detail_btn_video_selected: require('@/assets/icon/product/product_detail_btn_video_selected@2x.png')
      },
      showPicture: false
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
    .video-img-swipe {
      position: absolute;
      left: -3.8rem;
      bottom: 0;
      height: 0.55rem;
      width: 2rem;
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      border-radius: 1rem;
    }
  }
  .limit-time{
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: @BeeDefault;
    font-size: 0.24rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    .num{
      font-size: 0.34rem;
    }
  }
}
</style>
