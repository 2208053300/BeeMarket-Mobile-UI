<template>
  <div class="enrolling">
    <img src="https://img.fengjishi.com/lianchuang/enrolling/competition_pic_headfigure.png">
    <div class="video">
      <video
        ref="video"
        preload="auto"
        src="https://img.fengjishi.com/lianchuang/components/appeal.mp4"
        class="video-body"
        :controls="showControls"
        :poster="showControls ? '': require('@/assets/icon/enrolling/first_screen@3x.png')"
      />
      <div
        v-if="!showControls"
        class="control"
      >
        <img
          :src="icons.stop"
          style="width: 1.28rem;height: 1.28rem"
          @click="play"
        >
      </div>
    </div>
    <van-sticky>
      <div class="nav">
        <span :class="{ 'nav-current': active === 0}" class="nav-text" @click="scrollTo(0)">
          大赛介绍
        </span>
        <span>|</span>
        <span :class="{ 'nav-current': active === 1}" class="nav-text" @click="scrollTo(1)">
          奖项设置
        </span>
        <span>|</span>
        <span :class="{ 'nav-current': active === 2}" class="nav-text" @click="scrollTo(2)">
          大赛赛程
        </span>
      </div>
    </van-sticky>
    <div>
      <img
        id="content-0"
        class="nav-content"
        src="https://img.fengjishi.com/lianchuang/enrolling/competition_pic_introduction.png"
      >
      <img
        id="content-1"
        class="nav-content"
        src="https://img.fengjishi.com/lianchuang/enrolling/competition_pic_award.png"
      >
      <img
        id="content-2"
        class="nav-content"
        src="https://img.fengjishi.com/lianchuang/enrolling/competition_pic_schedule.png"
        style="padding-bottom: 1.8rem"
      >
    </div>
    <div class="btn-group">
      <router-link :to="{name: 'CompetitionDetails'}">
        <img :src="require('@/assets/icon/enrolling/competition_button_apply.png')">
      </router-link>
      <img v-if="enrollingDisplayLevel===0" :src="require('@/assets/icon/enrolling/competition_button_details_d.png')">
      <img
        v-if="enrollingDisplayLevel===1"
        :src="require('@/assets/icon/enrolling/competition_button_details.png')"
        @click="$refs.enrollDialog.showDialog()"
      >
    </div>
    <enroll-dialog ref="enrollDialog" />
  </div>
</template>

<script>
import { isJoin } from '@/api/BeeApi/lcEnrollingApi'
import enrollDialog from './components/enrollDialog'
export default {
  components: {
    enrollDialog
  },
  metaInfo() {
    return {
      title: '联创大赛报名'
    }
  },
  props: {},
  data() {
    return {
      icons: {
        stop: require('@/assets/icon/public/title_icon_stop@2x.png')
      },
      showControls: false,
      active: 0,
      form: {
        name: '',
        tel: '',
        code: '',
        uid: this.$route.query.uid
      },
      checked: false,
      countdown: 0,
      countdownInterval: -1,
      enrollingDisplayLevel: 0 // 0为不显示报名卡片 1为完全显示报名卡片内容
    }
  },
  computed: {
    getCodeText() {
      if (this.countdown === 0) {
        return '获取验证码'
      } else {
        return `${this.countdown}s`
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, false)
    this.checkIsEnrolling()
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      const navContents = document.querySelectorAll('.nav-content')
      const heightArr = []
      navContents.forEach(item => {
        heightArr.push(item.offsetTop)
      })
      let top = document.documentElement.scrollTop || document.body.scrollTop
      top = top + document.querySelector('.nav').clientHeight
      let num = 0
      for (let n = 0; n < heightArr.length; n++) {
        // 在此处通过判断滚动条到顶部的值和当前窗口高度的关系
        // （当前窗口的n倍 <= top <= 当前窗口的n+1倍）来取得和导航索引值的对应关系
        if (top >= heightArr[n] && top < heightArr[n + 1]) {
          num = n
        } else if (top >= heightArr[heightArr.length - 1]) {
          num = heightArr.length - 1
        }
      }
      if (this.isToEnd()) {
        num = heightArr.length - 1
      }
      this.active = num
    },
    // 判断是不是滑倒最后一条
    isToEnd() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      return scrollTop + windowHeight >= scrollHeight
    },
    scrollTo(index) {
      // 获取目标的offsetTop 随后减去navBar的高度
      let targetOffsetTop = document.querySelector(`#content-${index}`)
      targetOffsetTop = targetOffsetTop.offsetTop - document.querySelector('.nav').clientHeight
      // 获取当前offsetTop
      let currentOffsetTop = document.documentElement.scrollTop || document.body.scrollTop
      const STEP = 50
      function smoothDown() {
        if (currentOffsetTop < targetOffsetTop) {
          if (targetOffsetTop - currentOffsetTop >= STEP) {
            currentOffsetTop += STEP
          } else {
            currentOffsetTop = targetOffsetTop
          }
          document.body.scrollTop = currentOffsetTop
          document.documentElement.scrollTop = currentOffsetTop
          requestAnimationFrame(smoothDown)
        }
      }
      function smoothUp() {
        if (currentOffsetTop > targetOffsetTop) {
          if (currentOffsetTop - targetOffsetTop >= STEP) {
            currentOffsetTop -= STEP
          } else {
            currentOffsetTop = targetOffsetTop
          }
          document.body.scrollTop = currentOffsetTop
          document.documentElement.scrollTop = currentOffsetTop
          requestAnimationFrame(smoothUp)
        }
      }
      // 判断是往下滑还是往上滑
      if (currentOffsetTop > targetOffsetTop) {
        // 往上滑
        smoothUp()
      } else {
        // 往下滑
        smoothDown()
      }
    },
    // 播放视频
    play() {
      this.$refs.video.play()
      this.showControls = true
    },
    // 检查是否报名
    async checkIsEnrolling() {
      const res = await isJoin()
      if (res.data.is_join === 1) {
        this.enrollingDisplayLevel = 0
      } else {
        this.enrollingDisplayLevel = 1
      }
    }
  }
}
</script>
<style lang="less" scoped>
  #app {
    height: auto;
  }
  .enrolling {
    @videoWidth: 6.4rem;
    @videoHeight: 3.6rem;
    background-image: url("https://img.fengjishi.com/lianchuang/enrolling/competition_pic_background5.png");
    background-attachment: scroll;
    background-size: cover;
    background-position: bottom;

    img {
      width: 100%;
      height: auto;
    }
    .video {
      padding: 0.48rem 0.54rem 0.2rem 0.54rem;
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
        top: 0.28rem;
        bottom: 0;
        margin: auto;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .nav {
      height: 0.88rem;
      background-color: rgba(0, 0, 0, 0.4);
      color: white;
      display: flex;
      text-align: center;
      align-items: center;
      padding: 0 1rem;
      justify-content: space-between;
      .nav-text {
        box-sizing: border-box;
        line-height: 0.88rem;
        font-size: 0.3rem;
        color: white;
      }
      .nav-current {
        color: #e6a92c;
        font-weight: bold;
        box-shadow: inset 0 -3px #e6a92c;
      }
    }
    #content-3 {
      padding: 0.27rem 0.54rem 0.54rem 0.54rem;
      text-align: center;
    }
    .btn-group {
      position: fixed;
      bottom: 0.2rem;
      left: 0.3rem;
      right: 0.3rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
