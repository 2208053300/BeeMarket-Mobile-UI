<template>
  <div class="RgsCtn bg-white">
    <div class="RegistrtFirst">
      <img src="../../../assets/icon/register/registerTitle1.jpg" alt="">

      <div class="video">
        <video
          ref="video"
          :src="video.video_url"
          :poster="video.first_screen"
          class="video-body"
          :controls="video.showControls"
          webkit-playsinline="true"
          playsinline
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
        />
        <!-- <div v-if="!video.showControls" style="position: relative"> -->

        <div v-if="!video.showControls" class="control" @click="play">
          <img
            :src="video.title_icon_stop"
            style="width: 1.28rem;height: 1.28rem"
          >
        </div>
      </div>

      <div class="RNext">
        <img :src="img.img1">
        <div class="down-box">
          <img :src="img.img2">
          <div class="download-link bg-white">
            <a
              href="https://itunes.apple.com/cn/app/%E8%9C%82%E9%9B%86%E5%B8%82/id1382648901?l=zh&ls=1&mt=8"
            >
              <img
                src="../../../assets/icon/register/download/ipone_img.png"
                alt=""
              ><span>iPhone 下载</span>
            </a>
            <a
              id="android"
              href="https://a.app.qq.com/o/simple.jsp?pkgname=com.bee.beemark"
            ><img
              src="../../../assets/icon/register/download/android_img.png"
              alt=""
            ><span>Android 下载</span></a>
          </div>
        </div>
      </div>

      <!-- <img :src="img.img3"> -->
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { GetRequest } from '@/utils/index'
export default {
  metaInfo: {
    title: '蜂集市'
  },
  components: {},
  props: {},
  data() {
    return {
      // 视屏
      video: {
        video_url:
          'https://img.fengjishi.com.cn/app/videos/education/intro.mp4',
        first_screen: require('@/assets/icon/register/vedio_bg.png'),
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png'),
        showControls: false
      },
      img: {
        img1: require('@/assets/icon/register/1@2x.jpg'),
        img2: require('@/assets/icon/register/2-1@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  // beforeRouteEnter(to, from, next) {
  //   if (window.localStorage.removeItem('BM-App-Token')) {
  //     window.localStorage.removeItem('BM-App-Token')
  //     window.location.reload
  //   }
  // },
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = 'white'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  async mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    // 请求任一接口判断是否登录
    // await this.$store.dispatch('GerUserStatus')
    // await isLogin()

    if (!GetRequest('code')) {
      window.localStorage.removeItem('BM-App-Token')
      await getToken()
    }
  },
  methods: {
    // 播放视频
    play() {
      console.log('play')

      this.$refs.video.play()
      this.video.showControls = true
    }
  }
}
</script>

<style scoped lang="less">
.video {
  position: relative;
  .video-body {
    background-color: black;
    width: 100%;
    height: 4.35rem;
  }
  .control {
    width: 1.28rem;
    height: 1.28rem;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.RegistrtFirst {
  // pointer-events: none;
  -webkit-tap-highlight-color: transparent !important;
  tap-highlight-color: transparent !important;
}

.RegistrtFirst > img {
  width: 100%;
  pointer-events: none;
  vertical-align: sub;
  -webkit-tap-highlight-color: transparent !important;
  tap-highlight-color: transparent !important;
}

.RegistrtFirst .RNext {
  margin-top: -5px;
}
.RegistrtFirst .RNext img {
  display: block;
  width: 100%;
}
.down-box {
  position: relative;
  margin-bottom: 0.5rem;
  .download-link {
    position: absolute;
    bottom:1.55rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    margin: 0.5rem auto;
    padding: 0 0.7rem;
    width: 100%;
    box-sizing: border-box;
    opacity: 0;
    a {
      display: flex;
      border: 0.04rem solid #f5bf52;
      color: #f5bf52;
      font-size: 0.28rem;
      justify-content: space-around;
      align-items: center;
      border-radius: 0.3rem;
      width: 2.68rem;
      padding: 0.1rem;
      &:nth-of-type(1) img {
        width: 0.41rem;
      }
      &:nth-of-type(2) img {
        width: 0.38rem;
      }
    }
  }
}
</style>
