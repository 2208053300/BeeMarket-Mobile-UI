<template>
  <div class="enrolling">
    <img src="https://img.fengjishi.com/lianchuang/enrolling/competition_pic_headfigure.png">
    <div class="video">
      <video
        ref="video"
        src="https://img.fengjishi.com/lianchuang/components/appeal.mp4"
        class="video-body"
        :controls="showControls"
        :poster="showControls ? '': require('@/assets/icon/task/talent/first_screen@3x.png')"
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
          赛制详情
        </span>
        <span v-if="enrollingDisplayLevel > 0">|</span>
        <span v-if="enrollingDisplayLevel > 0" :class="{ 'nav-current': active === 3}" class="nav-text" @click="scrollTo(3)">
          报名参赛
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
        src="https://img.fengjishi.com/lianchuang/enrolling/competition_pic_competition.png"
      >
      <div v-if="enrollingDisplayLevel>0" id="content-3" class="nav-content">
        <div class="card">
          <div class="card-title">
            <div class="line" />
            报名参赛
            <div class="line" />
          </div>
          <form id="form">
            <div class="form-filed">
              <label><span>*</span>姓&nbsp;&nbsp;&nbsp;名</label>
              <input v-model="form.name" placeholder="(请输入您的姓名)">
            </div>
            <div class="form-filed">
              <label><span>*</span>电&nbsp;&nbsp;&nbsp;话</label>
              <input v-model="form.tel" placeholder="(请输入您的电话号码)" type="tel">
            </div>
            <div class="form-filed">
              <label><span>*</span>验证码</label>
              <input v-model="form.code" type="tel" placeholder="(请输入验证码)" style="width: 2.12rem;margin-right: 0.14rem">
              <button
                class="get-ver"
                type="button"
                :style="{cursor: countdown === 0 ? 'default' : 'not-allowed'}"
                @click="getVerify"
              >
                {{ getCodeText }}
              </button>
            </div>
            <div class="protocol">
              <van-checkbox
                v-model="checked"
                checked-color="#e6a92c"
                icon-size="18px"
              >
                <span style="color: #aaaaaa;font-size: 0.24rem">
                  已阅读并同意蜂集市
                  <router-link :to="{name: 'lcUserAgreement'}" style="color: #e8a812">
                    《联创大赛用户参赛协议》
                  </router-link>
                </span>
              </van-checkbox>
            </div>
          </form>
        </div>
        <button class="btn-submit" @click="submit">
          报名参赛
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getSmsCode, join, isJoin } from '@/api/BeeApi/lcEnrollingApi'
import { Toast } from 'vant'
import { getOs } from '@/utils'
export default {
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
    async submit() {
      if (this.form.name === '') {
        Toast.fail('请务必填写姓名')
        return
      }
      if (this.form.name.length > 10) {
        Toast.fail('姓名长度不能超过10个字')
        return
      }
      if (!/^[\u4e00-\u9fa5]{0,}$/.test(this.form.name)) {
        Toast.fail('仅支持中文姓名')
        return
      }
      if (this.form.tel === '') {
        Toast.fail('请务必填写手机号码')
        return
      }
      if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(this.form.tel)) {
        Toast.fail('请正确填写手机号')
        return
      }
      if (this.form.code === '') {
        Toast.fail('请务必填写验证码')
        return
      }
      if (!/^\d{6,6}$/.test(this.form.code)) {
        Toast.fail('验证码错误')
        return
      }
      if (!this.checked) {
        Toast.fail('请先同意协议')
        return
      }
      if (this.form.uid === 'undefined') {
        delete this.form.uid
      }
      await join(this.form)
      if (getOs().isApp) {
        this.$router.replace({ name: 'lcEnrollingSucceedWechat' })
      } else {
        this.$router.replace({ name: 'lcEnrollingSucceed' })
      }
    },
    async getVerify() {
      if (this.countdown > 0) {
        return
      }
      try {
        await getSmsCode({
          tel: this.form.tel
        })
        Toast.success('已向您发送短信验证码')
        // 开始倒计时
        this.countdown = 60
        this.countdownInterval = setInterval(() => {
          this.countdown -= 1
          if (this.countdown === 0) {
            clearInterval(this.countdownInterval)
          }
        }, 1000)
      } catch (e) {
        this.countdown = 0
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
  background-image: url("https://img.fengjishi.com/lianchuang/enrolling/competition_pic_background.png");
  background-attachment: scroll;
  background-size: cover;

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
    padding: 0 0.54rem;
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
  .card {
    width: 6.42rem;
    background-color: rgba(255,255,255,0.2);
    border-radius: 0.2rem;
    .card-title {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e8a812;
      font-size: 0.36rem;
      text-align: center;
      font-family: "sans-serif";
      padding-top: 0.36rem;
      font-weight: 600;
      .line {
        margin: 0 0.2rem;
        width: 0.7rem;
        height: 2px;
        display: inline-block;
        background: #e8a812;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .form-filed {
      margin-top: 0.36rem;
      display: flex;
      justify-content: center;
      label {
        color: white;
        font-size: 0.32rem;
        font-weight: bold;
        width: 1.15rem;
        text-align: right;
        line-height: 0.74rem;
        display: inline-block;
        padding-right: 0.18rem;
        span {
          color: #e8a812;
        }
      }
      input {
        width: 3.98rem;
        height: 0.74rem;
        border: none;
        padding: 0 0 0 0.22rem;
        border-radius: 0.04rem;
        background: #eeeeee;
        font-size: 0.28rem;
        &::placeholder {
          color: #c4c3c3;
          opacity: 1;
        }
      }
      .get-ver {
        width: 1.72rem;
        line-height: 0.74rem;
        text-align: center;
        font-size: 0.24rem;
        border: none;
        padding: 0;
        color: #e8a812;
        background: #eeeeee;
        border-radius: 0.04rem;
      }
    }
  }
  .protocol {
    padding: 0 0.2rem;
    display: flex;
    margin-top: 0.36rem;
    margin-bottom: 0.66rem;
    justify-content: center;
    align-items: center;
  }
  .btn-submit {
    border: none;
    border-radius: 100px;
    background: #e8a812;
    line-height: 0.88rem;
    width: 4.2rem;
    color: white;
    font-size: 0.3rem;
    position: relative;
    bottom: 0.44rem;
    transition: all 100ms;
    &:active {
      background: #ffb713;
    }
  }
}
</style>
