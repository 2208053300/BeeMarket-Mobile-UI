<template>
  <!-- 修改登录密码 -->
  <div class="login-page">
    <div class="login-content">
      <div class="logo-content">
        <img
          :src="beeIcon.login_logo"
          alt=""
        >
      </div>
      <form>
        <van-field
          v-model="password"
          clearable
          placeholder="请设置密码（6-16位英文、数组或特殊字符）"
          :type="showPw===true?'text':'password'"
          @click-right-icon="showPw=!showPw"
        >
          <div slot="right-icon">
            <img v-show="showPw" :src="beeIcon.show_img" class="show-img">
            <img v-show="!showPw" :src="beeIcon.hide_img" class="close-img">
          </div>
        </van-field>
        <!-- 密码强度 -->
        <ul v-if="password.length>0" class="pw-mode flex flex-around">
          <li :class="{active:[0,1].includes(mode)}">
            <span> 弱</span>
          </li>
          <li :class="{active:[2,3].includes(mode)}">
            <span>中</span>
          </li>
          <li :class="{active:[4].includes(mode)}">
            <span>强</span>
          </li>
        </ul>
        <van-field
          v-model="rePassword"
          placeholder="请再次确认密码"
          :type="showPw1===true?'text':'password'"
          @click-right-icon="showPw1=!showPw1"
        >
          <div slot="right-icon">
            <img v-show="showPw1" :src="beeIcon.show_img" class="show-img">
            <img v-show="!showPw1" :src="beeIcon.hide_img" class="close-img">
          </div>
        </van-field>
      </form>
      <div class="login-button">
        <van-button
          round
          class="loginBtn"
          :disabled="!checkLogin()"
          :class="{loginBtn2:checkLogin()}"
          @click="submit"
        >
          完成
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { changeLoginPwd } from '@/api/BeeApi/user'

export default {
  metaInfo: {
    title: '登录密码'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        login_logo: require('@/assets/icon/home/login_logo@2x.png'),
        show_img: require('@/assets/icon/register/y@2x.png'),
        hide_img: require('@/assets/icon/register/icon_bukejian@2x.png')
      },
      password: '',
      rePassword: '',

      redirect: null,
      // 密码是否可见
      showPw: false,
      showPw1: false,
      // 密码强度
      mode: null,
      // 签名
      sign: this.$route.query.sign
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
    },
    password: {
      handler(newPw, old) {
        this.mode = this.checkStrong(newPw)
        console.log(this.mode)
      }
    }
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    document.querySelector('.login-page').style.height = document.body.clientHeight - 44 + 'px'
  },
  methods: {

    checkLogin() {
      // const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      // const reg2 = /^\d{6}$/
      return this.password.length > 5 && this.rePassword === this.password
    },

    // 完成
    async submit() {
      try {
        const res = await changeLoginPwd({
          passwd: this.password,
          sign: this.sign
        })
        if (res.status_code === 200) {
          this.$toast(res.message)
          this.$router.push({ path: '/persion/profile/accountSafe' })
        // this.$store.state.user.userInfo = res.data
        // this.$router.push({ path: this.redirect || '/' })
        }
      } catch (error) {
        this.$toast(error)
      }
    },
    // 密码强度检测
    checkStrong(sValue) {
      let modes = 0
      // 正则表达式验证符合要求的
      if (sValue.length < 1) return modes
      if (sValue.length > 5) {
        if (/\d/.test(sValue)) modes++ // 数字
        if (/[a-z]/.test(sValue)) modes++ // 小写
        if (/[A-Z]/.test(sValue)) modes++ // 大写
        if (/\W/.test(sValue)) modes++ // 特殊字符
      }
      // 逻辑处理
      switch (modes) {
        case 1:
          return 1
          // eslint-disable-next-line
          break
        case 2:
          return 2
          // eslint-disable-next-line
          break
        case 3:
        case 4:
          return sValue.length < 12 ? 3 : 4
          // eslint-disable-next-line
          break
      }
      return modes
    }
  }
}
</script>

<style scoped lang="less">
.login-page {
  .close-img{width:0.36rem;height: 0.18rem}
  .show-img{width:0.35rem;height: 0.25rem}
  .pw-mode{
    margin-top:0.15rem;
    li{background:#ddd;padding:0.02rem 0 0.01rem ; color:#ccc; display: flex; font-size: 0.2rem; width: 30%;text-align: center;border-radius: 0.1rem;}
    li.active{ background:#FF3E3F;color:#fff; }
    span{margin: auto}
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
