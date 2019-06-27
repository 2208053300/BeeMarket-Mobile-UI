<template>
  <div class="bg-white text-center bottom-btn">
    <van-button class="contact-btn" @click="goDetail">
      联系客服
    </van-button>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import Cookies from 'js-cookie'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      // 获取app cookies中的 token
      test1: '',
      // 网易七鱼
      isSdkReady: false
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    (function(w, d, n, a, j) {
      w[n] = w[n] || function() {
        (w[n].a = w[n].a || []).push(arguments)
      }
      j = d.createElement('script')
      j.async = true
      j.src = 'https://qiyukf.com/script/8fd8cea16e155cf0b128c4923a84282c.js?hidden=1'
      d.body.appendChild(j)
    })(window, document, 'ysf')
    this.test1 = 'token: ' + Cookies.get('token') + ',' + Cookies.get()
    const _this = this
    // eslint-disable-next-line
    ysf('onready', function() {
      _this.isSdkReady = true
    })
  },
  methods: {
    // 此处判断浏览器环境，做出跳转
    goDetail() {
      const osObj = getOs()
      if (osObj.isWx) {
        // this.$parent.isShowCustomer = false
        this.openService()
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.OpenService.postMessage('')
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.OpenService()
      } else {
        this.openService()
      }
    },
    // 打开网易七鱼
    async openService() {
      if (this.isSdkReady) {
        // eslint-disable-next-line
        ysf('open')
      } else {
        this.$toast.fail('sdk尚未加载成功，请稍后再试')
      }
    }
  }
}
</script>

<style scoped  lang="less">

.bottom-btn{
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.2rem 0;
  border-top: 1px solid #ddd;
}
.contact-btn{
  background-color:@BeeDefault;
  border-color: @BeeDefault;
  font-size: 0.3rem;
  color: #fff;
  width: 80%;
}
</style>
