<template>
  <div class="remind-pw bg-white">
    <p class="tip text-center">
      您是否记得当前账户：{{ phone }}的支付密码
    </p>
    <div class="group flex flex-column  align-center">
      <van-button round class="btn remind-btn" @click="$router.push('/persion/profile/setPayPw/inputOldPw')">
        记得
      </van-button>
      <van-button round class="btn not-remind-btn" @click="$router.push('/persion/profile/setPayPw/getSms')">
        不记得
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

      // 验证码
      sms: '',
      phone: ''
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {

  },
  meteInfo() {
    return {

      title: '设置支付密码'
    }
  }
}
</script>

<style scoped lang="less">
.remind-pw {
  margin-top: .2rem;
  padding-top:.52rem;
  padding-bottom:.5rem;
  .tip{
    font-size: .3rem;
    margin: 0 auto .9rem;
  }
  .btn{width:3.4rem; height: .84rem;line-height:.84rem;font-size: .28rem; }
  .remind-btn{ background-color:@BeeDefault; color:#fff; margin-bottom: .3rem}
  .not-remind-btn{ background-color:none; border: 1px solid @BeeDefault; color:@BeeDefault; }

  .van-popup{
    border-radius: .1rem;
    padding: .6rem .6rem .4rem;
    width:80%;
    box-sizing: border-box;
  }
  .sms{
    .input{ font-size: .26rem;color:#333;}
    .sms-tip{
      font-size: .28rem;
      margin: 0 auto 1.2rem;
    }
    .comfirm-btn{background-color:@BeeDefault; color:#fff; margin: .6rem auto .3rem}
    .cancel-btn{background-color:none; border: 1px solid #999; color:#999; }
  }
}
</style>
