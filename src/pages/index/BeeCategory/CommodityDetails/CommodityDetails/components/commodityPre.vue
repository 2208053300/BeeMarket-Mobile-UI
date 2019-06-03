<template>
  <div class="commodity-pre">
    <!-- TODO 视频图片开关 -->
    <van-swipe
      ref="preSwipe"
      class="swipe-img"
      @change="onChange"
    >
      <van-swipe-item v-if="commodityData.video_url">
        <video-player
          ref="productVideo"
          :video-url="commodityData.video_url"
          :video-img="commodityData.video_img"
          :play-status.sync="playStatus"
        />
      </van-swipe-item>
      <van-swipe-item
        v-for="item in commodityData.album"
        :key="item.tUrl"
      >
        <img
          :src="item.tUrl"
          alt=""
        >
      </van-swipe-item>
      <div
        v-if="commodityData.album&&!playStatus"
        slot="indicator"
        class="custom-indicator"
        :class="{showBg:showPicture}"
      >
        <template v-if="showPicture">
          {{ current + 1 }}/{{ commodityData.album.length }}
        </template>
        <div
          v-if="commodityData.video_url"
          class="video-img-swipe"
        >
          <div class="video-img">
            <img
              v-if="showPicture"
              :src="beeIcon.product_detail_btn_video_normat"
              alt=""
              @click="changePic"
            >
            <img
              v-else
              :src="beeIcon.product_detail_btn_video_selected"
              alt=""
              @click="changePic"
            >
          </div>
          <div class="img-img">
            <img
              v-if="!showPicture"
              :src="beeIcon.product_detail_btn_pic_normat"
              alt=""
              @click="changeVid"
            >
            <img
              v-else
              :src="beeIcon.product_detail_btn_pic_selected"
              alt=""
              @click="changeVid"
            >
          </div>
        </div>
      </div>
    </van-swipe>
    <!-- 如果是蜂抢商品 -->
    <!-- <div class="limit-time">
      <span>限量蜂抢中</span>
      <div class="limit-nowNum">
        仅剩<span class="num"> 80 </span>件
      </div>
    </div> -->
  </div>
</template>

<script>
import videoPlayer from './videoPlayer'
export default {
  components: {
    videoPlayer
  },
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
      beeIcon: {
        product_detail_btn_pic_normat: require('@/assets/icon/product/product_detail_btn_pic_normat@2x.png'),
        product_detail_btn_video_normat: require('@/assets/icon/product/product_detail_btn_video_normat@2x.png'),
        product_detail_btn_pic_selected: require('@/assets/icon/product/product_detail_btn_pic_selected@2x.png'),
        product_detail_btn_video_selected: require('@/assets/icon/product/product_detail_btn_video_selected@2x.png')
      },
      showPicture: false,
      playStatus: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},

  methods: {
    onChange(index) {
      this.current = index
      if (index) {
        // FIXME 此处PC无法更改状态
        // this.$refs.productVideo.initPlayer()
        this.$refs.productVideo.videoPause()
        this.playStatus = false
        this.showPicture = true
      } else {
        this.showPicture = false
      }
    },
    changePic() {
      this.$refs.preSwipe.swipeTo(0)
    },
    changeVid() {
      this.$refs.preSwipe.swipeTo(1)
    }
  }
}
</script>

<style scoped lang="less">
.commodity-pre {
  min-height: 3.5rem;
  .van-swipe {
    .van-swipe-item {
      height: 7.5rem !important;
    }
  }
  .swipe-img {
    position: relative;
    background-color: #000000;
    .custom-indicator {
      width: 0.76rem;
      height: 0.4rem;
      line-height: 0.4rem;
      border-radius: 0.2rem;
      text-align: center;
      position: absolute;
      right: 0.3rem;
      bottom: 0.3rem;
    }
    .showBg {
      background-color: rgba(0, 0, 0, 0.3);
    }
    .video-img-swipe {
      position: absolute;
      left: -3.8rem;
      bottom: 0;
      height: 0.5rem;
      width: 2rem;
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      border-radius: 1rem;
    }
  }
  .limit-time {
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: @BeeDefault;
    font-size: 0.24rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    .num {
      font-size: 0.34rem;
    }
  }
}
</style>
