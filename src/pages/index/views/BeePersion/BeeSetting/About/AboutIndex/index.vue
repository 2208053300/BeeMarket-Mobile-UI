<template>
  <div class="about-index">
    <van-nav-bar
      title="关于我们"
      left-arrow
      fixed
      @click-left="back"
    />
    <div class="container">
      <div class="logo-info bg-white text-center">
        <img src="http://temp.im/640x260" alt="" class="logo">
        <img src="http://temp.im/640x260" alt="" class="qr-code">
        <p class="tip">
          可扫描二维码下载蜂集市客户端
        </p>
      </div>

      <van-cell-group class="margin-t-20">
        <van-cell title="使用帮助" is-link to="/persion/beeSetting/about/useHelp" />
        <van-cell title="用户协议" is-link to="/persion/beeSetting/about/userAgreement" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
img{display: block}
.logo-info{
  padding: 0.3rem 0;
}
.logo{
  width: 1.5rem;
  height: 0.6rem;
   margin: 0 auto;
}
.qr-code{
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.2rem auto;
}
.tip{
  font-size: 0.26rem;
  color: #999;
  margin: 0
}
</style>
