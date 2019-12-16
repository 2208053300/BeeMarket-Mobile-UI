<template>
  <div class="cash-tip">
    <img :src="beeIcon.tipImg" class="title-img">
    <div class="btn-img flex flex-center">
      <img :src="beeIcon.iosBtn" class="down-btn down-btn-ios" @click="IOSDown">
      <img :src="beeIcon.androidBtn" class="down-btn" @click="androidDown">
    </div>
    <div class="main">
      <p class="title text-center">
        打开蜂集市App<br>进入首页“<span>购茅台1箱 送现金1万</span>”活动专区
      </p>
      <img :src="beeIcon.mainImg" class="main-img">
    </div>

    <!-- 装饰图片 -->
    <img :src="beeIcon.decorate" class="decorate">
  </div>
</template>

<script>

// import { getOs } from '@/utils'

export default {
  metaInfo: {
    title: '提现攻略'
  },
  components: { },
  props: {},
  data() {
    return {
      beeIcon: {
        tipImg: require('@/assets/icon/alcohol/cashTip/raiders_img_text.png'),
        iosBtn: require('@/assets/icon/alcohol/cashTip/download_app_icon_iphone.png'),
        androidBtn: require('@/assets/icon/alcohol/cashTip/download_app_icon_android.png'),
        mainImg: require('@/assets/icon/alcohol/cashTip/raiders_img_home.png'),
        decorate: require('@/assets/icon/alcohol/cashTip/raiders_img_money.png')
      }

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 如果有store说明该页面作为组件在webApp显示
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = false
    // const vanDom = document.querySelector('.cash-tip')
    // if (!getOs().isApp) {
    //   this.$store.state.app.beeHeader = true
    //   this.$store.state.app.beeFooter.show = false
    //   vanDom.style.PaddingTop = '0.6rem'
    // }
  },
  methods: {

    IOSDown() {
      // console.log('ios')
      window.location.href = 'https://apps.apple.com/cn/app/%E8%9C%82%E9%9B%86%E5%B8%82/id1382648901'
    },
    androidDown() {
      console.log('androidDown')
      window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.bee.beemark'
    }

  }
}
</script>

<style scoped lang="less">
.cash-tip {
  width:100%;
  height: 100%;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  overflow: scroll;
  padding: 0 .2rem;

  background:linear-gradient(0deg,rgba(196,22,16,1),rgba(235,89,62,1));
  .title-img{
    width: 5.91rem;
    height: 1.35rem;
    display: block;
    margin: 0.84rem auto .54rem;
  }
  .btn-img{
    position: relative;
    z-index: 55;
  }
  .down-btn{
    width: 2.9rem;
    height: .88rem;

  }
  .down-btn-ios{margin-right: .41rem;}
  .main{
    border-radius: 0.2rem;
    margin: 0.5rem auto .2rem;
    padding: .53rem .2rem .2rem;
    background:linear-gradient(0deg,rgba(255,145,102,.6),rgba(255,189,63,.6),rgba(255,111,54,.6));
    .title{
      font-size: .3rem;
      color: #fff;
      line-height: 1.5;
      margin: 0 auto .41rem;
      span{color: #FFE926;}
    }
    .main-img{width: 100%;display: block;}
  }
  .decorate{
    position: absolute;
    top: 0;
    left: 0;
    height: auto;
    width: 100%;
    z-index: 22;
  }
}
</style>
