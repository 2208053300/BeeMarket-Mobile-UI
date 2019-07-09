<template>
  <div class="success text-center bg-white">
    <img :src="icon.successImg" class="success-img">
    <p class="title">
      领取成功
    </p>
    <p class="tip">
      您已成功领取小贾送出的礼物<br>
      平台将立即安排发货
    </p>
    <div class="btns">
      <van-button size="large" class="re-btn" @click="$router.push('/')">
        我要继续送礼
      </van-button>
      <van-button size="large" class="go-market-btn" @click="goHome">
        我要去逛逛
      </van-button>
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
      icon: {
        successImg: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_pic_value@2x.png')
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    document.body.style.backgroundColor = 'white'
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
    goHome() {
      window.location.href = 'https://app.fengjishi.com/'
    }
  },
  meteInfo() {
    return {

      title: '领取成功'
    }
  }
}
</script>

<style scoped lang="less">
.success{
  padding: 0.5rem 1rem;
  .success-img{width:2.12rem;height: 2.12rem;}
  .title{font-size:.34rem ; color:@BeeDefault;}
  .tip{font-size:.3rem ;}
  .van-button{border-radius: 0.1rem;font-size: .32rem;}
  .re-btn{background: @BeeDefault; color: #fff; margin-bottom:0.15rem;}
  .go-market-btn{border-color:@BeeDefault; color: @BeeDefault}
}
</style>
