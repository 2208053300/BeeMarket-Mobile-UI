<template>
  <div class="enrolling-success-wechat">
    <img :src="require('@/assets/icon/lcEnrollingSucceed/wechat_1.png')" alt="报名成功">
    <img :src="require('@/assets/icon/lcEnrollingSucceed/wechat_2.png')" alt="报名成功">
    <button @click="goHome">
      回到首页
    </button>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: '报名成功'
    }
  },
  props: {},
  data() {
    return {}
  },
  methods: {
    goHome() {
      if (this.osObj.isWx) {
        this.$router.push({
          path: '/'
        })
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.GoIndex.postMessage('')
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.GoIndex()
      } else {
        this.$router.push({
          path: '/'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.enrolling-success-wechat {
  background: #f5f5f5;
  text-align: center;
  button {
    background: #f5f5f5;
    border-radius: 0.1rem;
    color: @BeeDefault;
    font-size: 0.3rem;
    border: 0.02rem solid @BeeDefault;
    padding: 0;
    line-height: 0.68rem;
    width: 2.16rem;
    margin-bottom: 0.56rem;
  }
}
</style>
