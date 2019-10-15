<template>
  <div class="download text-center">
    <img :src="icon.topImg" class="top-img">
    <div class="steps bg-white text-center is-iphone" :class="{isIphone: osObj.isIphone}">
      <section>
        <p>1、下载登录后，点击首页“ <span> 免费送礼</span>”</p>
        <img :src="icon.step1">
      </section>
      <section style="margin-top: 0.6rem;">
        <p>2、进入“免费送礼”，点击“<span>我的参与记录</span>”</p>
        <img :src="icon.step2">
      </section>
    </div>
    <div class="btns flex flex-around">
      <van-button
        round
        class="re-btn "
        @click="download('iPhone')"
      >
        <img :src="icon.iPhone"> <span> iPhone下载</span>
      </van-button>
      <van-button
        round
        class="go-market-btn"
        @click="download('Android')"
      >
        <img :src="icon.Android"> <span> Android下载</span>
      </van-button>
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'
export default {
  components: {},
  props: {},
  data() {
    return {
      icon: {
        topImg: require('@/assets/icon/freeGift/download_app_pic_1.png'),
        step1: require('@/assets/icon/freeGift/download_app_pic_2.png'),
        step2: require('@/assets/icon/freeGift/download_app_pic_3.png'),
        iPhone: require('@/assets/icon/freeGift/download_app_icon_iphone.png'),
        Android: require('@/assets/icon/freeGift/download_app_icon_android.png')
      },
      // 获取 os 平台
      osObj: getOs()
    }
  },
  computed: {},
  watch: {},
  created() {
    document.body.style.backgroundColor = '#F5F5F5'
  },
  beforeDestroy() {
    document.body.style.backgroundColor = ''
  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    // 去逛逛返回首页
    download(type) {
      if (type === 'iPhone') {
        window.location.href = 'https://apps.apple.com/cn/app/%E8%9C%82%E9%9B%86%E5%B8%82/id1382648901'
      } else if (type === 'Android') {
        window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.bee.beemark'
      }
    }
  },
  meteInfo() {
    return {
      title: '下载App'
    }
  }
}
</script>

<style scoped lang="less">
.download{
 .top-img{
   width: 100%;
 }
 .steps{
   width: 6.9rem;
   box-sizing: border-box;
   margin:.3rem auto 1.6rem ;
   padding: .6rem .3rem ;
   border-radius: 0.1rem;
   &.isIphone{
      margin:.3rem auto 2.6rem ;
   }
   p{
     font-size: .26rem;
     color:#333;
     font-weight: 600;
     margin: 0 auto 0.3rem;
   }
   span{color: @BeeDefault;}
 }
 .btns{
    position: fixed;
    bottom:0;
    left:0;
    background: #fff;
    padding: 0.2rem 0.3rem;
    box-sizing:border-box;
    width:100%;
    img{width:.41rem;height:.49rem; margin-right: 0.1rem;}
 }
  .van-button{font-size: .3rem; border:0.06rem solid #FFA42F;
    color:#FFA42F; padding: 0 0.4rem; box-sizing: border-box;   height: auto; line-height: auto;
    .van-button__text{
      display: flex;
      align-items: center;
    }
  }
  .go-market-btn{border-color:@BeeDefault; color: @BeeDefault}
}
</style>
