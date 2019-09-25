<template>
  <div class="login-page">
    <div class="login-content">
      <div class="logo-content">
        <img
          :src="beeIcon.login_logo"
          alt=""
        >
      </div>
      <p class="tip">
        请输入<span v-text="phone" />收到的短信验证码
      </p>
      <van-field
        v-model="verificationCode"
        placeholder="请输入验证码"
        type.native="Number"
      >
        <van-button
          slot="button"
          size="small"
          class="get-code"
          :disabled="!checkPhoneRight()"
          @click="sendSmsData"
        >
          <!-- TODO 获取短信验证码 -->
          <span
            v-if="countDown===0"
            class="text1"
            :class="{text2:checkPhoneRight()}"
          >获取验证码</span>
          <span
            v-else
            class="text3"
          >({{ countDown }}s)</span>
        </van-button>
      </van-field>
      <div class="login-button">
        <van-button
          round
          class="loginBtn"
          :disabled="!checkLogin()"
          :class="{loginBtn2:checkLogin()}"
          @click="submit"
        >
          下一步
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getMobile, sendSms, smsVerify } from '@/api/BeeApi/user'
// import { forgotFirst } from '@/api/BeeApi/auth'

// import { checkPhone, userLogin, sendSms } from '@/api/BeeApi/auth'

export default {
  metaInfo: {
    title: '登录密码'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        login_logo: require('@/assets/icon/home/login_logo@2x.png')
      },
      phone: null,
      verificationCode: null,
      countDown: 0,
      redirect: null
    }
  },
  computed: {},
  watch: {
    $route: {
      handler: function(route) {
        // NOTE 这里记录退出登录前的路由，再次登录会直接进入上次退出的目录
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    document.querySelector('.login-page').style.height =
      document.body.clientHeight - 44 + 'px'
    this.getMobileNum()
  },
  methods: {
    checkPhoneRight() {
      // const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      // return reg.test(this.phone)
      return true
    },
    checkLogin() {
      // const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
      const reg2 = /^\d{6}$/
      // return reg.test(this.phone) && reg2.test(this.verificationCode)
      return reg2.test(this.verificationCode)
    },
    async sendSmsData() {
      if (this.countDown !== 0) {
        return
      }
      try {
        const res = await sendSms({ type: 'passwd' })
        if (res.status_code === 200) {
          this.changeCountDoen()
        }
      } catch (error) {
        this.$toast(error)
      }
    },
    // 验证成功，跳转到设置登录密码页面
    async submit() {
      const res = await smsVerify({
        smsCode: this.verificationCode,
        type: 'passwd',
        t: Date.parse(new Date())
          .toString()
          .substr(0, 10)
      })
      if (res.status_code === 200) {
        this.$router.push({
          path: '/persion/profile/setLoginPw/setPw',
          query: {
            sign: res.data.sign
          }
        })
      }
    },
    // 开始倒计时
    changeCountDoen() {
      this.countDown = 60
      const clock = window.setInterval(() => {
        this.countDown--
        if (this.countDown <= 0) {
          window.clearInterval(clock)
        }
      }, 1000)
    },
    // 获取手机号码
    async getMobileNum() {
      const res = await getMobile()
      console.log('获取手机号码：', res)
      this.phone = res.data.mobileNum
    }
  }
}
</script>

<style scoped lang="less">
.login-page {
  .tip{font-size: 0.28rem;color: #333;
    span{color: @BeeDefault}
  }
  .login-content {
    margin-top: 0.2rem;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.4rem 0.5rem;
    .logo-content {
      height: 1.3rem;
      width: 1.3rem;
      margin: auto;
      margin-bottom: 0.85rem;
    }
    .van-field {
      border-bottom: 0.01rem solid @Grey6;
    }
    // .van-cell{background-color:rgba(255,255,255,0);}
    .van-cell:not(:last-child)::after {
      border: none;
    }
    .get-code {
      border: none;
      border-left: 0.02rem solid @Grey4;
      font-size: 0.28rem;
      color: @Grey11;
      height: 0.27rem;
      line-height: 0.27rem;
      padding: 0;
      padding-left: 0.18rem;
      .text2 {
        color: @ProductName;
      }
      .text3 {
        color: @BeeDefault;
      }
    }
    .login-button {
      margin-top: 0.8rem;
      text-align: center;
      .loginBtn {
        width: 5.1rem;
        height: 0.85rem;
        line-height: 0.85rem;
        background-color: @BeeDefault;
        color: #fff;
        font-size: 0.28rem;
        box-shadow: 0 0 0.05rem @BeeDefault;
      }
      .loginBtn2 {
        // background-color: rgba(255, 164, 47, 0.2);
      }
    }
  }
}
</style>
