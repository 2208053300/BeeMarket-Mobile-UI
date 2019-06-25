<template>
  <div class="RgsCtn">
    <div class="RegistrtFirst">
      <img src="../../../assets/icon/register/registerTitle1.jpg" alt="">
      <!-- <video
        controls="controls"
        poster="/static/src/Img/vedio_bg.png"
        style="width: 100%;pointer-events: auto;"
      >
        <source
          src="https://img.fengjishi.com.cn/app/videos/education/intro.mp4"
          type="video/mp4"
        >
      </video> -->
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
        <img src="../../../assets/icon/register/registerNext.jpg" alt="">
      </div>
      <!--<button>注册</button>-->
    </div>
    <div class="modal">
      <div class="modelTitle">
        <img
          src="../../../assets/icon/register/registerTitle.png"
          style="width:3.91rem;height:0.71rem;"
        >
      </div>
      <div class="register">
        <img src="../../../assets/icon/register/logo@2x.png" alt="">
        <!-- <label>
          <input id="phoneNum" v-model.trim="phone" type="text" placeholder="输入手机号码" class="phoneNum" data-checked="false" @input="inputPhone">
          <img src="../../../assets/icon/register/icon_phone@2x.png" style="width:0.29rem;height:0.46rem;">
        </label>
        <p v-if="isPhone" class="PN">
          请输入正确的手机号码!
        </p> -->
        <div class="form-group">
          <div class="form-control">
            <div class="input-box">
              <input
                v-model.trim="phone"
                type="text"
                name="name"
                placeholder="输入手机号码"
                @input="inputPhone"
                @blur.prevent="blurScroll"
              >
              <img src="../../../assets/icon/register/icon_phone@2x.png">
            </div>
            <p v-if="isPhone" class="help-text">
              请正确输入手机号码！
            </p>
          </div>
        </div>
        <div class="form-group">
          <div class="form-control">
            <div class="flex flex-between">
              <div class="input-box">
                <input
                  v-model.trim="validNum"
                  type="text"
                  name="validNum"
                  placeholder="输入验证码"
                  @input="inputValidNum"
                  @blur.prevent="blurScroll"
                >
              </div>
              <van-button
                v-show="isShowBtn"
                round
                class="valid-btn"
                :class="{ active: canGetValid === true }"
                @click="getValidNum"
              >
                获取验证码
              </van-button>
              <van-button
                v-show="!isShowBtn"
                round
                class="valid-btn"
                :class="{ active: canGetValid === true }"
              >
                <span>{{ downTime }}</span>s
              </van-button>
            </div>
            <p v-if="isValidNum" class="help-text">
              请正确输入验证码！
            </p>
          </div>
        </div>

        <div class="form-group">
          <div class="form-control">
            <div class="input-box">
              <input
                v-model.trim="pw"
                :type="[isShowPw === true ? 'text' : 'password']"
                name="pw"
                placeholder="设置密码（6-16位数字，英文及特殊字符）"
                @input="inputPw"
                @blur.prevent="blurScroll"
              >
              <img
                v-show="!isShowPw"
                src="../../../assets/icon/register/icon_bukejian@2x.png"
                class="eye"
                @click="isShowPw = true"
              >
              <img
                v-show="isShowPw"
                src="../../../assets/icon/register/icon_kejian.png"
                class="eye"
                @click="isShowPw = false"
              >
            </div>

            <p v-if="isPw" class="help-text">
              请正确输入密码！
            </p>
          </div>
        </div>

        <div>
          <p class="flex flex-center align-center">
            <img
              v-show="isAgree === true"
              src="../../../assets/icon/register/checked.svg"
              class="checked"
              @click="isAgree = false"
            >
            <img
              v-show="isAgree === false"
              src="../../../assets/icon/register/unchecked.svg"
              class="checked"
              @click="isAgree = true"
            >
            <span>
              阅读并同意蜂集市<a @click="goAgreenment">用户注册协议</a>
            </span>
          </p>
        </div>
        <p v-show="isAgree === false" class="agm">
          阅读并同意蜂集市用户注册协议
        </p>
        <p class="dowl">
          <a @click="goDownloadPage">已注册用户可点击这里重新下载</a>
        </p>
      </div>
      <div class="registerClick" @click="submit">
        <img src="../../../assets/icon/register/anniu@2x.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { isLogin } from '@/utils/auth'
import { sendSms, h5register } from '@/api/BeeApi/auth'

export default {
  metaInfo: {
    title: '注册'
  },
  components: {},
  props: {},
  data() {
    return {
      phone: '',
      isPhone: false,
      validNum: '',
      isValidNum: false,
      pw: '',
      isPw: false,
      // 手机号码格式正确可点击按钮获取验证码
      canGetValid: false,
      // 密码是否可见
      isShowPw: false,
      // 是否同意协议
      isAgree: true,
      // 验证码间隔时间
      downTime: 10,
      isShowBtn: true,
      // 视屏
      video: {
        video_url: 'https://img.fengjishi.com.cn/app/videos/education/intro.mp4',
        first_screen: require('@/assets/icon/register/vedio_bg.png'),
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png'),
        showControls: false
      }

    }
  },
  computed: {},
  watch: {},
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
    // this.getArticleDetailData()

    // 请求任一接口判断是否登录
    // await this.$store.dispatch('GerUserStatus')
    // await isLogin()
  },
  methods: {
    // 播放视频
    play() {
      console.log('play')

      this.$refs.video.play()
      this.video.showControls = true
    },
    // 跳转到下载页面
    goDownloadPage() {
      this.$router.push({
        name: 'download'
      })
    },

    // 跳转到用户协议
    goAgreenment() {
      this.$router.push({
        name: 'agreement'
      })
    },

    // 提交注册
    async submit() {
      // 判断手机号码 验证码 密码
      const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
      const reg2 = /^\d{6}$/
      if (!(this.phone && reg.test(this.phone))) {
        this.$toast.fail('请正确输入手机号码！')
        return false
      }
      if (!(this.validNum && reg2.test(this.validNum))) {
        this.$toast.fail('请正确输入短信验证码！')
        return false
      }
      if (!(this.pw && this.pw.length > 5)) {
        this.$toast.fail('请正确设置密码')
        return false
      }
      if (!this.isAgree) {
        this.$toast.fail('请同意用户注册协议')
        return false
      }
      try {
        const res = await h5register({
          mobileNum: this.phone,
          smsCode: this.validNum,
          passwd: this.pw,
          uid: this.$router.query.uid || '',
          t: Date.parse(new Date())
            .toString()
            .substr(0, 10)
        })
        if (res.status_code === 200) {
          // 注册成功
          this.$router.push({
            name: 'download'
          })
        }
      } catch (error) {
        console.log('fail')

        this.$toast.fail(error)
      }
    },

    // 获取验证码
    async getValidNum() {
      try {
        const res = await sendSms({
          mobileNum: this.phone,
          type: 'reg'
        })
        this.$toast(res.message)
        this.isShowBtn = false
        this.downTime = 60
        setInterval(() => {
          this.downTime--
          if (this.downTime < 0) {
            this.downTime = 0
            this.isShowBtn = true
          }
        }, 1000)
      } catch (error) {
        this.$toast.fail(error)
      }
    },

    // ios 12 解决键盘顶起页面问题
    blurScroll() {
      setTimeout(function() {
        var scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
      }, 100)
    },

    // 验证手机号码
    inputPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.isPhone = true
        this.canGetValid = false
      } else {
        this.isPhone = false
        this.canGetValid = true
      }
    },
    inputValidNum() {
      if (this.validNum.length < 4) {
        this.isValidNum = true
      } else {
        this.isValidNum = false
      }
    },
    inputPw() {
      if (this.pw.length < 6) {
        this.isPw = true
      } else {
        this.isPw = false
      }
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
      width:1.28rem;
      height: 1.28rem;
      top: 50%;
      left: 50%;
      position: absolute;
      transform: translate(-50%,-50%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
.RgsCtn {
  background: rgba(229, 229, 229, 229);
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

.register {
  background: #fff;
  padding: 5% 0.2rem;
  border-radius: 6px;
  padding-bottom: 20px;
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
}

.register > p {
  margin-top: 0.1rem;
  margin-left: 5px;
  color: red;
  font-size: 12px;
  // display: none;
}

.register .agm {
  text-align: center;
  padding-bottom: 10px;
}

.register .dowl {
  display: block;
  text-align: center;
  margin-top: 5px;
}

.register .dowl a {
  border-bottom: 1px solid #ecd200;
  margin-left: 0;
  padding-left: 5px;
  padding-right: 5px;
}

.register > div {
  font-size: 12px;
  // text-align: center;
  overflow: hidden;
  float: left;
  width: 100%;
  // margin-bottom: 10px;
}

.modal .register > img {
  position: relative;
  width: 40%;
  left: 30%;
}

.register label {
  position: relative;
  float: left;
  width: 100%;
  margin-top: -10px;
}

.register img {
  position: absolute;
  right: 15px;
  width: 12px;
  top: 50%;
}

.register .phoneImg img {
  top: 62%;
  right: 10px;
}

// .register div p {
//     text-align: center;
//     margin-top: 20px;
//     width: 100%;
//     padding-bottom: 5px;
// }

.register p img {
  width: 20px;
  margin-top: 0;
  position: relative;
  right: 20px;
  // top: 6px;
  margin-right: -17px;
}

.register .unchecked {
  display: none;
}

.register p a {
  color: #ecd200;
}

.registerClick {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.registerClick > img {
  width: 70%;
  margin-left: 16%;
  pointer-events: none;
  vertical-align: sub;
  margin-top: 15px;
}

.register input {
  // margin-top: 20px;
  border: 0;
  padding: 10px;
  border-radius: 20px;
  background: #f4f4f4;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}

/*默认显示字体*/
.register ::-webkit-input-placeholder {
  font-size: 12px;
}

input[type="button"],
input[type="text"],
input[type="password"] {
  -webkit-appearance: none;
}

/*验证码*/
label #btn,
label #getCaptcha {
  float: right;
  width: 35%;
  font-size: 12px;
  text-align: center;
  display: block;
  padding: 10px;
  background: #feb300;
  color: #fff;
  border-radius: 20px;
  margin-top: 20px;
}

label .check {
  float: left;
  width: 60%;
}
.modal {
  position: relative;
  background: url(../../../assets/icon/register/register_bg.png) no-repeat 100%
    100%;
  // background-size:100% 100%;
  padding-top: 20px;
}
.modal .modelTitle {
  width: 100%;
  text-align: center;
  position: absolute;
  top: -28px;
  // top: 0;
}
.modelTitle img {
  width: 200px;
}

.form-group {
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 0.3rem;
  label {
    font-size: 0.3rem;
    color: #333;
    font-weight: 800;
    width: 2rem;
    text-align: right;
    span {
      color: #ff4918;
    }
  }
  .form-control {
    width: 100%;
  }
  .input-box {
    position: relative;
    img {
      position: absolute;
      top: 0.15rem;
      right: 0.5rem;
      width: 0.29rem;
      height: 0.46rem;
    }
    .eye {
      width: 0.36rem;
      height: 0.18rem;
      top: 0.3rem;
    }
  }
  input,
  select {
    width: 100%;
    height: 0.74rem;
    line-height: 0.74rem;
    background: #eee;
    border: none;
    font-size: 0.28rem;
    color: #333;
    padding: 0 0.2rem;
  }
  textarea {
    width: 4.2rem;
    background: #eee;
    border: none;
    font-size: 0.28rem;
    color: #333;
    padding: 0.2rem;
  }
}
.help-text {
  font-size: 0.24rem;
  color: red;
  margin-top: 0.1rem;
  margin-bottom: 0;
  // display: none;
}
.valid-btn {
  height: 0.74rem;
  line-height: 0.74rem;
  font-size: 0.28rem;
  color: #333;
  padding: 0 0.2rem;
  background: #f4f4f4;
  border: none;
  pointer-events: none;
}
.valid-btn.active {
  background: #feb300;
  color: #fff;
  pointer-events: auto;
}
</style>
