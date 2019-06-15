<template>
  <div class="about-index">
    <div class="container">
      <div class="logo-info bg-white text-center">
        <img
          :src="icon.logo"
          alt=""
          class="logo"
        >
        <img
          src="http://temp.im/640x260"
          alt=""
          class="qr-code"
        >
        <p class="tip">
          可扫描二维码下载蜂集市客户端
        </p>
      </div>

      <van-cell-group class="margin-t-20">
        <van-cell
          title="使用帮助"
          is-link
          to="/beeHelper"
        />
        <van-cell
          title="用户协议"
          is-link
          to="/beeRegister/agreement"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '关于我们'
  },
  components: {},
  props: {},
  data() {
    return {
      icon: {
        logo: require('@/assets/icon/personalCenter/func/mine_aboutus_img_logo@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
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
.container {
  // margin-top: 56px;
}
img {
  display: block;
}
.logo-info {
  padding: 0.3rem 0;
}
.logo {
  width: 2.67rem;
  height: 0.94rem;
  margin: 0 auto;
}
.qr-code {
  width: 2.67rem;
  height: 2.67rem;
  margin: 0.2rem auto;
}
.tip {
  font-size: 0.26rem;
  color: #999;
  margin: 0;
}
</style>
