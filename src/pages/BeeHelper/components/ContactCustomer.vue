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
      test1: ''
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.test1 = 'token: ' + Cookies.get('token') + ',' + Cookies.get()
  },
  methods: {
    // 此处判断浏览器环境，做出跳转
    goDetail() {
      const osObj = getOs()
      if (osObj.isWx) {
        // this.$parent.isShowCustomer = false
      } else if (osObj.isIphone) {
        window.webkit.messageHandlers.OpenService.postMessage('')
      } else if (osObj.isAndroid) {
        window.beeMarket.OpenService()
      } else {
        // this.$parent.isShowCustomer = false
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
