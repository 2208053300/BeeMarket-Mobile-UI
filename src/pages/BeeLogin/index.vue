<template>
  <div class="login-page">
    <div class="login-content">
      <div class="logo-content">
        <img
          :src="beeIcon.login_logo"
          alt=""
        >
      </div>
      <van-field
        v-model="phone"
        placeholder="请输入手机号"
        type.native="Number"
      />
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
          @click="userLoginData"
        >
          登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPhone, userLogin, sendSms } from '@/api/BeeApi/auth'

export default {
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
        if (route.query && route.query.redirect) {
          this.redirect = decodeURIComponent(route.query.redirect)
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    checkPhoneRight() {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      return reg.test(this.phone)
    },
    checkLogin() {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      const reg2 = /^\d{6}$/
      return reg.test(this.phone) && reg2.test(this.verificationCode)
    },
    async checkPhoneData() {
      const res = await checkPhone({ mobileNum: this.phone })
      if (res.status_code === 201) {
        this.sendSmsData()
      }
    },
    async sendSmsData() {
      if (this.countDown !== 0) {
        return
      }
      try {
        const res = await sendSms({ mobileNum: this.phone, type: 'login' })
        if (res.status_code === 200) {
          this.$toast.success('已发送验证码')
          this.changeCountDoen()
        }
      } catch (e) {
        this.$toast.fail(e)
      }
    },
    async userLoginData() {
      const res = await userLogin({
        mobileNum: this.phone,
        type: 2,
        source: 'H5',
        smsCode: this.verificationCode
      })
      if (res.status_code === 200) {
        this.$store.state.user.userInfo = res.data
        this.$router.replace({ path: this.redirect || '/' })
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
    }
  }
}
</script>

<style scoped lang="less">
.login-page {
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
