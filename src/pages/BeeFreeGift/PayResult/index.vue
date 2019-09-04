<template>
  <div class="join-success flex flex-column align-center">
    <!-- 助力成功提示页面 -->
    <img :src="successImg" alt="" class="sucess-tip-img">
    <p class="title">
      领取成功
    </p>
    <p class="val text-center">
      您已成功领取小贾送出的礼物<br>
      平台将立即安排发货
    </p>

    <van-button class="btn go-gift" @click="goFreeGiftHome">
      我要继续送礼
    </van-button>
    <van-button class="btn go-home" @click="goHome">
      我要去逛逛
    </van-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      successImg: require('@/assets/icon/common/wechat_order_gift_img_success.png')
    }
  },
  computed: {},
  watch: {},
  created() {
    document.body.style.backgroundColor = '#fff'
  },
  beforeDestroy() {
    document.body.style.backgroundColor = '#F5F5F5'
  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    alert('trade_no:', this.$route.query.trade_no)
  },
  methods: {
    // 进入免费送礼首页
    goFreeGiftHome() {
      this.$router.push({
        path: '/'
      })
    },
    // 进入蜂集市首页
    goHome() {
      console.log(window.location.origin)
      window.location.href = window.location.origin
      // this.$router.push({
      //   path: '/'
      // })
    }
  },
  metaInfo() {
    return {
      title: '领取成功'
    }
  }
}
</script>

<style scoped lang="less">
.join-success {
  p {
    margin: 0;
  }
  .sucess-tip-img {
    width: 2.91rem;
    height: 2.15rem;
    margin: 1rem auto 0.4rem;
  }
  .title {
    font-size: 0.34rem;
    color: #FFA42F;
    margin-bottom: 0.4rem;
  }
  .val {
    font-size: 0.3rem;
    color: #000;
    font-weight: #666;
    margin-bottom: 0.7rem;
    span {
      color: @BeeDefault;
      font-size: 0.22rem;
    }
  }
  .tip {
    font-size: 0.26rem;
    color: @BeeDefault;
    margin-top: 0.6rem;
    margin-bottom: 0.2rem;
  }
  .btn {
    height: 0.88rem;
    line-height: 0.88rem;
    width: 5.8rem;
    font-size: 0.32rem;
  }
  .go-gift{
    background-color:#FFA42F ;
    border: 1px solid #FFA42F;
    color: #fff;
    margin-bottom: 0.2rem;
  }
  .go-home{
    background-color:#fff ;
    border: 1px solid #FFA42F;
    color: #FFA42F;
  }
}
</style>
