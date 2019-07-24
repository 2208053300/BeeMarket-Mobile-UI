<template>
  <div class="remind-pw bg-white">
    <p class="tip text-center">
      您是否记得当前账户的支付密码
    </p>
    <div class="group flex flex-column  align-center">
      <van-button
        round
        class="btn remind-btn"
        @click="$router.push('/setPayPw/inputOldPw')"
      >
        记得
      </van-button>
      <van-button
        round
        class="btn not-remind-btn"
        @click="$router.push('/setPayPw/getSms')"
      >
        不记得
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      // 验证码
      sms: '',
      phone: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {},
  metaInfo() {
    return {
      title: '设置支付密码'
    }
  }
}
</script>

<style scoped lang="less">
.remind-pw {
  margin-top: 0.2rem;
  padding-top: 0.52rem;
  padding-bottom: 0.5rem;
  .tip {
    font-size: 0.3rem;
    margin: 0 auto 0.9rem;
  }
  .btn {
    width: 3.4rem;
    height: 0.84rem;
    line-height: 0.84rem;
    font-size: 0.28rem;
  }
  .remind-btn {
    background-color: @BeeDefault;
    color: #fff;
    margin-bottom: 0.3rem;
  }
  .not-remind-btn {
    background-color: none;
    border: 1px solid @BeeDefault;
    color: @BeeDefault;
  }

  .van-popup {
    border-radius: 0.1rem;
    padding: 0.6rem 0.6rem 0.4rem;
    width: 80%;
    box-sizing: border-box;
  }
  .sms {
    .input {
      font-size: 0.26rem;
      color: #333;
    }
    .sms-tip {
      font-size: 0.28rem;
      margin: 0 auto 1.2rem;
    }
    .comfirm-btn {
      background-color: @BeeDefault;
      color: #fff;
      margin: 0.6rem auto 0.3rem;
    }
    .cancel-btn {
      background-color: none;
      border: 1px solid #999;
      color: #999;
    }
  }
}
</style>
