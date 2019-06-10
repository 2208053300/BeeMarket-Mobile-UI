<template>
  <div class="RgsCtn">
    <div class="RegistrtFirst">
      <img src="../../../assets/icon/register/registerTitle1.png" alt="">
      <video
        controls="controls"
        poster="/static/src/Img/vedio_bg.png"
        style="width: 100%;pointer-events: auto;"
      >
        <source src="/static/video/beginner.mp4" type="video/mp4">
      </video>
      <div class="RNext">
        <img src="../../../assets/icon/register/registerNext.png" alt="">
      </div>
      <!--<button>注册</button>-->
    </div>
    <div class="modal">
      <div class="modelTitle">
        <img src="../../../assets/icon/register/registerTitle.png" style="width:3.91rem;height:0.71rem;">
      </div>
      <div class="register">
        <img src="../../../assets/icon/register/logo@2x.png" alt="">
        <label>
          <input id="phoneNum" type="text" placeholder="输入手机号码" class="phoneNum" data-checked="false">
          <img src="../../../assets/icon/register/icon_phone@2x.png" style="width:0.29rem;height:0.46rem;">
        </label>
        <p class="PN">
          请输入正确的手机号码!
        </p>
        <label class="flex ">
          <input id="check" type="text" placeholder="输入验证码" class="check" data-checked="">
          <input id="getCaptcha" type="button" value="获取验证码">
        </label>
        <p class="CH">
          验证码错误!
        </p>
        <label class="phoneImg">
          <input id="password" type="password" placeholder="设置密码（6-16位数字，英文及特殊字符）" data-checked="">
          <img src="../../../assets/icon/register/icon_bukejian@2x.png" style="width:0.36rem; height:0.18rem;">
        </label>
        <p class="PW">
          密码格式错误!
        </p>
        <div>
          <p class="flex flex-center align-center">
            <img src="../../../assets/icon/register/checked.svg" class="checked">
            <!-- <img src="../../../assets/icon/register/unchecked.svg" class="unchecked"> -->
            <span>
              阅读并同意蜂集市<a @click="goAgreenment">用户注册协议</a>
            </span>
          </p>
        </div>
        <p class="agm">
          阅读并同意蜂集市用户注册协议
        </p><p class="dowl">
          <a @click="goDownloadPage">已注册用户可点击这里重新下载</a>
        </p>
      </div>
      <div class="registerClick">
        <img src="../../../assets/icon/register/anniu@2x.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
// import { getArticleDetail } from '@/api/BeeApi/action'

export default {
  metaInfo: {
    title: '注册'
  },
  components: {},
  props: {},
  data() {
    return {

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
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    // this.getArticleDetailData()
  },
  methods: {
    // 跳转到下载页面
    goDownloadPage() {
      this.$router.push({
        path: '/beeRegister/download'
      })
    },

    // 跳转到用户协议
    goAgreenment() {
      this.$router.push({
        path: '/persion/BeeSetting/about/userAgreement'
      })
    },

    goProduct(pid) {
      // 判断是否来自webApp
      if (this.$route.query.origin) {
        window.location.href = `/#/category/details?pid=${pid}`
      } else {
        console.log('本地应用')
        this.$router.push({
          path: '/category/details',
          query: { pid }
        })
      }
    }

  }
}
</script>

<style  lang="less">

.RgsCtn {
    background: rgba(229, 229, 229, 229);
}

.RegistrtFirst {
    pointer-events: none;
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

.RegistrtFirst .RNext{
    margin-top: -5px;
}
.RegistrtFirst .RNext img{
    display: block;
    width: 100%;
}

.register {
    background: #FFF;
    padding: 5% 0.2rem;
    border-radius: 6px;
    padding-bottom: 20px;
    overflow: hidden;
    width: 90%;
    margin:0 auto;
}

.register > p {
    margin-left: 5px;
    color: red;
    font-size: 12px;
    display: none;
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
    border-bottom: 1px solid #ECD200;
    margin-left: 0;
    padding-left: 5px;
    padding-right: 5px;
}

.register > div {
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    float: left;
    width: 100%;
    margin-bottom: 10px;
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

.register div p {
    text-align: center;
    margin-top: 20px;
    width: 100%;
    padding-bottom: 5px;
}

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
    color: #ECD200;
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
    margin-top: 20px;
    border: 0;
    padding: 10px;
    border-radius: 20px;
    background: #F4F4F4;
    outline: none;
    width: 100%;
    box-sizing: border-box;
}

/*默认显示字体*/
.register ::-webkit-input-placeholder {
    font-size: 12px;
}

input[type=button], input[type=text], input[type=password] {
    -webkit-appearance: none
}

/*验证码*/
label #btn,label #getCaptcha {
    float: right;
    width: 35%;
    font-size: 12px;
    text-align: center;
    display: block;
    padding: 10px;
    background: #FEB300;
    color: #FFF;
    border-radius: 20px;
    margin-top: 20px;
}

label .check {
    float: left;
    width: 60%;
}
.modal {
    position: relative;
    background: url(../../../assets/icon/register/register_bg.png);
    padding-top: 30px;
    background-size: 100%;
}
.modal .modelTitle{
        width: 100%;
    text-align: center;
    position: absolute;
    top: -28px;
}
.modelTitle img{
    width: 200px;
}

</style>
