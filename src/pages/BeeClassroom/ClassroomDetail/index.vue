<template>
  <div class="class-room-detail">
    <div style="background: white">
      <p class="title">
        {{ detail.title }}
      </p>
      <p class="subtitle">
        作者<span>{{ detail.author }}</span>{{ detail.date }}
      </p>
      <div class="video">
        <video
          ref="video"
          :src="detail.video_url"
          :poster="detail.first_screen"
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
      <div style="text-align: center;padding-top: 0.4rem">
        <img
          :src="beeIcon.classroom_pic_triangle"
          style="width: 0.24rem;height: 0.22rem"
        >
      </div>
      <div class="recommend-content">
        <ul>
          <li
            v-for="item in recommendList"
            :key="item.id"
            @click="goDetail(item.id)"
          >
            <div>
              <div class="point" />
            </div>{{ item.title }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="showDownload" class="button-container">
      <div class="bottom-button">
        <a :href="videoUrl" download="file.mp4">
          <van-button
            class="button"
            round
            @click="downVideo"
          >
            <div class="img-content">
              <img
                :src="beeIcon.icon_download"
                alt=""
              >
            </div>
            下载该视频
          </van-button>
        </a>
      </div>
    </div>
    <div :class="bottomImg">
      <img :src="beeIcon.classroom_pic_bg">
    </div>
  </div>
</template>

<script>
import { getUID } from '@/api/BeeApi/user'
import { classRoomDetail } from '@/api/BeeApi/classRoom'
import { getOs } from '@/utils'
import { isLogin } from '@/utils/auth'
import wxapi from '@/utils/wxapi'
export default {
  metaInfo: {
    title: '课堂详情'
  },
  components: {},
  props: {},
  data() {
    return {
      detail: {},
      beeIcon: {
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png'),
        classroom_pic_triangle: require('@/assets/icon/classroom/classroom_pic_triangle@2x.png'),
        classroom_pic_bg: require('@/assets/icon/classroom/classroom_pic_bg@2x.png'),
        icon_download: require('@/assets/icon/classroom/icon_download@2x.png')
      },
      showControls: false,
      uid: 0,
      osObj: getOs(),
      recommendList: []
    }
  },
  computed: {
    // 获取视频链接
    videoUrl() {
      if (this.osObj.isIphone) {
        return 'javascript:void(0);'
      } else {
        return this.detail.video_url
      }
    },
    // 计算是否显示下载按钮
    showDownload() {
      return !(this.osObj.isIphone && !this.osObj.isApp)
    },
    // 根据是否显示下载按钮设置class样式
    bottomImg() {
      return {
        'bottom-img': !this.showDownload,
        'bottom-img-has-btn': this.showDownload
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.loadUID()

    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.appShare
    if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: true })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(true)
    }
    this.getDetail(this.$route.params.id)
  },
  methods: {
    // 播放视频
    play() {
      this.$refs.video.play()
      this.showControls = true
    },
    // 打开其他课堂详情
    goDetail(id) {
      this.$router.replace({
        name: 'classroomDetail',
        params: { id }
      })
    },
    // 分享
    appShare() {
      if (this.osObj.isWx) {
        //
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: '集市课堂 - 蜂集市',
          desc: '零风险、轻创业、大财富，你准备好了吗？',
          img_path: 'https://img.fengjishi.com/app/images/share_logo.jpg',
          // 地址应该放 web 站 网页
          url: this.getShareLink()
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          '集市课堂 - 蜂集市',
          '零风险、轻创业、大财富，你准备好了吗？',
          'https://img.fengjishi.com/app/images/share_logo.jpg',
          this.getShareLink()
        )
      }
    },
    async loadUID() {
      try {
        const res = await getUID()
        this.uid = res.data.uid
        wxapi.wxShare({
          title: '集市课堂 - 蜂集市',
          desc: '零风险、轻创业、大财富，你准备好了吗？',
          imgUrl:
              'https://img.fengjishi.com/app/images/share_logo.jpg',
          link: this.getShareLink()
        })
      } catch (error) {
        this.$toast(error)
      }
    },
    // 去下载视频
    downVideo() {
      // 如果是苹果APP则调用APP接口下载
      if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToDownloadVideo.postMessage({
          url: this.detail.video_url
        })
      }
    },
    // 跳转到需要登录的路由
    async authRoute(path) {
      if (!(await isLogin())) {
        this.$router.push('/login')
      } else {
        this.$router.push(path)
      }
    },
    // 获取分享链接
    getShareLink() {
      return `https://app.fengjishi.com/beeClassroom#/detail/${
        this.$route.params.id
      }?uid=${this.uid}`
    },
    // 获取课堂详情
    async getDetail(id) {
      const res = await classRoomDetail({ id })
      this.detail = {
        title: res.data.title,
        author: res.data.author,
        date: res.data.create_time,
        video_url: res.data.video,
        first_screen: res.data.video_image
      }
      this.recommendList = res.data.next
    }
  },
  // 当前打开另外一个课堂时会调用此方法
  beforeRouteUpdate(to, from, next) {
    this.detail.first_screen = ''
    this.showControls = false
    this.detail.video_url = ''
    this.getDetail(to.params.id)
    next()
  }
}
</script>

<style lang="less">
.class-room-detail {
  @videoWidth: 6.4rem;
  @videoHeight: 3.6rem;
  p {
    margin: 0;
  }
  .title {
    padding: 0.52rem 0.3rem 0 0.3rem;
    font-size: 0.44rem;
    color: @Grey12;
    font-weight: bold;
    font-family: "PingFang SC", sans-serif;
  }
  .subtitle {
    padding: 0.4rem 0.3rem 0 0.3rem;
    color: @Grey1;
    font-size: 0.24rem;
    span {
      padding: 0 0.28rem;
      font-size: 0.28rem;
      color: @BeeDefault;
      font-family: "PingFang SC", sans-serif;
    }
  }
  .video {
    padding: 0.8rem 0.54rem 0 0.54rem;
    border-radius: 0.08rem;
    position: relative;
    display: flex;
    justify-content: center;
    .video-body {
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
  .article {
    padding: 0.32rem 0.54rem 0 0.54rem;
    font-size: 0.28rem;
    font-family: "PingFang SC", sans-serif;
    line-height: 1.8;
    color: @Grey12;
  }
  .recommend-tip {
    background: black;
    color: white;
    font-size: 0.34rem;
    font-family: "PingFang SC", sans-serif;
    font-weight: bold;
  }
  .recommend-content {
    padding: 0.04rem 1.08rem 1rem 1.08rem;
    color: @BeeDefault3;
    font-size: 0.28rem;
    ul {
      text-decoration: underline;
      text-underline-offset: 2px;
      li {
        letter-spacing: 0.02rem;
        display: flex;
        align-items: baseline;
        line-height: 0.38rem;
        margin-top: 0.36rem;
        vertical-align: middle;
        div {
          flex-shrink: 0;
          height: 0.38rem;
        }
        .point {
          display: inline-block;
          width: 0.1rem;
          height: 0.1rem;
          background-color: @BeeDefault3;
          vertical-align: middle;
          margin-right: 0.24rem;
        }
      }
    }
  }
  .button-container {
    text-align: center;
    width: 100%;
    position: relative;
    .bottom-button {
      width: 100%;
      position: absolute;
      top: -22px;
      .button {
        width: 4.64rem;
        font-size: 0.3rem;
        color: #fff;
        background: linear-gradient(to right, #ffbd2f, #ffa42f);
        .img-content {
          width: 0.17rem;
          height: 0.24rem;
          display: inline-block;
          margin-right: 0.16rem;
          img {
            vertical-align: initial;
          }
        }
      }
    }
  }
  .bottom-img {
    padding: 0.2rem 0.3rem;
  }
  .bottom-img-has-btn {
    padding: 0.72rem 0.3rem 0.2rem;
  }
}
</style>
