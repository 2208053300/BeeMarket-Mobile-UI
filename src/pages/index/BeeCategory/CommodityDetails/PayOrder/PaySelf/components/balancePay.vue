<template>
  <div class="input-password">
    <van-popup v-model="isShow" position="bottom" style="height: 73%">
      <div class="title">
        <van-icon class="icon" name="cross" size="0.34rem" />
        <span>输入密码</span>
      </div>
      <div class="money">
        <span>￥</span>
        <span>124</span>
      </div>
      <van-password-input
        :value="password"
      />
      <div class="reset-password">
        <span @click="resetPassword">忘记密码？</span>
      </div>
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="true"
        @input="onInput"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    payInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isShow: true,
      password: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    pay() {
      this.isShow = true
    },
    // 密码删除事件
    onDelete() {
      this.password = this.password.slice(0, this.password.length - 1)
    },
    // 密码键盘输入事件
    async onInput(key) {
      this.password = this.password + key
      if (this.password.length === 6) {
        try {
          await this.startPay()
        } catch (error) {
          this.$toast(error)
          this.password = ''
        }
      }
    },
    // 开始支付
    async startPay() {
      console.log('开始支付')
    },
    // 进入重置支付密码页面
    resetPassword() {
      this.$router.push('/persion/profile/setPayPw')
    }
  }
}
</script>

<style scoped lang="less">
.input-password {
  .title {
    padding: 0.3rem;
    display: flex;
    align-items: center;
    .icon {
      margin-right: 0.24rem;
    }
    span {
      font-size: 0.34rem;
      color: @Grey12;
    }
  }
  .money {
    padding: 0.22rem 0.3rem 0.3rem 0.3rem;
    text-align: center;
    color: @Grey12;
    span:first-child {
      font-size: 0.3rem;
    }
    span:last-child {
      vertical-align: text-top;
      font-size: 0.6rem;
    }
  }
  .reset-password {
    padding-right: 0.8rem;
    text-align: right;
    padding-top: 0.2rem;
    span {
      color: @BeeDefault3;
      font-size: 0.24rem;
    }
  }
  .van-password-input__info{
    text-align: left;
    font-size: .28rem;
  }
  .van-password-input__security{
    border: 1px solid #999;
    border-radius: 0.1rem;
  }
  .van-password-input__security li{
    border-right: 1px solid #999;
    background: none;
  }
  .van-password-input__security li:first-child{

    border-top-left-radius: 0.1rem;
    border-bottom-left-radius: 0.1rem;
  }
  .van-password-input__security li:last-child{
    border-right: none;
    border-top-right-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
  }
  [class*=van-hairline]::after{
    border: none;
  }
  .van-password-input {
    margin: 0 0.8rem;
  }
}
</style>
