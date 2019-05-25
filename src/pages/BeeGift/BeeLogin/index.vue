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
      />
      <van-field
        v-model="verificationCode"
        placeholder="请输入验证码"
      >
        <van-button
          slot="button"
          size="small"
          class="get-code"
        >
          <!-- TODO 获取短信验证码 -->
          <span
            class="text1"
            :class="{text2:phone>11}"
          >获取验证码</span>
          <!-- <span>60s</span> -->
        </van-button>
      </van-field>
      <div class="login-button">
        <van-button
          round
          class="loginBtn"
          @click="$router.push('/addressManage')"
        >
          登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        login_logo: require('@/assets/icon/home/login_logo@2x.png')
      },
      phone: null,
      verificationCode: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {}
}
</script>

<style scoped lang="less">
.login-page {
  padding-top: 46px;
  height: 100%;
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
      }
    }
  }
}
</style>
