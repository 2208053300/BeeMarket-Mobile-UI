<template>
  <div class="pay-success">
    <div class="result text-center">
      <img :src="beeIcon.tipImg" class="tip-img">
      <p class="tip-txt">
        付款成功
      </p>
      <p class="price">
        ￥ 4800
      </p>
      <button class="order-btn">
        查看订单
      </button>
    </div>
    <!-- <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_02.jpg')" alt="head">
    <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_03.jpg')" alt="head"> -->

    <div class="subsidy">
      <div class="sub-price">
        <p class="price">
          10000元
        </p>
        <p class="txt">
          红包补贴已到账
        </p>
      </div>
      <img :src="beeIcon.useBtn" class="use-btn">
    </div>
  </div>
</template>

<script>
// import Rule from './components/rule'
import Cookies from 'js-cookie'
import { getUID } from '@/api/BeeApi/user'
import { showShareIcon, setShareOptions } from '@/utils/share'

export default {
  metaInfo: {
    title: '付款结果'
  },
  components: { },
  props: {},
  data() {
    return {
      showControls: false,
      beeIcon: {
        tipImg: require('@/assets/icon/alcohol/liqueur_result_icon_success.png'),
        useBtn: require('@/assets/icon/alcohol/liqueur_result_button.png')
      },
      showRule: false,
      uid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.initShare()
    // 如果有store说明该页面作为组件在webApp显示
    if (this.$store) {
      this.$store.state.app.beeHeader = true
      this.$store.state.app.beeFooter.show = false
    }
    // if (this.$route.query.uid) {
    //   Cookies.set('uid', this.$route.query.uid)
    // }
    // showShareIcon()
  },
  methods: {

    // 分享
    async initShare() {
      try {
        const res = await getUID()
        this.uid = res.data.uid
        setShareOptions({
          title: '年终狂欢 瓜分1亿',
          desc: '购茅台一箱，送现金一万',
          link: this.uid ? location.origin + '/beeAlcohol#/?usid=' + this.uid : location.origin + '/beeAlcohol#/'
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.pay-success {
  width:100%;
  height: 100%;
  // backgroung-color: ;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  background:url(../../../assets/icon/alcohol/liqueur_result_bg.png) no-repeat,linear-gradient(to top, rgba(232,99,58,1),rgba(213,24,14,1));
  background-size: 100% 100%,contain;
  .result{
    padding-top:1rem;
    margin-bottom: 1rem;
  }
  .tip-img{
    width:0.93rem;
    height:0.93rem;
  }
  .tip-txt{
    font-size: 0.38rem;
    color: #fff;
    margin-top: 0.5rem;
    margin-bottom:.1rem;
  }
  .price{
    margin: 0;
    font-size: 0.36rem;
    color: #fff;
  }
  .order-btn{
    border:1px solid #E9DCB8;
    color: #E9DCB8;
    font-size: 0.28rem;
    border-radius: 0.5rem;
    padding: 0.1rem 0.3rem;
    margin-top: 0.3rem;
    background-color:transparent;
  }
  .subsidy{
    background: url(../../../assets/icon/alcohol/liqueur_result_red_envelope.png) no-repeat;
    background-size: 100% 100%;
    width: 7.5rem;
    height:5.02rem;
    position: relative;
  }
  .sub-price{
    text-align: center;
    padding-top: 0.4rem;
    .price{
      font-size: 1.2rem;
      margin:0 auto 0.1rem;
      font-weight: 600;
      background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent; }
    .txt{font-size: .28rem;color:#ef5821; margin: 0; font-weight: 600;}
  }
  .use-btn{
   width:2.94rem;
   height: 0.88rem;
   position: absolute;
   bottom: .3rem;
   left: 50%;
   transform: translateX(-50%)
  }
}
</style>
